from flask import Flask, request

from haliyako import app, db
from haliyako.models import User

levels_dict = {}


@app.route('/', methods=['POST', 'GET'])
def hello_world():
    print(request.method)
    print("I got here")
    return 'Hello World!'


@app.route('/ussd', methods=['POST', 'GET'])
def ussd():
    phoneNumber = request.form.get('phoneNumber')
    text = request.form.get('text')
    serviceCode = request.form.get('serviceCode')
    sessionId = request.form.get('sessionId')
    networkCode = request.form.get('networkCode')
    print(text)
    levels = text.split('*')

    con = "CON "

    response = 'Welcome to Hali Yako\n' \
               'What can we do for you\n' \
               '1. Self Check your symptoms\n' \
               '2. Log your movements\n' \
               '3. Report information'
    if levels[0] != '':

    if levels[0] != '':
        # currlevels = []
        # for l in levels:
        #     if len(currlevels) == 0:
        #         if l in ["1", "2", "3"]:
        #             currlevels.append(l)

        # check if session id is not in levels_dict. If not present, it means we have not gone past level 1
        """if sessionId not in levels_dict:
            if levels[-1] not in ["1", "2", "3"]:
                response = "Invalid choice! Please try again.\n" \
                           + response
            else:
                levels_dict[sessionId] = levels[-1]

                if levels[-1] == "1":
                    response = symptoms(["1"])
        else:
            # get current txt
            valid_text = levels_dict.get(sessionId)
            valid_levels = valid_text.split("*")

            if valid_levels[-1] == "1":
                response = symptoms(valid_levels)

    return con + response"""
    return response

def symptoms(levels):
    if len(levels) == 1:
        response = 'Are you answering for yourself or someone else.\n' \
                   '1. Myself.\n' \
                   '2. Someone else.\n'
    elif len(levels) == 2:
        response = 'CON Where are you located.\n' \
                   'Enter your county name or county code.\n'
        if levels[1] == '2':
            response = 'CON Where are they located.\n' \
                       'Enter their county name or county code.\n'
    elif len(levels) == 3:
        response = 'CON What is your age.'
        if levels[1] == '2':
            response = 'CON What is their age.'
    elif len(levels) == 4:
        response = 'CON What is your gender.\n'
        if levels[1] == '2':
            response = 'CON What is their gender.\n'
        response = response + '1. Male\n' \
                              '2. Female\n'

    elif len(levels) == 5:
        temp = 'you'
        if levels[1] == '2':
            temp = 'they'
        response = 'CON Are ' + temp + ' experiencing any of these symptoms.\n' \
                                       'Enter all symptoms ' + temp + 'are experiencing.\n' \
                                                                      '1. Fever\n' \
                                                                      '2. Dry cough\n' \
                                                                      '3. Fatigue\n' \
                                                                      '4. Shortness of breath\n' \
                                                                      '5. Sore throat\n' \
                                                                      '6. Headache\n' \
                                                                      '7. Nausea\n' \
                                                                      '0. None'
    elif len(levels) == 6:
        if levels[1] == '0':
            response = "END Thank you for taking part in the survey\n" \
                       "If you experience any of these symptoms, please retake the survey as soon as possible.\n" \
                       "Good bye, Tujichunge Pamoja"
        else:
            response = "CON How long have you been experiencing these symptoms\n" \
                       "1. Less than 3 days\n" \
                       "2. Less than 7 days\n" \
                       "3. More than 7 days\n"
    elif len(levels) == 7:
        temp = 'you'
        if levels[1] == '2':
            temp = 'they'
        response = "CON Do " + temp + " have any of the following underlining conditions.\n" \
                                      "1. Hypertension\n" \
                                      "2. Diabetes\n" \
                                      "3. Cardiovascular\n" \
                                      "4. Chronic respiratory\n" \
                                      "5. Cancer\n" \
                                      "0. None"
    else:
        response = "End Thank you you for your participation"
    return response
