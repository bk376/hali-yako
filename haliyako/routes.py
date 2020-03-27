from flask import Flask, request

from haliyako import app, db
from haliyako.models import User


@app.route('/', methods=['POST', 'GET'])
def hello_world():
    print(request.method)
    print("I got here")
    return 'Hello World!'


@app.route('/ussd', methods=['POST', 'GET'])
def ussd():
    print("I got here")
    phoneNumber = request.form.get('phoneNumber')
    text = request.form.get('text')
    serviceCode = request.form.get('serviceCode')
    sessionId = request.form.get('sessionId')
    networkCode = request.form.get('networkCode')
    print(text)
    levels = text.split('*')
    age = -1;
    gender = -1;

    response = 'CON Welcome to Hali Yako\n' \
               'Please enter\n' \
               '1. Male\n' \
               '2. Female'

    if levels[0] != '':
        if len(levels) == 1:
        #     if levels[0] == "1" or levels[0] == "2":
        #         gender = levels[0];
        #     else:
        #
            response = 'CON Please enter your age'
        elif len(levels) == 2:
            response = "CON Reply according to symptom\n" \
                       "1  . Fever\n" \
                       "2. Headache\n" \
                       "3. if both 1 and 2"
        elif len(levels) == 3:
            _gender = levels[0]
            _age = levels[1]
            user = User(phone_number=phoneNumber, age=_age, gender=_gender)
            db.session.add(user)
            db.session.commit()
            if levels[2] == '1':
                response = "END Your risk assment is 50%"
            elif levels[2] == '2':
                response = "END Your risk assesment is 65%"
            elif levels[2] == '3':
                response = "END Your risk assesment is 95%\n" \
                           "Report to the nearest health centre"
            else:
                response = "END you entered invalid number"
    return response
