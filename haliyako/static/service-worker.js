const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v2';
const assets = [
    '/static/css/bootstrap.min.css',
    '/static/css/mdb.min.css',
    '/static/css/style.css',
    '/static/img/about-bg.jpg',
    '/static/img/avatar.jpg',
    '/static/img/covid_tech.jpg',
    '/static/img/covid_virus.jpg',
    '/static/img/f06662b7-b3b1-4ebb-8e46-71913037ce78_200x200.png',
    '/static/img/global_covid.jpg',
    '/static/img/icon_haliyetu.png',
    '/static/img/icons/icon-144x144.png',
    '/static/js/bootstrap.min.js',
    '/static/js/main.js',
    '/static/js/mdb-initialize.js',
    '/static/js/mdb.min.js',
    '/static/js/popper.min.js',
    '/static/js/jquery-3.3.1.min.js',
    '/static/lib/ionicons/css/ionicons.min.css',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'https://use.fontawesome.com/releases/v5.8.2/webfonts/fa-brands-400.woff2',
    'https://use.fontawesome.com/releases/v5.8.2/webfonts/fa-regular-400.woff2',
    'https://use.fontawesome.com/releases/v5.8.2/webfonts/fa-solid-900.woff2'
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
          //check if request is from our server. Don't delete  it
          const fromLocal = keys[0].url.includes("/haliyetu");
          if(!fromLocal) {
              cache.delete(keys[0]).then(limitCacheSize(name, size));
          }
      }
    });
  });
};

// install event
self.addEventListener('install', evt => {
  console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('caching static assets');
      cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

// activate event
self.addEventListener('activate', evt => {
  console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', function(event) {

    event.respondWith(async function() {
        const staticCache = await caches.open(staticCacheName);
        const staticCachedResponse = await staticCache.match(event.request);
        // check if request is in static cache. Not update needed
        if(staticCachedResponse){
            return staticCachedResponse;
        }
        const fetchPromise = fetch(event.request);
        const networkResponse = await fetchPromise;

        const dynamicCache = await caches.open(dynamicCacheName);

         // Check if we received a valid response
        if(event.request.method === "GET") {
            event.waitUntil(async function () {
                const resClone = networkResponse.clone();
                // Update the cache with a newer version
                await dynamicCache.put(event.request, resClone);
                limitCacheSize(dynamicCacheName, 30);

            }());
        }



        // The response contains cached data, if available
        return networkResponse || await dynamicCache.match(event.request);
    }());
});

// self.addEventListener('activate', evt => {
//   // console.log('[ServiceWorker] Activate');
//   evt.waitUntil(
//     caches.keys().then(keys => {
//       return Promise.all(keys.map(key => {
//         if (key !== dynamicCacheName) {
//           console.log('[ServiceWorker] Removing old cache', key);
//           return caches.delete(key);
//         }
//       }));
//     })
//   );
//   self.clients.claim();
// });

// fetch event
// self.addEventListener('fetch', evt => {
//   // console.log('fetch event', evt.request);
//   evt.respondWith(
//     caches.match(evt.request).then(cacheRes => {
//       return cacheRes || fetch(evt.request).then(fetchRes => {
//         return caches.open(dynamicCacheName).then(cache => {
//           cache.put(evt.request.url, fetchRes.clone());
//           // check cached items size
//           limitCacheSize(dynamicCacheName, 20);
//           return fetchRes;
//         })
//       });
//     }).catch(() => {
//       console.log("you're are offline");
//       return;
//     })
//   );
// });
// self.addEventListener('fetch', function(event) {
//     console.log(`fecting is happening: ${event.request.url}`)
//   event.respondWith(
//     fetch(event.request)
//         .then(fetchRes => {
//             const resCLone = fetchRes.clone();
//             //check if  it is contained in the cache
//             caches.open(staticCacheName).then(staticCache => {
//                 staticCache.match(event.request).then(res => {
//                     if(res){
//                         console.log("found in static caching");
//                         staticCache.put(event.request.url, resCLone);
//                     }
//                     else {
//                         caches.open(dynamicCacheName).then(dynamicCache => {
//                             console.log("going to dynamic cache");
//                             dynamicCache.put(event.request.url, resCLone);
//                         })
//                     }
//                 })
//                     .catch(err => {
//                         console.log("an error happened: ", err);
//                     });
//                 // check cached items size
//
//             });
//             limitCacheSize(dynamicCacheName, 20);
//             return fetchRes;
//         })
//         .catch((e) => {
//             console.error('Fetch failed; returning offline page instead.', e);
//           return caches.match(event.request).then(response => {
//               if(response){
//                   return response;
//               }else{
//                   return;
//               }
//           })
//         })
//   );
// });

// const dynamicCacheName = 'dynamic-cache';
//
// const filesToCache = [
//   '/',
//   '/static/js/selfCheck.js',
//     '/static/css/*'
// ];
//
// // install event:
// self.addEventListener('install', (evt) => {
//   console.log('[ServiceWorker] Install');
//   evt.waitUntil(
//     caches.open(dynamicCacheName).then((cache) => {
//       console.log('[ServiceWorker] Pre-caching offline page');
//       return cache.addAll(filesToCache);
//     })
//   );
//
//   self.skipWaiting();
// });
//
// // Activation
// self.addEventListener('activate', (evt) => {
//   console.log('[ServiceWorker] Activate');
//   evt.waitUntil(
//     caches.keys().then((keyList) => {
//       return Promise.all(keyList.map((key) => {
//         if (key !== dynamicCacheName) {
//           console.log('[ServiceWorker] Removing old cache', key);
//           return caches.delete(key);
//         }
//       }));
//     })
//   );
//   self.clients.claim();
// });
//
// self.addEventListener('fetch', function(event) {
//     console.log(`fecting is happening: ${event.request}`)
//   event.respondWith(
//     fetch(event.request)
//         .catch(function() {
//       return caches.match(event.request);
//     })
//   );
// });

// self.addEventListener('fetch', function(evt) {
//   console.log('The service worker is serving the asset.');
//   evt.respondWith(fromCache(evt.request));
//
//   evt.waitUntil(
//     update(evt.request)
//       .then(refresh)
//   );
// });
//
// function fromCache(request) {
//   return caches.open(CACHE).then(function (cache) {
//     return cache.match(request);
//   });
// }
//
// function update(request) {
//   return caches.open(CACHE).then(function (cache) {
//     return fetch(request).then(function (response) {
//       return cache.put(request, response.clone()).then(function () {
//         return response;
//       });
//     });
//   });
// }
//
// function refresh(response) {
//   return self.clients.matchAll().then(function (clients) {
//     clients.forEach(function (client) {
//         var message = {
//         type: 'refresh',
//         url: response.url,
//             eTag: response.headers.get('ETag')
//       };
//       client.postMessage(JSON.stringify(message));
//     });
//   });
// }