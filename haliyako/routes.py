import threading

from flask import request, render_template, flash, redirect, url_for, json, jsonify
from flask_login import login_user, current_user, logout_user, login_required
from jinja2 import TemplateNotFound
from sqlalchemy import desc

from haliyako import app, db, bcrypt
from haliyako.constants import COUNTIES, SYMPTOMS, UNDERLYING, SEVERE_SYMPTOMS
from haliyako.covid19_google_scraper import kenya_covid19_news
from haliyako.covid_api import current_covid19_numbers
from haliyako.forms import RegistrationForm, LoginForm
from haliyako.models import User, Update, Local, Person, Comment

news_kenya = []
covid_status = {}


@app.route('/register', methods=['POST', 'GET'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for("home"))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = Person(username=form.username.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        next_page = request.args.get('next')
        login_user(user, remember=True)
        print(f"Sign up successfull")
        flash(f'Your account has been created!', 'success')
        return redirect(next_page) if next_page else redirect(url_for("home"))
    return render_template('register.html', title='Register', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("home"))
    form = LoginForm()
    if form.validate_on_submit():
        user = Person.query.filter_by(username=form.username.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            next_page = request.args.get('next')
            login_user(user, remember=form.remember.data)
            return redirect(next_page) if next_page else redirect(url_for("home"))
        else:
            flash("Login unsuccessful. Please check username and password", 'danger')
    return render_template('login.html', title='Login', form=form)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for("home"))


@app.route('/nav', methods=['POST', 'GET'])
def nav():
    news_kenya_now = news_kenya
    covid_numbers = covid_status
    kenya_numbers = list(filter(lambda country: country['country'] == 'Kenya', covid_numbers))[0]
    world_numbers = list(filter(lambda country: country['country'] == 'All', covid_numbers))[0]
    print(news_kenya_now[0])
    return render_template('sidenav-navbar.html', **locals())


@app.route('/trend_county', methods=['POST', 'GET'])
def trend_county():
    symptoms = SYMPTOMS
    underlying = UNDERLYING
    counties = COUNTIES
    form = request.form
    news = []
    if request.method == 'POST':
        print(form.get('welcomeSelfCheck'))
        print("form was submitted")
        county = form.get('countyName')
        news = Local.query.filter(Local.body != '').filter_by(county=county).order_by(desc(Local.time_stamp)).all()

    return render_template('trending-county.html', **locals())


@app.route('/filter_county/<county_code>', methods=['POST', 'GET'])
def filter_county(county_code):
    counties = COUNTIES
    print(county_code)
    news = []
    if county_code == '0':
        news = Local.query.filter(Local.body != '').order_by(desc(Local.time_stamp)).all()
    else:
        news = Local.query.filter(Local.body != '').filter_by(county=county_code).order_by(desc(Local.time_stamp)).all()
    # create json file
    json_file = '{ "data": ['
    for i, n in enumerate(news):
        replies = Comment.query.filter(Comment.post_id == n.id).count()
        json_file += '{ "title": ' + '"' + n.title + '", "body": "' + n.body + '", "id": "' + str(n.id) +\
                     '", "votes": "' + str(n.vote_up-n.vote_down) + '", "replies": "' + str(replies) + '"}'
        if i < len(news) - 1:
            json_file += ','

    json_file += "]}"
    return json_file


@app.route('/submit_survey', methods=['POST'])
def submit_survey():
    form = request.form
    county_code = form.get('selectCountyOption')
    age = form.get('selectAgeOption')
    symptomslist = form.getlist('symptomslist') + form.getlist("severe_symptomslist")
    symptoms_str = "&".join(symptomslist)
    underlyinglist = form.getlist("underlyinglist")
    print(symptoms_str)
    underlying_str = "&".join(underlyinglist)
    gender = form.get('genderHiddenInput')
    other = form.get("checkerHiddenInput")
    dummy_phone = "0000000000"
    if symptoms_str == 'None':
        symptoms_str = ''
    if underlying_str == 'None of the above':
        underlying_str = ''
    if county_code == '':
        county_code = '0'

    user = User(phone_number=dummy_phone, other=other, county=county_code,
                age=age, gender=gender, symptoms=symptoms_str, underlying=underlying_str)
    db.session.add(user)
    db.session.commit()
    print("sucess survey saved")
    return "success"


@app.route('/corona-updates.html', methods=['POST', 'GET'])
def corona_updates():
    symptoms = SYMPTOMS
    underlying = UNDERLYING
    counties = COUNTIES
    form = request.form
    news = Local.query.filter(Local.body != '').order_by(desc(Local.time_stamp)).all()
    if request.method == 'POST':
        print(form.get('welcomeSelfCheck'))
        print("form was submitted")
    return render_template('corona-updates.html', **locals())


@app.route('/<template>', methods=['POST', 'GET'])
def route_template(template):
    symptoms = SYMPTOMS
    underlying = UNDERLYING
    counties = COUNTIES
    news = Local.query.filter(Local.body != '').order_by(desc(Local.time_stamp)).all()
    try:
        return render_template(template + '.html', **locals())
    except TemplateNotFound:
        return render_template('page-404.html'), 404

    except:
        return render_template('page-500.html'), 500


@app.route('/self_checker', methods=['POST', 'GET'])
def self_checker():
    symptoms = SYMPTOMS
    underlying = UNDERLYING
    counties = COUNTIES
    form = request.form
    if request.method == 'POST':
        county_code = form.get('selectCountyOption')
        age = form.get('selectAgeOption')
        symptomslist = form.getlist('symptomslist')
        symptoms_str = "&".join(symptomslist)
        underlyinglist = form.getlist("underlyinglist")
        underlying_str = "&".join(underlyinglist)
        gender = form.get('genderHiddenInput')
        other = form.get("checkerHiddenInput")
        dummy_phone = "0000000000"
        user = User(phone_number=dummy_phone, other=other, county=county_code,
                    age=age, gender=gender, symptoms=symptoms_str, underlying=underlying_str)
        db.session.add(user)
        db.session.commit()
        flash("Thank you for taking the survey. Stay tuned for real update", "success")

    return render_template('self-checker.html', **locals())


@app.route('/submit_report', methods=['POST'])
def submit_report():
    form = request.form
    county = form.get('countyName')
    if county == '':
        county = '0'

    source = form.get('usr')
    if source == '':
        source = 'usr'
    title = form.get('title')
    body = form.get('body')
    local = Local(title=title, body=body, source=source,
                  vote_up=0, vote_down=0, vote_flat=0, county=county, official=0)
    db.session.add(local)
    db.session.commit()
    return "success"


@app.route('/report_covid19', methods=['POST', 'GET'])
def report_covid19():
    symptoms = SYMPTOMS
    underlying = UNDERLYING
    counties = COUNTIES
    form = request.form
    if request.method == 'POST':
        county = form.get('countyName')
        if county == '':
            county = '0'

        source = form.get('usr')
        if source == '':
            source = 'usr'
        title = form.get('title')
        body = form.get('body')
        local = Local(title=title, body=body, source=source,
                      vote_up=0, vote_down=0, vote_flat=0, county=county, official=0)
        db.session.add(local)
        db.session.commit()
        news = Local.query.filter(Local.body != '').order_by(desc(Local.time_stamp)).all()

        return render_template('corona-updates.html', **locals())

    return render_template('report-covid19.html', **locals())


@app.route('/collect_updates', methods=['POST', 'GET'])
def collect_updates():
    news = Local.query.filter(Local.body != '').order_by(desc(Local.time_stamp)).all()
    json_file = '{ "data": ['
    for i, n in enumerate(news):
        json_file += '{ "title": ' + '"' + n.title + '", "body": "' + n.body + '"}'
        if i < len(news) - 1:
            json_file += ','

    json_file += "]}"
    return json_file

@app.route('/vote_post', methods=['POST', 'GET'])
def vote_post():
    vote = request.args.get('vote', None)
    id = request.args.get('id', None)
    post = Local.query.filter(Local.id == int(float(id))).first()
    if vote == '0':
        post.vote_up += 1
    elif vote == '1':
        post.vote_down += 1
    db.session.add(post)
    db.session.commit()
    print(vote + " " + id)
    return "sucess"

@app.route('/vote_comment', methods=['POST', 'GET'])
def vote_comment():
    vote = request.args.get('vote', None)
    id = request.args.get('id', None)
    curr_comment = Comment.query.filter(Comment.id == int(float(id))).first()
    if vote == '00':
        curr_comment.vote_up += 1
    elif vote == '11':
        curr_comment.vote_down += 1

    curr_comment.save()
    print(vote + " " + id)
    return "sucess"

@app.route('/collect_comments', methods=['POST', 'GET'])
def collect_comment():
    post_id = request.args.get('pid', None)
    my_id = request.args.get('id', None)
    print(my_id)
    pid = int(float(post_id));
    if my_id == '0':
        comments_all = Comment.query.filter(Comment.post_id == pid).filter(Comment.parent_id == None).order_by(Comment.path).all()
    else:
        parent_id = int(float(my_id))
        comments_all = Comment.query.filter(Comment.post_id == pid).filter(Comment.parent_id == parent_id).order_by(Comment.path).all()

    comments = []
    levels = []
    ids = []
    votes = []
    replies = []
    comments_list = []
    for comment in comments_all:
        print('{}{}: {}'.format('  ' * comment.level(), comment.author, comment.text))
        comments.append(comment.text)
        levels.append(str(comment.level()))
        ids.append(str(comment.id))
        votes.append(str(comment.vote_up-comment.vote_down))
        replies.append(str(Comment.query.filter(Comment.parent_id == comment.id).count()))
    print("sucess returning json")
    return jsonify({"comments":comments, "levels":levels, "ids": ids, "polls":votes, "replies":replies})


@app.route('/comment', methods=['POST', 'GET'])
def comment():
    author = request.args.get('author', None)
    parent_id = request.args.get('id', None)
    msg = request.args.get('msg', None)
    post_id = request.args.get('pid', None)
    if parent_id == '0':
        c1 = Comment(text=msg, author=author, post_id=post_id, vote_up=0, vote_down=0)
    else:
        parent = Comment.query.filter(Comment.id == int(float(parent_id))).all()
        c1 = Comment(text=msg, author=author, parent=parent[0], post_id=post_id, vote_up=0, vote_down=0)

    c1.save()

    print(author + ' ' + parent_id + ' ' + msg)
    return 'success comment saved'


@app.route('/collect_stats', methods=['POST', 'GET'])
def collect_stats():
    age = request.args.get('age', None)
    gender = request.args.get('gender', None)
    loc = request.args.get('loc', None)
    users = []
    if age != '0':
        users = User.query.filter(User.age == age).all()
    elif gender != '0':
        users = User.query.filter(User.gender == gender).all()
    elif loc != '0':
        users = User.query.filter(User.county == loc).all()
    else:
        users = User.query.all()

    fever = 0
    cough = 0
    fatigue = 0
    breath = 0
    sore_throat = 0
    headache = 0
    total = len(users)
    ill = 0
    not_ill = 0
    for user in users:
        symptom = user.symptoms.split('&')
        at_least_one = False
        for ind in symptom:
            if ind != '':
                at_least_one = True
            if ind == 'Fever':
                fever += 1
            if ind == 'Dry cough':
                cough += 1

            if ind == 'Shortness of breath':
                breath += 1
            if ind == 'Fatigue':
                fatigue += 1
            if ind == 'Sore throat':
                sore_throat += 1
            if ind == 'Headache':
                headache += 1
            if ind == '':
                not_ill += 1
        if at_least_one:
            ill += 1
    json_file = '{"data": [' + str(total) + ',' + str(fever) + ',' + str(cough) + ',' + \
                str(fatigue) + ',' + str(breath) + ',' + str(sore_throat) + ',' + str(
        headache) + ',' + str(ill) + ']}'

    return json_file


@app.route('/', methods=['POST', 'GET'])
def home():
    symptoms = SYMPTOMS
    underlying = UNDERLYING
    counties = COUNTIES
    severe_symptoms = SEVERE_SYMPTOMS
    news = Local.query.filter(Local.body != '').order_by(desc(Local.time_stamp)).all()
    users = User.query.filter(User.symptoms != '').all()
    not_ill = User.query.filter(User.symptoms == '').count()
    fever = 0
    cough = 0
    breath = 0
    total = not_ill + len(users)
    ill = 0
    news_kenya_now = news_kenya
    for user in users:
        symptom = user.symptoms.split('&')
        for ind in symptom:
            ill += 1
            if ind == 'Fever':
                fever += 1
            if ind == 'Dry cough':
                cough += 1

            if ind == 'Shortness of breath':
                breath += 1
            if ind == 'None':
                not_ill += 1
    graph = {'total': total, 'fever': fever, 'cough': cough, 'breath': breath, 'not_ill': not_ill, 'ill': ill}
    print("out and about ")
    print(graph)
    return render_template('corona-updates.html', **locals())


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
               '1. Corona Self Checker\n' \
               '2. Check status around you\n' \
               '3. Report status around you\n' \
               '4. Corona update'

    t_levels = []
    val = False

    if levels[0] != '':
        val = True
        for i, l in enumerate(levels):
            if len(t_levels) == 0:
                if l in ['1', '2', '3', '4']:
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

    if levels[0] != '':
        if levels[0] in ['1', '2', '3', '4']:
            t_response = ''
            if levels[0] == '1':
                t_response = symptoms_checker(levels, phoneNumber)
            elif levels[0] == '2':
                t_response = local_status(levels)
            elif levels[0] == '3':
                t_response = local_update(levels, phoneNumber)
            elif levels[0] == '4':
                t_response = corona_update(levels)
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


def symptoms_checker(r_levels, phoneNumber):
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
                if i in ['1', '2', '3']:
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
                if check_mix(i, 8):
                    levels.append(i)
            elif len(levels) == 6:
                if i in ['1', '2', '3']:
                    levels.append(i)
            elif len(levels) == 7:
                if check_mix(i, 6):
                    levels.append(i)
            if siz == len(levels):
                invalid = True
            else:
                invalid = False
    if invalid:
        con = con + "*You entered an invalid value.\n" \
                    "Try again*\n"
    end = False
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
                                  "6. None of the above"
    else:
        record_data(levels, phoneNumber)
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


def check_mix(mix, max):
    if mix.isdigit():
        if int(float(mix)) == max:
            return True

        for c in mix:
            valid = 0 < int(float(c)) < max
            if not valid:
                return False
        return True
    return False


def record_data(levels, phoneNumber):
    other = levels[1]
    county = levels[2]
    age = levels[3]
    gender = levels[4]
    symptoms = levels[5]
    underlying = levels[7]
    map_symptoms = ['Fever', 'Dry cough', 'Fatigue', 'Shortness of breath', 'Sore throat', 'Headache', 'Nausea', 'None']
    for sy in levels[5]:
        symptoms = symptoms + '&' + map_symptoms[int(float(sy))]
    map_underlying = ['Hypertension', 'Diabetes', 'CardioVascular', 'Chronic respiratory', 'Cancer', 'None']
    for und in levels[7]:
        underlying = underlying + '&' + map_underlying[int(float(und))]

    user = User(phone_number=phoneNumber, other=other, county=county,
                age=age, gender=gender, symptoms=symptoms, underlying=underlying)
    db.session.add(user)
    db.session.commit()


def corona_update(r_levels):
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
                if i in ['1', '2', '3']:
                    levels.append(i)
            if siz == len(levels):
                invalid = True
            else:
                invalid = False

    if invalid:
        con = con + "*You entered an invalid value.\n" \
                    "Try again*\n"
    end = False
    if len(levels) == 0:
        response = ''
        if invalid:
            response = 'invalid'
        end = True
    elif len(levels) == 1:
        response = get_updates()

    menu = '0: BACK 00: HOME\n'

    if end:
        return response
    return con + response + menu


def get_updates():
    updates = Update.query.order_by(Update.value).limit(5).all()
    news = 'Enter 1 for more localised updates\n\n'
    for i, n in enumerate(updates):
        news = news + '* ' + n.text + '\n'

    return news


def local_update(r_levels, phoneNumber):
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
                if i in ['1', '2', '3']:
                    levels.append(i)
            elif len(levels) == 1:
                if check_county(i):
                    levels.append(i)
            elif len(levels) == 2:
                if len(i) < 31:
                    levels.append(i)
            elif len(levels) == 3:
                levels.append(i)

            if siz == len(levels):
                invalid = True
            else:
                invalid = False

    if invalid:
        con = con + "*You entered an invalid value.\n" \
                    "Try again*\n"
    end = False
    response = ''
    if len(levels) == 0:
        if invalid:
            response = 'invalid'
        end = True
    elif len(levels) == 1:
        response = 'Where are you located.\n' \
                   'Enter your county name or county code.\n'
    elif len(levels) == 2:
        response = 'Enter Title.\n' \
                   'Limit to 30 letters\n'
    elif len(levels) == 3:
        response = 'Enter your status report.\n' \
                   'Limit to 150 letters\n'
    else:
        record_status(levels, phoneNumber)
        end = True
        response = "END Thank you you for your participation\n"

    menu = '0: BACK 00: HOME\n'

    if end:
        return response
    return con + response + menu


def record_status(levels, phoneNumber):
    county = levels[1]
    title = levels[2]
    body = levels[3]
    local = Local(title=title, body=body, source=phoneNumber,
                  vote_up=0, vote_down=0, vote_flat=0, county=county, official=0)
    db.session.add(local)
    db.session.commit()


def local_status(r_levels):
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
                if i in ['1', '2', '3']:
                    levels.append(i)
            elif len(levels) == 1:
                if check_county(i):
                    levels.append(i)
            elif len(levels) == 2:
                if i in ['1', '2', '3', '4', '5']:
                    levels.append(i)
            elif len(levels) == 3:
                if i in ['1', '2', '3']:
                    levels.append(i)
            if siz == len(levels):
                invalid = True
            else:
                invalid = False

    if invalid:
        con = con + "*You entered an invalid value.\n" \
                    "Try again*\n"
    end = False
    if len(levels) == 0:
        response = ''
        if invalid:
            response = 'invalid'
        end = True
    elif len(levels) == 1:
        response = 'Where are you located.\n' \
                   'Enter your county name or county code.\n'
    elif len(levels) == 2:
        response = get_status_titles(levels[1])
    elif len(levels) == 3:
        response = get_status_body(levels[2], levels[1])
    elif len(levels) == 4:
        vote_report(levels)
        response = 'END Thank you for your participation\n'
        end = True
    menu = '0: BACK 00: HOME\n'

    if end:
        return response
    return con + response + menu


def get_status_titles(county):
    locals_titles = Local.query.filter_by(county=county).order_by(Local.time_stamp).limit(5).all()
    titles = 'Enter number of title to read more\n'
    for i, t in enumerate(locals_titles):
        titles = titles + str(i + 1) + '. ' + t.title + '\n'
    return titles


def get_status_body(index, county):
    locals_titles = Local.query.filter_by(county=county).order_by(Local.time_stamp).limit(5).all()
    pos = int(float(index)) - 1
    msg = locals_titles[pos].title + '\n' + locals_titles[pos].body + '\n'
    msg = msg + 'Rank this information\n' \
                '1. True\n' \
                '2. False\n' \
                '3. Dont know\n'
    return msg


def vote_report(levels):
    locals_titles = Local.query.filter_by(county=levels[1]).order_by(Local.time_stamp).limit(5).all()
    db.session.close()
    pos = int(float(levels[2])) - 1
    local_report = locals_titles[pos]
    if levels[3] == '1':
        local_report.vote_up += 1
    if levels[3] == '2':
        local_report.vote_down += 1
    if levels[3] == '3':
        local_report.vote_flat += 1

    db.session.add(local_report)
    db.session.commit()


def update_news():
    global news_kenya
    news_kenya = kenya_covid19_news()
    threading.Timer(1800, update_news).start()


update_news()


def covid19_numbers():
    global covid_status
    covid_status = current_covid19_numbers()
    threading.Timer(3600, covid19_numbers).start()


covid19_numbers()
