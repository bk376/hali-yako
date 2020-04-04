jQuery(document).ready(function( $ ) {
    var currentLocation = window.location;
    if(currentLocation == "http://localhost:8080/") {
        update_values_of_graph(0,0,0)
    }

    $('#corona_updates').on( 'click', function() {
        //$('#graph_status_div').hide();
        //$('#corona_updates_div').show();
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
        document.getElementById("goodbye_message").style.display = "block";
        const good_bye = document.getElementById("btn_container");
        good_bye.style.display='block';
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
  });

  $('#checkSomeoneElse').on( 'click', function() {
    $("#selectLocation").show();
    $("#selectLocationQuestion").text("Where are they located?");
    $("#checkerHiddenInput").val(2);
  });

  $('#selectCountyOption').on( 'change', function() {
    const countyValue = $('#selectCountyOption')[0].value;
    if(countyValue != "") {
      $("#selectAge").show()
      if($('#checkMyself')[0].checked){
          $("#selectAgeQuestion").text("What is your age?")
      } else{
          $("#selectAgeQuestion").text("What is their age?")
      }
    }
  });

  $('#selectAgeOption').on( 'change', function() {
    const ageValue = $('#selectAgeOption')[0].value;
    if(ageValue != "") {
      $("#selectGender").show()
      if($('#checkMyself')[0].checked){
          $("#selectGenderQuestion").text("What is your gender?")
      } else{
          $("#selectGenderQuestion").text("What is their gender?")
      }
    }
  });

  $('#genderMale').on( 'click', function() {
    $("#genderHiddenInput").val(1);
    $("#selectSymptoms").show();
    if($('#checkMyself')[0].checked){
          $("#selectSymptomsQuestion").text("Are you experiencing any of these symptoms?")
      } else{
          $("#selectSymptomsQuestion").text("Are they experiencing any of these symptoms?")
      }
  });

  $('#genderFemale').on( 'click', function() {
    $("#genderHiddenInput").val(2);
    $("#selectSymptoms").show();
    if($('#checkMyself')[0].checked){
          $("#selectSymptomsQuestion").text("Are you experiencing any of these symptoms?")
      } else{
          $("#selectSymptomsQuestion").text("Are they experiencing any of these symptoms?")
      }
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

  $('#submitSymptomsCheckbox').on( 'click', function() {
     var elements = document.getElementsByClassName("selectSymptomsCheckbox");
     if(elements.item(elements.length-1).checked){
         $("#selectUnderlyingCondition").show();
        let msg = "Do they have any of the following underlining conditions?";
        if($('#checkMyself')[0].checked){
          msg = "Do you have any of the following underlining conditions?";
        }
        $("#underlyingConditionQuestion").text(msg);
     }else{

        $("#selectSymptomsPeriod").show();
        let msg = "How long have they been experiencing these symptoms?";
        if($('#checkMyself')[0].checked){
          msg = "How long have you been experiencing these symptoms?";
        }
        $("#symptomsPeriodQuestion").text(msg);
     }


  });

  $('.symptomsPeriodValue').on( 'click', function() {
    $("#selectUnderlyingCondition").show();
    let msg = "Do they have any of the following underlining conditions?";
    if($('#checkMyself')[0].checked){
      msg = "Do you have any of the following underlining conditions?";
    }
    $("#underlyingConditionQuestion").text(msg);
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
    $('#submitSelfCheck').prop('disabled', false);
  });



//  JS for report-covid19.html
  $('#isCountySpecific').on( 'click', function() {
    $("#selectLocationReport").show();
    $("#selectLocationQuestionReport").text("Where are they located?");

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
                tbl.className = "table"
                var tbdy = document.createElement('tbody');
                for(var i=0; i < vals.length; i++){
                    var tr = document.createElement('tr');
                    var td = document.createElement('td');
                    var p_title = document.createElement('p');
                    p_title.className = "title";
                    p_title.textContent = vals[i].title;
                    var p_body = document.createElement('p');
                    p_body.className = "text-muted";
                    p_body.textContent = vals[i].body;
                    td.appendChild(p_title);
                    td.appendChild(p_body);
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
    console.log($('#submit_survey_form').serialize());
    $.ajax({
         type: 'POST',
         url: "http://localhost:8080/submit_survey",
         data: $('#submit_survey_form').serialize(),
         success: function(response) {
             update_values_of_graph(0,0,0);
         },
        error: function() {
             //$("#commentList").append($("#name").val() + "<br/>" + $("#body").val());
        }
        });

    document.getElementById("checkMyself").checked = false;
    document.getElementById("checkSomeoneElse").checked = false;
    document.getElementById("selectCountyOption").selectedIndex =0;
    document.getElementById("selectAgeOption").selectedIndex =0;
    document.getElementById("genderMale").checked = false;
    document.getElementById("genderFemale").checked = false;
    document.getElementById("lessThan3").checked = false;
    document.getElementById("lessThan7").checked = false;
    document.getElementById("moreThan7").checked = false;
    let elemes = document.getElementsByClassName("selectSymptomsCheckbox");
    for (var i=0; i < elemes.length; i++){
        elemes[i].checked = false;
    }
    let elems = document.getElementsByClassName("selectUnderlyingCheckbox");
    for (var i=0; i < elems.length; i++){
        elems[i].checked = false;
    }
    document.getElementById("selectLocation").style.display = 'none';
    document.getElementById("selectAge").style.display = 'none';
    document.getElementById("selectGender").style.display = 'none';
    document.getElementById("selectSymptoms").style.display = 'none';
    document.getElementById("selectSymptomsPeriod").style.display = 'none';
    document.getElementById("selectUnderlyingCondition").style.display = 'none';
    document.getElementById("goodbye_message").style.display = 'none';
    document.getElementById("btn_container").style.display = 'none';
    document.getElementById("submitUnderlyingCheckbox").style.display = 'none';
    document.getElementById("submitSymptomsCheckbox").style.display = 'none';

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