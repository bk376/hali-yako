from flask import Flask, request, render_template

from haliyako import app, db
from haliyako.models import User
from haliyako.constants import COUNTIES, SYMPTOMS, UNDERLYING

levels_dict = {}


@app.route('/', methods=['POST', 'GET'])
def home():
    symptoms = SYMPTOMS
    underlying = UNDERLYING
    counties = COUNTIES
    return render_template('index.html', **locals())


@app.route('/ussd', methods=['POST', 'GET'])
def ussd():
    phoneNumber = request.form.get('phoneNumber')
    text = request.form.get('text')
    serviceCode = request.form.get('serviceCode')
    sessionId = request.form.get('sessionId')
    networkCode = request.form.get('networkCode')
    print(text)
    code_home = '00'
    code_back = '0'
    raw = text.split('*')
    levels = []
    if code_home in raw and len(raw) > 1:
        for i in reversed(raw):
            if i == '00':
                break

            else:
                levels.insert(0, i)
    else:
        levels = raw

    if len(levels) == 0:
        levels = ['']

    con = "CON "
    invalid = "*You entered invalid respose\n" \
              "try again\n"
    response = 'Welcome to Hali Yako\n' \
               'What can we do for you\n' \
               '1. Self Check your symptoms\n' \
               '2. Log your movements\n' \
               '3. Report information'

    t_levels = []
    val = False

    if levels[0] != '':
        val = True
        for i, l in enumerate(levels):
            if len(t_levels) == 0:
                if l in ['1', '2', '3']:
                    if i < len(levels) - 1:
                        if levels[i + 1] != '0':
                            t_levels.append(l)
                        elif i + 1 == len(levels) - 1:
                            val = False
                    else:
                        t_levels.append(l)
            else:
                t_levels.append(l)

        if len(t_levels) == 0:
            levels = ['']
        else:
            levels = t_levels
    print(len(levels))
    if levels[0] != '':
        if levels[0] == '1':
            t_response = symptoms(levels)
            if t_response == '':
                response = con + response
            elif t_response == 'invalid':
                response = con + invalid + response
            else:
                response = t_response
        else:
            response = con + invalid + response
    else:
        if val:
            con = con + invalid
        response = con + response
    # if levels[0] != '':
    # currlevels = []
    # for l in levels:
    #     if len(currlevels) == 0:
    #         if l in ["1", "2", "3"]:
    #             currlevels.append(l)

    # check if session id is not in levels_dict. If not present, it means we have not gone past level 1
    # if sessionId not in levels_dict:
    #     if levels[-1] not in ["1", "2", "3"]:
    #         response = "Invalid choice! Please try again.\n" \
    #                    + response
    #     else:
    #         levels_dict[sessionId] = levels[-1]
    #
    #         if levels[-1] == "1":
    #             response = symptoms(["1"])
    # else:
    #     # get current txt
    #     valid_text = levels_dict.get(sessionId)
    #     valid_levels = valid_text.split("*")
    #
    #     if valid_levels[-1] == "1":
    #         response = symptoms(valid_levels)

    return response


def symptoms(r_levels):
    con = "CON "
    levels = [r_levels[0]]
    invalid = False
    if len(r_levels) > 1:
        iterator = iter(r_levels)
        next(iterator)
        for i in iterator:
            siz = len(levels)
            if i == '0':
                if len(levels) != 0:
                    levels.pop()
                    invalid = False
                else:
                    invalid = True
                continue
            if len(levels) == 0:
                if i in ['1',  '2', '3']:
                    levels.append(i)
            elif len(levels) == 1:
                if i in ['1', '2']:
                    levels.append(i)
            elif len(levels) == 2:
                if check_county(i):
                    levels.append(i)
            elif len(levels) == 3:
                if i.isdigit():
                    if 0 < float(i) < 130:
                        levels.append(i)
            elif len(levels) == 4:
                if i in ['1', '2']:
                    levels.append(i)
            elif len(levels) == 5:
                if i in ['1', '2', '3', '4', '5', '6', '7', '8']:
                    levels.append(i)
            elif len(levels) == 6:
                if i in ['1', '2', '3']:
                    levels.append(i)
            elif len(levels) == 7:
                if i in ['1', '2', '3', '4', '5', '6']:
                    levels.append(i)
            if siz == len(levels):
                invalid = True
            else:
                invalid = False
    if invalid:
        con = con + "*You entered an invalid value.\n" \
                    "Try again*\n"
    end = False
    print(invalid)
    if len(levels) == 0:
        response = ''
        if invalid:
            response = 'invalid'
        end = True
    elif len(levels) == 1:
        response = 'Are you answering for yourself or someone else.\n' \
                   '1. Myself.\n' \
                   '2. Someone else.\n'

    elif len(levels) == 2:
        response = 'Where are you located.\n' \
                   'Enter your county name or county code.\n'
        if levels[1] == '2':
            response = 'Where are they located.\n' \
                       'Enter their county name or county code.\n'
    elif len(levels) == 3:
        response = 'What is your age.\n'
        if levels[1] == '2':
            response = 'What is their age.\n'
    elif len(levels) == 4:
        response = 'What is your gender.\n'
        if levels[1] == '2':
            response = 'What is their gender.\n'
        response = response + '1. Male\n' \
                              '2. Female\n'

    elif len(levels) == 5:
        temp = 'you'
        if levels[1] == '2':
            temp = 'they'
        response = 'Are ' + temp + ' experiencing any of these symptoms.\n' \
                                   'Enter all symptoms ' + temp + 'are experiencing.\n' \
                                                                  '1. Fever\n' \
                                                                  '2. Dry cough\n' \
                                                                  '3. Fatigue\n' \
                                                                  '4. Shortness of breath\n' \
                                                                  '5. Sore throat\n' \
                                                                  '6. Headache\n' \
                                                                  '7. Nausea\n' \
                                                                  '8. None of the above\n'
    elif len(levels) == 6:
        if levels[5] == '0':
            end = True
            response = "END Thank you for taking part in the survey\n" \
                       "If you experience any of these symptoms, please retake the survey as soon as possible.\n" \
                       "Good bye, Tujichunge Pamoja"
        else:
            response = "How long have you been experiencing these symptoms\n" \
                       "1. Less than 3 days\n" \
                       "2. Less than 7 days\n" \
                       "3. More than 7 days\n"
    elif len(levels) == 7:
        temp = 'you'
        if levels[1] == '2':
            temp = 'they'
        response = "Do " + temp + " have any of the following underlining conditions.\n" \
                                  "1. Hypertension\n" \
                                  "2. Diabetes\n" \
                                  "3. Cardiovascular\n" \
                                  "4. Chronic respiratory\n" \
                                  "5. Cancer\n" \
                                  "0. None"
    else:
        end = True
        response = "END Thank you you for your participation\n"
    menu = '0: BACK 00: HOME\n'

    if end:
        return response
    return con + response + menu


def check_county(county):
    if county.isdigit():
        code = int(float(county))
        if 0 < code < 48:
            return True
    return False
