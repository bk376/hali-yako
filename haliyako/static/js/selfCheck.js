jQuery(document).ready(function( $ ) {
//  Check if self checker is clicked
  $('#selfCheckSymptoms').on( 'click', function() {
    $("#selectCheckerParent").show();
  });

  $('#checkMyself').on( 'click', function() {
    $("#selectLocation").show();
    $("#selectLocationQuestion").text("Where are you located?")
  });

  $('#checkSomeoneElse').on( 'click', function() {
    $("#selectLocation").show();
    $("#selectLocationQuestion").text("Where are they located?")
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
    }
  });

  $('#genderMale').on( 'click', function() {
    $("#selectSymptoms").show();
  });

  $('.selectSymptomsCheckbox').on( 'change', function() {
    $("#submitSymptomsCheckbox").show();
  });

  $('#submitSymptomsCheckbox').on( 'click', function() {
    $("#selectSymptomsPeriod").show();
  });

  $('.symptomsPeriodValue').on( 'click', function() {
    $("#selectUnderlyingCondition").show();
  });

   $('.selectUnderlyingCheckbox').on( 'change', function() {
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
