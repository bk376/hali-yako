let urlpat = " https://haliyetu.herokuapp.com/";
//let urlpat = " http://localhost:8080";
var mobile = false;
var news_filter = "0";
var hasloc = false;
var reportLocation = "kenya";
var newsFilter = "kenya";
var postTopic = "postTopic";
var toaloc = "1";
var show = false;
var sideBarOpen = false;
jQuery(document).ready(function( $ ) {
    $('#sidebarCollapse').on('click', function () {
        document.getElementById("sidebar").style.width = "250px";
        document.getElementById("navTimesIcon").style.display = "block";
        document.getElementById("menuIcon").style.display = "none";
        sideBarOpen = true;
    });
    $(document).on('click', '#sidebarhide, #navContactUs, #navAboutUs, #navCoronaNumbers, #navLogSig, #navLogout', function(event) {
        document.getElementById("sidebar").style.width = "0px";
        document.getElementById("navTimesIcon").style.display = "none";
        document.getElementById("menuIcon").style.display = "block";
        sideBarOpen = false;
    });
    var currentLocation = window.location;
    urlpat = window.location.href;
    var news_displayed = false;

    if (window.screen.width <= 700) {
        mobile = true;
        postTopic = "postTopic1";
        toaloc = "";
    }
    let user = document.getElementById("username").textContent;
    if(user == ""){if(mobile){logOptionsMob("", "", "", "")}else{logOptions("", "", "", "")}}
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

    $(document).on('click', '#news_switch', function(event) {
        //document.getElementById("news_switch").style.backgroundColor = "#ab47bc";
        //document.getElementById("news_switch").className = "form-control white-text";
        //document.getElementById("self_switch").style.backgroundColor = "white";
        //document.getElementById("chats_switch").style.backgroundColor = "white";
        //document.getElementById("self_switch").className = "form-control ";
        // document.getElementById("chats_switch").className = "form-control ";
        //document.getElementById("mobile_news_div").style.display = "block";
         document.getElementById("corona_updates_div").style.display = 'none';
         document.getElementById("graph_status_div").style.display = 'none';
        //document.getElementById("corona_numbers_div").style.display = 'none';
        document.getElementById("about_us_div").style.display = 'none';
         document.getElementById("self_checker_div").style.display = 'none';
         document.getElementById("contact_us_div").style.display = 'none';
         document.getElementById("news-tab").style.display = "block";

         document.getElementById("toaloc").style.display ="none";
         document.getElementById("village").style.display ="none";
        document.getElementById("state").style.display ="none";
        document.getElementById("nation").style.display ="none";
        document.getElementById("country").style.display ="block";
        document.getElementById("africa").style.display ="block";
        document.getElementById("global").style.display ="block";
        document.getElementById("allnews").style.display ="block";
        document.getElementById("searchLoc").textContent = newsFilter;
        show = false;

    });

    $(document).on('click', '#self_checker, #self_checker_btn, #corona-tab-just, #self_switch, #self_checker_nav', function(event) {
        if(mobile){
            document.getElementById("news-tab").style.display = 'none';
        }else{
             document.getElementById("news-tab").style.display = 'block';
             document.getElementById("corona_updates_div").classList.remove("d-sm-block");

        }

        //document.getElementById("report_covid19_div").style.display = 'none';
         document.getElementById("corona_updates_div").style.display = 'none';
        document.getElementById("graph_status_div").style.display = 'none';
        // document.getElementById("corona_numbers_div").style.display = 'none';
        document.getElementById("about_us_div").style.display = 'none';
         document.getElementById("self_checker_div").style.display = 'block';
         document.getElementById("contact_us_div").style.display = 'none';

    });
    $(document).on('click', '#sideAboutUs, #navAboutUs', function(event) {
        //uncheckButtons();
        //document.getElementById("report_covid19_div").style.display = 'none';
         document.getElementById("corona_updates_div").style.display = 'none';
         document.getElementById("graph_status_div").style.display = 'none';
        //document.getElementById("corona_numbers_div").style.display = 'none';
        document.getElementById("news-tab").style.display = 'none';
         document.getElementById("about_us_div").style.display = 'block';
        document.getElementById("self_checker_div").style.display = 'none';
        document.getElementById("contact_us_div").style.display = 'none';
        //document.getElementById("mobile_news_div").style.display = "none";

    });
    $(document).on('click', '#sideContactUs, #navContactUs', function(event) {
        //uncheckButtons();
        //document.getElementById("report_covid19_div").style.display = 'none';
         document.getElementById("corona_updates_div").style.display = 'none';
         document.getElementById("graph_status_div").style.display = 'none';
        document.getElementById("news-tab").style.display = 'none';
         document.getElementById("about_us_div").style.display = 'none';
        //document.getElementById("corona_numbers_div").style.display = 'none';
        document.getElementById("contact_us_div").style.display = 'block';
        document.getElementById("self_checker_div").style.display = 'none';
        //document.getElementById("mobile_news_div").style.display = "none";

    });

    $(document).on('click', '#sideCoronaNumbers, #navCoronaNumbers', function(event) {
        //uncheckButtons();
         document.getElementById("corona_updates_div").style.display = 'none';
         if(!mobile) {
             document.getElementById("news-tab").style.display = 'block';
         }
         document.getElementById("about_us_div").style.display = 'none';
        document.getElementById("contact_us_div").style.display = 'none';
        document.getElementById("self_checker_div").style.display = 'none';
        document.getElementById("graph_status_div").style.display = 'block';
        //document.getElementById("mobile_news_div").style.display = "none";

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
       uncheck()
       $("html, body").animate({ scrollTop: 0 }, "slow");

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
    $(document).on('click', '#home_btn, #corona_home, #chats_switch, #contactButton', function(event) {
        if(mobile){
            //document.getElementById("chats_switch").style.backgroundColor = "#ab47bc";
            //document.getElementById("chats_switch").className = "form-control white-text";
            // document.getElementById("news_switch").style.backgroundColor = "white";
            // document.getElementById("self_switch").style.backgroundColor = "white";
            // document.getElementById("news_switch").className = "form-control ";
            //  document.getElementById("self_switch").className = "form-control ";
            // document.getElementById("self_checker_div").style.display = 'none';
            // document.getElementById("mobile_news_div").style.display = "none";

        }else{
            document.getElementById("news-tab").style.display = 'block';
        }
        //document.getElementById("report_covid19_div").style.display = 'none';
        document.getElementById("self_checker_div").style.display = 'none';
        document.getElementById("corona_updates_div").style.display = 'block';
       document.getElementById("graph_status_div").style.display = 'none';
       // document.getElementById("corona_numbers_div").style.display = 'none';
        document.getElementById("about_us_div").style.display = 'none';
        document.getElementById("contact_us_div").style.display = 'none';
        if(!hasloc) {
            document.getElementById("toaloc").style.display = "block";
            document.getElementById("nation").style.display = "block";
            document.getElementById("nation").classList.add("active");
        }else {
            document.getElementById("village").style.display = "block";
            document.getElementById("state").style.display = "block";
            document.getElementById("nation").style.display = "block";
            document.getElementById("toaloc").style.display = "none";
        }
        document.getElementById("country").style.display ="none";
        document.getElementById("africa").style.display ="none";
        document.getElementById("global").style.display ="none";
        document.getElementById("allnews").style.display ="none";
        document.getElementById("searchLoc").textContent = reportLocation;
        //$("html, body").animate({ scrollTop: 0 }, "slow");

    });
//  Check if self checker is clicked
  $('#checkMyself').on( 'click', function() {
    $("#selectLocation").show();
    $("#selectLocationQuestion").text("Where are you located?");
    $("#checkerHiddenInput").val(1);
    document.getElementById("checkMyself").disabled = true;
    document.getElementById("checkSomeoneElse").disabled = true;

  });

  $('#checkSomeoneElse').on( 'click', function() {
    $("#selectLocation").show();
    $("#selectLocationQuestion").text("Where are they located?");
    $("#checkerHiddenInput").val(2);
    document.getElementById("checkMyself").disabled = true;
    document.getElementById("checkSomeoneElse").disabled = true;

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
    document.getElementById("isIll").disabled = true;
    document.getElementById("notIll").disabled = true;


    // const ageValue = $('#selectAgeOption')[0].value;
    // if(ageValue != "") {
    //   $("#selectGender").show()
    //   if($('#checkMyself')[0].checked){
    //       $("#selectGenderQuestion").text("What is your gender?")
    //   } else{
    //       $("#selectGenderQuestion").text("What is their gender?")
    //   }
    // }
  });
  $('#notIll').on( 'click', function() {
    $("#contactCovid19").show();
    let msg = "Within the last two weeks did they: ";
        if($('#checkMyself')[0].checked){
          msg = "Within the last two weeks did you: ";
        }
        $("#contactCovid19Message").text(msg);
    document.getElementById("isIll").disabled = true;
    document.getElementById("notIll").disabled = true;
  });

  $('#genderMale').on( 'click', function() {
    $("#genderHiddenInput").val(1);
    $("#selectSymptoms").show();
    if($('#checkMyself')[0].checked){
          $("#selectSymptomsQuestion").text("Are you experiencing any of these symptoms?")
      } else{
          $("#selectSymptomsQuestion").text("Are they experiencing any of these symptoms?")
      }
    document.getElementById("genderMale").disabled = true;
    document.getElementById("genderFemale").disabled = true;
  });

  $('#genderFemale').on( 'click', function() {
    $("#genderHiddenInput").val(2);
    $("#selectSymptoms").show();
    if($('#checkMyself')[0].checked){
          $("#selectSymptomsQuestion").text("Are you experiencing any of these symptoms?")
      } else{
          $("#selectSymptomsQuestion").text("Are they experiencing any of these symptoms?")
      }
    document.getElementById("genderMale").disabled = true;
    document.getElementById("genderFemale").disabled = true;
  });

  $('.selectSymptomsCheckbox').on( 'change', function() {
      var elements = document.getElementsByClassName("selectSymptomsCheckbox");
      if(elements.item(elements.length-1).checked){
          for (var i =0; i < elements.length-1; i++) {
                var elem = elements.item(i);
                elem.checked = false;
              }
      }


    $("#submitSymptomsCheckbox").show();
  });

  $('.selectSevereSymptomsCheckbox').on( 'change', function() {
      var elements = document.getElementsByClassName("selectSevereSymptomsCheckbox");
      if(elements.item(0).checked){
          for (var i =1; i < elements.length; i++) {
                var elem = elements.item(i);
                elem.checked = false;
              }
      }


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
      var elements = document.getElementsByClassName("selectUnderlyingCheckbox");
      if(elements.item(elements.length-1).checked){
          for (var i =0; i < elements.length-1; i++) {
                var elem = elements.item(i);
                elem.checked = false;
              }
      }
    $("#submitUnderlyingCheckbox").show();
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
  });



//  JS for report-covid19.html
  $('#isCountySpecific').on( 'click', function() {
    $("#selectLocationReport").show();
    $("#selectLocationQuestionReport").text("Where are they located?");

  });

  $('.contactCovid').on( 'click', function() {
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
            document.getElementById("toaloc" + toaloc).style.display ="block";
            document.getElementById("village" + toaloc).style.display ="none";
            document.getElementById("state" + toaloc).style.display ="none";


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

});
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
    console.log(currhref);
    if(currhref.includes("http://")){
        console.log("in");
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
                         $('#logSign_modal').modal('hide');
                         document.getElementById("signUp").style.display = "block";
                         document.getElementById("signUpLoader").style.display = "none";

                     }
                 }

             }
         }
     }

}

window.setInterval(function(){
   update_local_news("-1", news_filter);
   add_news("-1");
}, 20000);


function add_news(act){
    let Url = "";
    if(act=="0") {
        let user = document.getElementById("username").textContent;
        if (user == "") return
        let title = document.getElementById(postTopic).value;
        if (title == "") return;
        Url = urlpat + "submit_report?user=" + user + "&title=" + title + "&loc=" + reportLocation;
    }else if(act == "-1"){
        let firstpost = document.getElementById("firstpost");
        if(firstpost == null) {return;}
        Url = urlpat + "filter_county/" + reportLocation + "/" + firstpost.value;
    }else {
        reportLocation = document.getElementById(act).textContent;
        Url = urlpat + "filter_county/"+ reportLocation + "/" + "0";
        document.getElementById("news_div").textContent = "";
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
            if(act == "0") {
                var id = Http.responseText;
                pids.push(id);
                authors.push(document.getElementById("username").textContent);
                titles.push(document.getElementById(postTopic).value);
                votesNUm.push("0");
                repliesNum.push("0");
                $("#"+postTopic).val("");
                document.getElementById(postTopic).setAttribute("row", "1");
            }else{
                const myObj = JSON.parse(Http.responseText);
                authors = myObj.authors;
                repliesNum = myObj.replies;
                titles = myObj.titles;
                pids = myObj.pids;
                votesNUm = myObj.polls;
            }
            if(pids.length > 0){document.getElementById("firstpost").value = pids[0]}

            for(var i=0; i < pids.length; i++) {
                let id = pids[i];
                let card = document.createElement("div");
                card.className = "card";
                card.style.backgroundColor = "#f2f2f2";
                let card_header = document.createElement("div");
                card_header.role = "tab";
                card_header.className = "card-header";
                let row = document.createElement("div");
                row.className = "row";
                let user_img_div = document.createElement("div");
                user_img_div.style.marginTop = "10px";
                user_img_div.className = "col-2";
                let user_img_badge = document.createElement("span");
                user_img_badge.className = "badge badge-pill purple";
                user_img_badge.textContent = authors[i].substr(0, 1).toUpperCase();
                user_img_div.appendChild(user_img_badge);
                row.appendChild(user_img_div);
                let content_div = document.createElement("div");
                content_div.className = "col-10";
                let header_div = document.createElement("div");
                let author = document.createElement('strong');
                author.textContent = authors[i];
                author.style.fontSize = "12px";
                author.className = "d-inline text-muted";
                header_div.style.marginTop = "5px";
                header_div.style.marginBottom = "5px";
                header_div.appendChild(author);
                let arrows_div = document.createElement("div");
                let arrow_up = document.createElement('i');
                arrow_up.className = "d-inline fas fa-arrow-up";
                arrow_up.style.marginRight = "5px";
                arrow_up.value = "0";
                arrow_up.id = "arrowUp_" + id;
                let votes = document.createElement('p');
                votes.id = "votes_" + id;
                votes.className = "d-inline ";
                votes.textContent = votesNUm[i];
                votes.style.fontSize = "12px";
                let vote_down = document.createElement('i');
                vote_down.className = "d-inline fas fa-arrow-down";
                vote_down.style.marginLeft = "5px";
                vote_down.value = "1";
                vote_down.id = "voteDown_" + id;
                arrow_up.onclick = vote_post;
                vote_down.onclick = vote_post;
                arrow_up.style.fontSize = "12px";
                vote_down.style.fontSize = "12px";
                arrows_div.appendChild(arrow_up);
                arrows_div.appendChild(votes);
                arrows_div.appendChild(vote_down);
                arrows_div.className = "d-inline float-right";
                header_div.appendChild(arrows_div);
                content_div.appendChild(header_div);
                var p_title = document.createElement('p');
                p_title.className = "mb-3";
                p_title.style.fontSize = "13px";
                p_title.textContent = titles[i];
                content_div.appendChild(p_title);

                let news_id = document.createElement("input");
                news_id.style.display = "none";
                news_id.id = "newsId_" + id;
                news_id.value = '0';

                let post_id = document.createElement("input");
                post_id.style.display = "none";
                post_id.id = "postId_" + id;
                post_id.value = id;

                let my_id = document.createElement("input");
                my_id.style.display = "none";
                my_id.id = "myId_" + id;
                my_id.value = '0';

                let parent_index = document.createElement("input");
                parent_index.style.display = "none";
                parent_index.id = "parent_" + id;
                parent_index.value = 'news_div';

                let displayed = document.createElement("input");
                displayed.style.display = "none";
                displayed.id = "displayed_" + id;
                displayed.value = "0";

                let vote_div = document.createElement('div');
                vote_div.className = "d-inline float-left";
                vote_div.style.marginTop = "4px";
                let reply_a = document.createElement("a");
                reply_a.className = "collapsed";
                reply_a.setAttribute("data-toggle", "collapse");
                reply_a.setAttribute("data-target", "#collapse_" + id);
                let reply_arrow = document.createElement('i');
                reply_arrow.className = "d-inline fas fa-reply ";
                reply_arrow.textContent = " Reply";
                reply_arrow.style.marginRight = "15px";
                let reply = document.createElement('p');
                reply.className = "d-inline reply-post";
                reply_arrow.id = "replyPost_" + id;
                reply_arrow.onclick = reply_post;
                reply.textContent = " Reply ";
                reply.style.marginRight = "15px";
                reply_arrow.style.fontSize = "13px";
                reply_arrow.style.color = "mediumpurple";
                reply_a.appendChild(reply_arrow);
                vote_div.appendChild(reply_a);
                let comment_a = document.createElement("a");
                comment_a.className = "collapsed";
                comment_a.setAttribute("data-toggle", "collapse");
                comment_a.setAttribute("data-target", "#collapse2_" + id);
                let comment_box = document.createElement('i');
                comment_box.className = "d-inline fas fa-comment-alt ";
                comment_box.id = "replyNumX_" + id;
                comment_box.style.marginRight = "10px";
                comment_box.textContent = "  "+ repliesNum[i] + " replies";
                comment_box.onclick = reply_post;
                comment_box.style.fontSize = "13px";
                comment_box.style.color = "mediumpurple";
                comment_a.appendChild(comment_box);
                vote_div.appendChild(comment_a);
                vote_div.style.marginBottom = "10px";
                content_div.appendChild(vote_div);
                content_div.appendChild(my_id);
                content_div.appendChild(displayed);
                content_div.appendChild(post_id);
                content_div.appendChild(news_id);
                content_div.appendChild(parent_index);
                row.appendChild(content_div);
                card_header.appendChild(row);
                let collapse_div = document.createElement("div");
                collapse_div.style.marginLeft = "12%";
                collapse_div.role = "tabpanel";
                collapse_div.id = "collapse_" + id;
                collapse_div.className = "collapse  mt-0 mb-0";
                let card_body_reply = document.createElement("div");
                card_body_reply.id = "replyBody_" + id;
                let form1 = document.createElement("div");
                let form11 = document.createElement("div");
                form11.className = "form-group";
                let textarea = document.createElement("textarea");
                textarea.className = "form-control";
                textarea.id = "txt_" + id;
                textarea.rows = "1";
                textarea.placeholder = "Log in or Sign Up to comment";
                textarea.style.resize = "none";
                textarea.style.overflow = "hidden";
                textarea.style.fontSize = "13px";
                textarea.addEventListener('input', autoResize, false);
                form11.appendChild(textarea);
                let replybtn_a = document.createElement("a");
                replybtn_a.className = "collapsed";
                replybtn_a.style.marginRight = "10px";
                replybtn_a.setAttribute("data-toggle", "collapse");
                replybtn_a.setAttribute("data-target", "#collapse_" + id);
                let form1_btn = document.createElement("button");
                form1_btn.className = "btn btn-primary btn-sm";
                form1_btn.id = "replySubmitBtn_" + id;
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
                collapse_div2.id = "collapse2_" + id;
                collapse_div2.className = "card-header collapse mt-0 mb-0 pt-0";
                let card_body_comments = document.createElement("div");
                let comments_area = document.createElement("div");
                comments_area.id = "news_div_" + id;
                comments_area.style.marginTop = "10px";
                card_body_comments.appendChild(comments_area);
                collapse_div2.appendChild(card_body_comments);
                card.appendChild(card_header);
                card.appendChild(collapse_div);
                card.appendChild(collapse_div2);
                let accordian_div = document.createElement("div");
                accordian_div.className = "accordion md-accordion";
                accordian_div.role = "tablist";
                accordian_div.id = "accordionEx" + id;
                accordian_div.setAttribute("aria-multiselectable", "true");
                accordian_div.appendChild(card);
                document.getElementById("news_div").prepend(accordian_div);
            }
        }
    }
}


function update_news_table(sel, index) {

        const Http = new XMLHttpRequest();
        let Url = urlpat + "filter_county/" + sel;
        if(index != ""){
            let nid = document.getElementById("newsId" + index).value;
            let pid = document.getElementById("postId" + index).value;
            let myId = document.getElementById("myId" + index).value;
            let user = document.getElementById("username").textContent;
            Url = urlpat + "collect_comments?pid=" + pid + "&nid=" + nid+  "&mid=" + myId + "&user=" + user;
        }
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
                var nids = myObj.nids
                var polls = [];
                polls = myObj.polls;
                const news_div = document.getElementById("news_div" + index);
                news_div.textContent = "";

                let accordian_div = document.createElement("div");
                if(index == "") {
                    accordian_div.className = "accordion md-accordion";
                }else{
                    accordian_div.className = "accordion md-accordion border-bottom-0 border-left";
                }
                accordian_div.role = "tablist";
                accordian_div.id = "accordionEx" + index;
                accordian_div.setAttribute("aria-multiselectable","true");
                for(var i=0; i < nids.length; i++){
                    let card = document.createElement("div");
                    card.className = "card";
                    card.style.backgroundColor = "#f2f2f2";
                    let card_header = document.createElement("div");
                    card_header.role = "tab";
                    card_header.id = "title" + i;
                    if(index == ""){
                       card_header.className = "card-header";

                    }

                    let row = document.createElement("div");
                    row.className = "row";
                    let user_img_div = document.createElement("div");
                    user_img_div.style.marginTop = "5px";
                    //user_img_div.style.marginLeft = "5px";
                    user_img_div.className = "col-2";
                    let user_img_badge = document.createElement("span");
                    user_img_badge.className = "badge badge-pill purple";
                    user_img_badge.textContent = authors[i].substr(0,1).toUpperCase();
                    user_img_div.appendChild(user_img_badge);
                    row.appendChild(user_img_div);

                    let content_div = document.createElement("div");
                    content_div.className = "col-10";

                    let header_div = document.createElement("div");
                    let author = document.createElement('strong');
                    //let author_text = document.createElement("strong");
                    author.textContent = authors[i];
                    author.style.fontSize = "12px";
                    author.className = "d-inline";
                    if (index ==""){
                        header_div.style.marginTop = "5px";
                        header_div.style.marginBottom = "5px";
                    }else{
                        author.style.fontWeight = "bold";
                        author.style.marginBottom = "0";
                    }
                    //author.appendChild(author_text);
                    header_div.appendChild(author);
                    let arrows_div = document.createElement("div");
                    let arrow_up = document.createElement('i');
                    arrow_up.className = "d-inline fas fa-arrow-up";
                    arrow_up.style.marginRight = "5px";
                    arrow_up.value = "0";
                    arrow_up.id = "arrowUp" + index + "_" + i;
                    //arrow_up.style.color = "green";
                    let votes = document.createElement('p');
                    votes.id = "votes" + index + "_" + i;
                    votes.className = "d-inline ";
                    votes.textContent = polls[i];
                    votes.style.fontSize = "12px";
                    let vote_down = document.createElement('i');
                    vote_down.className = "d-inline fas fa-arrow-down";
                    vote_down.style.marginLeft = "5px";
                    vote_down.value = "1";
                    vote_down.id = "voteDown" + index + "_" + i;
                    //vote_down.style.color = "red";
                    arrow_up.onclick = vote_post;
                    vote_down.onclick = vote_post;
                    arrow_up.style.fontSize = "12px";
                    vote_down.style.fontSize = "12px";
                    arrows_div.appendChild(arrow_up);
                    arrows_div.appendChild(votes);
                    arrows_div.appendChild(vote_down);
                    arrows_div.className = "d-inline float-right";
                    header_div.appendChild(arrows_div);
                    content_div.appendChild(header_div);
                    if(index == "") {
                        var p_title = document.createElement('p');
                        p_title.className = "mb-3";
                        p_title.style.fontSize = "13px";
                        //p_title.style.fontWeight = "bold";
                        //let title_text = document.createElement("strong");
                        p_title.textContent = titles[i];
                        //p_title.appendChild(title_text);
                        //content_div.appendChild(p_title);
                    }
                    var p_body = document.createElement('p');
                    //p_body.className = "";
                    p_body.textContent = comments[i];
                    p_body.style.fontSize = "13px";
                    if(index != ""){
                        p_body.style.marginBottom = "4px";
                    }
                    content_div.appendChild(p_body);
                    let news_id = document.createElement("input");
                    news_id.style.display = "none";
                    news_id.id = "newsId" + index + "_" + i;
                    news_id.value = nids[i];

                    let post_id = document.createElement("input");
                    post_id.style.display = "none";
                    post_id.id = "postId" + index + "_" + i;
                    post_id.value = pids[i];

                    let my_id = document.createElement("input");
                    my_id.style.display = "none";
                    my_id.id = "myId"  + index + "_"+ i;
                    my_id.value = mids[i];

                    let parent_index = document.createElement("input");
                    parent_index.style.display = "none";
                    parent_index.id = "parent"  + index + "_"+ i;
                    parent_index.value = index;

                    if(index != ""){
                        arrow_up.value = "00";
                        vote_down.value = "11";
                    }
                    let displayed = document.createElement("input");
                    displayed.style.display = "none";
                    displayed.id = "displayed"  + index + "_"+ i;
                    displayed.value = "0";

                    let replyBoxOpen = document.createElement("input");
                    replyBoxOpen.style.display = "none";
                    replyBoxOpen.id = "replyBoxOpen" + i;
                    replyBoxOpen.value = "0";
                    // comments_div.appendChild(my_id);
                    // comments_div.appendChild(displayed);

                    let vote_div = document.createElement('div');
                    vote_div.className = "d-inline float-left";
                    if(index != ""){
                        vote_div.style.marginTop = "4px";
                    }
                    //vote_down.style.color ="red";
                    //vote_div.appendChild(reply);

                    //let reply_div = document.createElement('div');
                    //reply_div.className = "d-inline reply-post";
                    let reply_a = document.createElement("a");
                    reply_a.className = "collapsed mr-3";
                    reply_a.setAttribute("data-toggle", "collapse");
                    // reply_a.setAttribute("data-parent", "#accordionEx" + index);
                    reply_a.setAttribute("data-target", "#collapse" + index + "_" + i);
                    // reply_a.setAttribute("aria-expanded", "false");
                    // reply_a.setAttribute("aria-controls", "collapse"+ index + "_" + i);
                    let reply_arrow = document.createElement('i');
                    reply_arrow.className = "d-inline fas fa-reply ";
                    if(index==""){reply_arrow.textContent = " Reply";}
                    reply_arrow.style.marginRight = "15px";
                    let reply = document.createElement('p');
                    reply.className = "d-inline reply-post";
                    reply_arrow.id = "replyPost" + index + "_" + i;
                    reply_arrow.onclick = reply_post;
                    if(index == ""){reply.textContent = " Reply ";}
                    reply.style.marginRight = "15px";
                    reply_arrow.style.fontSize = "13px";
                    reply_arrow.style.color = "mediumpurple";
                    reply_a.appendChild(reply_arrow);
                    vote_div.appendChild(reply_a);


                    //let comment_div = document.createElement('div');
                    //comment_div.className = "d-inline pull-right";
                    let comment_a = document.createElement("a");
                    comment_a.className = "collapsed";
                    comment_a.setAttribute("data-toggle", "collapse");
                    // comment_a.setAttribute("data-parent", "#accordionEx" + index);
                    comment_a.setAttribute("data-target", "#collapse2" + index + "_" + i);
                    // comment_a.setAttribute("aria-expanded", "false");
                    // comment_a.setAttribute("aria-controls", "collapse"+ index + "_" + i);
                    let comment_box = document.createElement('i');
                    comment_box.className = "d-inline fas fa-comment-alt ";
                    // let comment_num = document.createElement('p');
                    // comment_num.className = "d-inline ";
                    comment_box.id = "replyNumC" + index + "_" + i;
                    comment_box.style.marginRight = "10px";
                    comment_box.textContent = "  " + replies[i];
                    if(index == ""){comment_box.textContent = "  " + replies[i] + " replies";}
                    // let comment_replies = document.createElement("p");
                    // comment_replies.className = "d-inline";
                    // comment_replies.textContent = " replies";
                    // repliesrepliescomment_replies.style.marginRight = "10px";
                    //comment_div.appendChild(comment_box);
                    //comment_div.appendChild(comment_num);
                    //comment_box.id = "comments" + i;
                    comment_box.onclick = reply_post;
                    comment_box.style.fontSize = "13px";
                    comment_box.style.color = "mediumpurple";
                    comment_a.appendChild(comment_box);
                    vote_div.appendChild(comment_a);
                    vote_div.style.marginBottom = "10px";
                    //vote_div.appendChild(comment_num);
                    //vote_div.appendChild(comment_replies);
                    // vote_div.appendChild(arrow_up);
                    // vote_div.appendChild(votes);
                    // vote_div.appendChild(vote_down);


                    // content_div.appendChild(p_body);
                    //content_div.appendChild(br_space);
                    content_div.appendChild(vote_div);
                    content_div.appendChild(my_id);
                    content_div.appendChild(displayed);
                    content_div.appendChild(replyBoxOpen);
                    content_div.appendChild(post_id);
                    content_div.appendChild(news_id);
                    content_div.appendChild(parent_index);
                    row.appendChild(content_div);
                    card_header.appendChild(row);

                    let collapse_div = document.createElement("div");
                    //collapse_div.style.width = "96%";
                    collapse_div.style.marginLeft = "12%";
                    //collapse_div.style.marginRight = "0";
                    collapse_div.role = "tabpanel";
                    collapse_div.id = "collapse" +  index + "_" + i;
                    // collapse_div.setAttribute("aria-labelledby", "title" + i);
                    // collapse_div.setAttribute("data-parent", "#accordionEx" + index)
                    collapse_div.className = "collapse  mt-0 mb-0";
                    let card_body_reply = document.createElement("div");
                    //card_body_reply.className = "card-body";
                    card_body_reply.id = "replyBody" + index + "_" + i;
                    //card_body_reply.style.display = "none";
                    let form1 = document.createElement("div");
                    //form1.className = "";
                    let form11 = document.createElement("div");
                    form11.className = "form-group";
                    let textarea = document.createElement("textarea");
                    textarea.className = "form-control";
                    textarea.id = "txt" + index + "_" + i;
                    textarea.rows = "1";
                    textarea.placeholder = "Log in or Sign Up to comment";
                    textarea.style.resize = "none";
                    textarea.style.overflow = "hidden";
                    textarea.style.fontSize = "13px";
                    textarea.addEventListener('input', autoResize, false);
                    form11.appendChild(textarea);
                    let replybtn_a = document.createElement("a");
                    replybtn_a.className = "collapsed";
                    replybtn_a.style.marginRight = "15px";
                    replybtn_a.setAttribute("data-toggle", "collapse");
                    // replybtn_a.setAttribute("data-parent", "#accordionEx" + index);
                    replybtn_a.setAttribute("data-target", "#collapse" + index + "_" + i);
                    // replybtn_a.setAttribute("aria-expanded", "false");
                    // replybtn_a.setAttribute("aria-controls", "collapse"+ index + "_" + i);
                    let form1_btn = document.createElement("button");
                    //form1_btn.type = "button";
                    form1_btn.className = "btn btn-primary btn-sm";
                    form1_btn.id = "replySubmitBtn" + index + "_" + i;
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
                    //collapse_div.style.width = "96%";
                    collapse_div2.style.marginLeft = "4%";
                    if(index == ""){
                        //collapse_div2.style.marginRight = "9%";

                    }
                    //collapse_div.style.marginRight = "0";
                    collapse_div2.role = "tabpanel";
                    collapse_div2.id = "collapse2" +  index + "_" + i;
                    // collapse_div2.setAttribute("aria-labelledby", "title" + i);
                    // collapse_div2.setAttribute("data-parent", "#accordionEx" + index)
                    collapse_div2.className = "card-header collapse mt-0 mb-0 pt-0";

                    let card_body_comments = document.createElement("div");
                    //card_body_comments.className = "border-left border-light ";
                    let comments_area = document.createElement("div");
                    comments_area.id ="news_div" + index + "_" + i;
                    comments_area.style.marginTop = "10px";
                    card_body_comments.appendChild(comments_area);
                    collapse_div2.appendChild(card_body_comments);
                    card.appendChild(card_header);
                    card.appendChild(collapse_div);
                    card.appendChild(collapse_div2);
                    accordian_div.appendChild(card);
                    news_div.appendChild(accordian_div);

                    // let br_space = document.createElement("br");
                    // let reply_input_div = document.createElement("div");
                    // reply_input_div.id = "replyBox"+i;
                    // let comments_div = document.createElement("div");
                    // comments_div.id = "post"+i;
                    //
                    // //content_div.appendChild(document.createElement("br"));
                    // content_div.appendChild(reply_input_div);
                    // //content_div.appendChild(document.createElement("br"));
                    // content_div.appendChild(comments_div);
                    //
                    // //row_div.appendChild(user_img_div);
                    // row_div.appendChild(content_div);
                    //
                    // td.appendChild(row_div)
                    // //td.appendChild(content_div);
                    // //td.appendChild(comment_div);



                    //tr.appendChild(td);
                    //tbdy.appendChild(tr);
                }
                //tbl.appendChild(tbdy);
                //news_div.appendChild(tbl);

            }
        }
        // var myObj = JSON.parse('{"data": [{"id": "09", "name":"red"},{"id": "12", "name":"green"}]}');
        // var vals = []
        // vals = myObj.data
        // alert(vals.length)
    }


function update_local_news(index, filter){
        let Url = urlpat + "collect_news?id=" + index + "&filter=" + filter;

        if(index == "-1"){
            Url = urlpat + "collect_news?id=" + document.getElementById("firstnews").value + "&filter=-1";
        }

        const Http = new XMLHttpRequest();
        Http.open("Get", Url);
        Http.send();

        Http.onreadystatechange=function() {
            //alert(this.readyState + "    " + this.status);
            if (this.readyState == 4 && this.status == 200) {
                let s = Http.responseText;
                if (s == "no_mas"){
                    document.getElementById("more_btn_div"+index).textContent = "NO MAS";
                    return;
                }
                if(s == "no_nuevo") return;
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
                const parent = document.getElementById("corona_news_div");
                let appended = false;
                if (filter != news_filter){
                    news_filter = filter;
                    parent.textContent = "";
                }else if(index != "-1"){
                   let prev_btn = document.getElementById("more_btn_div"+index);
                   parent.removeChild(prev_btn);
                }

                let accordian_div = document.createElement("div");
                if(index == "-1" ){
                    appended = true;
                    index = nids[nids.length-1]
                    document.getElementById("firstnews").value = nids[0];
                }
                accordian_div.className = "accordion md-accordion";
                accordian_div.role = "tablist";
                accordian_div.id = "accordionEx" + index;
                accordian_div.setAttribute("aria-multiselectable","true");

                for(var i=0; i < nids.length; i++){
                    let card = document.createElement("div");
                    card.className = "card";
                    card.style.backgroundColor = "#f2f2f2";
                    //card.style.marginTop = "10px";
                    let card_header = document.createElement("div");
                    //card_header.style.backgroundColor = "white";
                    card_header.className = "card-header";
                    let img_row = document.createElement("div");
                    img_row.className = "row";
                    let img_div = document.createElement("div");
                    img_div.className = "col";
                    img_div.style.height = "180px";
                    img_div.style.backgroundImage = "url(" + image_links[i]+ ")";
                    img_div.style.backgroundSize = "cover";
                    let img_text_div = document.createElement("div");
                    img_text_div.className = "card rounded-0 ";
                    img_text_div.style.position = "absolute";
                    img_text_div.style.bottom = "0";
                    img_text_div.style.left ="0";
                    img_text_div.style.borderColor = "#f2f2f2";
                    img_text_div.style.backgroundColor = "#f2f2f2";
                    //img_text_div.style = "position: absolute;bottom: 0;background-color: #f2f2f2";
                    let img_text_body_div = document.createElement("div");
                    img_text_body_div.className = "card-body p-1 mr-1 ml-1";
                    let img_source = document.createElement("small");
                    img_source.className = "p-0 m-0";
                    img_source.textContent = authors[i];
                    img_text_body_div.appendChild(img_source);
                    img_text_div.appendChild(img_text_body_div);
                    img_div.appendChild(img_text_div);
                    img_row.appendChild(img_div);
                    card_header.appendChild(img_row);
                    let news_div = document.createElement("div");
                    let title_a = document.createElement("a");
                    title_a.href = news_links[i];
                    let title_p = document.createElement("p");
                    title_p.textContent = titles[i];
                    title_p.style.fontWeight = "bold";
                    title_p.style.marginBottom = "0";
                    title_p.style.color = "black";
                    title_p.style.fontSize = "15px";
                    title_a.appendChild(title_p);
                    news_div.appendChild(title_a);
                    let body_p = document.createElement("p");
                    body_p.className = "text-muted";
                    body_p.style.marginBottom = "10px";
                    body_p.style.fontSize = "14px";
                    body_p.textContent = comments[i];
                    news_div.appendChild(body_p);
                    let i_div = document.createElement("div");
                    i_div.className = "row";
                    let col1 = document.createElement("div");
                    col1.className = "col-4 m-0 p-0";
                    let more_a = document.createElement("a");
                    more_a.href = news_links[i];
                    more_a.target = "_blank";
                    let more_p = document.createElement("p");
                    more_p.className = "d-inline myIcons";
                    more_p.style.fontSize = "12px";
                    more_p.style.color = "blue";
                    more_p.style.marginRight = "20px";
                    //more_p.onclick = showmore;
                    more_p.textContent = "show more";
                    more_a.appendChild(more_p);
                    col1.appendChild(more_a);
                    i_div.appendChild(col1);
                    let col2 = document.createElement("div");
                    col2.className = "col-2 m-0 p-0";
                    let reply_a = document.createElement("a");
                    reply_a.className = "collapsed";
                    reply_a.style.marginRight = "10px";
                    reply_a.setAttribute("data-toggle", "collapse");
                    reply_a.setAttribute("data-target", "#collapse" + index + "_" + i);
                    let reply_i = document.createElement("i");
                    reply_i.className = "d-inline fas fa-reply myIcons";
                    reply_i.style.fontSize = "12px";
                    reply_i.style.color = "mediumpurple";
                    reply_i.id = "replyPost" + index + "_" + i;
                    reply_i.onclick = reply_post;
                    reply_a.appendChild(reply_i);
                    col2.appendChild(reply_a);
                    i_div.appendChild(col2);
                    let col3 = document.createElement("div");
                    col3.className = "col-2 m-0 p-0";
                    let like_i = document.createElement("i");
                    like_i.className = "d-inline fas fa-thumbs-up myIcons";
                    like_i.style.fontSize = "12px";
                    like_i.style.color = "mediumpurple";
                    like_i.value = "0";
                    like_i.id = "arrowLi" + index + "_" + i;
                    like_i.onclick = vote_post;
                    col3.appendChild(like_i);
                    let like_p = document.createElement("p");
                    like_p.className = "d-inline";
                    like_p.textContent = "  " + likes[i];
                    like_p.style.fontSize = "12px";
                    like_p.style.marginRight = "10px";
                    like_p.style.color = "mediumpurple";
                    like_p.id = "likesNum" + index + "_" + i;
                    col3.appendChild(like_p);
                    i_div.appendChild(col3);
                    let col4 = document.createElement("div");
                    col4.className = "col-2 m-0 p-0";
                    let dislike_i = document.createElement("i");
                    dislike_i.className = "fas fa-thumbs-down myIcons d-inline";
                    dislike_i.style.fontSize = "12px";
                    dislike_i.style.color = "mediumpurple";
                    dislike_i.value = "1";
                    dislike_i.id = "voteDowD" + index + "_" + i;
                    dislike_i.onclick = vote_post;
                    col4.appendChild(dislike_i);
                    let dislike_p = document.createElement("p");
                    dislike_p.className = "d-inline";
                    dislike_p.style.fontSize = "12px";
                    dislike_p.style.color = "mediumpurple";
                    dislike_p.style.marginRight = "10px";
                    dislike_p.textContent = "  " +  dislikes[i];
                    dislike_p.id = "dislikesNum" + index + "_" + i;
                    col4.appendChild(dislike_p);
                    i_div.appendChild(col4);
                    let col5 = document.createElement("div");
                    col5.className = "col-2 m-0 p-0";
                    let comment_a = document.createElement("a");
                    comment_a.className = "collapsed";
                    comment_a.style.marginRight = "10px";
                    comment_a.setAttribute("data-toggle", "collapse");
                    comment_a.setAttribute("data-target", "#collapse2" + index + "_" + i);
                    let comment_i = document.createElement("i");
                    comment_i.className = "d-inline fas fa-comment-alt myIcons";
                    comment_i.style.fontSize = "12px";
                    comment_i.style.color = "mediumpurple";
                    comment_i.textContent = "  " + replies[i];
                    comment_i.id = "replyNumX" + index + "_" + i;
                    comment_i.onclick = reply_post;
                    comment_a.appendChild(comment_i);
                    col5.appendChild(comment_a)
                    i_div.appendChild(col5);
                    news_div.appendChild(i_div);
                    card_header.append(news_div);
                    let news_id = document.createElement("input");
                    news_id.style.display = "none";
                    news_id.id = "newsId" + index + "_" + i;
                    news_id.value = nids[i];
                    card_header.appendChild(news_id);
                    let post_id = document.createElement("input");
                    post_id.style.display = "none";
                    post_id.id = "postId" + index + "_" + i;
                    post_id.value = pids[i];
                    card_header.appendChild(post_id);
                    let my_id = document.createElement("input");
                    my_id.style.display = "none";
                    my_id.id = "myId"  + index + "_"+ i;
                    my_id.value = mids[i];
                    card_header.appendChild(my_id);
                    let displayed = document.createElement("input");
                    displayed.style.display = "none";
                    displayed.id = "displayed"  + index + "_"+ i;
                    displayed.value = "0";
                    card_header.appendChild(displayed);
                    let parent_index = document.createElement("input");
                    parent_index.style.display = "none";
                    parent_index.id = "parent"  + index + "_"+ i;
                    parent_index.value = index;
                    card_header.appendChild(parent_index);
                    let collapse_div = document.createElement("div");
                    collapse_div.style.marginLeft = "12%";
                    collapse_div.role = "tabpanel";
                    collapse_div.id = "collapse" +  index + "_" + i;
                    collapse_div.className = "collapse ";
                    let card_body_reply = document.createElement("div");
                    card_body_reply.id = "replyBody" + index + "_" + i;
                    let form1 = document.createElement("div");
                    let form11 = document.createElement("div");
                    form11.className = "form-group";
                    let textarea = document.createElement("textarea");
                    textarea.className = "form-control";
                    textarea.id = "txt" + index + "_" + i;
                    textarea.rows = "1";
                    textarea.style.resize = "none";
                    textarea.style.overflow = "hidden";
                    textarea.style.fontSize = "13px";
                    textarea.addEventListener('input', autoResize, false);
                    form11.appendChild(textarea);
                    let replybtn_a = document.createElement("a");
                    replybtn_a.className = "collapsed";
                    replybtn_a.style.marginRight = "10px";
                    replybtn_a.setAttribute("data-toggle", "collapse");
                    // replybtn_a.setAttribute("data-parent", "#accordionEx" + index);
                    replybtn_a.setAttribute("data-target", "#collapse" + index + "_" + i);
                    // replybtn_a.setAttribute("aria-expanded", "false");
                    // replybtn_a.setAttribute("aria-controls", "collapse"+ index + "_" + i);
                    let form1_btn = document.createElement("button");
                    //form1_btn.type = "button";
                    form1_btn.className = "btn btn-primary btn-sm";
                    form1_btn.id = "replySubmitBtn" + index + "_" + i;
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
                    //collapse_div.style.width = "96%";
                    collapse_div2.style.marginLeft = "4%";
                    collapse_div2.style.marginRight = "9%";
                    //collapse_div.style.marginRight = "0";
                    collapse_div2.role = "tabpanel";
                    collapse_div2.id = "collapse2" +  index + "_" + i;
                    // collapse_div2.setAttribute("aria-labelledby", "title" + i);
                    // collapse_div2.setAttribute("data-parent", "#accordionEx" + index)
                    collapse_div2.className = "collapse";

                    let card_body_comments = document.createElement("div");
                    //card_body_comments.className = "border-left border-light ";
                    let comments_area = document.createElement("div");
                    comments_area.id ="news_div" + index + "_" + i;
                    comments_area.style.marginTop = "10px";
                    card_body_comments.appendChild(comments_area);
                    collapse_div2.appendChild(card_body_comments);
                    card.appendChild(card_header);
                    card.appendChild(collapse_div);
                    card.appendChild(collapse_div2);
                    accordian_div.appendChild(card);
                    if(!appended){parent.appendChild(accordian_div);}else{parent.prepend(accordian_div)}
                }

                let more_btn_div = document.createElement("div");
                more_btn_div.className= "flex-center mt-5";
                more_btn_div.style.height = "28px";
                more_btn_div.id= "more_btn_div" + nids[nids.length-1];
                let more_btn = document.createElement("button");
                more_btn.className = "btn btn-primary";
                more_btn.textContent = "more";
                more_btn.id= "more_btn" + nids[nids.length-1];
                more_btn.onclick = prev_args_news;
                more_btn_div.appendChild(more_btn);
                if(!appended){parent.appendChild(more_btn_div);}


            }
        }
    }

function prev_args_news(){
    id = this.id.substr(8,this.id.length);
    update_local_news(id,news_filter);
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
            update_news_table(0,"");
            $("#"+postTopic).val("");
            document.getElementById(postTopic).setAttribute("row", "1");

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


function reply_post_prev(id){
    let index = id.substr(9, id.length-9);
    update_news_table(0,index);

}

function reply_post(){
    //let order = this.id.substr(0,9);
    let index = this.id.substr(9, this.id.length-9);
    // if(order == "replyNumC"){
    //     document.getElementById("replyBody" + index).style.display = "none";
    // }else{
    //     document.getElementById("replyBody" + index).style.display = "block";
    // }
    // let parentIndex = document.getElementById("parent" + index).value;
    // if(parentIndex != "" && parentIndex != "_n"){
    //     document.getElementById("replyBody" + parentIndex).style.display = "none";
    // }

    update_news_table(0,index);

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
function submit_comment_prev(id) {
    let user = document.getElementById("username").textContent;
    if (user == '' || user == null){
        //document.getElementById("activity").textContent = "You need to Log in before you can continue to reply";
        $('#logSign_modal').modal('show');
        return;
    }
    let index = id.substr(14, id.length - 14);
    let reply = document.getElementById("txt" + index).value;
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
                document.getElementById("news_div" + index).textContent = "";
                reply.value = "";
                document.getElementById("txt" + index).value = "";
                document.getElementById("displayed" + index).value = "1";
                // document.getElementById("replyPost" + index).click();
                update_news_table(0,index);

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

                if(id =="0" && pid == "0"){
                    let replyNumN = document.getElementById("replyNumX" + index);
                    replyNumN.textContent = "  " + (parseInt(replyNumN.textContent.substr(2, replyNumN.textContent.length - 2)) + 1);

                }else {
                    let replyNumC = null;
                    if(pid !=0 && id == 0){ replyNumC = document.getElementById("replyNumX" + index);}
                    else{replyNumC = document.getElementById("replyNumC" + index);}

                    replyNumC.textContent = "  " + (parseInt(replyNumC.textContent.substr(2, replyNumC.textContent.length - 2)) + 1);
                    if(document.getElementById("myId" + index).value == '0'){
                        replyNumC.textContent = replyNumC.textContent + " replies";
                    }
                }
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
                        arrowUp.style.color = "green";
                        voteDown.style.color = "black";
                    }else if(Http.responseText == "-1"){
                        arrowUp.style.color = "black";
                        voteDown.style.color = "red";
                    }else{
                        arrowUp.style.color = "black";
                        voteDown.style.color = "black";
                    }
                }
            }
        }
    }
}

function logOptions(usr, vill, state, country){
  if(usr == ''){
    document.getElementById("sideLogin").style.display = "block";
    document.getElementById("sideLogout").style.display = "none";
    document.getElementById("sideWelcome").textContent = "";
    document.getElementById("username").textContent = "";
  }else{
      document.getElementById("username").textContent = usr;
     document.getElementById("sideLogout").style.display = "block";
     document.getElementById("sideLogin").style.display = "none";
    document.getElementById("sideWelcome").textContent = "Welcome";
  }
  if(vill != ""){
      document.getElementById("village1").textContent =vill;
      document.getElementById("state1").textContent =state;
      document.getElementById("village1").style.display ="block";
      document.getElementById("toaloc1").style.display ="none";
      document.getElementById("state1").style.display ="block";
  }else{
    document.getElementById("village1").style.display ="none";
      document.getElementById("toaloc1").style.display ="block";
      document.getElementById("state1").style.display ="none";

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
    document.getElementById("village").textContent =vill;
    document.getElementById("state").textContent =state;
    document.getElementById("village").style.display ="none";
    document.getElementById("state").style.display ="none";
    if(vill != ""){hasloc = true;}
    if(show && vill == ""){
        document.getElementById("toaloc").style.display ="block";
    }else if(show && vill != ""){
       document.getElementById("village").style.display ="block";
        document.getElementById("state").style.display ="block";
         document.getElementById("toaloc").style.display ="none";
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

function activate(id){
    newsFilter = document.getElementById(id).textContent;
    document.getElementById("searchLoc").textContent = newsFilter;
    document.getElementById("country" + toaloc).classList.remove("active");
    document.getElementById("africa"+toaloc).classList.remove("active");
    document.getElementById("global"+toaloc).classList.remove("active");
    document.getElementById(id).classList.add("active");
    if(toaloc == "1") return;
    document.getElementById("allnews").classList.remove("active");

    document.getElementById("country").classList.remove("white-text");
    document.getElementById("africa").classList.remove("white-text");
    document.getElementById("global").classList.remove("white-text");
    document.getElementById("allnews").classList.remove("white-text");
    document.getElementById(id).classList.add("white-text");


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
    let chats = document.getElementById("chats_switch");
    let news = document.getElementById("news_switch");
    if(id==0){
      chats.classList.remove("white-text");
      news.classList.add("white-text");
      chats.style.backgroundColor = "#f2f2f2";
      news.style.backgroundColor ="#240938";
    }else{
       news.classList.remove("white-text");
       chats.classList.add("white-text");
       chats.style.backgroundColor = "#240938";
       news.style.backgroundColor ="#f2f2f2";

    }

}

function hideSideNav(){
    document.getElementById("sidebar").style.width = "0px";
    document.getElementById("navTimesIcon").style.display = "none";
    document.getElementById("menuIcon").style.display = "block";

}