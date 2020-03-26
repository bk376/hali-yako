from flask import Flask
from flask import request

app = Flask(__name__)


@app.route('/', methods=['POST','GET'])
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
    response = 'CON Welcome to Hali Yako\n' \
               'Please enter your county code'

    if(levels[0] != ''):
        if(len(levels) == 1):
            response = 'CON Please enter your age'
        elif(len(levels) == 2):
            response = "CON Reply according to symptom\n" \
                       "1. Fever\n" \
                       "2. Headache\n" \
                       "3. if both 1 and 2"
        elif(len(levels) == 3):
            if(levels[2] == '1'):
                response = "END Your risk assment is 50%"
            elif(levels[2] == '2'):
                response = "END Your risk assesment is 65%"
            elif(levels[2] == '3'):
                response = "END Your risk assesment is 95%\n" \
                           "Report to the nearest health centre"
            else:
                response = "END you entered invalid number"
        # return response
    return response


if __name__ == '__main__':
    app.run()
