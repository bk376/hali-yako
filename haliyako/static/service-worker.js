const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v2';
const assets = [
    '/',
    '/filter_county/kenya/0',
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
    '/static/js/selfCheck.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', evt => {
  console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('caching shell assets');
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
self.addEventListener('fetch', evt => {
  // console.log('fetch event', evt.request);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          // check cached items size
          limitCacheSize(dynamicCacheName, 20);
          return fetchRes;
        })
      });
    }).catch(() => {
      console.log("you're are offline");
      return;
    })
  );
});

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