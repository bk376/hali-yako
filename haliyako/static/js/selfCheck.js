jQuery(document).ready(function( $ ) {
    var currentLocation = window.location;
    if(currentLocation == "http://localhost:8080/") {
        update_news_table(0);
    }
    if(currentLocation == "http://localhost:8080/login" || currentLocation == "http://localhost:8080/register") {
        $(document).on('click', '#self_checker, #corona_updates, #corona_status,#report_covid19', function(event) {
            window.location.href = "http://localhost:8080/";
        });

    }

    $('#corona_updates').on( 'click', function() {
        //$('#graph_status_div').hide();
        //$('#corona_updates_div').show();
        update_news_table(0);
        document.getElementById("report_covid19_div").style.display = 'none';
        document.getElementById("self_checker_div").style.display = 'none';
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
    $(document).on('click', '#self_checker, #self_checker_btn', function(event) {
        document.getElementById("report_covid19_div").style.display = 'none';
         document.getElementById("corona_updates_div").style.display = 'none';
         document.getElementById("graph_status_div").style.display = 'none';
         document.getElementById("self_checker_div").style.display = 'block';
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

    $('#home_btn').on( 'click', function() {
        uncheck();
        document.getElementById("report_covid19_div").style.display = 'none';
        document.getElementById("self_checker_div").style.display = 'none';
        document.getElementById("corona_updates_div").style.display = 'none';
        document.getElementById("graph_status_div").style.display = 'block';
        $("html, body").animate({ scrollTop: 0 }, "slow");

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

    $('#nav_logout').on( 'click', function() {
    const Http = new XMLHttpRequest();
    let Url = "http://localhost:8080/logout"
    Http.open("Get", Url);
    Http.send()
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          logOptions("");
        }
    }
  });



    $('#submitLogInForm').on( 'click', function() {
        //$('#modalLRForm').modal('hide');

       // $('#logIn_form').modal('hide');
        //console.log($('#login_form').serialize());
        $.ajax({
         type: 'POST',
         url: "http://localhost:8080/submit_info",
         data: $('#logIn_form').serialize(),
         success: function(response) {
             if(response == "not_exist"){
                 document.getElementById("error_message").style.display = "block";
             }else{
                 logOptions(response);
                 //$('#logSign_modal').find('textarea,input').val('');
                 $('#logSign_modal').modal('hide');
             }

         },
        error: function() {
             alert("error");
             //$("#commentList").append($("#name").val() + "<br/>" + $("#body").val());
        }
        });
    });

    $('#signUpBtn').on( 'click', function() {
        let pass1 = document.getElementById("form25").value;
        let pass2 = document.getElementById("form26").value;
        if(pass1 != pass2){
            document.getElementById("error_signup").textContent = "*Password dont match";
            return;
        }
        $.ajax({
         type: 'POST',
         url: "http://localhost:8080/register",
         data: $('#signUp_form').serialize(),
         success: function(response) {
                if(response == "username_taken"){
                    document.getElementById("error_signup").textContent = "*username is not available";
                }else{
                    logOptions(response);
                    //$('#logSign_modal').find('textarea,input').val('');
                     $('#logSign_modal').modal('hide');
                }

         },
        error: function() {
             alert("error");
             //$("#commentList").append($("#name").val() + "<br/>" + $("#body").val());
        }
        });

    });

});


// (function($) {
//   function generateBarGraph(wrapper) {
//     // Set Up Values Array
//     var values = [];
//
//     // Get Values and save to Array
//     $(wrapper + ' .bar').each(function(index, el) {
//       values.push($(this).data('value'));
//     });
//
//     // Get Max Value From Array
//     var max_value = Math.max.apply(Math, values);
//
//     // Set width of bar to percent of max value
//     $(wrapper + ' .bar').each(function(index, el) {
//       var bar = $(this),
//           value = bar.data('value'),
//           percent = Math.ceil((value / max_value) * 100);
//
//       // Set Width & Add Class
//       bar.width(percent + '%');
//       bar.addClass('in');
//     });
//   }
//
//   // Generate the bar graph on window load...
//   $(window).on('load', function(event) {
//     alert("in");
//     generateBarGraph('#dashboard-stats');
//   });
// })(jQuery); // Fully reference jQuery after this point.

function update_news_table(sel) {

        const Http = new XMLHttpRequest();
        const Url = "http://localhost:8080/filter_county/" + sel;
        Http.open("Get", Url);
        Http.send()

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
                let vals = [];
                vals = myObj.data;
                const news_div = document.getElementById("news_div");
                news_div.textContent = "";
                var tbl = document.createElement('table');
                tbl.className = "table";
                var tbdy = document.createElement('tbody');
                for(var i=0; i < vals.length; i++){
                    var tr = document.createElement('tr');
                    var td = document.createElement('td');
                    td.id = "td" + i;
                    var p_title = document.createElement('p');
                    let title_text = document.createElement("strong");
                    title_text.textContent = vals[i].title;;
                    p_title.appendChild(title_text);

                    var p_body = document.createElement('p');
                    p_body.className = "";
                    p_body.textContent = vals[i].body;

                    let br_space = document.createElement("br");
                    let reply_input_div = document.createElement("div");
                    reply_input_div.id = "replyBox"+i;
                    let comments_div = document.createElement("div");
                    comments_div.id = "post"+i;

                    let post_id = document.createElement("input");
                    post_id.style.display = "none";
                    post_id.id = "postId" + i;
                    post_id.value = vals[i].id;

                    let my_id = document.createElement("input");
                    my_id.style.display = "none";
                    my_id.id = "myId" + i;
                    my_id.value = "0";

                    let displayed = document.createElement("input");
                    displayed.style.display = "none";
                    displayed.id = "displayed" + i;
                    displayed.value = "0";

                    let replyBoxOpen = document.createElement("input");
                    replyBoxOpen.style.display = "none";
                    replyBoxOpen.id = "replyBoxOpen" + i;
                    replyBoxOpen.value = "0";
                    // comments_div.appendChild(my_id);
                    // comments_div.appendChild(displayed);

                    let vote_div = document.createElement('div');
                    vote_div.className = "d-inline float-right";
                    let arrow_up = document.createElement('i');
                    arrow_up.className = "d-inline fas fa-arrow-up";
                    arrow_up.style.marginRight = "5px";
                    arrow_up.value = "0";
                    arrow_up.id = "arrowUp" + i;
                    //arrow_up.style.color = "green";
                    let votes = document.createElement('p');
                    votes.id = "votes" + i;
                    votes.className = "d-inline ";
                    votes.textContent = vals[i].votes;
                    let vote_down = document.createElement('i');
                    vote_down.className = "d-inline fas fa-arrow-down";
                    vote_down.style.marginLeft = "5px";
                    vote_down.value = "1";
                    vote_down.id = "voteDown" + i;
                    arrow_up.onclick = vote_post;
                    vote_down.onclick = vote_post;
                    //vote_down.style.color ="red";
                    //vote_div.appendChild(reply);

                    //let reply_div = document.createElement('div');
                    //reply_div.className = "d-inline reply-post";
                    let reply_arrow = document.createElement('i');
                    reply_arrow.className = "d-inline fas fa-reply";
                    let reply = document.createElement('p');
                    reply.className = "d-inline reply-post";
                    reply_arrow.id = "replyPost" + i;
                    reply_arrow.onclick = reply_post;
                    reply.textContent = " Reply ";
                    reply.style.marginRight = "10px";
                    //reply_div.appendChild(reply);
                    vote_div.appendChild(reply_arrow);
                    vote_div.appendChild(reply);

                    //let comment_div = document.createElement('div');
                    //comment_div.className = "d-inline pull-right";
                    let comment_box = document.createElement('i');
                    comment_box.className = "d-inline fas fa-comment-alt";
                    let comment_num = document.createElement('p');
                    comment_num.className = "d-inline ";
                    comment_num.id = "replyNum" + i;
                    comment_num.textContent = "  " + vals[i].replies;
                    let comment_replies = document.createElement("p");
                    comment_replies.className = "d-inline";
                    comment_replies.textContent = " replies";
                    comment_replies.style.marginRight = "10px";
                    //comment_div.appendChild(comment_box);
                    //comment_div.appendChild(comment_num);
                    comment_box.id = "comments" + i;
                    comment_box.onclick = show_comments;
                    vote_div.appendChild(comment_box);
                    vote_div.appendChild(comment_num);
                    vote_div.appendChild(comment_replies);
                    vote_div.appendChild(arrow_up);
                    vote_div.appendChild(votes);
                    vote_div.appendChild(vote_down);

                    let content_div = document.createElement("div");
                    content_div.appendChild(p_title);
                    content_div.appendChild(p_body);
                    content_div.appendChild(br_space);
                    content_div.appendChild(vote_div);
                    content_div.appendChild(document.createElement("br"));
                    content_div.appendChild(reply_input_div);
                    content_div.appendChild(document.createElement("br"));
                    content_div.appendChild(comments_div);
                    content_div.appendChild(my_id);
                    content_div.appendChild(displayed);
                    content_div.appendChild(replyBoxOpen);
                    content_div.appendChild(post_id);
                    td.appendChild(content_div);
                    //td.appendChild(comment_div);



                    tr.appendChild(td);
                    tbdy.appendChild(tr);
                }
                tbl.appendChild(tbdy);
                news_div.appendChild(tbl);

            }
        }
        // var myObj = JSON.parse('{"data": [{"id": "09", "name":"red"},{"id": "12", "name":"green"}]}');
        // var vals = []
        // vals = myObj.data
        // alert(vals.length)
    }
    function update_values_of_graph(age,gender,loc){
        const Http = new XMLHttpRequest();
        const Url = "http://localhost:8080/collect_stats?age=" + age + "&gender=" + gender + "&loc=" + loc;
        Http.open("Get", Url);
        Http.send()

        Http.onreadystatechange=function() {
            if (this.readyState == 4 && this.status == 200) {
                const myObj = JSON.parse(Http.responseText + "");
                let values = [];
                values = myObj.data;
                numSavs = document.getElementById("total_surveys_h");
                numSavs.innerHTML = values[0];
                var max_value = Math.max.apply(Math, values);
                var fields = ["total", "fever", "dry cough", "fatigue", "short breath", "sore throat", "headache", "ill"];
                for (var i = 1; i < 8; i++) {
                    var percent = 0;
                    var stat_p = 50;
                    var name_p = 100;
                    if (max_value > 0){
                       var percent = Math.ceil((values[i] / max_value) * 100);
                        var stat_p = 50 + Math.ceil((percent / 100) * 50);
                        var name_p = Math.ceil(5000 / stat_p);

                    }
                    document.getElementById("stat" + (i)).style.width = stat_p + "%";
                    document.getElementById("name" + (i)).style.width = name_p + "%";
                    document.getElementById("name" + (i)).textContent = fields[i] + ": " + percent + "%";

                }


            }
        }
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

    console.log($('#submit_survey_form').serialize());
    $.ajax({
         type: 'POST',
         url: "http://localhost:8080/submit_survey",
         data: $('#submit_survey_form').serialize(),
         success: function(response) {
             update_values_of_graph(0,0,0);
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
    var elems  = document.getElementById('submit_report_form').elements;

    $.ajax({
         type: 'POST',
         url: "http://localhost:8080/submit_report",
         data: $('#submit_report_form').serialize(),
         success: function(response) {
             update_news_table(0);
         },
        error: function() {
             //$("#commentList").append($("#name").val() + "<br/>" + $("#body").val());
        }
        });

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



function reply_post(){
    let index = this.id.substr(9, this.id.length-9);
    let tdElement = document.getElementById("replyBox" + index);
    let replyBoxOpen = document.getElementById("replyBoxOpen"+index);
    if(replyBoxOpen.value == '1'){
        replyBoxOpen.value = '0';
        tdElement.textContent = "";
    }else {
        replyBoxOpen.value = '1';
        let div_outer = document.createElement("div");
        //div_outer.className = "form-group";
        let div_txt = document.createElement("div");
        div_txt.className = "form-group";
        let txt = document.createElement("textarea");
        //txt.type ="text";
        txt.className = "form-control";
        txt.name = "title";
        txt.placeholder = "comment here..."
        txt.rows = 1;
        txt.id = "txt" + index;
        let btn = document.createElement("button");
        btn.className = "btn-primary float-right btn-sm";
        btn.textContent = "reply";
        btn.id = "replySubmitBtn" + index;
        btn.onclick = submit_comment;


        div_txt.appendChild(txt);
        div_outer.appendChild(div_txt);
        div_outer.appendChild(btn);
        tdElement.appendChild(document.createElement("br"));
        tdElement.appendChild(div_outer);
        tdElement.appendChild(document.createElement("br"));

        //fetch comments from database and display
    }
}

function submit_comment() {
    let user = document.getElementById("username").textContent;
    if (user == '' || user == null){
        document.getElementById("activity").textContent = "You need to Log in before you can continue to reply";
        $('#notSignedIn').modal('show');
        return;
    }
    let index = this.id.substr(14, this.id.length - 14);
    let reply = document.getElementById("txt" + index).value;
    if (reply != '') {
        let author = user;
        let msg = reply;
        let id = document.getElementById("myId" + index).value;
        let pid = document.getElementById("postId" + index).value;
        const Http = new XMLHttpRequest();
        const Url = "http://localhost:8080/comment?author=" + author + "&msg=" + msg + "&id=" + id + "&pid=" + pid;
        Http.open("Get", Url);
        Http.send()
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //alert(Http.responseText);
                let tdElement = document.getElementById("replyBox" + index);
                let replyBoxOpen = document.getElementById("replyBoxOpen"+index);
                replyBoxOpen.value = '0';
                tdElement.textContent = "";
                let displayed = document.getElementById("displayed"+index);
                if(displayed.value == '0') {
                    show_comments(index);
                }else{
                    let comment_div = document.getElementById("post"+index);
                    comment_div.textContent = "";
                    displayed.value = '0';
                    show_comments(index);
                }
                let replyNum = document.getElementById("replyNum" + index);
                replyNum.textContent = "  " + (parseInt(replyNum.textContent.substr(2, replyNum.textContent.length-2)) + 1);

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
        const Url = "http://localhost:8080/collect_comments?pid=" + pid + "&id=" + myId + "&user=" + user;
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
                tbdy.className = "border-left border-bottom border-light rounded mb-0";
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
    let user = document.getElementById("username").textContent;
    if (user == '' || user == null){
        document.getElementById("activity").textContent = "You need to Log in before you can continue to vote";
        $('#notSignedIn').modal('show');
        return;
    }
    var vote = this.value;
    var index = "-1";
    var add =0;
    if(vote == '0' || vote == '00'){
        index = this.id.substr(7, this.id.length - 7);
        add = 1;
    } else if(vote == '1' || vote == '11'){
        index = this.id.substr(8, this.id.length - 8);
        add = -1;
    }
    var id = document.getElementById("postId" + index).value;


    const Http = new XMLHttpRequest();
    let Url = "http://localhost:8080/vote_post?id=" + id + "&vote=" + vote + "&user=" + user;
    if(vote == "00" || vote == '11'){
        let pid = id;
        id = document.getElementById("myId" + index).value;
        Url = "http://localhost:8080/vote_comment?id=" + id + "&pid=" + pid + "&vote=" + vote + "&user=" + user;
    }
    Http.open("Post", Url);
    Http.send()
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if(Http.responseText == "success") {
                let votes = document.getElementById("votes" + index);
                votes.textContent = (parseInt(votes.textContent) + add) + "";
            }
        }
    }
}

function logOptions(usr){
  if(usr == ''){
    document.getElementById("logout_nav").style.display = "none";
    document.getElementById("login_nav").style.display = "block";
    document.getElementById("username").textContent = "";
  }else{
      document.getElementById("logout_nav").style.display = "block";
     document.getElementById("login_nav").style.display = "none";
     document.getElementById("username").textContent = usr;
     document.getElementById("navbarDropdownMenuLink1").textContent = usr;
  }
}

