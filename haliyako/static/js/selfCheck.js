//let urlpat = "https://haliyetu.herokuapp.com/";
let urlpat = "http://localhost:8080";
var mobile = false;
var news_filter = "0";
var hasloc = false;
var reportLocation = "kenya";
var newsFilter = "kenya";
var postTopic = "postTopic";
var toaloc = "1";
var show = false;
var sideBarOpen = false;
let user = "";
let byPassSideNav = false;
let inComment = false;
let scrollDistance = 0;
let fetching = false;
let fetching_posts = false;
let fetching_comments = false;
let show_div = "news_div";
let pages = ["corona_updates_div"];
let navs = ["navRegular"];
let tempid =0;
let tempid2 =0;
//check this change 2
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//     .register('./service-worker.js')
//     .then(function(registration) {
//         console.log('Service Worker Registered!');
//         return registration;
//     })
//     .catch(function(err) {
//         console.error('Unable to register service worker.', err);
//     });
// }
var timer = null;
function userProfileTabs(id){
    const postsTab = document.getElementById('postsTab');
    const postsCommentsTab = document.getElementById('postsCommentsTab');
    const newsCommentsTab = document.getElementById('newsCommentsTab');
    if(id === "postsTab"){
        postsTab.classList.add("userTabsColor");
        postsCommentsTab.classList.remove("userTabsColor");
        newsCommentsTab.classList.remove("userTabsColor");
        document.getElementById('profile_posts').style.display = "block";
        document.getElementById('profile_post_comments').style.display = "none";
        document.getElementById('profile_news_comments').style.display = "none";
    } else if(id === "postsCommentsTab"){
        postsCommentsTab.classList.add("userTabsColor");
        postsTab.classList.remove("userTabsColor");
        newsCommentsTab.classList.remove("userTabsColor");
        document.getElementById('profile_posts').style.display = "none";
        document.getElementById('profile_post_comments').style.display = "block";
        document.getElementById('profile_news_comments').style.display = "none";
    }else if(id === "newsCommentsTab"){
        newsCommentsTab.classList.add("userTabsColor");
        postsTab.classList.remove("userTabsColor");
        postsCommentsTab.classList.remove("userTabsColor");
        document.getElementById('profile_posts').style.display = "none";
        document.getElementById('profile_post_comments').style.display = "none";
        document.getElementById('profile_news_comments').style.display = "block";
    }

}

const radioSelected = "form-check-input raddio text-white";
const radioNotSelected = "form-check-input raddio";
const radioCardSelected = "form-check mb-1 card py-2 purple-gradient cardsSelected";
const radioCardUnselected ="form-check mb-1 card py-2";
// const radioCardSelected = (id) => (`form-check mb-1 card py-2 purple-gradient ${id}`);
// const radioCardUnselected = (id) => (`form-check mb-1 card py-2 ${id}`);

/**
 * @param firstButton: id of first radio button
 * @param secondButton: id of second radio Button
 * @param selectedLabel: id of label of the selected button
 * @param selectedCard: class of the selected card
 * @param unselectedLabel: id of the unselected button
 * @param unselectedCard: class of the unselected card
 */
function radioButtonSelected(firstButton, secondButton, selectedLabel, selectedCard, unselectedLabel, unselectedCard){
    document.getElementById(firstButton).disabled = true;
    document.getElementById(secondButton).disabled = true;
    // document.getElementById(selectedLabel).className = radioSelected;
    // document.getElementById(selectedCard).className= radioCardSelected;
    // document.getElementById(unselectedLabel).className = radioNotSelected;
    // document.getElementById(unselectedCard).className= radioCardUnselected;

  }


function changeDivColor(id){
    navList = ["corona_home", "self_checker", "sideCoronaNumbers", "sideAboutUs", "sideContactUs"]
    for(let nav of navList){
        if(id == nav){
            document.getElementById(nav).style.color = "mediumpurple";
        }else{
            document.getElementById(nav).style.color = "";
        }
    }
}

function setDivHeight(id){
    const selfCheckDivHeight = document.getElementById(id);
    const deviceHeight = document.documentElement.clientHeight;
    selfCheckDivHeight.style.height = `${deviceHeight}px`;
}

function unselectCards(){
  let selectedCards = document.getElementsByClassName("cardsSelected");
  for(let i=0; i < selectedCards.length; i++){
      let elem = selectedCards.item(i);
      let cardLabel = elem.getElementsByTagName('label');
      elem.classList = radioCardUnselected;
      cardLabel[0].classList = radioNotSelected;
  }
}

$(window).on('load', function() {
  $('#mdb-preloader').addClass('loaded');
});


/**
 * Handle back to top button
 * show button on div scroll greater than 1000 otherwise hide
 * */
$(document).ready(function() {
    document.getElementById("chatsScrollDiv").addEventListener("scroll", () => (hideCHatsNotification()));
    // document.getElementById("selfCheckScrollDiv").addEventListener("scroll", () => (showScrollBackButton("selfCheckScrollDiv","selfCheckTopId", 800)));
    document.getElementById("newsScrollDiv").addEventListener("scroll", () => (hideNewsNotification()));
    document.getElementById("newsScrollDiv").addEventListener("scroll", () => (loadMoreNews("newsScrollDiv")));
});

function setMarginBottom(){
    //    set margin bottom for selfcheck
    const selfCheckQuestionare = document.getElementById("selfCheckMarginBottom");
    const elem = document.getElementById("selfCheckScrollDiv");
    const deviceHeight = document.documentElement.clientHeight;
    const marginBottom = elem.clientHeight - deviceHeight + 120;
    selfCheckQuestionare.style.marginBottom = `${marginBottom}px`;
}



function showScrollBackButton(scrollDiv, scrollButton, scrollHeight) {
    const position = document.getElementById(scrollDiv).scrollTop;
    const btn = document.getElementById(scrollButton);
    if (position > scrollHeight) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

/**
 * Loads more news when you s
 * */
function  loadMoreNews(id){
    const scrollDiv = document.getElementById(id);
    if( scrollDiv.scrollTop + 10 > (scrollDiv.scrollHeight - scrollDiv.offsetHeight)){
        update_local_news("-1", newsFilter.toLowerCase(), "1");
        // const moreNewsButton = document.getElementsByClassName("loadNewsButton");
        // const spinner = document.getElementById("spinnerId");
        // if(moreNewsButton.length > 0){
        //     moreNewsButton[0].click();
        // }else{
        //     spinner.style.display = "none";
        // }
    }
}

/**
 * Scroll Div to the bottom of div
 * */
function scrollBottom(id) {
    // let id = "selfCheckScrollDiv";
    const scrollDiv = document.getElementById(id);
    if (scrollDistance == 0) {
        scrollDistance = scrollDiv.scrollHeight;
    }
    let growth = scrollDiv.scrollHeight - scrollDistance;
    if (growth > 400) {
        growth = growth - 30;
    }
    const scrollTo = scrollDistance + growth;
    //scrollDiv.scrollTo({top:scrollTo, behavior: "smooth"});
    scrollDiv.scrollBy({top:450, behavior: "smooth"});
    scrollDistance = scrollDiv.scrollHeight;

}
/**
 *Track changes in div height
 * */
function divHeightChange(id, callBack){
    const selfCheckChange = document.getElementById(id);
    let resizeObserver = new ResizeObserver(callBack);
    resizeObserver.observe(selfCheckChange);
}

// Starting tracking height changes in selfchecker div when user starts taking the test
divHeightChange("checkerDivChange", () => scrollBottom("adjustHeight"));

function clickCard(id){
    document.getElementById(id).click();
}

function handleBackToTop() {
    const newsShow = document.getElementById("news-tab");
    const chatsShow = document.getElementById("corona_updates_div");
    const selfCheckShow = document.getElementById("self_checker_div");
    if(newsShow.style.display === "block"){
        document.getElementById('newsTopSection').scrollIntoView({behavior: 'smooth'});
    } else if (chatsShow.style.display === "block"){
        document.getElementById('chatsTopSection').scrollIntoView({behavior: 'smooth'});
    } else if(selfCheckShow.style.display === "block"){
        document.getElementById('selfCheckerTopSection').scrollIntoView({behavior: 'smooth'});
    }
}

window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above

    const form = document.getElementById("contact-form");
    const button = document.getElementById("submitContactForm");
    const status = document.getElementById("my-form-status");
    const formSuccess = document.getElementById("formSubmitSuccess");
    const formError = document.getElementById("formSubmitError");
    const topDiv = document.getElementById("contact_us_div");

    // Success and Error functions for after the form is submitted

    function success() {
      topDiv.scrollTop = 0;
      form.reset();
      button.style = "display: none ";
      status.innerHTML = "Thanks!";
      formSuccess.style = "display: block";
      formError.style = "display: none";
    }

    function error() {
      status.innerHTML = "Oops! There was a problem.";
      formSuccess.style = "display: none";
      formError.style = "display: block";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });

  // helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }

function validateForm() {
  var name =  document.getElementById('name').value;
  if (name == "") {
      document.querySelector('.status').innerHTML = "*Name cannot be empty";
      return false;
  }
  var email =  document.getElementById('email').value;
  if (email == "") {
      document.querySelector('.status').innerHTML = "*Email cannot be empty";
      return false;
  } else {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!re.test(email)){
          document.querySelector('.status').innerHTML = "*Email format invalid";
          return false;
      }
  }
  var subject =  document.getElementById('subject').value;
  if (subject == "") {
      document.querySelector('.status').innerHTML = "*Subject cannot be empty";
      return false;
  }
  var message =  document.getElementById('message').value;
  if (message == "") {
      document.querySelector('.status').innerHTML = "*Message cannot be empty";
      return false;
  }
  document.querySelector('.status').innerHTML = "";
  document.getElementById('submitContactForm').click()
}

$(document).ready(function(){
	$(window).scroll(function () {
			if ($(this).scrollTop() > 50) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		// scroll body to 0px on click
		$('#back-to-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 400);
			return false;
		});
});

jQuery(document).ready(function( $ ) {


    timer = start_timer();
    pata("parent_comment").value = "corona_updates_div";

    $(document).on('keyup', '#userInput', function(event) {
       if(this.value.trim() == ""){
            pata("navMinReplyPost").style.color = "#a6a6a6";
            pata("navReplyPost").style.color = "#a6a6a6";
        }else{
            pata("navMinReplyPost").style.color = "white";
            pata("navReplyPost").style.color = "white";
        }
    });

    $(document).on('keyup', '#myInput, #myInput1', function(event) {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#sidebarCollapse').on('click', function () {
        document.getElementById("sidebar").style.width = "250px";
        document.getElementById("navTimesIcon").style.display = "block";
        document.getElementById("menuIcon").style.display = "none";
        sideBarOpen = true;
    });


    var currentLocation = window.location;
    urlpat = window.location.href;
    var news_displayed = false;

    if (window.screen.width <= 700) {
        mobile = true;
        postTopic = "postTopic1";
        toaloc = "";
    }

    user = document.getElementById("username").textContent;
    if(user == ""){
        if(mobile){logOptionsMob("", "", "", "")}
        else{logOptions("", "", "", "")}}
    else{
        const Http = new XMLHttpRequest();
        let Url = urlpat + "get_info?username=" + user;
        Http.open("Get", Url);
        Http.send()
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == "user_removed") {
                    if (mobile) {
                        logOptionsMob("", "", "", "")
                    } else {
                        logOptions("", "", "", "")
                    }

                } else {
                    var myArr = JSON.parse(this.responseText);
                    if(mobile) {
                        logOptionsMob(user, myArr.village, myArr.state, myArr.country);
                    }else{
                        logOptions(user, myArr.village, myArr.state, myArr.country);
                    }
                    has_loc = true;
                }
            }
        }
    }
    if(currentLocation == urlpat + "login" || currentLocation == urlpat + "register") {
        $(document).on('click', '#self_checker, #corona_updates, #corona_status,#report_covid19', function(event) {
            window.location.href = urlpat;
        });

    }



    $('#menuIcon').on( 'click', function() {
        //document.getElementById("menuIcon").style.display ="none";
        //document.getElementById("navTimesIcon").style.display ="block";

    });

    $('#navTimesIcon').on( 'click', function() {
        //document.getElementById("menuIcon").style.display ="block";
        //document.getElementById("navTimesIcon").style.display ="none";

    });

    $(document).on('click', '#navBackComunity', function(event) {
        transitions_navs(1);
        ficha("allCommunityDiv", 1);
        ficha("community_posts", 0);
        reportLocation = pata("currloc").textContent;
        show_div = "news_div";

    });


    $(document).on('click', '#navBackButton, #commentBackButton', function(event) {
        pata("corona_updates_div").classList.add("wow");
        pata("corona_updates_div").classList.add("fadeInLeft");
        pata("corona_updates_div").classList.add("animated");

        transitions_pages(1);
        transitions_navs(1);
        ficha("footerRegular", 1);
        ficha("footerComment", 0);

        // let main = pata("parent_comment");
        // let main_div = main.className;
        // if(main_div == "child"){
        //     main_div = "corona_comments_div";
        // }else{
        //     main_div = main.value;
        // }
        // if(mobile){
        //    if(main_div == "corona_updates_div"){
        //        hide_all_nav("");
        //    }else if(main.value == "community_div"){
        //        ficha("navBackButton", 0);
        //         ficha("footerRegular", 1);
        //         ficha("footerComment", 0);
        //         ficha("navCommunity", 1);
        //    }
        //    else{
        //        hide_all_nav("News");
        //    }
        // }
        //document.getElementById(main_div).style.display = "block";
        //document.getElementById("corona_comments_div").style.display = "none";
        document.getElementById("comments_div").textContent = "";
        inComment = false;
    });

    $(document).on('click', '#navReply_i, #navMinReply_i, #navReplyPost, #navMinReplyPost', function(event) {
        pata("corona_updates_div").classList.add("wow");
        pata("corona_updates_div").classList.add("fadeInLeft");
        pata("corona_updates_div").classList.add("animated");
        pata("navRegular").classList.add("wow");
        pata("navRegular").classList.add("fadeInLeft");
        pata("navRegular").classList.add("animated");

        if(this.id == "navMinReplyPost" || this.id == "navReplyPost"){
            if(pata("username").textContent == "" || pata("userInput").value.trim() == ""){return;}
            else{pata("parent_comment").value = "corona_updates_div"; }
        }
        // if(this.id == "navReply_i" && pata("navReplyPost").textContent == "create"){
        //     ficha("chatsLocation", 1);
        //
        // }
        // let main = pata("parent_comment");
        // let main_div = main.className;
        // if(main_div == "child"){
        //     if(mobile) {
        //         ficha("footerComment", 1);
        //         ficha("navBackButton", 1);
        //         ficha("navReply",0);
        //
        //     }
        //     ficha("corona_comments_div",1);
        //     if(mobile){ficha("footerComment", 1);}
        //     main.className = "parent";
        // }else{
        //     if(mobile) {
        //         if(main.value == "community_div"){
        //             ficha("navCommunity", 1);
        //         }else{
        //             ficha("navRegular", 1);
        //         }
        //         ficha("footerRegular", 1);
        //         ficha("navReply",0);
        //
        //     }
        //     ficha(main.value, 1)
        // }

        transitions_pages(1);
        transitions_navs(1);
        if(navs[navs.length-1] == "navBackButton"){
            ficha("footerComment", 1);
        }else{
            ficha("footerRegular", 1);
        }
        //ficha("reply_comment_div",0);
        pata("partComment").textContent = "";
        pata("navMinReplyPost").style.color = "#a6a6a6";

    });

    $(document).on('click', '#corona_updates, #chats-tab-just', function(event) {
        //$('#graph_status_div').hide();
        //$('#corona_updates_div').show();
        document.getElementById("report_covid19_div").style.display = 'none';
        document.getElementById("self_checker_div").style.display = 'none';
         document.getElementById("about_us_div").style.display = 'none';
        document.getElementById("graph_status_div").style.display = 'none';
         document.getElementById("corona_updates_div").style.display = 'block';
    });

    $('#corona_status').on( 'click', function() {
        //$('#graph_status_div').hide();
        //$('#corona_updates_div').show();
        document.getElementById("report_covid19_div").style.display = 'none';
        document.getElementById("self_checker_div").style.display = 'none';
          document.getElementById("corona_updates_div").style.display = 'none';
         document.getElementById("graph_status_div").style.display = 'block';
    });

    //hiding manenoz


    $(document).on('click', '#home_btn, #corona_home, #chats_switch, #contactButton', function(event) {
        pages = ["corona_updates_div"];
        navs = ["navRegular"];
        show_div = "news_div";
        if(timer == null){
            timer = start_timer();

        }
        checkHideSide();
        pata("currloc").textContent = reportLocation;
        pata("corona_updates_div").classList.add("wow");
        pata("corona_updates_div").classList.add("fadeInLeft");
        pata("navRegular").classList.add("wow");
        pata("navRegular").classList.add("fadeInLeft");
        pata("navRegular").classList.add("animated");
        pata("corona_updates_div").classList.add("animated");
        pata("parent_comment").value = "corona_updates_div";

        hide_all("corona_updates_div");
        if(!mobile){
            document.getElementById("news-tab").style.display = 'block';
        }else{
            hide_all_nav("");
        }
        //document.getElementById("allnews").style.display ="none";
        document.getElementById("currloc" + toaloc).textContent = reportLocation;
        //$("html, body").animate({ scrollTop: 0 }, "slow");
        // document.getElementById("corona_updates_div").classList.add('fadeInUp');
        // document.getElementById("corona_updates_div").classList.remove("fadeInLeft");
        // document.getElementById("corona_updates_div").style.animationName = "fadeInUp";



    });

    $(document).on('click', '#news_switch', function(event) {
        pages = ["news-tab"];
        navs = ["navOther"];
        show_div = "news_div";

        if(timer == null){
            timer = start_timer();

        }
        checkHideSide();
        pata("parent_comment").value = "news-tab";
        pata("news-tab").classList.add("wow");
        pata("news-tab").classList.add("fadeInRight");
        pata("news-tab").classList.add("animated");
        hide_all("news-tab");
        if(mobile){hide_all_nav("News");}
        reportLocation = pata("currloc").textContent;
        document.getElementById("currloc" + toaloc).textContent = newsFilter;
        show = false;

        document.getElementById("news-tab").style.animationName = "fadeInRight";
        document.getElementById("navOther").style.animationName = "fadeInRight";


    });

    $(document).on('click', '#bell', function(event) {
        pages = ["notification_div"];
        navs = ["navOther"];
        if (timer == null) {
            timer = start_timer();

        }
        checkHideSide();
        hide_all("notification_div");
        if (mobile) {
            hide_all_nav("News");
        }
        pata("navOtherTitle").textContent = "Notification"; //pata("username").textContent;
        fetch_notification();

    });
    $(document).on('click', '#navProfile, #navChatRooms, #sidebarhide, #navContactUs, #navAboutUs, #navCoronaNumbers,  #self_switch, #navDownload', function(event) {
        showx(pata("navmenu"));
        sideBarOpen = false;
        ficha("newsLocation", 0);
        ficha("searchCountry", 0);
        ficha("chatsLocation", 0);
        if(this.id == "navCoronaNumbers"){
            ficha("searchCountry", 1);
            pata("currloc").textContent = "filter";

        }
        if(this.id == "navChatRooms"){
            ficha("chatsLocation", 1);
        }

        if(this.id != "sidebarhide"){stua("-1");}
    });

    $(document).on('click', '#navChatRooms',function(event) {
        populate_communities();
        pages.push("community_div");
        navs.push("navReply");
        transitions_pages(0);
        transitions_navs(0);
        ficha("allCommunityDiv", 1);
        ficha("community_posts", 0);

        //hide_all("community_div");
        //hide_all_navbars("navReply");
        pata("navReplyHead").textContent = reportLocation + " Chat Rooms";
        let create_btn = pata("navReplyPost");
        create_btn.textContent = "create";
        create_btn.style.color = "#FFFAFA";
        create_btn.removeAttribute("onclick");
        create_btn.onclick = show_create_community;

        stua("-1");

    });

    $(document).on('click', '#navProfile',function(event){
        if(timer != null){
            clearInterval(timer);
            timer = null;
        }
        pages.push("user_profile_div");
        navs.push("navOther");
        pata("navOtherTitle").textContent = "My Profile"; //pata("username").textContent;
        transitions_pages(0);
        transitions_navs(0);

        fetchUserInfo();

    });

    $(document).on('click', '#self_checker, #self_checker_btn, #corona-tab-just, #self_switch, #self_checker_nav', function(event) {
        hide_all("self_checker_div");
        if(!mobile){
             document.getElementById("news-tab").style.display = 'block';
        }else{
            hide_all_nav("Corona Self Checker");
        }
        document.getElementById("navOther").style.animationName = "fadeInUp";

        stua("-1");
        ficha("newsLocation", 0);
        ficha("searchCountry", 0);
        ficha("chatsLocation", 0);

    });

    $(document).on('click', '#sideAboutUs, #navAboutUs', function(event) {
        hide_all("about_us_div");
        if(mobile){
            hide_all_nav("About us");
        }
        document.getElementById("navOther").style.animationName = "fadeInUp";
        ficha("newsLocation", 0);
        ficha("searchCountry", 0);
        ficha("chatsLocation", 0);

    });

    $(document).on('click', '#sideContactUs, #navContactUs', function(event) {
        hide_all("contact_us_div");
        if(mobile){
            hide_all_nav("Contact Us");
        }
        document.getElementById("navOther").style.animationName = "fadeInUp";
        ficha("newsLocation", 0);
        ficha("searchCountry", 0);
        ficha("chatsLocation", 0);

    });

    $(document).on('click', '#sideCoronaNumbers, #navCoronaNumbers', function(event) {
        hide_all("graph_status_div")
         if(!mobile) {
             document.getElementById("news-tab").style.display = 'block';
         }else{
             hide_all_nav("Corona Numbers");
         }
        document.getElementById("navOther").style.animationName = "fadeInUp";
        ficha("newsLocation", 0);
        ficha("searchCountry", 1);
        ficha("chatsLocation", 0);

    });

    $(document).on('click', '#report_covid19, #report_covid19_btn', function(event) {
        document.getElementById("corona_updates_div").style.display = 'none';
         document.getElementById("graph_status_div").style.display = 'none';
         document.getElementById("self_checker_div").style.display = 'none';
        document.getElementById("report_covid19_div").style.display = 'block';

    });

    $('#submitUnderlyingCheckbox').on( 'click', function() {
        // document.getElementById("goodbye_message").style.display = "block";
        // const good_bye = document.getElementById("btn_container");
        // good_bye.style.display='block';
    });

    $('#submitReport_btn').on( 'click', function() {
       sendReport();
       document.getElementById("report_covid19_div").style.display = 'none';
        document.getElementById("self_checker_div").style.display = 'none';
        document.getElementById("graph_status_div").style.display = 'none';
        document.getElementById("corona_updates_div").style.display = 'block';

    });

    $('#retake_btn').on( 'click', function() {
       let purpledCards = document.getElementsByClassName("purpled");
      for(var i=0; i < purpledCards.length; i++){
          purpledCards[i].classList.remove("purple-gradient");
      }
        uncheck()
       $("html, body").animate({ scrollTop: 0 }, "slow");
       //unselectCards();
       //unselectCards();
       //unselectCards();
       scrollDistance = 0;


    });

    $('#chats_switch').on( 'click', function() {
        document.getElementById("corona_updates_div").style.display = "block";
        show = true;
    });

    $(document).on('click', '#toalocbtn, #toalocbtn1', function(event) {
        document.getElementById("toalocbtn"+toaloc).style.display = "none";
        document.getElementById("toalocloader"+toaloc).style.display = "block";
        getAddress();
    });

//  Check if self checker is clicked

  $('#checkMyself').on( 'click', function() {
    $("#selectLocation").show();
    $("#selectLocationQuestion").text("Where are you located?");
    $("#checkerHiddenInput").val(1);
    radioButtonSelected("checkMyself", "checkSomeoneElse", "checkMyselfLabel", "checkMyselfCard", "checkSomeoneElseLabel", "checkSomeoneElseCard")
    pata(this.id + "Card").classList.add("purple-gradient");
  });

  $('#checkSomeoneElse').on( 'click', function() {
    $("#selectLocation").show();
    $("#selectLocationQuestion").text("Where are they located?");
    $("#checkerHiddenInput").val(2);
    pata(this.id + "Card").classList.add("purple-gradient");
    radioButtonSelected("checkMyself", "checkSomeoneElse", "checkSomeoneElseLabel", "checkSomeoneElseCard", "checkMyselfLabel", "checkMyselfCard" );
  });


  $('#selectCountyOption').on( 'change', function() {
       $("#ifIll").show();
        if($('#checkMyself')[0].checked){
          $("#ifIllQuestion").text("Are you ill?")
      } else{
          $("#ifIllQuestion").text("Are they ill?")
      }
      document.getElementById("selectCountyOption").disabled = true;
    // const countyValue = $('#selectCountyOption')[0].value;
    // if(countyValue != "") {
    //   $("#if").show()
    //   if($('#checkMyself')[0].checked){
    //       $("#selectAgeQuestion").text("What is your age?")
    //   } else{
    //       $("#selectAgeQuestion").text("What is their age?")
    //   }
    // }
  });

  $('#selectAgeOption').on( 'change', function() {
      $("#selectGender").show()
      if($('#checkMyself')[0].checked){
          $("#selectGenderQuestion").text("What is your gender?")
      } else{
          $("#selectGenderQuestion").text("What is their gender?")
      }
      document.getElementById("selectAgeOption").disabled = true;

  });

  $('#isIll').on( 'click', function() {
      $("#selectAge").show()
      if($('#checkMyself')[0].checked){
          $("#selectAgeQuestion").text("What is your age?")
      } else{
          $("#selectAgeQuestion").text("What is their age?")
      }
        pata(this.id + "Card").classList.add("purple-gradient");

            radioButtonSelected("isIll", "notIll", "isIllLabel",
        "isIllCard", "notIllLabel", "notIllCard")
  });
  $('#notIll').on( 'click', function() {
    $("#contactCovid19").show();
    let msg = "Within the last two weeks did they: ";
        if($('#checkMyself')[0].checked){
          msg = "Within the last two weeks did you: ";
        }
        $("#contactCovid19Message").text(msg);

    radioButtonSelected("isIll", "notIll", "notIllLabel",
       "notIllCard", "isIllLabel", "isIllCard");
    pata(this.id + "Card").classList.add("purple-gradient");

  });

  $('#genderMale').on( 'click', function() {
    $("#genderHiddenInput").val(1);
    $("#selectSymptoms").show();
    if($('#checkMyself')[0].checked){
          $("#selectSymptomsQuestion").text("Are you experiencing any of these symptoms?")
      } else{
          $("#selectSymptomsQuestion").text("Are they experiencing any of these symptoms?")
      }
    radioButtonSelected("genderMale", "genderFemale", "genderMaleLabel",
       "genderMaleCard", "genderFemaleLabel", "genderFemaleCard" );
    pata(this.id + "Card").classList.add("purple-gradient");

  });

  $('#genderFemale').on( 'click', function() {
    $("#genderHiddenInput").val(2);
    $("#selectSymptoms").show();
    if($('#checkMyself')[0].checked){
          $("#selectSymptomsQuestion").text("Are you experiencing any of these symptoms?")
      } else{
          $("#selectSymptomsQuestion").text("Are they experiencing any of these symptoms?")
      }
    pata(this.id + "Card").classList.add("purple-gradient");

    radioButtonSelected("genderFemale", "genderMale", "genderFemaleLabel", "genderFemaleCard",
       "genderMaleLabel", "genderMaleCard" );
  });

  $('#didContactCovid19').on( 'click', function() {
      pata(this.id + "Card").classList.add("purple-gradient");

    // document.getElementById("didContactCovid19Label").className = radioSelected;
    // document.getElementById("didContactCovid19Card").className= radioCardSelected;
    // document.getElementById("liveContactCovid19Label").className = radioNotSelected;
    // document.getElementById("liveContactCovid19Card").className= radioCardUnselected;
    // document.getElementById("notContactCovid19Label").className = radioNotSelected;
    // document.getElementById("notContactCovid19Card").className= radioCardUnselected;
  });

  $('#liveContactCovid19').on( 'click', function() {
     pata(this.id + "Card").classList.add("purple-gradient");

    // document.getElementById("liveContactCovid19Label").className = radioSelected;
    // document.getElementById("liveContactCovid19Card").className= radioCardSelected;
    // document.getElementById("didContactCovid19Label").className = radioNotSelected;
    // document.getElementById("didContactCovid19Card").className= radioCardUnselected;
    // document.getElementById("notContactCovid19Label").className = radioNotSelected;
    // document.getElementById("notContactCovid19Card").className= radioCardUnselected;
  });
  $('#notContactCovid19').on( 'click', function() {
      pata(this.id + "Card").classList.add("purple-gradient");

    // document.getElementById("notContactCovid19Label").className = radioSelected;
    // document.getElementById("notContactCovid19Card").className= radioCardSelected;
    // document.getElementById("didContactCovid19Label").className = radioNotSelected;
    // document.getElementById("didContactCovid19Card").className= radioCardUnselected;
    // document.getElementById("liveContactCovid19Label").className = radioNotSelected;
    // document.getElementById("liveContactCovid19Card").className= radioCardUnselected;
  });

  $('#lessThan3').on( 'click', function() {
      pata(this.id + "Card").classList.add("purple-gradient");

    // document.getElementById("lessThan3Label").className = radioSelected;
    // document.getElementById("lessThan3Card").className= radioCardSelected;
    // document.getElementById("lessThan7Label").className = radioNotSelected;
    // document.getElementById("lessThan7Card").className= radioCardUnselected;
    // document.getElementById("moreThan7Label").className = radioNotSelected;
    // document.getElementById("moreThan7Card").className= radioCardUnselected;
  });

  $('#lessThan7').on( 'click', function() {
      pata(this.id + "Card").classList.add("purple-gradient");

    // document.getElementById("lessThan7Label").className = radioSelected;
    // document.getElementById("lessThan7Card").className= radioCardSelected;
    // document.getElementById("lessThan3Label").className = radioNotSelected;
    // document.getElementById("lessThan3Card").className= radioCardUnselected;
    // document.getElementById("moreThan7Label").className = radioNotSelected;
    // document.getElementById("moreThan7Card").className= radioCardUnselected;
  });
  $('#moreThan7').on( 'click', function() {
      pata(this.id + "Card").classList.add("purple-gradient");

    // document.getElementById("moreThan7Label").className = radioSelected;
    // document.getElementById("moreThan7Card").className= radioCardSelected;
    // document.getElementById("lessThan3Label").className = radioNotSelected;
    // document.getElementById("lessThan3Card").className= radioCardUnselected;
    // document.getElementById("lessThan7Label").className = radioNotSelected;
    // document.getElementById("lessThan7Card").className= radioCardUnselected;
  });

  $('.selectSymptomsCheckbox').on( 'change', function() {
      if(pata("Card" + this.id).classList.contains("purple-gradient")){
          pata("Card" + this.id).classList.remove("purple-gradient");
      }else{
          pata("Card" + this.id).classList.add("purple-gradient");
      }


      var elements = document.getElementsByClassName("selectSymptomsCheckbox");
      const parent = elements[elements.length-1].parentNode;
      const label = parent.getElementsByTagName('label');
      if(elements.item(elements.length-1).checked) {
          for (var i = 0; i < elements.length - 1; i++) {
              var elem = elements.item(i);
              elem.checked = false;
              pata("Card" + elem.id).classList.remove("purple-gradient");

          }
      }

      //     // get parent div
      //     parent.classList = radioCardSelected;
      //     label[0].classList = radioSelected;
      // }else{
      //     parent.classList = radioCardUnselected;
      //     label[0].classList = radioNotSelected;
      // }
      //
      // for(let i = 0 ; i<elements.length-1; i++){
      //     // get parent div
      //     const parent = elements[i].parentNode;
      //     const label = parent.getElementsByTagName('label');
      //     if(elements[i].checked){
      //         parent.classList = radioCardSelected;
      //         label[0].classList = radioSelected;
      //     } else{
      //         parent.classList = radioCardUnselected;
      //         label[0].classList = radioNotSelected;
      //     }
      // }


    $("#submitSymptomsCheckbox").show();
  });

  $('.selectSevereSymptomsCheckbox').on( 'change', function() {
      if(pata("Card" + this.id).classList.contains("purple-gradient")){
          pata("Card" + this.id).classList.remove("purple-gradient");
      }else{
          pata("Card" + this.id).classList.add("purple-gradient");
      }
      var elements = document.getElementsByClassName("selectSevereSymptomsCheckbox");
      if(elements.item(0).checked){
          for (var i =1; i < elements.length; i++) {
                var elem = elements.item(i);
                elem.checked = false;
                pata("Card" + elem.id).classList.remove("purple-gradient");

              }
      }

      // for(let i = 0 ; i<elements.length-1; i++){
      //     // get parent div
      //     const parent = elements[i].parentNode;
      //     const label = parent.getElementsByTagName('label');
      //     if(elements[i].checked){
      //         parent.classList = radioCardSelected;
      //         label[0].classList = radioSelected;
      //     } else{
      //         parent.classList = radioCardUnselected;
      //         label[0].classList = radioNotSelected;
      //     }
      // }
      //
      // const parent = elements[elements.length-1].parentNode;
      // const label = parent.getElementsByTagName('label');
      // if(elements.item(elements.length-1).checked){
      //     parent.classList = radioCardSelected;
      //     label[0].classList = radioSelected;
      // }else{
      //     parent.classList = radioCardUnselected;
      //     label[0].classList = radioNotSelected;
      // }


      $("#submitSevereSymptomsCheckbox").show();

  });


  $('#submitSymptomsCheckbox').on( 'click', function() {
     var elements = document.getElementsByClassName("selectSymptomsCheckbox");
     var atleast = false;
     for(var i=0; i < elements.length; i++){
         if(elements.item(i).checked){
             atleast = true;
             break;
         }
     }

     if(atleast) {
         if (elements.item(elements.length - 1).checked) {
             $("#selectUnderlyingCondition").show();
             let msg = "Do they have any of the following underlining conditions?";
             if ($('#checkMyself')[0].checked) {
                 msg = "Do you have any of the following underlining conditions?";
             }
             $("#underlyingConditionQuestion").text(msg);
         } else {
             $("#severeSymptoms").show();
             let msg = "Do you have any of the following life-threatening symptoms?";
             if ($('#checkMyself')[0].checked) {
                 msg = "Do they have any of the following life-threatening symptoms?";
             }
             $("#severSymptomsQuestion").text(msg);
             // $("#selectSymptomsPeriod").show();
             // let msg = "How long have they been experiencing these symptoms?";
             // if($('#checkMyself')[0].checked){
             //   msg = "How long have you been experiencing these symptoms?";
             // }
             // $("#symptomsPeriodQuestion").text(msg);
         }
         for (var i = 0; i < elements.length; i++) {
             let elem = elements.item(i);
             elem.disabled = true;
         }
     }
     $("#submitSymptomsCheckbox").hide();
  });

  $('#submitSevereSymptomsCheckbox').on( 'click', function() {
      var elements = document.getElementsByClassName("selectSevereSymptomsCheckbox");
         var atleast = false;
         for(var i=0; i < elements.length; i++){
             if(elements.item(i).checked){
                 atleast = true;
                 break;
             }
         }
      if(atleast) {
          $("#selectSymptomsPeriod").show();
          let msg = "How long have they been experiencing these symptoms?";
          if ($('#checkMyself')[0].checked) {
              msg = "How long have you been experiencing these symptoms?";
          }
          $("#symptomsPeriodQuestion").text(msg);
          var elements = document.getElementsByClassName("selectSevereSymptomsCheckbox");
          for (var i = 0; i < elements.length; i++) {
              let elem = elements.item(i);
              elem.disabled = true;
          }
      }
      $("#submitSevereSymptomsCheckbox").hide();
  });


  $('.symptomsPeriodValue').on( 'click', function() {

    $("#selectUnderlyingCondition").show();
    let msg = "Do they have any of the following underlining conditions?";
    if($('#checkMyself')[0].checked){
      msg = "Do you have any of the following underlining conditions?";
    }
    $("#underlyingConditionQuestion").text(msg);
    var elements = document.getElementsByClassName("symptomsPeriodValue");
    for(var i=0; i < elements.length; i++){
         let elem = elements.item(i);
         elem.disabled = true;
     }

  });

  $('.contactCovid').on( 'click', function() {
    var elements = document.getElementsByClassName("contactCovid19");
    for(var i=0; i < elements.length; i++){
         let elem = elements.item(i);
         elem.disabled = true;
     }

  });


   $('.selectUnderlyingCheckbox').on( 'change', function() {
      if(pata("Card" + this.id).classList.contains("purple-gradient")){
          pata("Card" + this.id).classList.remove("purple-gradient");
      }else{
          pata("Card" + this.id).classList.add("purple-gradient");
      }
       var elements = document.getElementsByClassName("selectUnderlyingCheckbox");
      const parent = elements[elements.length-1].parentNode;
      const label = parent.getElementsByTagName('label');
      if(elements.item(elements.length-1).checked) {
          for (var i = 0; i < elements.length - 1; i++) {
              var elem = elements.item(i);
              elem.checked = false;
              pata("Card" + elem.id).classList.remove("purple-gradient");

          }
      }
      //     parent.classList = radioCardSelected;
      //     label[0].classList = radioSelected;
      // }else{
      //     parent.classList = radioCardUnselected;
      //     label[0].classList = radioNotSelected;
      // }

    $("#submitUnderlyingCheckbox").show();// get parent div
      // for(let i = 0 ; i<elements.length-1; i++){
      //     const parent = elements[i].parentNode;
      //     const label = parent.getElementsByTagName('label');
      //     if(elements[i].checked){
      //         parent.classList = radioCardSelected;
      //         label[0].classList = radioSelected;
      //     } else{
      //         parent.classList = radioCardUnselected;
      //         label[0].classList = radioNotSelected;
      //     }
      // }
  });

  $('#submitUnderlyingCheckbox').on( 'click', function() {
      var elements = document.getElementsByClassName("selectUnderlyingCheckbox");
         var atleast = false;
         for(var i=0; i < elements.length; i++){
             if(elements.item(i).checked){
                 atleast = true;
                 break;
             }
         }
      if (atleast) {
          $("#contactCovid19").show();
          let msg = "In the two weeks before they felt sick, did they:";
          if ($('#checkMyself')[0].checked) {
              msg = "In the two weeks before you felt sick, did you:";
          }
          $("#contactCovid19Message").text(msg);
          $('#submitSelfCheck').prop('disabled', false);
          var elements = document.getElementsByClassName("selectUnderlyingCheckbox");
          for (var i = 0; i < elements.length; i++) {
              let elem = elements.item(i);
              elem.disabled = true;
          }
      }
      $("#submitUnderlyingCheckbox").hide();
  });



//  JS for report-covid19.html
  $('#isCountySpecific').on( 'click', function() {
    $("#selectLocationReport").show();
    $("#selectLocationQuestionReport").text("Where are they located?");

  });

  $('.contactCovid').on( 'click', function() {
      document.getElementById("contactCovid_input").value = this.id;
      let msg_div = document.getElementById("goodbye_message");
      msg_div.style.display = "block";
      msg_div.textContent = "";
      let br_line = document.createElement("br");
      msg_div.appendChild(br_line);
      const good_bye = document.getElementById("btn_container");
      document.getElementById("cancel_btn").style.display = "none";
      // document.getElementById("home_btn").style.display = "block";
      // document.getElementById("retake_btn").style.display = "block";
      good_bye.style.display='block';
      var elements = document.getElementsByClassName("contactCovid");
        for(var i=0; i < elements.length; i++){
             let elem = elements.item(i);
             elem.disabled = true;
         }

      //not ill and no contact with covid
        var ill = document.getElementById("isIll").checked;
        var no_contact = document.getElementById("notContactCovid19").checked;
        let msg = "";
        let msg_title = document.createElement("p");
        msg_title.textContent = "Seems like you are okay.";
        let msg_body = document.createElement("p");
        msg_body.className = "text-muted";
        msg_body.textContent = "Remember to keep social distancing and wash your hands " +
            "regularly";
        let msg_conc = document.createElement("p");
        msg_conc.className = "text-muted";
        msg_conc.textContent = "Thank you for participating. Hali Yako ni Hali Yetu, We are in this together.";
        let steps = document.createElement("p");
        steps.className = "text-muted";
        steps.textContent = "Here are some of the steps that may help you while in quarantine"
        let list_out = document.createElement("ul");
        let list1 = document.createElement("li");
        list1.className = "text-muted";
        list1.textContent = "Stay home and rest";
        let list2 = document.createElement("li");
        list2.textContent = "Drink plenty of water and other clear liquids to prevent fluid loss (dehydration).";
        let list3 = document.createElement("li");
        list3.textContent = "Cover your coughs and sneezes.";
        let list4 = document.createElement("li");
        list4.textContent = "Clean your hands often.";
        list1.className = "text-muted";
        list2.className = "text-muted";
        list3.className = "text-muted";
        list4.className = "text-muted";
        var elements = document.getElementsByClassName("selectSymptomsCheckbox");
        var none_symptoms = elements.item(elements.length-1).checked;

        if(!ill && no_contact){
            msg_div.appendChild(msg_title);
            msg_body.textContent = "Remember to keep social distancing";
            msg_div.appendChild(msg_body);
            msg_div.appendChild(steps);
            list_out.appendChild(list2);
            list_out.appendChild(list3);
            list_out.appendChild(list4);
            msg_div.appendChild(list_out);
            msg_div.appendChild(msg_conc);

        }
        else if((!ill && !no_contact) || none_symptoms){
            msg_title.textContent= "Glad that you are feeling okay";
            msg_body.textContent = "Continue to monitor for any symptoms. If you develop any symptoms" +
                " be sure to contact medical facility as soon as possible. Coronavirus can take upto " +
                "two weeks to show symptoms."
            if(none_symptoms){
              msg_title.textContent= "Sorry that you are feeling ill";
              msg_body.textContent = "Continue to monitor your symptoms. If you develop any of the above symptoms" +
                " be sure to contact medical facility as soon as possible. Coronavirus can take upto " +
                "two weeks to show symptoms."
            }

            msg_div.appendChild(msg_title);
            list_out.appendChild(list1);
            list_out.appendChild(list2);
            list_out.appendChild(list3);
            list_out.appendChild(list4);
            msg_div.appendChild(msg_body);
            msg_div.appendChild(steps);
            msg_div.appendChild(list_out);

            if(none_symptoms) {
                let hotline = document.createElement("p");
                hotline.className = "text-muted";
                hotline.textContent = "Below is a list of hotline numbers you can use to reach coronavirus response" +
                    " team";
                let list_numbers = document.createElement("ul");
                let list5 = document.createElement("li");
                list5.className = "text-muted";
                let list6 = document.createElement("li");
                list6.className = "text-muted";
                list6.textContent = "0729471414";
                list5.textContent = "0732353535";
                list_numbers.appendChild(list5);
                list_numbers.appendChild(list6);
                msg_div.appendChild(hotline);
                msg_div.appendChild(list_numbers);

            }
            msg_div.appendChild(msg_conc);

        }
        else if (!none_symptoms){
            msg_title.textContent= "You may be having a medical emergency";
            msg_body.textContent = "Please contact medical response team using the hotline numbers below";
            steps.textContent = "Tell the operator if you have been in contact with someone with" +
                " COVID-19 or if you have recently been to an area where COVID-19 is spreading.";
            msg_conc.textContent = "Below is a list of hotline numbers you can use to reach coronavirus response" +
                " team";
            list1.textContent = "0729471414";
            list2.textContent = "0732353535";
            list_out.appendChild(list1);
            list_out.appendChild(list2);
            msg_div.appendChild(msg_title);
            msg_div.appendChild(msg_body);
            msg_div.appendChild(steps);
            msg_div.appendChild(msg_conc);
            msg_div.appendChild(list_out);

        }
        $("#responseMessage").text(msg);
  });

  $('#cancel_btn').on( 'click', function() {
      scrollDistance = 0;
      let purpledCards = document.getElementsByClassName("purpled");
      for(var i=0; i < purpledCards.length; i++){
          purpledCards[i].classList.remove("purple-gradient");
      }
      let raddioElements = document.getElementsByClassName("raddio");
      for(var i=0; i < raddioElements.length; i++){
          var elem = raddioElements.item(i);
          elem.disabled = false;
          elem.checked = false;

      }
      let hide_later_elements = document.getElementsByClassName("hide-later");
      for(var i=0; i < hide_later_elements.length; i++){
          var elem = hide_later_elements.item(i);
          elem.style.display = 'none';
      }
      document.getElementById("selectCountyOption").selectedIndex =0;
      document.getElementById("selectAgeOption").selectedIndex =0;

  //    reset selected cards colors
      unselectCards();
      unselectCards();

  });


  //log in manenoz
    $('#navbarDropdownMenuLink').on( 'click', function() {
    let curr = document.getElementById("navbarDropdownMenuLink").textContent.trim();
    $('#logSign_modal').modal('show');
    if (curr == "Login/Sign Up") {
        $('#logSign_modal').modal('show');
      // const Http = new XMLHttpRequest();
      // let Url = "http://localhost:8080/login"
      // Http.open("Get", Url);
      // Http.send()
      // Http.onreadystatechange = function () {
      //   if (this.readyState == 4 && this.status == 200) {
      //     if(Http.responseText == "not_in"){
      //       $('#modalLRForm').modal('show');
      //       //alert("display modal");
      //     }
      //     //logOptions("");
      //   }
      // }
    }else{
       // document.getElementById("logout_div").display = "block";
        document.getElementById("navbarDropdownMenuLink").classList.a

    }
  });

    $(document).on('click', '#nav_logout, #sideLogout, #navLogout', function(event) {
    let id = this.id;
    const Http = new XMLHttpRequest();
    let Url = urlpat + "logout"
    Http.open("Get", Url);
    Http.send()
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if(id == "navLogout"){
                logOptionsMob("")

            }else{
               logOptions("", "", "", "");
            }
            //document.getElementById("toaloc" + toaloc).style.display ="block";
            //document.getElementById("village" + toaloc).style.display ="none";
            //document.getElementById("state" + toaloc).style.display ="none";


        }
    }
  });

    $('#submitLogInForm').on( 'click', function() {
        let username = document.getElementById("form22").value;
        let user_error = verify_username(username);
        if(user_error != ""){
            let rrer = document.getElementById("error_message");
            rrer.textContent = user_error;
            rrer.style.display="block";
            return;
        }
        let pass1 = document.getElementById("form23").value;
        let error_msg = verify_pass(pass1);
        if(error_msg != ""){
            let rrer = document.getElementById("error_message");
            rrer.textContent = error_msg
            rrer.style.display="block";
            return;
        }
        //$('#modalLRForm').modal('hide');

       // $('#logIn_form').modal('hide');
        //console.log($('#login_form').serialize());
        $.ajax({
         type: 'POST',
         url:  urlpat + "submit_info",
         data: $('#logIn_form').serialize(),
         success: function(response) {
             if(response == "not_exist"){
                 document.getElementById("error_message").style.display = "block";
                 document.getElementById("error_message").textContent = "*Check username and password";

             }else{
                 if(mobile){
                     logOptionsMob(response.username, response.village, response.state, response.country)
                 }else {
                     logOptions(response.username, response.village, response.state, response.country);
                 }
                 //create_post_field();
                 //$('#logSign_modal').find('textarea,input').val('');
                 $('#logSign_modal').modal('hide');
             }

         },
        error: function() {
             //$("#commentList").append($("#name").val() + "<br/>" + $("#body").val());
        }
        });
    });

    $('#signUpBtn').on( 'click', function() {
        let username = document.getElementById("form24").value;
        let user_error = verify_username(username);
        if(user_error != ""){
            let rrer = document.getElementById("error_signup");
            rrer.textContent = user_error;
            rrer.style.display="block";
            return;
        }
        let pass1 = document.getElementById("form25").value;
        let pass2 = document.getElementById("form26").value;
        if(pass1 != pass2){
            let rrer = document.getElementById("error_signup");
            rrer.textContent = "*Password don't match"
            rrer.style.display="block";
            return;
        }
        let error_msg = verify_pass(pass1);
        if(error_msg != ""){
            let rrer = document.getElementById("error_signup");
            rrer.textContent = error_msg;
            rrer.style.display="block";
            return;
        }
        registerUser(username, pass1);
        document.getElementById("signUp").style.display = "none";
        document.getElementById("signUpLoader").style.display = "block";
            // $.ajax({
        //  type: 'POST',
        //  url: urlpat + "register",
        //  data: $('#signUp_form').serialize(),
        //  success: function(response) {
        //         if(response == "username_taken"){
        //             document.getElementById("error_signup").textContent = "*username is not available";
        //         }else{
        //
        //             if(mobile){
        //                  logOptionsMob(response)
        //              }else {
        //                  logOptions(response);
        //              }
        //             create_post_field();
        //             //$('#logSign_modal').find('textarea,input').val('');
        //              $('#logSign_modal').modal('hide');
        //         }
        //
        //  },
        // error: function() {
        //      alert("error");
        //      //$("#commentList").append($("#name").val() + "<br/>" + $("#body").val());
        // }
        // });

    });

    $('#continueAuto').on( 'click', function() {
        let username = document.getElementById("form2").value;
        let error_user = verify_username(username);
        if(error_user != ""){
            let rrer = document.getElementById("error_continue");
            rrer.textContent = error_user;
            rrer.style.display="block";
            return;
        }
        let pass1 = document.getElementById("form3").value;
        let error_msg = verify_pass(pass1);
        if(error_msg != ""){
            let rrer = document.getElementById("error_continue");
            rrer.textContent = error_msg;
            rrer.style.display="block";
            return;
        }
        registerUser(username, pass1);
        document.getElementById("form22").value = username;
        document.getElementById("form23").value = pass1;
        document.getElementById("continueDiv").style.display = "none";

            // $.ajax({
        //  type: 'POST',
        //  url: urlpat + "register",
        //  data: $('#signUp_form').serialize(),
        //  success: function(response) {
        //         if(response == "username_taken"){
        //             document.getElementById("error_signup").textContent = "*username is not available";
        //         }else{
        //
        //             if(mobile){
        //                  logOptionsMob(response)
        //              }else {
        //                  logOptions(response);
        //              }
        //             create_post_field();
        //             //$('#logSign_modal').find('textarea,input').val('');
        //              $('#logSign_modal').modal('hide');
        //         }
        //
        //  },
        // error: function() {
        //      alert("error");
        //      //$("#commentList").append($("#name").val() + "<br/>" + $("#body").val());
        // }
        // });

    });

    //NEWS MANENOZ
    $('.replyNews').on( 'click', function() {
       let id = this.id.substr(9, this.id.length-9);
       let msg = document.getElementById("replyNewsText" + id).value;

    });

    //footer manenoz



});

function collect_comment_post(){
    show_div = "comments_div";
    add_news("commentPost", this.value);
    pages.push("corona_comments_div");
    navs.push("navBackButton");
    transitions_navs(0);
    transitions_pages(0);
    ficha("footerRegular", 0);
    ficha("footerComment", 1);
    tempid = this.id;

    if(pages[pages.length - 2]  == "notification_div"){
        this.style.backgroundColor = "#373737";
        update_notification_val(this.id)
    }
}


function update_notification_val(id){
    let url = urlpat + "update_notification_val/" + pata("username").textContent + "/" + id;
    console.log(url);
    const Http = new XMLHttpRequest();
    Http.open("Post", url);
    Http.send();
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let notifications = Http.responseText;
            let notification_icons = document.getElementsByClassName("notificationIcon");
            for(var i=0; i < notification_icons.length; i++){
                notification_icons[i].textContent = notifications;
                if(parseInt(notifications) > 0){
                    notification_icons[i].style.display = "";
                }else{
                    notification_icons[i].style.display = "none";
                }
            }
        }
    }

}

function collect_comments_news(){
    show_div = "comments_div";
    update_local_news("-1", newsFilter.toLowerCase(),0, this.value);
    pages.push("corona_comments_div");
    navs.push("navBackButton");
    transitions_navs(0);
    transitions_pages(0);
    ficha("footerRegular", 0);
    ficha("footerComment", 1);
    tempid = this.id;
    if(pages[pages.length - 1]  == "notification_div"){
        update_notification_val(this.id)
        this.style.backgroundColor = "#373737";

    }
}

function rec_open_to_bottom(){

    if(fetching_comments){
        setTimeout(rec_open_to_bottom, 500);
        return;
    }
    let url = urlpat + "filter_comment_parents/" + tempid2;
    const Http = new XMLHttpRequest();
    Http.open("Post", url);
    Http.send();
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const myObj = JSON.parse(Http.responseText);
            let parents = myObj.parents;
            for(var i=0; i < parents.length; i++){
               //update_news_table("0", parents[i] + "c");
                setTimeout(pata("replyPost" + parents[i] + "c").click(), 500);


            }
        }
    }
}

function construct_comments(index){
    inComment = true;
    let comments = document.createElement("div");
    comments.id = "news_div" + index;
    comments.style.marginLeft = "-1px";
    document.getElementById("comments_div").appendChild(comments);
    let pp = pata("parent_comment");
    pp.textContent = index;
    pp.className = "parent";
    document.getElementById("comments_div").style.width = "100%";
    document.getElementById("currIndexFooter").value = index;

    update_news_table("0", index, tempid);

}

function jenga(tag, darasa, text){
    let temp = document.createElement(tag);
    temp.className = darasa;
    if(text != "" && text != null){
        temp.textContent = text;
    }
    return temp
}

function fetch_notification(){
    let url = urlpat + "notification/" + pata("username").textContent;
    const Http = new XMLHttpRequest();
    Http.open("Post", url);
    Http.send();
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const myObj = JSON.parse(Http.responseText);
            let data = myObj.data;
            let notification_div = pata("notification_contents");
            notification_div.textContent = "";
            for(var i=0; i < data.length; i++){
                let div_outer = jenga("div", "mb-1 py-2 px-3 border-bottom border-light");
                div_outer.id = data[i].id;
                if(data[i].red == "0"){
                    div_outer.style.backgroundColor = "#262626";
                }
                let type = "post";
                if(data[i].type == "1"){
                    type = "comment";
                }
                let head = data[i].source + " replied to your " + type;
                let title = jenga("p", "m-0", head);
                div_outer.appendChild(title);
                let div_inline = jenga("div", "text-muted");
                let author = jenga("small", "m-0 d-inline", type  + " | ");
                let time = jenga("small", "m-0 d-inline", data[i].time + " ago  | ");
                div_inline.appendChild(author);
                div_inline.appendChild(time);
                div_outer.appendChild(div_inline);
                let myComment = jenga("small", "m-0", data[i].comment);
                div_outer.appendChild(myComment);

                if(data[i].pid == "0"){
                    div_outer.value = data[i].nid;
                    div_outer.onclick = collect_comments_news;
                }else {
                   div_outer.value = data[i].pid;
                   div_outer.onclick = collect_comment_post;
                }
                notification_div.appendChild(div_outer);


            }


        }
    }
}

function fetchUserInfo(){
    show_div = "profile_posts";
    add_news("profile");

    let url = urlpat + "filter_username_comments/" + pata("username").textContent;
    const Http = new XMLHttpRequest();
    Http.open("Post", url);
    Http.send();
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const myObj = JSON.parse(Http.responseText);
            let comments = myObj.comments;
            let titles = myObj.titles;
            let source = myObj.source;
            let times = myObj.times;
            let posts_all = pata("profile_post_comments");
            let news_all = pata("profile_news_comments");
            posts_all.textContent = "";
            news_all.textContent = "";
            for(var i=0; i < comments.length; i++){
                let div_outer = jenga("div", "mb-1 py-2 px-3 border-bottom border-light");
                div_outer.id = comments[i].id;
                let title = jenga("p", "m-0", titles[i]);
                div_outer.appendChild(title);
                let div_inline = jenga("div", "text-muted");
                let author = jenga("small", "m-0 d-inline", source[i] + " | ");
                let time = jenga("small", "m-0 d-inline", times[i] + " | ");
                div_inline.appendChild(author);
                div_inline.appendChild(time);
                div_outer.appendChild(div_inline);
                let myComment = jenga("small", "m-0", comments[i].text);
                div_outer.appendChild(myComment);
                if(comments[i].post_id == "0" ){
                    div_outer.value = comments[i].news_id;
                    div_outer.onclick = collect_comments_news;
                    news_all.appendChild(div_outer);
                }else{
                    div_outer.value = comments[i].post_id;
                    div_outer.onclick = collect_comment_post;
                    posts_all.appendChild(div_outer);
                }




            }

            pata("profile_postsNum").textContent = myObj.numPosts;
            pata("profile_votesNum").textContent = myObj.numVotes;
        }
    }
}

function append_community_table(name, admin){
    let row = document.createElement("tr");
    row.id = name;
    row.onclick = show_community_posts;
    let col = document.createElement("td");
    col.id = "col" + name;
    col.textContent = name;
    col.style = "border: 1px solid #FFFAFFA"
    let col1 = document.createElement("td");
    col1.textContent = admin;
    col1.style = "border: 1px solid #FFFAFFA"

    row.append(col);
    row.append(col1);
    pata("communityTableBody").prepend(row);
}

function show_community_posts(){
    reportLocation += " " + this.id;
    show_div = "community_posts";
    pata("parent_comment").value = "community_div";

    add_news("-2");
    ficha("allCommunityDiv", 0);
    ficha("community_posts", 1);
    pata("navCommunityName").textContent = this.id;
    navs.push("navCommunity");
    transitions_navs(0);
    //hide_all_navbars("navCommunity");
    //pata("navOtherTitle").textContent = this.id;

    //ficha("navReply_i", 0);
    //pata("navReplyHead").textContent = this.id;
    //pata("currloc").textContent = this.id;
    //ficha("navReplyPost", 0);
}

function populate_communities() {
    let url = urlpat + "communities/" + reportLocation;
    const Http = new XMLHttpRequest();
    Http.open("Post", url);
    Http.send();
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const myObj = JSON.parse(Http.responseText);
            let coms = myObj.communist;
            let admins = myObj.admins;
            pata("communityTableBody").textContent = "";
            for (var i=0; i < coms.length; i++){
                append_community_table(coms[i], admins[i]);
            }
        }
    }
}

function show_create_community(){
    let user = document.getElementById("username").textContent;
    if (user == '' || user == null){
        //document.getElementById("activity").textContent = "You need to Log in before you can continue to vote";
        $('#logSign_modal').modal('show');
        return;
    }
    ficha("allCommunityDiv", 0);
    ficha("createCommunityDiv", 1);
    let create_btn = pata("navReplyPost");
    create_btn.textContent = "send";
    create_btn.removeAttribute("onclick");
    create_btn.onclick = create_community;
}

function create_community(){
    let admin = pata("username").textContent;
    let name = pata("communityName").value;
    let about = pata("communityInput").value;

    let url = urlpat + "create_community?admin=" + admin + "&about=" + about + "&name=" + name + "&location=" + reportLocation;
    const Http = new XMLHttpRequest();
    Http.open("Post", url);
    Http.send();
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let state = Http.responseText;
            if(state == "taken"){
                pata("createCommunityMessage").textContent = "name is take try another name";
            }else{
                const myObj = JSON.parse(Http.responseText);
               append_community_table(myObj.name, myObj.admin);
               ficha("allCommunityDiv",1);
               ficha("createCommunityDiv", 0);

            }

        }
    }
}

function checkHideSide(){
    let menu = pata("navmenu");
    if(menu.classList.contains("change")){
        document.getElementById("sidebar").style.width = "0px";
        menu.classList.toggle("change");
    }
    pata("overContents").style.zIndex = "-1";

}

function hideSideNav(){
    if(mobile) {
        checkHideSide();
        if(document.getElementById('collapseTwo2').style.display == "block") {
            $('#collapseTwo2').slideToggle('slow');
        }

    }
    if(byPassSideNav){
        $('#dropDownLoc').hide();

    }else{
        byPassSideNav = true;
    }
}

function show_locations(){
   $('#collapseTwo2').slideToggle('slow');
   if(document.getElementById("dropDownLoc").style.display == "none"){
       $('#dropDownLoc').show();
   }else{
       $('#dropDownLoc').hide();
   }
}

function filter_by_location(id){
    let tempLocation = document.getElementById(id).textContent;
    if(tempLocation == "select county"){show_countyModal('0'); return}
    if(tempLocation == "select sub-county"){show_countyModal('1'); return}


    setLocationsWhite();
    document.getElementById(id).parentElement.style.backgroundColor = "mediumpurple";
    if(user != "") {
        Url = urlpat + "update_subcounty?county=" + document.getElementById("countyId" + toaloc).textContent + "&sub=" + document.getElementById("subCountyId" + toaloc).textContent;
        const Http = new XMLHttpRequest();
        Http.open("Post", Url);
        Http.send();
    }
    if(pages[pages.length-1] == "community_div"){
        reportLocation = document.getElementById(id).textContent;
        pata("navReplyHead").textContent = reportLocation + " Chat Rooms";
        populate_communities();
    }else {
        add_news(id);
    }
    $('#collapseTwo2').slideToggle('slow');
    $('#dropDownLoc').hide();
    document.getElementById("currloc" + toaloc).textContent = document.getElementById(id).textContent;
}

function setLocationsWhite(){
    document.getElementById("nationId" + toaloc).parentElement.style.backgroundColor = "#262626";
    document.getElementById("countyId" + toaloc).parentElement.style.backgroundColor = "#262626";
    document.getElementById("subCountyId" + toaloc).parentElement.style.backgroundColor = "#262626";

}

function verify_username(name){
    if(name.length ==0 ){
            return "*Enter username";
        }
        if(name.length > 20){
            return "*Username is too long";
        }
        var letters = name.replace(/_/g, "");
        if(!letters.match("^[A-Za-z0-9]+$")) {
            return "*Username should only contain numbers and letters and _";
        }

        return "";
}

function verify_pass(pass1){
        if(pass1.lenght == 0){
            return "*Enter password";
        }
        if(pass1.length < 4){
            return "*Password is too short";;
        }
        if(pass1.length > 12){
            return "*Password is too long";
        }
        if(!pass1.match("^[A-Za-z0-9]+$")) {
            return "*Password should only contain numbers and letters";
        }

        return "";
}

function getAddress(){
    let currhref = window.location.href;
    if(currhref.includes("http://")){
        document.getElementById("toalocbtn"+toaloc).style.display = "block";
        document.getElementById("toalocloader"+toaloc).style.display = "none";
        $('#change_url').modal('show');
        return;
    }
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }else{
        alert("geolocation not supported for you device");
        document.getElementById("toalocbtn"+toaloc).style.display = "block";
        document.getElementById("toalocloader"+toaloc).style.display = "none";

    }
}

function geoError(){
    alert("An error occured while getting you location. Allow location on your device and try again.");
    document.getElementById("toalocbtn"+toaloc).style.display = "block";
    document.getElementById("toalocloader"+toaloc).style.display = "none";
}

function geoSuccess(position){
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var Url = "https://us1.locationiq.org/v1/reverse.php?&key=ad1a9deb205343&lat="+lat + "&lon="+ lng + "&format=json"
    const Http = new XMLHttpRequest();
     Http.open("Get", Url);
     Http.send();

     Http.onreadystatechange=function() {
         if (this.readyState == 4 && this.status == 200) {
             var myArr = JSON.parse(this.responseText);
             let village = myArr.address.village;
             let suburb = myArr.address.suburb;
             if (village == "" || village == null) village = suburb;
             let state = myArr.address.state;
             let country = myArr.address.country;
             document.getElementById("village"+toaloc).textContent = village;
             document.getElementById("state"+toaloc).textContent = state;
             document.getElementById("village"+toaloc).style.display = "block";
             document.getElementById("state"+toaloc).style.display = "block";
             document.getElementById("toaloc"+toaloc).style.display = "none";
             document.getElementById("country").textContent = country;
             hasloc = true;

             let pass1 = document.getElementById("form25").value;
             let username = document.getElementById("username").textContent;
             if (username != "") {
                 let url = urlpat + "update_info?username=" + username +  "&village=" + village + "&state=" + state + "&country=" + country;
                 const Http2 = new XMLHttpRequest();
                 Http2.open("Get", url);
                 Http2.send();

                 Http2.onreadystatechange = function () {
                     if (this.readyState == 4 && this.status == 200) {
                         if(this.responseText == "username_noexisto"){
                             document.getElementById("error_signup").textContent = "*Username is not available";
                             document.getElementById("signUp").style.display = "block";
                             document.getElementById("signUpLoader").style.display = "none";
                             return;
                         }
                         var myArr = JSON.parse(this.responseText);
                         if (mobile) {
                             logOptionsMob(myArr.username, myArr.village, myArr.state, myArr.country)
                         } else {
                             logOptions(myArr.username, myArr.village, myArr.state, myArr.country);
                         }
                         document.getElementById("village"+toaloc).textContent = village;
                         document.getElementById("state"+toaloc).textContent = state;
                         document.getElementById("village"+toaloc).style.display = "block";
                         document.getElementById("state"+toaloc).style.display = "block";
                         document.getElementById("toaloc"+toaloc).style.display = "none";
                         document.getElementById("country").textContent = country;

                         $('#logSign_modal').modal('hide');
                         document.getElementById("signUp").style.display = "block";
                         document.getElementById("signUpLoader").style.display = "none";

                     }
                 }

             }
         }
     }

}

function start_timer(){
    let curr_timer = setInterval(function(){
    check_notifications();
    update_local_news("0", newsFilter.toLowerCase(),0);
    if(inComment){
        let index = document.getElementById("parent_comment").textContent;
        let sel = "0";
         if(pata("firstNews" + index) != null){
             sel = pata("firstNews" + index).textContent;
         }
         update_news_table(sel, index);
    }else {
        add_news("-1");
    }
    }, 20000);
return curr_timer;
}

function check_notifications(){

    let Url = urlpat + "check_notifications/" + pata("username").textContent;
    const Http = new XMLHttpRequest();
    Http.open("Post", Url);
    Http.send();
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let notifications = Http.responseText;
            let notification_icons = document.getElementsByClassName("notificationIcon");
            for(var i=0; i < notification_icons.length; i++){
                notification_icons[i].textContent = notifications;
                if(notifications.trim() != "0"){
                    notification_icons[i].style.display = "";
                }
            }
        }
    }
}

function show_countyModal(type){

    if(type == '0'){
       document.getElementById('county_table').style.display = 'block';
       document.getElementById('subCounty_table').style.display = 'none';
       document.getElementById("subCountyId" + toaloc).parentElement.style.backgroundColor = "#262626";

    }else{
        document.getElementById('county_table').style.display = 'none';
        document.getElementById('subCounty_table').style.display = 'block';

    }
    $('#county_modal').modal('show');
}

function selectCounty(county, code){
    hasloc = true;
    Url = urlpat + "collect_subcounty?county=" + county;
    const Http = new XMLHttpRequest();
    Http.open("Post", Url);
    Http.send();
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
                const myObj = JSON.parse(Http.responseText);
                subcounties = myObj.subcounties;
                //document.getElementById("countyModalBody").style.display = 'none';
                let tbody = document.getElementById("subCountyModalBody")
                tbody.textContent = "";
                for (var i=0; i < subcounties.length; i++){
                    let tr = document.createElement("tr");
                    tr.id = subcounties[i];
                    tr.onclick = show_subCounty;
                    tr.appendChild(create_td(i+1));
                    tr.appendChild(create_td(subcounties[i]));
                    tbody.appendChild(tr);
                }
                // $("table tr.countyModal").each(function(){
                //     var self=$(this);
                //     self.hide();
                // });
                if(document.getElementById("countyId" + toaloc).textContent != county) {
                    document.getElementById("countyId" + toaloc).textContent = county;
                    document.getElementById("countyId" + toaloc).parentElement.style.backgroundColor = "#262626";
                }
                document.getElementById("subCountyId" + toaloc).textContent = "select sub-county";
                if(toaloc == "1"){
                    document.getElementById("dropDownLoc").style.display = 'block';
                }
                $('#county_modal').modal('hide');
        }
    }


}

function show_subCounty(){
    if(document.getElementById("subCountyId" + toaloc).textContent != this.id) {
        document.getElementById("subCountyId" + toaloc).textContent = this.id;
        document.getElementById("subCountyId" + toaloc).parentElement.style.backgroundColor = "#262626";
    }
    $('#county_modal').modal('hide');
    if(toaloc == "1"){
        document.getElementById("dropDownLoc").style.display = 'block';
    }
}

function create_td(text){
    let td = document.createElement("td");
    td.textContent = text;
    return td;
}

function add_news(act, postId){
    if(fetching_posts) return;
    else{fetching_posts = true;}
    let Url = "";
    if(act=="0") {
        let user = document.getElementById("username").textContent;
        if (user == "") return
        let title = document.getElementById("userInput").value;
        title = title.replace(/\r?\n/g, '<br />');
        if (title == "") return;
        Url = urlpat + "submit_report?user=" + user + "&title=" + title + "&loc=" + reportLocation;
    }
    else if(act == "-1"){
        let firstpost = document.getElementById("firstpost");
        if(firstpost == null) {return;}
        Url = urlpat + "filter_county/" + reportLocation + "/" + firstpost.value;
    }
    else if(act == "profile"){
        Url = urlpat + "filter_username/" + pata("username").textContent
        document.getElementById(show_div).textContent = "";
    }
    else if(act == "commentPost"){
        Url = urlpat + "filter_comment_post/" + postId;
        document.getElementById(show_div).textContent = "";
    }
    else {
        if(show_div == "news_div"){reportLocation = document.getElementById(act).textContent;}
        Url = urlpat + "filter_county/"+ reportLocation + "/" + "0";
        document.getElementById(show_div).textContent = "";
    }
    const Http = new XMLHttpRequest();
    Http.open("Post", Url);
    Http.send();
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let pids = [];
            let authors =[];
            let votesNUm = [];
            let repliesNum = [];
            let titles = [];
            let times = []
            if(act == "0") {
                var id = Http.responseText;
                if(id == 'no_existo') {
                    $('#removed_user').modal('show');
                    return;
                }
                pids.push(id);
                authors.push(document.getElementById("username").textContent);
                titles.push(document.getElementById("userInput").value.replace(/\r?\n/g, ' <br /> '));
                votesNUm.push("0");
                repliesNum.push("0");
                times.push("1min");
                $("#"+"userInput").val("");
                document.getElementById("userInput").setAttribute("row", "100");
                //autoResize_prev(postTopic);

            }
            else{
                const myObj = JSON.parse(Http.responseText);
                authors = myObj.authors;
                repliesNum = myObj.replies;
                titles = myObj.titles;
                pids = myObj.pids;
                votesNUm = myObj.polls;
                times = myObj.times;
            }

            if(pids.length > 0){
                document.getElementById("firstpost").value = pids[0];
                if(act == "-1"){
                    new_items_posts();
                }
            }

            for(var i=0; i < pids.length; i++) {
                let id = pids[i];
                if(act == "commentPost") id += "c";
                let card = document.createElement("div");
                card.className = "card";
                card.style.backgroundColor = "#373737";
                card.style.color = "#FFFAFA";
                let card_header = document.createElement("div");
                card_header.className = "card-header px-2 pb-1";
                let row = document.createElement("div");
                row.className = "d-flex flex-row";
                let user_img_div = document.createElement("div");
                user_img_div.style.marginTop = "10px";
                user_img_div.className = "mr-3";
                let user_img_badge = document.createElement("span");
                user_img_badge.id = "badge_0_" + id;
                user_img_badge.className = "badge badge-pill";
                user_img_badge.style.backgroundColor = "mediumpurple";
                user_img_badge.textContent = authors[i].substr(0, 1).toUpperCase();
                user_img_div.appendChild(user_img_badge);
                row.appendChild(user_img_div);
                let content_div = document.createElement("div");
                content_div.className = "flex-grow-1 mt-1";
                let header_div = document.createElement("div");
                header_div.id = "userTime_0_" + id;
                header_div.className = "d-flex  mr-5";
                header_div.style.marginTop = "5px";
                let author = document.createElement('strong');
                author.textContent = authors[i];
                author.style.fontSize = "12px";
                author.style.color = "#a6a6a6";
                author.className = "d-inline";
                author.id="author_0_" + id;
                header_div.appendChild(author);
                let hour_p = document.createElement("p");
                hour_p.id = "time_0_" + id;
                hour_p.className = "mb-2 ml-4 p-time";
                hour_p.style.fontSize = "12px";
                hour_p.style.color = "#a6a6a6";
                hour_p.textContent = times[i];
                header_div.appendChild(hour_p);
                content_div.appendChild(header_div);
                var p_title = document.createElement('p');
                p_title.id="titleHapa_0_" + id;
                p_title.onclick = reply_post;
                p_title.className = "mb-3";
                p_title = create_p_title(p_title, titles[i]);
                content_div.appendChild(p_title);

                let arrows_div = document.createElement("div");
                arrows_div.className = "d-flex align-items-center";
                let up1 = document.createElement("img");
                up1.id = "arrowUp_0_" + id;
                up1.value = "0";
                up1.onclick = vote_post;
                up1.setAttribute("src", "../static/icons/svg/arrow_up_outline_dark.svg");
                up1.setAttribute("height", "17px");
                up1.style.display = "none";
                arrows_div.appendChild(up1);
                let up2 = document.createElement("img");
                up2.id = "arrowUP_0_" + id;
                up2.value = "0";
                up2.onclick = vote_post;
                up2.setAttribute("src", "../static/icons/svg/arrow_up_outline.svg");
                up2.setAttribute("height", "17px");
                arrows_div.appendChild(up2);
                let votes = document.createElement('p');
                votes.id = "votes_0_" + id;
                votes.className = "mb-0 mx-3 ";
                votes.textContent = votesNUm[i];
                votes.style.fontSize = "14px";
                votes.style.color = "mediumpurple";
                arrows_div.appendChild(votes);
                let up3 = document.createElement("img");
                up3.id = "voteDown_0_" + id;
                up3.onclick = vote_post;
                up3.setAttribute("src", "../static/icons/svg/arrow_down_outline_dark_0.svg");
                up3.setAttribute("height", "17px");
                up3.style.display = "none";
                up3.value = "1";
                arrows_div.appendChild(up3);
                let up4 = document.createElement("img");
                up4.id = "voteDowN_0_" + id;
                up4.value = "1";
                up4.onclick = vote_post;
                up4.setAttribute("src", "../static/icons/svg/arrow_down_outline.svg");
                up4.setAttribute("height", "17px");
                arrows_div.appendChild(up4);


                let news_id = document.createElement("input");
                news_id.style.display = "none";
                news_id.id = "newsId_0_" + id;
                news_id.value = '0';

                let post_id = document.createElement("input");
                post_id.style.display = "none";
                post_id.id = "postId_0_" + id;
                post_id.value = pids[i];;

                let my_id = document.createElement("input");
                my_id.style.display = "none";
                my_id.id = "myId_0_" + id;
                my_id.value = '0';

                let parent_index = document.createElement("input");
                parent_index.style.display = "none";
                parent_index.id = "parent_0_" + id;
                parent_index.value = show_div;

                let displayed = document.createElement("input");
                displayed.style.display = "none";
                displayed.id = "displayed_0_" + id;
                displayed.value = "0";

                let vote_div = document.createElement('div');
                vote_div.className = "d-flex justify-content-around py-1";
                vote_div.style = " background-color: #333333; border: 1px solid #262626";
                let comment_a = document.createElement("a");
                comment_a.id= "replyNumC_0_" + id;
                comment_a.onclick = reply_post;
                comment_a.className = "d-flex align-items-center";
                let comment_img = document.createElement("img");
                comment_img.setAttribute("src","../static/icons/svg/chats.svg" )
                comment_img.setAttribute("height", "17px");
                comment_a.appendChild(comment_img);
                let comment_box = document.createElement('p');
                comment_box.className = "mb-0 ml-2";
                comment_box.id = "replyNumX_0_" + id;
                comment_box.style = "font-size: 14px; color: mediumpurple";
                comment_box.textContent = "  "+ repliesNum[i];
                comment_a.appendChild(comment_box);
                vote_div.appendChild(arrows_div);
                vote_div.appendChild(comment_a);
                let reply_a = document.createElement("a");
                reply_a.className = "d-flex align-items-center";
                reply_a.id = "replyPost_0_" + id;
                reply_a.onclick = reply_comment_prep;
                let reply_img = document.createElement("img");
                reply_img.setAttribute("src", "../static/icons/svg/reply.svg");
                reply_img.setAttribute("height", "17px");
                reply_img.id = "replyButton_0_" + id;
                reply_a.appendChild(reply_img);

                vote_div.appendChild(reply_a);
                card_header.appendChild(vote_div);
                content_div.appendChild(my_id);
                content_div.appendChild(displayed);
                content_div.appendChild(post_id);
                content_div.appendChild(news_id);
                content_div.appendChild(parent_index);
                row.appendChild(content_div);
                card_header.appendChild(row);
                let collapse_div = document.createElement("div");
                collapse_div.style.marginLeft = "12%";
                collapse_div.style.marginRight = "8%";
                collapse_div.role = "tabpanel";
                collapse_div.id = "collapse_0_" + id;
                collapse_div.className = "collapse  mt-0 mb-0";
                let card_body_reply = document.createElement("div");
                card_body_reply.id = "replyBody_0_" + id;
                let form1 = document.createElement("div");
                let form11 = document.createElement("div");
                form11.className = "form-group";
                let textarea = document.createElement("textarea");
                textarea.className = "form-control";
                textarea.id = "txt_0_" + id;
                textarea.rows = "2";
                textarea.style.resize = "none";
                textarea.style.overflow = "hidden";
                textarea.style.fontSize = "13px";
                textarea.addEventListener('input', autoResize, false);
                form11.appendChild(textarea);
                let replybtn_a = document.createElement("a");
                replybtn_a.className = "collapsed";
                replybtn_a.style.marginRight = "10px";
                replybtn_a.setAttribute("data-toggle", "collapse");
                replybtn_a.setAttribute("data-target", "#collapse_0_" + id);
                let form1_btn = document.createElement("button");
                form1_btn.className = "btn btn-primary btn-sm";
                form1_btn.id = "replySubmitBtn_0_" + id;
                form1_btn.textContent = "send";
                form1_btn.onclick = submit_comment;
                let form1_btn_div = document.createElement("div");
                replybtn_a.appendChild(form1_btn);
                form1_btn_div.appendChild(replybtn_a);
                form1.appendChild(form11);
                form1.appendChild(form1_btn_div);
                card_body_reply.appendChild(form1);
                collapse_div.appendChild(card_body_reply);
                let collapse_div2 = document.createElement("div");
                collapse_div2.style.marginLeft = "4%";
                collapse_div2.role = "tabpanel";
                collapse_div2.id = "collapse2_0_" + id;
                collapse_div2.className = "card-header collapse mt-0 mb-0 pt-0";
                let card_body_comments = document.createElement("div");
                let comments_area = document.createElement("div");
                comments_area.style.marginTop = "10px";
                card_body_comments.appendChild(comments_area);
                collapse_div2.appendChild(card_body_comments);
                card.appendChild(card_header);
                card.appendChild(vote_div);
                card.appendChild(collapse_div);
                card.appendChild(collapse_div2);
                let accordian_div = document.createElement("div");
                accordian_div.className = "accordion md-accordion mb-0 mt-0";
                accordian_div.style.opacity = "0.96";
                accordian_div.role = "tablist";
                accordian_div.id = "accord_0_" + id;
                accordian_div.setAttribute("aria-multiselectable", "true");
                accordian_div.appendChild(card);
                if(act == "-1" || act== "0") {
                    document.getElementById(show_div).prepend(accordian_div);
                }else{
                    document.getElementById(show_div).appendChild(accordian_div);

                }
            }

            if(act == "-1"){
                let replies_num = JSON.parse(Http.responseText).replies_num;
                for (var i=0; i < replies_num.length; i++){
                    let comm_id = replies_num[i].id;
                    let comm_num = replies_num[i].num;
                    let comment_i = document.getElementById("replyNumX_0_" + comm_id);
                    if (comment_i != null) {
                        comment_i.textContent = "  " + comm_num;
                    }
                }

                let votes_num = JSON.parse(Http.responseText).votes_num;
                for (var i=0; i < votes_num.length; i++){
                    let vote_id = votes_num[i].id;
                    let vote_num = votes_num[i].num;
                    let vote_p = pata("votes_0_" + vote_id);
                    if(vote_p != null){
                        vote_p.textContent = "  " + vote_num;
                    }
                }

            }

            if(act == "commentPost"){
                construct_comments("_0_" + pids[0] + "c");
            }
            fetching_posts = false;

        }
    }
}

function update_news_table(sel, index, commentId) {
        const Http = new XMLHttpRequest();
        let Url = urlpat + "filter_county/" + sel;
        if(index != ""){
            let n = document.getElementById("newsId" + index);
            if(n == null) return;
            let nid = document.getElementById("newsId" + index).value;
            let pid = document.getElementById("postId" + index).value;
            let myId = document.getElementById("myId" + index).value;
            let user = document.getElementById("username").textContent;
            if(commentId == null || commentId == ""){
                commentId = "0";
            }
            Url = urlpat + "collect_comments?pid=" + pid + "&nid=" + nid+  "&mid=" + myId + "&user=" + user + "&lid=" + sel + "&cid=" + commentId;
        }
        console.log(Url);
        Http.open("Get", Url);
        Http.send();
        Http.onreadystatechange=function(){
                if(this.readyState == 4 && this.status == 200){
                    let s = Http.responseText;
                    s = s.replace(/\\n/g, "\\n")
                   .replace(/\\'/g, "\\'")
                   .replace(/\\"/g, '\\"')
                   .replace(/\\&/g, "\\&")
                   .replace(/\\r/g, "\\r")
                   .replace(/\\t/g, "\\t")
                   .replace(/\\b/g, "\\b")
                   .replace(/\\f/g, "\\f");
                // remove non-printable and other non-valid JSON chars
                s = s.replace(/[\u0000-\u0019]+/g,"");
                const myObj = JSON.parse(s);
                var comments = [];
                comments = myObj.comments;
                var authors = [];
                authors = myObj.authors;
                var replies = [];
                replies = myObj.replies;
                var titles = [];
                if(index == ""){titles = myObj.titles;}

                var mids = [];
                mids = myObj.mids;
                var pids = myObj.pids;
                var nids = myObj.nids;
                var polls = [];
                polls = myObj.polls;
                var times = myObj.times;
                var levels = myObj.levels;
                const news_div = document.getElementById("news_div" + index);

                if(sel == "0"){
                    news_div.textContent = "";
                }
                let firstNews = document.getElementById("firstNews" + index);

                if(firstNews == null) {
                    firstNews = document.createElement("span");
                    firstNews.style.display = "none";
                    firstNews.id = "firstNews" + index;
                    firstNews.textContent = "0";
                    news_div.append(firstNews);
                }

                if(sel != "0"){
                    let replies_num = JSON.parse(Http.responseText).replies_num;
                    for (var i=0; i < replies_num.length; i++){
                        let comm_id = replies_num[i].id;
                        let comm_num = replies_num[i].num;
                        let comment_i = document.getElementById("replyNumC" + comm_id + "c");
                        if (comment_i != null) {
                            comment_i.textContent = "  " + comm_num;
                        }
                    }

                    let votes_num = JSON.parse(Http.responseText).votes_num;
                    for (var i=0; i < votes_num.length; i++){
                        let vote_id = votes_num[i].id;
                        let vote_num = votes_num[i].num;
                        let vote_p = pata("votes" + vote_id + "c");
                        if(vote_p != null){
                            vote_p.textContent = "  " + vote_num;
                        }
                    }
                }

                if(mids.length > 0){
                    firstNews.textContent = mids[mids.length-1];
                    let replyNumN = document.getElementById("replyNumX" + index);
                    let updateOut = true;
                    if(replyNumN == null ){replyNumN = document.getElementById("replyNumC" + index); updateOut = false;}
                    let replies =  "";

                    let numReplies =  0;
                    for(var i=0; i < levels.length; i++){
                        if(levels[i] ==0){numReplies++;}
                    }
                    if(sel != "0"){
                        numReplies += (parseInt(replyNumN.textContent.substr(2, replyNumN.textContent.length - 2)));
                    }
                    replyNumN.textContent = "  " + numReplies;
                    if(inComment && updateOut){
                        let isNews = index.substr(1,1);
                        if(isNews == "n"){replies = "";}
                        document.getElementById("replyNumX" + index.substr(0, index.length-1)).textContent = "  " + numReplies;
                    }

                }

                else{return;}
                let collapse_div_holder = null;
                for(var i=0; i < nids.length; i++){
                    let id = mids[i];
                    let card = document.createElement("div");
                    card.className = "card borderLeftColor";
                    card.style.backgroundColor = "#373737";
                    card.style.color = "#FFFAFA"
                    let card_header = document.createElement("div");
                    card_header.role = "tab";
                    card_header.id = "title" + id + "c";
                    card_header.className = "ml-2"
                    if(index == ""){
                       card_header.className = "card-header px-2";

                    }

                    let row = document.createElement("div");
                    row.className = "d-flex flex-row";
                    let user_img_div = document.createElement("div");
                    user_img_div.style.marginTop = "10px";
                    //user_img_div.style.marginLeft = "5px";
                    user_img_div.className = "mr-3";
                    let user_img_badge = document.createElement("span");
                    user_img_badge.className = "badge badge-pill";
                    user_img_badge.style.backgroundColor = "mediumpurple";
                    user_img_badge.textContent = authors[i].substr(0,1).toUpperCase();
                    user_img_div.appendChild(user_img_badge);
                    row.appendChild(user_img_div);

                    let content_div = document.createElement("div");
                    content_div.className = "flex-grow-1 mt-1";

                    let header_div = document.createElement("div");
                    header_div.id = "userTime" + + id + "c";
                    header_div.className = "d-flex  mr-5";
                    header_div.style.marginTop = "5px";
                    header_div.style.marginBottom = "5px";
                    let author = document.createElement('strong');
                    author.id="author" + id + "c";
                    //let author_text = document.createElement("strong");
                    author.textContent = authors[i];
                    author.style.fontSize = "12px";
                    author.className = "d-inline";
                    author.style.color = "#a6a6a6";
                    let time = document.createElement("p");
                    time.id = "time" + id + "c";
                    time.className = "mb-2 ml-4 p-time";
                    time.style.color = "#a6a6a6";
                    time.style.fontSize = "12px";
                    time.textContent = times[i];
                    if (index ==""){
                        header_div.style.marginTop = "5px";
                        header_div.style.marginBottom = "5px";
                    }else{
                        author.style.fontWeight = "bold";
                        author.style.marginBottom = "0";
                    }
                    //author.appendChild(author_text);
                    header_div.appendChild(author);
                    header_div.appendChild(time);
                    let arrows_div = document.createElement("div");
                    arrows_div.className = "d-flex align-items-center";
                    let up1 = document.createElement("img");
                    up1.id = "arrowUp" + id + "c";
                    up1.onclick = vote_post;
                    up1.setAttribute("src", "../static/icons/svg/arrow_up_outline_dark.svg");
                    up1.setAttribute("height", "17px");
                    up1.style.display = "none";
                    arrows_div.appendChild(up1);
                    let up2 = document.createElement("img");
                    up2.id = "arrowUP" + id + "c";
                    up2.onclick = vote_post;
                    up2.setAttribute("src", "../static/icons/svg/arrow_up_outline.svg");
                    up2.setAttribute("height", "17px");
                    arrows_div.appendChild(up2);

                    // let arrow_up = document.createElement('i');
                    // arrow_up.className = "d-inline fas fa-arrow-up";
                    // arrow_up.style.marginRight = "5px";
                    // arrow_up.value = "0";
                    // arrow_up.id = "arrowUp" + id + "c";
                    //arrow_up.style.color = "green";
                    let votes = document.createElement('p');
                    votes.id = "votes" + id + "c";
                    votes.className = "mb-0 mx-3 mt-1 ";
                    votes.textContent = polls[i];
                    votes.style.fontSize = "14px";
                    votes.style.color = "mediumpurple";
                    arrows_div.appendChild(votes);
                    let up3 = document.createElement("img");
                    up3.id = "voteDown" + id + "c";
                    up3.onclick = vote_post;
                    up3.setAttribute("src", "../static/icons/svg/arrow_down_outline_dark_0.svg");
                    up3.setAttribute("height", "17px");
                    up3.style.display = "none";
                    arrows_div.appendChild(up3);
                    let up4 = document.createElement("img");
                    up4.id = "voteDowN" + id + "c";
                    up4.onclick = vote_post;
                    up4.setAttribute("src", "../static/icons/svg/arrow_down_outline.svg");
                    up4.setAttribute("height", "17px");
                    arrows_div.appendChild(up4);

                    content_div.appendChild(header_div);
                    if(index == "") {
                        var p_title = document.createElement('p');
                        p_title.id = "titleHapa" + id + "c";
                        p_title.className = "mb-3";
                        p_title.textContent = titles[i];
                    }
                    var p_body = document.createElement('p');
                    p_body.id= "titleHapa" + id + "c";
                    p_body = create_p_title(p_body, comments[i]);
                    if(index != ""){
                        p_body.style.marginBottom = "4px";
                    }
                    content_div.appendChild(p_body);
                    let news_id = document.createElement("input");
                    news_id.style.display = "none";
                    news_id.id = "newsId" + id + "c";
                    news_id.value = nids[i];

                    let post_id = document.createElement("input");
                    post_id.style.display = "none";
                    post_id.id = "postId" + id + "c";
                    post_id.value = pids[i];

                    let my_id = document.createElement("input");
                    my_id.style.display = "none";
                    my_id.id = "myId"  + id + "c";
                    my_id.value = mids[i];

                    let parent_index = document.createElement("input");
                    parent_index.style.display = "none";
                    parent_index.id = "parent"  + id + "c";
                    parent_index.value = index;

                    if(index != ""){
                        up1.value = "00";
                        up2.value = "00";
                        up3.value = "11";
                        up4.value = "11";
                    }
                    let displayed = document.createElement("input");
                    displayed.style.display = "none";
                    displayed.id = "displayed"  + id + "c";
                    displayed.value = "0";

                    let replyBoxOpen = document.createElement("input");
                    replyBoxOpen.style.display = "none";
                    replyBoxOpen.id = "replyBoxOpen" + id + "c";
                    replyBoxOpen.value = "0";
                    let vote_div = document.createElement('div');
                    vote_div.className = "d-flex justify-content-around py-1 ";
                    vote_div.style = " background-color: #333333; margin-left: 1px";

                    vote_div.appendChild(arrows_div);
                    if(index != ""){
                        vote_div.style.marginTop = "4px";
                    }
                    let comment_a = document.createElement("a");
                    comment_a.id = "replyPost" +  id + "c";
                    comment_a.onclick = reply_post_comment;
                    comment_a.className = "d-flex align-items-center";
                    comment_a.setAttribute("data-toggle", "collapse");
                    comment_a.setAttribute("data-target", "#collapse2"+ id + "c");
                    let comment_img = document.createElement("img");
                    comment_img.setAttribute("src","../static/icons/svg/chats.svg" )
                    comment_img.setAttribute("height", "17px");
                    comment_a.appendChild(comment_img);
                    let comment_box = document.createElement('p');
                    comment_box.id = "replyNumC" +  id + "c";
                    comment_box.className = "mb-0 ml-2";
                    comment_box.style = "font-size: 14px; color: mediumpurple";
                    comment_box.textContent = "  " + replies[i];
                    comment_box.style.fontSize = "13px";
                    comment_box.style.color = "mediumpurple";
                    comment_a.appendChild(comment_box);
                    vote_div.appendChild(comment_a);

                    let reply_a = document.createElement("a");
                    reply_a.id = "replyPost" + id + "c";
                    reply_a.className = "d-flex align-items-center";
                    reply_a.onclick = reply_comment_prep;
                    let reply_img = document.createElement("img");
                    reply_img.id = "replyButton" + id + "c";
                    reply_img.setAttribute("src", "../static/icons/svg/reply.svg");
                    reply_img.setAttribute("height", "17px");
                    reply_a.appendChild(reply_img);
                    vote_div.appendChild(reply_a);

                    //vote_div.style.marginBottom = "10px";
                    content_div.appendChild(my_id);
                    content_div.appendChild(displayed);
                    content_div.appendChild(replyBoxOpen);
                    content_div.appendChild(post_id);
                    content_div.appendChild(news_id);
                    content_div.appendChild(parent_index);
                    row.appendChild(content_div);
                    card_header.appendChild(row);
                    let collapse_div = document.createElement("div");
                    collapse_div.style.marginLeft = "12%";
                    collapse_div.style.marginRight = "8%";
                    collapse_div.role = "tabpanel";
                    collapse_div.id = "collapse" + id + "c";
                    collapse_div.className = "collapse  mt-0 mb-0";
                    let card_body_reply = document.createElement("div");
                    card_body_reply.id = "replyBody" + id + "c";
                    let form1 = document.createElement("div");
                    let form11 = document.createElement("div");
                    form11.className = "form-group";
                    let textarea = document.createElement("textarea");
                    textarea.className = "form-control";
                    textarea.id = "txt" + id + "c";
                    textarea.rows = "2";
                    textarea.style.resize = "none";
                    textarea.style.overflow = "hidden";
                    textarea.style.fontSize = "13px";
                    textarea.addEventListener('input', autoResize, false);
                    form11.appendChild(textarea);
                    let replybtn_a = document.createElement("a");
                    replybtn_a.className = "collapsed";
                    replybtn_a.style.marginRight = "15px";
                    replybtn_a.setAttribute("data-toggle", "collapse");
                    replybtn_a.setAttribute("data-target", "#collapse" + id + "c");
                    let form1_btn = document.createElement("button");
                    form1_btn.className = "btn btn-primary btn-sm";
                    form1_btn.id = "replySubmitBtn"+ id + "c";
                    form1_btn.textContent = "send";
                    form1_btn.onclick = submit_comment;
                    let form1_btn_div = document.createElement("div");
                    replybtn_a.appendChild(form1_btn);
                    form1_btn_div.appendChild(replybtn_a);
                    form1.appendChild(form11);
                    form1.appendChild(form1_btn_div);
                    card_body_reply.appendChild(form1);
                    collapse_div.appendChild(card_body_reply);
                    let collapse_div2 = document.createElement("div");
                    //collapse_div2.style.marginLeft = "1%";
                    collapse_div2.role = "tabpanel";
                    collapse_div2.id = "collapse2" + id + "c";
                    if(i + 1 < pids.length) {
                        if (levels[i] < levels[i + 1]) {
                            collapse_div2.className = "card-header collapse mt-0 mb-0 pt-0 pl-3 pr-0 show";
                        } else {
                            collapse_div2.className = "card-header collapse mt-0 mb-0 pt-0 pl-3 pr-0";
                        }
                    }
                    let card_body_comments = document.createElement("div");
                    let comments_area = document.createElement("div");
                    comments_area.id ="news_div" + id + "c";
                    comments_area.style.marginTop = "10px";
                    card_body_comments.appendChild(comments_area);
                    collapse_div2.appendChild(card_body_comments);
                    card.appendChild(card_header);
                    card.appendChild(vote_div)
                    card.appendChild(collapse_div);
                    card.appendChild(collapse_div2);

                    let accordian_div = document.createElement("div");
                    if(index == "") {
                        accordian_div.className = "accordion md-accordion mb-0 mt-0";
                    }else{
                        accordian_div.className = "accordion md-accordion mb-0 mt-0 borderLeftColor";
                    }
                    accordian_div.role = "tablist";
                    accordian_div.id = "accord" + id + "c";
                    accordian_div.setAttribute("aria-multiselectable","true");

                    accordian_div.appendChild(card);
                    if(i > 0){
                        if(levels[i] > levels[i-1]){
                            collapse_div_holder.appendChild(accordian_div);
                        }else{
                            news_div.appendChild(accordian_div);
                        }
                    }else{
                        news_div.appendChild(accordian_div);
                    }
                    collapse_div_holder = comments_area;
                }
                fetching_comments = false;

            }
        }
    }

function update_local_news(index, filter, dir, newsId){
    if (filter != newsFilter.toLowerCase()) {
            fetching = true;
        }
        else if(fetching){
            return;
        }
        else {
            fetching = true;
        }
        let fid = document.getElementById("firstnews").value;
        let lid = document.getElementById("lastnews").value;
        if(index == "0" || newsId != null){
            fid = "0";
            lid = "0";
        }
        if(newsId == null || newsId == ""){ newsId = "0";}
        let Url = urlpat + "collect_news?fid=" + fid + "&lid=" + lid + "&filter=" + filter + "&dir=" + dir +"&nid=" + newsId;
        const Http = new XMLHttpRequest();
        Http.open("Get", Url);
        Http.send();
        Http.onreadystatechange=function() {
            fetching = false;

            //alert(this.readyState + "    " + this.status);
            if (this.readyState == 4 && this.status == 200) {
                let s = Http.responseText;

                    s = s.replace(/\\n/g, "\\n")
                   .replace(/\\'/g, "\\'")
                   .replace(/\\"/g, '\\"')
                   .replace(/\\&/g, "\\&")
                   .replace(/\\r/g, "\\r")
                   .replace(/\\t/g, "\\t")
                   .replace(/\\b/g, "\\b")
                   .replace(/\\f/g, "\\f");
                // remove non-printable and other non-valid JSON chars
                s = s.replace(/[\u0000-\u0019]+/g,"");
                const myObj = JSON.parse(s);
                var comments = [];
                comments = myObj.comments;
                var authors = [];
                authors = myObj.authors;
                var replies = [];
                replies = myObj.replies;
                var titles = [];
                titles = myObj.titles;
                var mids = [];
                mids = myObj.mids;
                var pids = myObj.pids;
                var nids = myObj.nids;
                var likes = myObj.likes;
                var dislikes = myObj.dislikes;
                var news_links = myObj.news_links;
                var image_links = myObj.image_links;
                var dates = myObj.dates;
                let parent = document.getElementById("corona_news_div");
                if(newsId != null && newsId != "0"){
                    parent = document.getElementById(show_div);
                }
                let appended = false;
                if (filter != newsFilter.toLowerCase()){
                    news_filter = filter;
                    newsFilter = filter;
                    parent.textContent = "";
                }
                else if(index != "-1"){
                   //let prev_btn = document.getElementById("more_btn_div"+index);
                   //parent.removeChild(prev_btn);
                }
                if(index == "-1"){

                let replies_num = JSON.parse(Http.responseText).replies_num;
                    for (var i=0; i < replies_num.length; i++){
                        let comm_id = replies_num[i].id;
                        let comm_num = replies_num[i].num;
                        let comment_i = document.getElementById("replyNumX_n_0_" + comm_id);
                        if (comment_i != null) {
                            comment_i.textContent = "  " + comm_num ;
                        }
                    }
                    let votes_num = JSON.parse(Http.responseText).votes_num;
                    for (var i=0; i < votes_num.length; i++){
                        let like_id = votes_num[i].id;
                        let likes_num = votes_num[i].likes;
                        let dislikes_num = votes_num[i].dis;
                        let likes_icon = pata("likesNum_n_0_" + like_id);
                        if(likes_icon != null){
                            likes_icon.textContent = "  " + likes_num;
                            pata("dislikesNum_n_0_" + like_id).textContent = "  " + dislikes_num;
                        }
                    }

                }
                if(nids.length == 0) return;
                if(dir == "0" ){
                    if(index == "-1"){
                        new_items_news();
                    }
                    appended = true;
                    document.getElementById("firstnews").value = nids[0];
                }else if(dir == "1"){
                    document.getElementById("lastnews").value = nids[nids.length-1];
                }

                if(index == "0"){
                    appended = false;
                    document.getElementById("firstnews").value = nids[0];
                    document.getElementById("lastnews").value = nids[nids.length-1];

                }

                for(var i=0; i < nids.length; i++){
                    let id = nids[i];
                    if(newsId != null) {id += "c"}
                    let card = document.createElement("div");
                    card.className = "card";
                    card.style.backgroundColor = "#373737";
                    card.style.color = "#FFFAFA";
                    let card_header = document.createElement("div");
                    //card_header.style.backgroundColor = "white";
                    card_header.className = "card-header px-0 pb-0";
                    let hold_row = document.createElement("div");
                    hold_row.id = "holdinrow_n_0_" + id;
                    hold_row.className = "px-4";
                    hold_row.onclick = reply_post;
                    let img_row = document.createElement("div");
                    img_row.className = "row";
                    let img_div = document.createElement("div");
                    img_div.className = "col";
                    img_div.style.height = "180px";
                    img_div.style.backgroundImage = "url(" + image_links[i]+ ")";
                    img_div.style.backgroundSize = "cover";
                    let img_text_div = document.createElement("div");
                    img_text_div.className = "card rounded-0 ";
                    img_text_div.style = "position: absolute; bottom: -6px; left: -1px; background-color: #373737; border-color: #373737;"
                    //img_text_div.style = "position: absolute;bottom: 0;background-color: #f2f2f2";
                    let img_text_body_div = document.createElement("div");
                    img_text_body_div.className = "card-body p-1 mr-1 ml-1";
                    let img_source = document.createElement("small");
                    img_source.className = "p-0 m-0 white-text";
                    img_source.textContent = authors[i];
                    img_text_body_div.appendChild(img_source);
                    img_text_div.appendChild(img_text_body_div);
                    img_div.appendChild(img_text_div);
                    img_row.appendChild(img_div);
                    hold_row.appendChild(img_row);
                    card_header.appendChild(hold_row);
                    let news_div = document.createElement("div");
                    news_div.className = "mt-1 px-3";
                    let title_a = document.createElement("a");
                    //title_a.href = news_links[i];
                    let title_p = document.createElement("p");
                    title_p.id = "titleHapa_n_0_" + id;
                    title_p.onclick = reply_post;
                    title_p.textContent = titles[i];
                    title_p.style.marginBottom = "0";
                    title_p.style.fontSize = "15px";
                    title_a.appendChild(title_p);
                    news_div.appendChild(title_a);
                    let body_p = document.createElement("p");
                    body_p.id = "BodyMbele_n_0_" + id;
                    body_p.onclick = reply_post;
                    body_p.style.marginBottom = "10px";
                    body_p.style.fontSize = "13px";
                    body_p.textContent = comments[i];
                    news_div.appendChild(body_p);
                    card_header.appendChild(news_div);

                    let i_div = document.createElement("div");
                    i_div.id = "icons_n_0" + id;
                    i_div.className = "newsIconsDiv d-flex justify-content-around align-items-center py-1 mb-0";
                    i_div.style = " background-color: #333333; border: 1px solid #262626";
                    let more_a = document.createElement("a");
                    more_a.href = news_links[i];
                    more_a.target = "_blank";
                    more_a.className = "newsIcons";
                    let more_p = document.createElement("p");
                    more_p.className = "iconColor mb-0";
                    more_p.style.color = "#4d79ff";
                    more_p.textContent = "link";
                    more_a.appendChild(more_p);
                    i_div.appendChild(more_a);
                    let reply_a = document.createElement("a");
                    reply_a.className = "collapsed newsIcons";
                    reply_a.style.marginRight = "10px";
                    let reply_i = document.createElement("i");
                    reply_i.className = "d-inline fas fa-reply iconColor";
                    reply_i.id = "replyPost_n_0_" + id;
                    reply_i.onclick = reply_comment_prep;
                    reply_a.appendChild(reply_i);
                    i_div.appendChild(reply_a);
                    let like_a = document.createElement("a");
                    like_a.className = "newsIcons";
                    let like_i = document.createElement("i");
                    like_i.className = "d-inline iconColor fas fa-thumbs-up";
                    like_i.value = "0";
                    like_i.id = "arrowLi_n_0_" + id;
                    like_i.onclick = vote_post;
                    like_a.appendChild(like_i);
                    let like_p = document.createElement("p");
                    like_p.className = "d-inline iconColor";
                    like_p.textContent = "  " + likes[i];
                    like_p.id = "likesNum_n_0_" + id;
                    like_a.appendChild(like_p);
                    i_div.appendChild(like_a);
                    let dislike_a = document.createElement("a");
                    dislike_a.className = "newsIcons";
                    let dislike_i = document.createElement("i");
                    dislike_i.className = "fas fa-thumbs-down iconColor d-inline";
                    dislike_i.value = "1";
                    dislike_i.id = "voteDowD_n_0_" + id;
                    dislike_i.onclick = vote_post;
                    dislike_a.appendChild(dislike_i);
                    let dislike_p = document.createElement("p");
                    dislike_p.className = "d-inline iconColor";
                    dislike_p.textContent = "  " +  dislikes[i];
                    dislike_p.id = "dislikesNum_n_0_" + id;
                    dislike_a.appendChild(dislike_p);
                    i_div.appendChild(dislike_a);
                    let comment_a = document.createElement("a");
                    comment_a.className = "collapsed newsIcons";
                    //comment_a.setAttribute("data-toggle", "collapse");
                    //comment_a.setAttribute("data-target", "#collapse2_n_0_" + id);
                    let comment_i = document.createElement("i");
                    comment_i.className = "fas fa-comment-alt iconColor";
                    comment_i.textContent = "  " + replies[i];
                    comment_i.id = "replyNumX_n_0_" + id;
                    comment_i.onclick = reply_post;
                    comment_a.appendChild(comment_i);
                    i_div.appendChild(comment_a);
                    card_header.append(i_div);
                    let news_id = document.createElement("input");
                    news_id.style.display = "none";
                    news_id.id = "newsId_n_0_" + id;

                    news_id.value = nids[i];
                    card_header.appendChild(news_id);
                    let post_id = document.createElement("input");
                    post_id.style.display = "none";
                    post_id.id = "postId_n_0_" + id;
                    post_id.value = pids[i];
                    card_header.appendChild(post_id);
                    let my_id = document.createElement("input");
                    my_id.style.display = "none";
                    my_id.id = "myId_n_0_" + id;
                    my_id.value = mids[i];
                    card_header.appendChild(my_id);
                    let displayed = document.createElement("input");
                    displayed.style.display = "none";
                    displayed.id = "displayed_n_0_" + id;
                    displayed.value = "0";
                    card_header.appendChild(displayed);
                    let parent_index = document.createElement("input");
                    parent_index.style.display = "none";
                    parent_index.id = "parent_n_0_" + id;
                    parent_index.value = index;
                    card_header.appendChild(parent_index);
                    let collapse_div = document.createElement("div");


                    collapse_div.role = "tabpanel";
                    collapse_div.id = "collapse_n_0_" + id;
                    collapse_div.className = "collapse ";
                    let card_body_reply = document.createElement("div");
                    card_body_reply.id = "replyBody_n_0_" + id;
                    let form1 = document.createElement("div");
                    let form11 = document.createElement("div");
                    form11.className = "form-group";
                    let textarea = document.createElement("textarea");
                    textarea.className = "form-control";
                    textarea.id = "txt_n_0_" + id;
                    textarea.rows = "2";
                    textarea.style.resize = "none";
                    textarea.style.overflow = "hidden";
                    textarea.style.fontSize = "13px";
                    textarea.addEventListener('input', autoResize, false);
                    form11.appendChild(textarea);
                    let replybtn_a = document.createElement("a");
                    replybtn_a.className = "collapsed";
                    replybtn_a.style.marginRight = "10px";
                    replybtn_a.setAttribute("data-toggle", "collapse");
                    replybtn_a.setAttribute("data-target", "#collapse_n_0_" + id);
                    let form1_btn = document.createElement("button");
                    form1_btn.className = "btn btn-primary btn-sm";
                    form1_btn.id = "replySubmitBtn_n_0_" + id;
                    form1_btn.textContent = "send";
                    form1_btn.onclick = submit_comment;
                    let form1_btn_div = document.createElement("div");
                    replybtn_a.appendChild(form1_btn);
                    form1_btn_div.appendChild(replybtn_a);
                    form1.appendChild(form11);
                    form1.appendChild(form1_btn_div);
                    card_body_reply.appendChild(form1);
                    collapse_div.appendChild(card_body_reply);
                    let collapse_div2 = document.createElement("div");
                    collapse_div2.style.marginLeft = "4%";
                    collapse_div2.style.marginRight = "9%";
                    collapse_div2.role = "tabpanel";
                    collapse_div2.id = "collapse2_n_0_" + id;
                    collapse_div2.className = "collapse";

                    let card_body_comments = document.createElement("div");
                    let comments_area = document.createElement("div");
                    comments_area.style.marginTop = "10px";
                    card_body_comments.appendChild(comments_area);
                    collapse_div2.appendChild(card_body_comments);
                    card.appendChild(card_header);
                    card.appendChild(collapse_div);
                    card.appendChild(collapse_div2);
                    let accordian_div = document.createElement("div");

                    accordian_div.className = "accordion md-accordion";
                    accordian_div.role = "tablist";
                    accordian_div.id = "accord_n_0_" + id;
                    accordian_div.setAttribute("aria-multiselectable","true");

                    accordian_div.appendChild(card);

                    if(!appended){parent.appendChild(accordian_div);}else{parent.prepend(accordian_div)}
                }

                let more_btn_div = document.createElement("div");
                more_btn_div.className= "flex-center mt-5";
                more_btn_div.style.height = "28px";
                more_btn_div.style.display = "none";
                more_btn_div.id= "more_btn_div" + nids[nids.length-1];
                let more_btn = document.createElement("button");
                more_btn.className = "btn btn-primary loadNewsButton";
                more_btn.textContent = "more";
                more_btn.id= "more_btn" + nids[nids.length-1];
                more_btn.onclick = prev_args_news;
                more_btn_div.appendChild(more_btn);
                if(!appended){parent.appendChild(more_btn_div);}

                if(newsId != null && newsId != "0"){
                    construct_comments("_n_0_" + nids[0] + "c");
                }


            }
        }
    }

function prev_args_news(){
    id = this.id.substr(8,this.id.length);
    update_local_news(id,newsFilter.toLowerCase(),1);
}

function update_values_of_graph(age,gender,loc){
        // const Http = new XMLHttpRequest();
        // const Url = "http://localhost:8080/collect_stats?age=" + age + "&gender=" + gender + "&loc=" + loc;
        // Http.open("Get", Url);
        // Http.send()
        //
        // Http.onreadystatechange=function() {
        //     if (this.readyState == 4 && this.status == 200) {
        //         const myObj = JSON.parse(Http.responseText + "");
        //         let values = [];
        //         values = myObj.data;
        //         numSavs = document.getElementById("total_surveys_h");
        //         numSavs.innerHTML = values[0];
        //         var max_value = Math.max.apply(Math, values);
        //         var fields = ["total", "fever", "dry cough", "fatigue", "short breath", "sore throat", "headache", "ill"];
        //         for (var i = 1; i < 8; i++) {
        //             var percent = 0;
        //             var stat_p = 50;
        //             var name_p = 100;
        //             if (max_value > 0){
        //                var percent = Math.ceil((values[i] / max_value) * 100);
        //                 var stat_p = 50 + Math.ceil((percent / 100) * 50);
        //                 var name_p = Math.ceil(5000 / stat_p);
        //
        //             }
        //             document.getElementById("stat" + (i)).style.width = stat_p + "%";
        //             document.getElementById("name" + (i)).style.width = name_p + "%";
        //             document.getElementById("name" + (i)).textContent = fields[i] + ": " + percent + "%";
        //
        //         }
        //
        //
        //     }
        // }
        // for (var i = 1; i < 6; i++) {
        //     let idName = "stat" + i;
        //     var val = document.getElementById(idName).getAttribute('data-value');
        //     values.push(val)
        // }

    }

function uncheck(){
    let raddioElements = document.getElementsByClassName("raddio");
      for(var i=0; i < raddioElements.length; i++){
          var elem = raddioElements.item(i);
          elem.disabled = false;
          //elem.checked = false;
      }
    $.ajax({
         type: 'POST',
         url: urlpat + "submit_survey",
         data: $('#submit_survey_form').serialize(),
         success: function(response) {
             // update_values_of_graph(0,0,0);
             let raddioElements = document.getElementsByClassName("raddio");
              for(var i=0; i < raddioElements.length; i++){
                  var elem = raddioElements.item(i);
                  elem.checked = false;
              }
              let hide_later_elements = document.getElementsByClassName("hide-later");
              for(var i=0; i < hide_later_elements.length; i++){
                  var elem = hide_later_elements.item(i);
                  elem.style.display = 'none';
              }
              document.getElementById("selectCountyOption").selectedIndex =0;
              document.getElementById("selectAgeOption").selectedIndex =0;
              document.getElementById("cancel_btn").style.display = 'block';
              document.getElementById("submitUnderlyingCheckbox").style.display = 'none';

         },
        error: function() {
             //$("#commentList").append($("#name").val() + "<br/>" + $("#body").val());
        }
        });






    //
    // document.getElementById("checkMyself").checked = false;
    // document.getElementById("checkSomeoneElse").checked = false;
    // document.getElementById("selectCountyOption").selectedIndex =0;
    // document.getElementById("selectAgeOption").selectedIndex =0;
    // document.getElementById("genderMale").checked = false;
    // document.getElementById("genderFemale").checked = false;
    // document.getElementById("lessThan3").checked = false;
    // document.getElementById("lessThan7").checked = false;
    // document.getElementById("moreThan7").checked = false;
    // let elemes = document.getElementsByClassName("selectSymptomsCheckbox");
    // for (var i=0; i < elemes.length; i++){
    //     elemes[i].checked = false;
    // }
    // let elems = document.getElementsByClassName("selectUnderlyingCheckbox");
    // for (var i=0; i < elems.length; i++){
    //     elems[i].checked = false;
    // }
    // document.getElementById("selectLocation").style.display = 'none';
    // document.getElementById("selectAge").style.display = 'none';
    // document.getElementById("selectGender").style.display = 'none';
    // document.getElementById("selectSymptoms").style.display = 'none';
    // document.getElementById("selectSymptomsPeriod").style.display = 'none';
    // document.getElementById("selectUnderlyingCondition").style.display = 'none';
    // document.getElementById("goodbye_message").style.display = 'none';
    // document.getElementById("btn_container").style.display = 'none';
    // document.getElementById("submitUnderlyingCheckbox").style.display = 'none';
    // document.getElementById("submitSymptomsCheckbox").style.display = 'none';

}

function sendReport() {
    //var elems  = document.getElementById('submit_report_form').elements;
    let user = document.getElementById("username").textContent;
    if(user == "") return
    let title = document.getElementById(postTopic).value;
    //let body = document.getElementById("bodyPost").value;
    //alert(user + "  " + body + " " + title);
    if(title == "") return;
    const Http = new XMLHttpRequest();
    let Url = urlpat + "submit_report?user="+ user + "&title="+title + "&body=" + "";
    Http.open("Post", Url);
    Http.send()
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respo = Http.responseText;
            if(respo == 'no_existo'){
               $('#removed_user').modal('show');
            }else {
                update_news_table(0, "");
                $("#" + postTopic).val("");
            }
        }
    }

    // $.ajax({
    //      type: 'POST',
    //      url: "http://localhost:8080/submit_report?user=" + user + "&title="+title + "&body=" + body,
    //      data: "",
    //      success: function(response) {
    //          update_news_table(0,"");
    //      },
    //     error: function() {
    //          //$("#commentList").append($("#name").val() + "<br/>" + $("#body").val());
    //     }
    //     });

}

function registerUser(user, pass){
    let vill = "";
    let state = "";
    let country = "";
    let url = urlpat + "register?username=" + user + "&password=" + pass + "&village=" + vill + "&state=" + state + "&country=kenya";
     const Http2 = new XMLHttpRequest();
     Http2.open("Get", url);
     Http2.send();

     Http2.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
             if(this.responseText == "username_taken"){
                 document.getElementById("error_signup").textContent = "*Username is not available";
                 document.getElementById("signUp").style.display = "block";
                 document.getElementById("signUpLoader").style.display = "none";
                 document.getElementById("error_signup").style.display = "block";
                 return;
             }
             var myArr = JSON.parse(this.responseText);
             if (mobile) {
                 logOptionsMob(myArr.username, myArr.village, myArr.state, myArr.country)
             } else {
                 logOptions(myArr.username, myArr.village, myArr.state, myArr.country);
             }
             $('#logSign_modal').modal('hide');
             document.getElementById("signUp").style.display = "block";
             document.getElementById("signUpLoader").style.display = "none";

         }
     }
}

function displaySelect(index){
    document.getElementById("select_age").style.display = 'none';
    document.getElementById("select_gender").style.display = 'none';
    document.getElementById("select_county").style.display = 'none';

    if(index == 1){
        document.getElementById("select_age").style.display = 'block';
    }
    if(index == 2){
        document.getElementById("select_gender").style.display = 'block';
    }
    if(index == 3){
        document.getElementById("select_county").style.display = 'block';
    }

}

function transitions_navs(dir) {
    if(navs.length > 1){
        if(dir == 0) {
            ficha(navs[navs.length - 2], 0);
            ficha(navs[navs.length - 1], 1);

        }else{
            ficha(navs[navs.length - 2], 1);
            ficha(navs[navs.length - 1], 0);

            navs.pop();
        }
    }
}

function transitions_pages(dir){
    if(pages.length > 1){
        if(dir == 0) {
            ficha(pages[pages.length - 2], 0);
            ficha(pages[pages.length - 1], 1);

        }else{
            ficha(pages[pages.length - 2], 1);
            ficha(pages[pages.length - 1], 0);
            pages.pop();

        }
    }
}

function hide_all(show_div){

     document.getElementById("corona_updates_div").style.display = 'none';
     document.getElementById("graph_status_div").style.display = 'none';
    document.getElementById("corona_comments_div").style.display = 'none';
    document.getElementById("about_us_div").style.display = 'none';
     document.getElementById("self_checker_div").style.display = 'none';
     document.getElementById("contact_us_div").style.display = 'none';
     document.getElementById("community_div").style.display = "none";
     document.getElementById("user_profile_div").style.display = "none";
    document.getElementById("notification_div").style.display = "none";
    document.getElementById("news-tab").style.display = "none";

     document.getElementById(show_div).style.display = "block";
}

function hide_all_nav(show){
        document.getElementById("navCommunity").style.display ="none";
        document.getElementById("navRegular").style.display ="none";
        document.getElementById("navReply").style.display ="none";
        document.getElementById("navOther").style.display ="none";
        document.getElementById("navBackButton").style.display ="none";
        document.getElementById("footerComment").style.display ="none";
        document.getElementById("footerRegular").style.display ="block";

        if(show == ""){
           document.getElementById("navRegular").style.display ="block";
        }else if(show == "back"){
            document.getElementById("footerRegular").style.display ="none";
            document.getElementById("footerComment").style.display ="block";
            document.getElementById("navBackButton").style.display ="block";
        }else{
            document.getElementById("navOtherTitle").textContent = show;
            document.getElementById("navOther").style.display ="block";
        }

    }

function hide_all_navbars(show){
    document.getElementById("navRegular").style.display ="none";
    document.getElementById("navOther").style.display ="none";
    document.getElementById("navBackButton").style.display ="none";
    document.getElementById("navReply").style.display ="none";
    document.getElementById("navCommunity").style.display ="none";

    if(show != "") {
        ficha(show, 1);
    }
}

function reply_comment_prep(){
    show_reply_post(this.id);
}

function show_reply_post(id){
    pata("parent_comment").className = "parent";
    //pata("parent_comment").value = "corona_updates_div";
    pata("navReplyPost").textContent = "post";

    if(id != "0") {
        let index = id.substr(9, id.length - 9);
        let title = pata("titleHapa" + index).cloneNode(true);
        title.removeAttribute("onclick");
        pata("partComment").appendChild(title);
        childId = "";
        let s = index.substr(1, 1);

        if (s == "0") {
            pata("parent_comment").textContent = index;
            pata("navReplyHead").textContent = "Comment to post";
            pata("navMinReplyHead").textContent = "Comment to post";
            pata("partComment").prepend(pata("userTime" + index).cloneNode(true))
        }
        else if(index.substr(index.length-1, 1) == "c"){
            if(s != "n"){pata("partComment").prepend(pata("userTime" + index).cloneNode(true))}
            pata("parent_comment").className = "child";
            pata("navReplyHead").textContent = "Reply to comment";
            pata("navMinReplyHead").textContent = "Reply to comment";
            pata("userInput").placeholder = "Your reply";
            pata("parent_comment").textContent = index;

        }
        else{


            pata("parent_comment").textContent = index;
            pata("navReplyHead").textContent = "Comment to news";
            pata("navMinReplyHead").textContent = "Comment to news";
        }
        pata("userInput").placeholder = "Your comment";


        pata("navReplyPost").removeAttribute("onclick");
        pata("navReplyPost").onclick = submit_comment_prev;
        ficha("alertReplyMessage", 0);

    }else{
        checkHideSide();
        //pata("parent_comment").value = "corona_updates_div";
        pata("navReplyHead").textContent = "Create post";
        pata("navMinReplyHead").textContent = "Create post";
        pata("userInput").placeholder = "What is going?";
        pata("navReplyPost").removeAttribute("onclick");
        pata("navReplyPost").onclick = show_post_creation;
        pata("navMinReplyPost").removeAttribute("onclick");
        pata("navMinReplyPost").onclick = show_post_creation;
        pata("userInput").value = "";
        ficha("alertReplyMessage", 1);

    }
    pages.push("reply_comment_div");
    navs.push("navReply");
    transitions_pages(0);
    transitions_navs(0);
    ficha("footerRegular", 0);

    // hide_all("reply_comment_div");
    // if(!mobile){ficha("news-tab",1)}
    // if(mobile){
    //     hide_all_navbars("navReply");
    //     ficha("footerRegular", 0);
    // }else{
    //     ficha("replyMinNav", 1);
    // }
    document.getElementById('userInput').focus();

}

function reply_post_prep(){
    reply_post_prev(this.id);
}

function reply_post_prev(id){
    let index = id.substr(9, id.length-9);
    let s = index.substr(1,1);
    let accord = document.getElementById("accord" + index);
    let clone = accord.cloneNode(true);
    $(clone).find("*[id]").each(function(){
           var tID = $(this).attr("id");
           if(tID.substr(tID.length-1,1) != "c"){
           tID += "c";
           $(this).attr('id', tID);
           }

    });
    $(clone).find("*[data-target]").each(function(){
           var tID = $(this).attr("data-target");
           if(tID.substr(tID.length-1,1) != "c"){
                tID += "c";
                 $(this).attr('data-target', tID);
           }

    });
    index += "c";
    let main_div = null;
    if(s == "0"){
       main_div = "corona_updates_div";

    }else{
       main_div = "news-tab";
    }
    if(show_div != "news_div"){
        main_div = "community_div";
    }
    let reply_btn = clone.querySelector("#replySubmitBtn" + index);
    if(reply_btn != null) {
        reply_btn.onclick = submit_comment;

        if (s == "0") {
            //clone.querySelector("#badge" + index).style.fontSize = "16px";
            clone.querySelector("#author" + index).style.fontSize = "15px";
            //clone.querySelector("#arrowUp" + index).style.fontSize = "16px";
            //clone.querySelector("#votes" + index).style.fontSize = "16px";
            //clone.querySelector("#voteDown" + index).style.fontSize = "16px";
            clone.querySelector("#titleHapa" + index).style.fontSize = "15px";
            //clone.querySelector("#replyButton" + index).style.fontSize = "16px";
            //clone.querySelector("#replyNumX" + index).style.fontSize = "16px";
            clone.querySelector("#replyPost" + index).removeAttribute("onclick");
            clone.querySelector("#replyPost" + index).onclick = show_reply_div;
            clone.querySelector("#titleHapa" + index).removeAttribute("onclick");
            clone.querySelector("#replyNumC" + index).removeAttribute("onclick");
            clone.querySelector(".flex-row").className = "";
            let badge = clone.querySelector(".mr-3");
            let badge_clone = badge.cloneNode(true);
            badge_clone.style = "";
            let header = clone.querySelector("#userTime" + index);
            header.id = "badgeNameTime" + index;
            header.className = "d-flex mr-5 flex-row";
            header.querySelector(".p-time").style.fontSize = "15px";
            header.querySelector(".p-time").className = "mb-2 ml-4";
            header.prepend(badge_clone);
            clone.querySelector(".mr-3").textContent = "";
        } else {
            clone.querySelector("#replyPost" + index).onclick = reply_comment_prep;
            clone.querySelector("#arrowLi" + index).onclick = vote_post;
            clone.querySelector("#voteDowD" + index).onclick = vote_post;
             clone.querySelector("#arrowLi" + index).value = "0";
            clone.querySelector("#voteDowD" + index).onclick = "1";

            let doc_comment_btn = clone.querySelector("#replyNumN" + index);
            if(doc_comment_btn != null){
                clone.querySelector("#holdinrow" + index).removeAttribute("onclick");
                 clone.querySelector("#BodyMbele" + index).removeAttribute("onclick");
                 clone.querySelector("#titleHapa" + index).removeAttribute("onclick");
                clone.querySelector("#holdinrow" + index).removeAttribute("onclick");
                clone.querySelector("#replyPost" + index).onclick = reply_comment_prep;
                doc_comment_btn.removeAttribute("onclick");
            }
        }
    }

    //comment_footer.textContent = "";
    //comment_footer.appendChild(icons_clone);
    //clone.querySelector("#icons" + index).textContent = "";
    //clone.querySelector("#icons" + index).style = "";

    document.getElementById("comments_div").textContent = "";
    let comments = document.createElement("div");
    comments.id = "news_div" + index;
    comments.style.marginLeft = "-1px";
    document.getElementById("comments_div").appendChild(clone);
    document.getElementById("comments_div").appendChild(comments);
    let pp = pata("parent_comment");
    if(mobile){pp.value = main_div}
    else{pp.value = "corona_updates_div"}
    pp.textContent = index;
    pp.className = "parent";
    document.getElementById("comments_div").style.width = "100%";
    // $('#corona_updates_div').animate({width: 0}, {duration: 1000});
    // $('#corona_updates_div').hide();
    // $("#corona_comments_div").show();
    // $("#corona_comments_div").animate({width: 400}, {duration: 1000});
    if(mobile && main_div == "news-tab") {
        document.getElementById(main_div).classList.remove('fadeInRight');
        document.getElementById(main_div).classList.add("fadeInLeft");
        document.getElementById(main_div).style.animationName = "fadeInLeft";
        document.getElementById("navOther").style.animationName = "fadeInLeft";

    }
    // if(mobile) {
    //     hide_all_nav("back");
    //     document.getElementById(main_div).style.display = "none";
    //
    // }else{
    //     document.getElementById("commentBackButton").style.display = "block";
    //     document.getElementById("corona_updates_div").style.display = "none";
    //
    // }
    // document.getElementById("corona_comments_div").style.display = "block";
    pages.push("corona_comments_div");
    navs.push("navBackButton");
    transitions_navs(0);
    transitions_pages(0);
    ficha("footerRegular", 0);
    ficha("footerComment", 1);
    inComment = true;
    document.getElementById("currIndexFooter").value = index;
    update_news_table("0",index);

}

function show_reply_div(){
    let replyButton = "navReplyPost";
    if(!mobile){
        replyButton = "navMinReplyPost"
    }
    pata("navReplyHead").textContent = "Comment to post";
    pata("navMinReplyHead").textContent = "Comment to post";

    pata(replyButton).removeAttribute("onclick");
    pata(replyButton).onclick = submit_comment_prev;
    ficha("alertReplyMessage", 0);
    pata("parent_comment").className = "child";
    let index = pata("currIndexFooter").value;
    pata("parent_comment").textContent = index;
    index = index.substr(0, index.length-1);
    if(index.substr(1,1) != "n")
    {
        pata("partComment").appendChild(pata("userTime" + index).cloneNode(true));
    }
    if(index.substr(1,1) == "n"){
        pata("navReplyHead").textContent = "Comment to news";
        pata("navMinReplyHead").textContent = "Comment to news";

    }
    let title = pata("titleHapa" + index).cloneNode(true);
    title.removeAttribute("onclick");
    pata("partComment").appendChild(title);
    pages.push("reply_comment_div");
    navs.push("navReply");
    ficha("footerComment", 0);
    transitions_navs(0);
    transitions_pages(0);
    // document.getElementById("corona_comments_div").style.display = "none";
    // document.getElementById("reply_comment_div").style.display = "block";
    // if(mobile) {
    //     document.getElementById("footerComment").style.display = "none";
    //     document.getElementById("navBackButton").style.display = "none";
    //     document.getElementById("navReply").style.display = "block";
    // }
    document.getElementById('userInput').focus();

}

function pata(id){
    return document.getElementById(id);
}

function reply_post_comment(){
  let index = this.id.substr(9, this.id.length-9);
  if(!pata("collapse2" + index).classList.contains("show")) {
      pata("parent_comment").textContent = index;
      update_news_table(0,index);
  }else{
      pata("parent_comment").textContent = pata("parent" + index).value;
  }

}

function reply_post(){
    //let order = this.id.substr(0,9);
    let index = this.id.substr(9, this.id.length-9);
    reply_post_prev(this.id);
    // if(order == "replyNumC"){
    //     document.getElementById("replyBody" + index).style.display = "none";
    // }else{
    //     document.getElementById("replyBody" + index).style.display = "block";
    // }
    // let parentIndex = document.getElementById("parent" + index).value;
    // if(parentIndex != "" && parentIndex != "_n"){
    //     document.getElementById("replyBody" + parentIndex).style.display = "none";
    // }

    //update_news_table(0,index);

    // let tdElement = document.getElementById("replyBox" + index);
    // let replyBoxOpen = document.getElementById("replyBoxOpen"+index);
    // if(replyBoxOpen.value == '1'){
    //     replyBoxOpen.value = '0';
    //     tdElement.textContent = "";
    // }else {
    //     replyBoxOpen.value = '1';
    //     let div_outer = document.createElement("div");
    //     //div_outer.className = "form-group";
    //     let div_txt = document.createElement("div");
    //     div_txt.className = "form-group";
    //     let txt = document.createElement("textarea");
    //     //txt.type ="text";
    //     txt.className = "form-control";
    //     txt.name = "title";
    //     txt.placeholder = "comment here..."
    //     txt.rows = 1;
    //     txt.id = "txt" + index;
    //     let btn = document.createElement("button");
    //     btn.className = "btn-primary float-right btn-sm";
    //     btn.textContent = "reply";
    //     btn.id = "replySubmitBtn" + index;
    //     btn.onclick = submit_comment;
    //
    //
    //     div_txt.appendChild(txt);
    //     div_outer.appendChild(div_txt);
    //     div_outer.appendChild(btn);
    //     tdElement.appendChild(document.createElement("br"));
    //     tdElement.appendChild(div_outer);
    //     tdElement.appendChild(document.createElement("br"));
    //
    //     //fetch comments from database and display
    // }
}

function submit_comment(){
    submit_comment_prev(this.id);
}

function submit_comment_prev() {
    let user = document.getElementById("username").textContent;
    if (user == '' || user == null){
        //document.getElementById("activity").textContent = "You need to Log in before you can continue to reply";
        $('#logSign_modal').modal('show');
        return;
    }
    let index = pata("parent_comment").textContent;

    let reply = document.getElementById("userInput").value;
    reply = reply.replace(/\r?\n/g, ' <br /> ');

    if (reply != '') {
        let author = user;
        let msg = reply;
        let id = document.getElementById("myId" + index).value;
        let pid = document.getElementById("postId" + index).value;
        let nid = document.getElementById("newsId" + index).value;
        const Http = new XMLHttpRequest();
        const Url = urlpat + "comment?author=" + author + "&msg=" + msg + "&id=" + id + "&pid=" + pid + "&nid=" + nid;
        Http.open("Get", Url);
        Http.send()
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if(Http.responseText == 'no_existo') {
                    $('#removed_user').modal('show');
                    return;
                }
                pata("userInput").value = "";
                pata("userInput").setAttribute("row", "100");
                //document.getElementById("txt" + index).value = "";
                document.getElementById("displayed" + index).value = "1";
                // document.getElementById("replyPost" + index).click();
                if(inComment) {
                    let index = document.getElementById("parent_comment").textContent;
                    let sel = "0";
                     if(pata("firstNews" + index) != null){
                         sel = pata("firstNews" + index).textContent;
                     }
                    update_news_table(sel, index);
                    if(sel == "0"){
                        pata("collapse2" + index).classList.add("show");
                    }
                }else {
                    let news_div = document.getElementById("news_div" + index);
                    if (news_div != null) {
                        news_div.textContent = "";
                        update_news_table(0, index);
                    }
                    if(id =="0" && pid == "0"){
                        let replyNumN = document.getElementById("replyNumX" + index);
                        replyNumN.textContent = "  " + (parseInt(replyNumN.textContent.trim()) + 1);

                    }else {
                        let replyNumC = null;
                        if(pid !=0 && id == 0){ replyNumC = document.getElementById("replyNumX" + index);}
                        else{replyNumC = document.getElementById("replyNumC" + index);}

                        replyNumC.textContent = "  " + (parseInt(replyNumC.textContent.trim()) + 1);
                        if(document.getElementById("myId" + index).value == '0'){
                            replyNumC.textContent = replyNumC.textContent;
                        }
                    }
                }
                //document.getElementById("replyBody" + index).style.display = "none";
                // //alert(Http.responseText);
                // let tdElement = document.getElementById("replyBox" + index);
                // let replyBoxOpen = document.getElementById("replyBoxOpen"+index);
                // replyBoxOpen.value = '0';
                // tdElement.textContent = "";
                // let displayed = document.getElementById("displayed"+index);
                // if(displayed.value == '0') {
                //     show_comments(index);
                // }else{
                //     let comment_div = document.getElementById("post"+index);
                //     comment_div.textContent = "";
                //     displayed.value = '0';
                //     show_comments(index);
                // }


            }else{

            }
        }

    }
}

function show_comments(ind){
    let user = document.getElementById("username").textContent;
    if (user == '' || user == null) {
        user = "user";
    }
    let index = "-1";
    if(this.id == null){
        index = ind;
    }else {
        index = this.id.substr(8, this.id.length - 8);
    }
    let comment_div = document.getElementById("post"+index);
    let displayed = document.getElementById("displayed"+index);
    if(displayed.value == '1'){
        comment_div.textContent = "";
        displayed.value = '0'
    }else {
        comment_div.className = "float-right";
        comment_div.style.width = "98%";
        //comment_div.className = "jumbotron jumbotron-fluid";
        //comment_div.style.backgroundColor = "black";
        displayed.value = '1';
        let myId = document.getElementById("myId" + index).value;
        let pid = document.getElementById("postId" + index).value;
        const Http = new XMLHttpRequest();
        const Url = urlpat + "collect_comments?pid=" + pid + "&id=" + myId + "&user=" + user;
        Http.open("Get", Url);
        Http.send()
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const myObj = JSON.parse(Http.responseText);
                var comments = [];
                comments = myObj.comments;
                var authors = [];
                authors = myObj.authors;
                var replies = [];
                replies = myObj.replies;
                var levels = [];
                levels = myObj.levels;
                var ids = [];
                ids = myObj.ids;
                var polls = [];
                polls = myObj.polls;
                var tbl = document.createElement('table');
                tbl.className = "table";
                tbl.id = "tbl"+ index;
                var tbdy = document.createElement('tbody');
                tbdy.className = "border-left  border-light rounded mb-0";
                for (var i = 0; i < comments.length; i++) {
                    let msg = comments[i];
                    let poll = polls[i];
                    let num_replies = replies[i];
                    var level = parseInt(levels[i]);
                    //if(level == '0') {
                    var tr = document.createElement('tr');
                    var td = document.createElement('td');
                    let msg_div = document.createElement("div");
                    //msg_div.className = "pull-right";
                    //msg_div.style.backgroundColor = "black";
                    //msg_div.style.width = "95%";
                    //let msg_author = document.createElement("p");
                    let bold = document.createElement("p");
                    let name = document.createElement("strong");
                    name.textContent = authors[i];
                    bold.appendChild(name);
                    let msg_text = document.createElement("p");
                    //msg_text.className = "text";
                    msg_text.textContent = msg;
                    msg_div.appendChild(bold);
                    msg_div.appendChild(msg_text);

                    let vote_div = document.createElement('div');
                    vote_div.className = "d-inline float-right";
                    let arrow_up = document.createElement('i');
                    arrow_up.id = "arrowUp" + index + "_" + i;
                    arrow_up.value = "00";
                    arrow_up.className = "d-inline fas fa-arrow-up";
                    arrow_up.style.marginRight = "5px";
                    arrow_up.style.height = "5px";
                    let votes = document.createElement('p');
                    votes.id = "votes" + index + "_" + i;
                    votes.className = "d-inline ";
                    votes.textContent = poll;
                    let vote_down = document.createElement('i');
                    vote_down.id = "voteDown" + index+ "_" + i;
                    vote_down.value = "11";
                    vote_down.className = "d-inline fas fa-arrow-down";
                    vote_down.style.marginLeft = "5px";
                    vote_down.style.height = "5px";
                    arrow_up.onclick = vote_post;
                    vote_down.onclick = vote_post;
                    //vote_down.style.color ="red";
                    //vote_div.appendChild(reply);

                    //let reply_div = document.createElement('div');
                    //reply_div.className = "d-inline reply-post"
                    // ;
                    let reply_arrow = document.createElement('i');
                    reply_arrow.className = "d-inline fas fa-reply";
                    //let reply = document.createElement('p');
                    //reply.className = "d-inline reply-post";
                    reply_arrow.id = "replyPost" + index + "_" + i;
                    reply_arrow.onclick = reply_post;
                    //reply.textContent = " Reply ";
                    //reply.style.marginLeft = "10px";
                    reply_arrow.style.marginRight = "10px";
                    //reply_div.appendChild(reply);
                    vote_div.appendChild(reply_arrow);
                    //vote_div.appendChild(reply);

                    let reply_input_div = document.createElement("div");
                    reply_input_div.id = "replyBox" + index + "_" + i;
                    let reply_div = document.createElement('div');
                    //reply_div.className = "d-inline pull-right";
                    reply_div.id = "post" + index + "_" + i;

                    let post_id = document.createElement("input");
                    post_id.style.display = "none";
                    post_id.id = "postId" + index + "_" + i;
                    post_id.value = document.getElementById("postId" + index).value;

                    let my_id = document.createElement("input");
                    my_id.style.display = "none";
                    my_id.id = "myId" + index + "_" + i;
                    my_id.value = ids[i];

                    let displayed = document.createElement("input");
                    displayed.style.display = "none";
                    displayed.id = "displayed" + index + "_"+ i;
                    displayed.value = "0";

                    let replyBoxOpen = document.createElement("input");
                    replyBoxOpen.style.display = "none";
                    replyBoxOpen.id = "replyBoxOpen" + index + "_" + i;
                    replyBoxOpen.value = "0";

                    //reply_div.appendChild(my_id);
                    //reply_div.appendChild(displayed);

                    let comment_box = document.createElement('i');
                    comment_box.className = "d-inline fas fa-comment-alt";
                    let comment_num = document.createElement('p');
                    comment_num.className = "d-inline ";
                    comment_num.id = "replyNum" + index + "_" + i;
                    comment_num.textContent = "  " + num_replies;
                    comment_num.style.marginRight = "10px";
                    comment_box.id = "comments" + index + "_" + i;
                    comment_box.onclick = show_comments;
                    vote_div.appendChild(comment_box);
                    vote_div.appendChild(comment_num);
                    //comment_div.id = "comments" + i;
                    //comment_div.onclick = show_comments;
                    vote_div.appendChild(arrow_up);
                    vote_div.appendChild(votes);
                    vote_div.appendChild(vote_down);

                    //vote_div.appendChild(document.createElement("br"));
                    msg_div.appendChild(vote_div);
                    let content_div = document.createElement("div");
                    content_div.appendChild(document.createElement("p"));
                    content_div.appendChild(msg_div);
                    content_div.appendChild(document.createElement("p"));
                    content_div.appendChild(reply_input_div);
                    content_div.appendChild(document.createElement("p"));
                    content_div.appendChild(reply_div);
                    content_div.appendChild(my_id);
                    content_div.appendChild(displayed);
                    content_div.appendChild(replyBoxOpen);
                    content_div.appendChild(post_id);
                    content_div.appendChild(document.createElement("p"));
                    td.appendChild(content_div);
                    tr.appendChild(td);
                    tbdy.appendChild(tr);
                    //msg_div.appendChild(reply_div);
                    //msg_div.style.width = Math.ceil(Math.pow(0.8, level) * 100) + "%";
                    // }
                }
                tbl.appendChild(tbdy);
                comment_div.appendChild(tbl);
            }
        }
    }
}

function vote_post(){
    let  clickerId = this.id;
    var vote = this.value;

    vote_post_finisher(clickerId, vote);
}

function vote_post_finisher(id, vote){
    let user = document.getElementById("username").textContent;
    if (user == '' || user == null){
        //document.getElementById("activity").textContent = "You need to Log in before you can continue to vote";
        $('#logSign_modal').modal('show');
        return;
    }
    var index = "-1";
    var add =0;
    if(vote == '0' || vote == '00'){
        index = id.substr(7, id.length - 7);
        add = 1;
        //this.style.color = "green";
    } else if(vote == '1' || vote == '11'){
        index = id.substr(8, id.length - 8);
        add = -1;
        //this.style.color = "red";
    }
    var pid = document.getElementById("postId" + index).value;
    var nid = document.getElementById("newsId" + index).value;
    var mid = document.getElementById("myId" + index).value;


    const Http = new XMLHttpRequest();
    let Url = urlpat + "vote_post?pid=" + pid + "&nid=" + nid + "&mid=" + mid + "&vote=" + vote + "&user=" + user;
    if(vote == "00" || vote == '11'){
        Url = urlpat + "vote_comment?mid=" + mid + "&pid=" + pid + "&nid=" + nid + "&vote=" + vote + "&user=" + user;
    }
    Http.open("Post", Url);
    Http.send();
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if(Http.responseText == 'no_existo') {
                    $('#removed_user').modal('show');
                    return;
                }
            if(Http.responseText != "failed") {
                if(id.substr(0,7) == "arrowLi"){
                    let likes = document.getElementById("likesNum" + index);
                    likes.textContent = "  " + (parseInt(likes.textContent) + add) + " ";
                    document.getElementById("arrowLi" + index).style.color = "purple";

                }else if(id.substr(0,8) == "voteDowD"){
                    let likes = document.getElementById("dislikesNum" + index);
                    likes.textContent = "  " + (parseInt(likes.textContent) + 1) + " ";
                    document.getElementById("voteDowD" + index).style.color = "purple";

                }
                else {
                    let votes = document.getElementById("votes" + index);
                    votes.textContent = (parseInt(votes.textContent) + add) + "";
                    let arrowUp = document.getElementById("arrowUp" + index);
                    let voteDown = document.getElementById("voteDown" + index);
                    if(Http.responseText == "1"){
                        ficha("arrowUp" + index, 1);
                        ficha("arrowUP" + index, 0);
                        ficha("voteDown" + index, 0);
                        ficha("voteDowN" + index, 1);

                    }else if(Http.responseText == "-1"){
                        ficha("arrowUp" + index, 0);
                        ficha("arrowUP" + index, 1);
                        ficha("voteDown" + index, 1);
                        ficha("voteDowN" + index, 0);
                    }else{
                        ficha("arrowUp" + index, 0);
                        ficha("arrowUP" + index, 1);
                        ficha("voteDown" + index, 0);
                        ficha("voteDowN" + index, 1);
                    }
                }
            }
        }
    }
}

function populateSubCounty(county){
    Url = urlpat + "collect_subcounty?county=" + county;
    const Http = new XMLHttpRequest();
    Http.open("Post", Url);
    Http.send();
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const myObj = JSON.parse(Http.responseText);
            subcounties = myObj.subcounties;
            //document.getElementById("countyModalBody").style.display = 'none';
            let tbody = document.getElementById("subCountyModalBody")
            tbody.textContent = "";
            for (var i = 0; i < subcounties.length; i++) {
                let tr = document.createElement("tr");
                tr.id = subcounties[i];
                tr.onclick = show_subCounty;
                tr.appendChild(create_td(i + 1));
                tr.appendChild(create_td(subcounties[i]));
                tbody.appendChild(tr);
            }
        }
    }
}

function logOptions(usr, vill, state, country){
  if(usr == ''){
    document.getElementById("sideLogin").style.display = "block";
    document.getElementById("showUser").style.display = "none";
    document.getElementById("sideWelcome").textContent = "";
    document.getElementById("username").textContent = "";
  }else{
      document.getElementById("username").textContent = usr;
     document.getElementById("showUser").style.display = "block";
     document.getElementById("sideLogin").style.display = "none";
    document.getElementById("sideWelcome").textContent = "Welcome";
  }
  if(state != "" || vill != ""){
        populateSubCounty(state);
    }
    if(state != ''){
      document.getElementById("countyId1").textContent = state;
    }
    if(vill != ""){
      document.getElementById("subCountyId1").textContent = vill;
    }
    document.getElementById("sideBarName").textContent = usr;


}

function logOptionsMob(usr, vill, state, country){
    if(usr == ""){
        document.getElementById("navUserImg").style.display = "none";
        document.getElementById("navWelcome").textContent = "";
        document.getElementById("navUsername").textContent = "";
        document.getElementById("navLogout").style.display = "none";
        document.getElementById("navLogSig").style.display = "block";

    }else{
        document.getElementById("navLogout").style.display = "block";
        document.getElementById("navLogSig").style.display = "none";
        document.getElementById("navUserImg").style.display = "block";
        document.getElementById("navWelcome").textContent = "Welcome";
        document.getElementById("navUsername").textContent = usr;
    }
    //document.getElementById("village").textContent =vill;
    //document.getElementById("state").textContent =state;
    //document.getElementById("village").style.display ="none";
    //document.getElementById("state").style.display ="none";
    if(state != ""){hasloc = true;}
    if(state != "" || vill != ""){
        populateSubCounty(state);
    }
    if(state != ''){
      document.getElementById("countyId").textContent = state;
    }
    if(vill != ""){
      document.getElementById("subCountyId").textContent = vill;
    }
    document.getElementById("username").textContent = usr;
}

function showmore(){
    let iframe = document.getElementById("iframeId");
    iframe.setAttribute("src", this.value);
    $('#exampleModalLong').modal('show');
}

function autoResize_prev(id){
    let t = document.getElementById(id);
    t.style.height = 'auto';
    t.style.height = t.scrollHeight + 'px';

}

function autoResize(){

    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

function create_post_field(){
    let user = document.getElementById("username").textContent;
    let post_div = document.getElementById("create_post");
    post_div.textContent = "";
    let text_div = document.createElement("div");
    text_div.className = "col-6";
    let text_in = document.createElement("input");
    text_in.type = "text";
    text_in.style.fontSize = "12px";
    text_in.className = "form-control";
    text_in.placeholder = "Login or SignUp to post";
    if(user != ""){
        text_div.className = "col-9";
        text_in.placeholder = "create post ...";
        text_in.onclick = show_post_creation;
    }
    text_div.appendChild(text_in);
    post_div.appendChild(text_div);
    let log_div = document.createElement("div");
    log_div.className = "col-3";
    let log_in = document.createElement("input");
    log_in.type = "button";
    log_in.style.fontSize = "12px";
    log_in.className = "form-control";
    log_in.value = "Login";
    log_in.onclick = show_log_modal;
    if(user !=""){
        log_in.value = "post";
        log_in.onclick = show_post_creation;
    }
    log_in.setAttribute("data-toggle", "modal");
    log_in.setAttribute("data-target", "logSign_modal");
    log_div.appendChild(log_in);
    post_div.appendChild(log_div);
    if(user == "") {
        let sig_div = document.createElement("div");
        sig_div.className = "col-3";
        let sig_in = document.createElement("input");
        sig_in.type = "button";
        sig_in.style.fontSize = "12px";
        sig_in.className = "form-control";
        sig_in.setAttribute("data-toggle", "modal");
        sig_in.setAttribute("data-target", "logSign_modal");
        sig_in.value = "SignUp";
        sig_in.onclick = show_log_modal;
        sig_div.appendChild(sig_in);
        post_div.appendChild(sig_div);
    }
}

function show_log_modal(){
    $('#logSign_modal').modal('show');
}

function show_post_creation(){
    let user = document.getElementById("username").textContent;
    if(user == ""){
       $('#logSign_modal').modal('show');
       return;
    }else{
        var obj = new Object();
        obj.name = "Raj";
        obj.age  = 32;
        obj.married = false;
        add_news("0");
    }
    // let post_div = document.getElementById("create_post");
    // post_div.textContent = "";
    // let form1 = document.createElement("div");
    // form1.style.width = "80%";
    // //form1.className = "";
    // let form11 = document.createElement("div");
    // form11.className = "form-group";
    // let text_in = document.createElement("input");
    // text_in.type = "text";
    // text_in.style.fontSize = "13px";
    // text_in.className = "form-control";
    // text_in.placeholder = "title..";
    // text_in.style.marginBottom = "10px";
    // text_in.id = "titlePost";
    // form11.appendChild(text_in);
    // let textarea = document.createElement("textarea");
    // textarea.className = "form-control";
    // textarea.rows = "3";
    // textarea.placeholder = "body...";
    // textarea.style.fontSize = "13px";
    // textarea.addEventListener('input', autoResize, false);
    // textarea.id = "bodyPost";
    // form11.appendChild(textarea);
    // let form1_btn = document.createElement("button");
    // //form1_btn.type = "button";
    // form1_btn.className = "btn btn-primary btn-sm";
    // form1_btn.textContent = "post";
    // form1_btn.onclick = sendReport;
    // let form1_btn2 = document.createElement("button");
    // //form1_btn.type = "button";
    // form1_btn2.className = "btn btn-primary btn-sm";
    // form1_btn2.textContent = "cancel";
    // form1_btn2.onclick = create_post_field;
    // let form1_btn_div = document.createElement("div");
    // form1_btn_div.appendChild(form1_btn2);
    // form1_btn_div.appendChild(form1_btn);
    // form1.appendChild(form11);
    // form1.appendChild(form1_btn_div);
    //
    // post_div.appendChild(form1);
}

function uncheckButtons(){
    document.getElementById("chats_switch").style.backgroundColor = "white";
    document.getElementById("chats_switch").className = "form-control ";
    document.getElementById("news_switch").style.backgroundColor = "white";
    document.getElementById("self_switch").style.backgroundColor = "white";
    document.getElementById("news_switch").className = "form-control ";
     document.getElementById("self_switch").className = "form-control ";

}

function deactivate(id){
    document.getElementById("country1").disabled = false;
    document.getElementById("africa1").disabled = false;
    document.getElementById("global1").disabled = false;
    document.getElementById("country1").classList.remove("white-text");
    document.getElementById("africa1").classList.remove("white-text");
    document.getElementById("global1").classList.remove("white-text");
    document.getElementById("country1").style.backgroundColor ="white";
    document.getElementById("africa1").style.backgroundColor ="white";
    document.getElementById("global1").style.backgroundColor ="white";
    document.getElementById(id).classList.add("white-text");
    document.getElementById(id).style.backgroundColor ="#373737";
    document.getElementById(id).disabled = true;
}

function activate(id){
    //newsFilter = document.getElementById(id).textContent;
    document.getElementById("currloc" + toaloc).textContent = document.getElementById(id).textContent;
    document.getElementById("country" + toaloc).classList.remove("active");
    document.getElementById("africa"+toaloc).classList.remove("active");
    document.getElementById("global"+toaloc).classList.remove("active");
    document.getElementById(id).classList.add("active");

    if(toaloc == "") {
        //document.getElementById("allnews").classList.remove("active");

        document.getElementById("country").style.backgroundColor = "#262626";
        document.getElementById("africa").style.backgroundColor = "#262626";
        document.getElementById("global").style.backgroundColor = "#262626";
        //document.getElementById("allnews").classList.remove("white-text");
        document.getElementById(id).style.backgroundColor = "mediumpurple";
    }
    $('#collapseTwo2').slideToggle('slow');
    $('#dropDownLoc').hide();


}

function activet(id){
    reportLocation = document.getElementById(id).textContent;
    document.getElementById("searchLoc").textContent = reportLocation;
    document.getElementById("village"+ toaloc).classList.remove("active");
    document.getElementById("state"+ toaloc).classList.remove("active");
    document.getElementById("nation"+ toaloc).classList.remove("active");
    document.getElementById(id).classList.add("active");
    if(toaloc == "1") {
        document.getElementById("currloc").textContent = reportLocation;
        return;
    }
    document.getElementById("village").classList.remove("white-text");
    document.getElementById("state").classList.remove("white-text");
    document.getElementById("nation").classList.remove("white-text");
    document.getElementById(id).classList.add("white-text");

}

function stua(id){
    let chatsI = document.getElementById("chats_switchI");
    let newsI = document.getElementById("news_switchI");
    let chatsS = document.getElementById("chats_switchS");
    let newsS = document.getElementById("news_switchS");
    let notifS = document.getElementById("notif_switchS");

    if(id==0){
      //chats.classList.remove("white-text");
      //news.classList.add("white-text");
        ficha("newsLocation", 0);
        ficha("searchCountry", 0);
        ficha("chatsLocation", 1);

        if(pata("chats_switch1").style.display == "block"){
            ficha("chats_switch0",1);
            ficha("chats_switch1",0);
        } else if(pata("chats_switch0").style.display == "none") {
            ficha("chats_switch00",1);
            ficha("chats_switch11",0);
        }
        if(pata("news_switch1").style.display == "block"){
            ficha("news_switch1", 0);
            ficha("news_switch0", 1);
        }else if(pata("news_switch11").style.display == "block"){
            ficha("news_switch11", 0);
            ficha("news_switch00", 1);
        }
        ficha("notif_switch0", 1);
        ficha("notif_switch1", 0);
      chatsS.style.color = "mediumpurple";
      newsS.style.color ="#999999";
        notifS.style.color = "#999999";
    }else if(id == 1){
        ficha("newsLocation", 1);
        ficha("searchCountry", 0);
        ficha("chatsLocation", 0);

        if(pata("chats_switch0").style.display == "block"){
            ficha("chats_switch0",0);
            ficha("chats_switch1",1);
        } else if(pata("chats_switch00").style.display == "block") {
            ficha("chats_switch00",0);
            ficha("chats_switch11",1);
        }

        if(pata("news_switch0").style.display == "block"){
            ficha("news_switch0", 0);
            ficha("news_switch1", 1);
        }else if(pata("news_switch1").style.display == "none"){
            ficha("news_switch00", 0);
            ficha("news_switch11", 1);
        }
        ficha("notif_switch0", 1);
        ficha("notif_switch1", 0);
       //news.classList.remove("white-text");
       //chats.classList.add("white-text");
       chatsS.style.color = "#999999";
      newsS.style.color ="mediumpurple";
        notifS.style.color = "#999999";
    }else if(id == 2) {
        ficha("newsLocation", 0);
        ficha("searchCountry", 0);
        ficha("chatsLocation", 0);

        if(pata("chats_switch0").style.display == "block"){
            ficha("chats_switch0",0);
            ficha("chats_switch1",1);
        } else if(pata("chats_switch00").style.display == "block") {
            ficha("chats_switch00",0);
            ficha("chats_switch11",1);
        }

        if(pata("news_switch1").style.display == "block"){
            ficha("news_switch1", 0);
            ficha("news_switch0", 1);
        }else if(pata("news_switch11").style.display == "block"){
            ficha("news_switch11", 0);
            ficha("news_switch00", 1);
        }
        //news.classList.remove("white-text");
        //chats.classList.add("white-text");
        ficha("notif_switch0", 0);
        ficha("notif_switch1", 1);
        chatsS.style.color = "#999999";
        newsS.style.color = "#999999";
        notifS.style.color = "mediumpurple";
    }
    else{
        if(pata("chats_switch11").style.display == "block" || pata("chats_switch00").style.display == "block"){
            ficha("chats_switch11",1);
            ficha("chats_switch0",0);
            ficha("chats_switch00",0);
            ficha("chats_switch1",0);
        } else{
            ficha("chats_switch11",0);
            ficha("chats_switch0",0);
            ficha("chats_switch00",0);
            ficha("chats_switch1",1);
        }
         if(pata("news_switch00").style.display == "block" || pata("news_switch11").style.display == "block"){
             ficha("news_switch00", 1);
             ficha("news_switch11", 0);
             ficha("news_switch1", 0);
             ficha("news_switch0", 0);
         } else {
             ficha("news_switch00", 0);
             ficha("news_switch11", 0);
             ficha("news_switch1", 0);
             ficha("news_switch0", 1);
         }

        ficha("notif_switch0", 1);
        ficha("notif_switch1", 0);
       chatsS.style.color = "#999999";
      newsS.style.color ="#999999";
        notifS.style.color = "#999999";
    }
    handleBackToTop();

}

function ficha(id, dir){
    if(dir == 0) {
        document.getElementById(id).style.display = "none";
    }else{
        document.getElementById(id).style.display = "block";
    }
}

function new_items_posts(){
    const display = pata("chats_switch0");
    if(display.style.display == "block"){
        if($("#chatsScrollDiv").scrollTop() > 100) {
            ficha("chats_switch0", 0);
            ficha("chats_switch00", 1);
        }
    } else if(pata("chats_switch1").style.display == "block" ){
        ficha("chats_switch1", 0);
        ficha("chats_switch11", 1);
    }


}

function new_items_news(){
    const display = pata("news_switch0");
    if(display.style.display == "block"){
        ficha("news_switch0", 0);
        ficha("news_switch00", 1);
    } else if(pata("news_switch1").style.display == "block" ){
        if($("#newsScrollDiv").scrollTop() > 100) {
            ficha("news_switch1", 0);
            ficha("news_switch11", 1);
        }
    }
}

function hideCHatsNotification(){
    if($("#chatsScrollDiv").scrollTop() < 100) {
        const display = pata("chats_switch00");
        if(display.style.display == "block"){
            ficha("chats_switch0", 1);
            ficha("chats_switch00", 0);
        }
    }
}


function hideNewsNotification(){
    if($("#newsScrollDiv").scrollTop() < 100) {
        const display = pata("news_switch11");
        if(display.style.display == "block"){
            ficha("news_switch1", 1);
            ficha("news_switch11", 0);
        }
    }
}

function showx(x){
    if(x.classList.contains("change")){
        document.getElementById("sidebar").style.width = "0px";
        pata("overContents").style.zIndex = "-1";

    }else{
      document.getElementById("sidebar").style.width = "250px";
      pata("overContents").style.zIndex = "999";
    }

    x.classList.toggle("change");
}

function append_br(p_tag, text){

   if (text.indexOf("<br />") != -1){
        let arr = text.split("<br />");
        if (arr.length == 1){
            p_tag.appendChild(document.createElement("br"));
            p_tag.appendChild(document.createTextNode(arr[0]));
            return p_tag
        }
        else{
           p_tag.appendChild(document.createTextNode(arr[0]));
           for (var i =1; i < arr.length; i++){
                let l = arr[i];
                p_tag.appendChild(document.createElement("br"));
                p_tag.appendChild(document.createTextNode(l));
           }
           return p_tag;

        }
    }
    p_tag.appendChild(document.createTextNode(text));
    return p_tag

}

function create_p_title(p_tag, title){
    let pretext = "https";
    if (title.indexOf(pretext) != -1){
        let arr = title.split(pretext);
        if (arr.length == 1){
            let a_tag = document.createElement("a");
            a_tag.setAttribute("href", pretext + arr[0].split(" ")[0]);
            a_tag.textContent =  pretext + arr[0].split(" ")[0];
            p_tag.appendChild(a_tag);
            let min_arr = arr[0].split(" ");
            min_arr[0] = " ";
            p_tag = append_br(p_tag, min_arr.join(" "));
            return p_tag
        }
        else{
           p_tag = append_br(p_tag, arr[0]);
           for (var i =1; i < arr.length; i++){
                let l = arr[i];
                let a_tag = document.createElement("a");
                a_tag.setAttribute("href", pretext + l.split(" ")[0]);
                a_tag.textContent = pretext + l.split(" ")[0] ;
                p_tag.appendChild(a_tag);
                let min_arr = l.split(" ");
                min_arr[0] = " ";
                p_tag = append_br(p_tag, min_arr.join(" "));
           }
           return p_tag;

        }
    }
    p_tag = append_br(p_tag, title);
    return p_tag

}