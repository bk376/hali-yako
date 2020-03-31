jQuery(document).ready(function( $ ) {
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
    $("#submitSymptomsCheckbox").show();
  });

  $('#submitSymptomsCheckbox').on( 'click', function() {
    $("#selectSymptomsPeriod").show();
    let msg = "How long have they been experiencing these symptoms?";
    if($('#checkMyself')[0].checked){
      msg = "How long have you been experiencing these symptoms?";
    }
    $("#symptomsPeriodQuestion").text(msg);
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
