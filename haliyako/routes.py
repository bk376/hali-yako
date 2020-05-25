import datetime
import threading
import random
from flask import request, render_template, flash, redirect, url_for, json, jsonify
from flask_login import login_user, current_user, logout_user, login_required
from jinja2 import TemplateNotFound
from sqlalchemy import desc

from haliyako import app, db, bcrypt
from haliyako.constants import COUNTIES, SYMPTOMS, UNDERLYING, SEVERE_SYMPTOMS, ANIMALS, SUBCOUNTIES
from haliyako.covid19_google_scraper import kenya_covid19_news
from haliyako.covid_api import current_covid19_numbers
from haliyako.models import User, Update, Local, Person, Comment, Vote, News
import requests
from bs4 import BeautifulSoup

from werkzeug.security import generate_password_hash, check_password_hash

news_kenya = []
covid_status = {}

def getTimePass(diff_time):
    period = ""
    if diff_time > 86400 * 365:
        period = str(int(float(diff_time / (86400 * 365)))) + " yrs"
    elif diff_time > 86400 * 30:
        period = str(int(float(diff_time / (86400 * 30)))) + " mts"
    elif diff_time > 86400 * 7:
        period = str(int(float(diff_time / (86400 * 7)))) + " wks"
    elif diff_time > 86400:
        period = str(int(float(diff_time / 86400))) + " dys"
    elif diff_time > 3600:
        period = str(int(float(diff_time / 3600))) + " hrs"
    elif diff_time > 60:
        period = str(int(float(diff_time / 60))) + " mins"
    else:
        period = "1 min"
    return period

def verify(arr):
    for r in arr:
        if len(r) > 23:
            return False
    return True

def verify_post():
    if current_user.is_authenticated:
        p = Person.query.filter(Person.username == current_user.username).first()
        if p is not None:
            return True

    return False



def verify_admin():
    if current_user.is_authenticated:
        if current_user.username == "yaotech":
            return True

    return False


@app.route('/register', methods=['POST', 'GET'])
def register():
    # if current_user.is_authenticated:
    #     return redirect(url_for("home"))
    # form = RegistrationForm()
    # if form.validate_on_submit():
    #     hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
    #     user = Person(username=form.username.data, password=hashed_password)
    #     db.session.add(user)
    #     db.session.commit()
    #     next_page = request.args.get('next')
    #     login_user(user, remember=True)
    #     print(f"Sign up successfull")
    #     flash(f'Your account has been created!', 'success')
    #     return redirect(next_page) if next_page else redirect(url_for("home"))
    # return render_template('register.html', title='Register', form=form)
    username = request.args.get('username', None)
    password = request.args.get('password', None)
    village = request.args.get('village', None)
    state = request.args.get('state', None)
    country = request.args.get('country', None)
    arr = [username, password, village, state, country]
    if not verify(arr):
        return "username_taken"
    user = Person.query.filter_by(username=username).first()
    if user is not None:
        return "username_taken"

    # hashed = generate_password_hash(password)
    hashed = bcrypt.generate_password_hash(password).decode('utf-8')
    user = Person(username=username, password=hashed, village=village, state=state, country=country)
    db.session.add(user)
    db.session.commit()
    login_user(user, remember=True)
    user_info = {
        "username": username,
        "village": village,
        "state": state,
        "country": country
    }

    return user_info


@app.route('/update_info', methods=['POST', 'GET'])
def update_info():
    username = request.args.get('username', None)
    village = request.args.get('village', None)
    state = request.args.get('state', None)
    country = request.args.get('country', None)
    arr = [username, village, state, country]
    if not verify(arr):
        return "username_noexisto"
    user = Person.query.filter_by(username=username).first()
    if user is None:
        return "username_noexisto"
    login_user(user, remember=True)
    user.village = village
    user.state = state
    user.county = country
    db.session.add(user)
    db.session.commit()
    user_info = {
        "username": username,
        "village": village,
        "state": state,
        "country": country
    }

    return user_info


@app.route('/get_info', methods=['POST', 'GET'])
def get_info():
    username = request.args.get('username', None)
    arr = [username]
    if not verify(arr):
        return "username_removed"
    user = Person.query.filter_by(username=username).first()
    if user is not None:
        user_info = {
            "username": user.username,
            "village": user.village,
            "state": user.state,
            "country": user.country
        }
        return user_info

    return "user_removed"


@app.route('/submit_info', methods=['POST'])
def submit_info():
    # if current_user.is_authenticated:
    # return redirect(url_for("home"))
    # return "user authenticated"
    form = request.form
    username = form.get("username")
    password = form.get("password")
    arr = [username, password]
    if not verify(arr):
        return "not_exist"
    user = Person.query.filter_by(username=username).first()
    # if user and bcrypt.check_password_hash(user.password, password):
    if user is not None:
        match = bcrypt.check_password_hash(user.password, password)
        #    check_password_hash(user.password, password)
        if match:
            login_user(user, remember=True)
            user_info = {
                "username": user.username,
                "village": user.village,
                "state": user.state,
                "country": user.country
            }
            return user_info


    # form = LoginForm()
    # if form.validate_on_submit():
    #     print("inside validate")
    #     user = Person.query.filter_by(username=form.username.data).first()
    #     if user and bcrypt.check_password_hash(user.password, form.password.data):
    #         next_page = request.args.get('next')
    #         login_user(user, remember=form.remember.data)
    #         return redirect(next_page) if next_page else redirect(url_for("home"))
    #     else:
    #         flash("Login unsuccessful. Please check username and password", 'danger')
    # return render_template('login.html', title='Login', form=form)
    return "not_exist"


@app.route('/admin_logout')
def admin_logout():
    if verify_admin():
        logout_user()
        return redirect(url_for("admin_login"))
    return redirect(url_for("admin_login"))


@app.route('/logout')
@login_required
def logout():
    logout_user()
    # return redirect(url_for("home"))
    return "sucess logged out"


@app.route('/admin_comments', methods=['POST', 'GET'])
def admin_comments():
    if not verify_admin():
        return 'failed'
    nid = request.args.get('nid', "none")
    pid = request.args.get('pid', "none")
    comments = Comment.query.filter(Comment.news_id == int(float(nid))).filter(Comment.post_id == int(float(pid))).all()
    texts = []
    authors = []
    mids = []
    votes = []
    replies = []
    nids = []
    pids = []
    ups = []
    downs = []
    parents = []
    dates = []
    for comment in comments:
        texts.append(comment.text)
        authors.append(comment.author)
        mids.append(str(comment.id))
        nids.append(str(comment.news_id))
        pids.append(str(comment.post_id))
        replies.append(str(Comment.query.filter(Comment.parent_id == comment.id).count()))
        ups.append(str(comment.vote_up))
        downs.append(str(comment.vote_down))
        parents.append(str(comment.parent_id))
        dates.append(str(comment.timestamp))
    return jsonify(
        {"texts": texts, "authors": authors, "mids": mids, "nids": nids, "pids": pids,
         "replies": replies, "ups": ups, "downs": downs, "parent_ids": parents, "dates": dates})


@app.route('/admin_delete', methods=['POST', 'GET'])
def admin_delete():
    if not verify_admin():
        return 'failed'
    id = request.args.get('id', "none")
    page = request.args.get('page', "none")
    n = None
    num_id = int(float(id))
    if page == 'news':
        n = News.query.filter(News.id == num_id).first()
    if page == 'chats':
        n = Local.query.filter(Local.id == num_id).first()
    if page == 'checker':
        n = User.query.filter(User.id == num_id).first()
    if page == 'comment':
        n = Comment.query.filter(Comment.id == num_id).first()
    if page == 'users':
        n = Person.query.filter(Person.id == num_id).first()

    if n is None:
        return 'failed'
    n.filter = "deleted"
    db.session.add(n)
    db.session.commit()

    return 'success'


@app.route('/login_admin', methods=['POST', 'GET'])
def login_admin():
    username = request.args.get('username', "none")
    password = request.args.get('password', "none")
    if username == 'yaotech' and password == 'Eldoret2021':
        user = Person.query.filter_by(username=username).first()
        login_user(user, remember=True)
        return 'success'

    return 'failed'


@app.route('/admin/users')
def admin_users():
    if current_user.is_authenticated:
        if current_user.username == "yaotech":
            page = "users"
            news = Person.query.order_by(desc(Person.id)).all()
            return render_template('admin.html', **locals())

    return redirect(url_for("admin_login"))


@app.route('/admin/chats')
def admin_chats():
    if current_user.is_authenticated:
        if current_user.username == "yaotech":
            page = "chats"
            news = Local.query.order_by(desc(Local.id)).all()
            replies = []
            for n in news:
                num = Comment.query.filter(Comment.post_id == n.id).count()
                replies.append(str(num))

            return render_template('admin.html', **locals())

    return redirect(url_for("admin_login"))


@app.route('/admin/checker')
def admin_checker():
    if current_user.is_authenticated:
        if current_user.username == "yaotech":
            page = "checker"
            news = User.query.order_by(desc(User.id)).all()
            return render_template('admin.html', **locals())

    return redirect(url_for("admin_login"))


@app.route('/admin')
def admin():
    if current_user.is_authenticated:
        if current_user.username == "yaotech":
            page = "news"
            news = News.query.order_by(desc(News.id)).all()
            replies = []
            for n in news:
                num = Comment.query.filter(Comment.news_id == n.id).count()
                replies.append(str(num))

            return render_template('admin.html', **locals())

    return redirect(url_for("admin_login"))


@app.route('/admin_login')
def admin_login():
    if current_user.is_authenticated:
        if current_user.username == "yaotech":
            return render_template('admin.html', **locals())

    return render_template('admin_login.html', **locals())


@app.route('/nav', methods=['POST', 'GET'])
def nav():
    news_kenya_now = news_kenya
    covid_numbers = covid_status
    kenya_numbers = list(filter(lambda country: country['country'] == 'Kenya', covid_numbers))[0]
    world_numbers = list(filter(lambda country: country['country'] == 'All', covid_numbers))[0]
    return render_template('sidenav-navbar.html', **locals())


@app.route('/trend_county', methods=['POST', 'GET'])
def trend_county():
    symptoms = SYMPTOMS
    underlying = UNDERLYING
    counties = COUNTIES
    form = request.form
    news = []
    if request.method == 'POST':
        county = form.get('countyName')
        news = Local.query.filter(Local.body != '').filter_by(county=county).order_by(desc(Local.time_stamp)).all()

    return render_template('trending-county.html', **locals())


@app.route('/filter_county/<county_code>/<last_id>', methods=['POST', 'GET'])
def filter_county(county_code, last_id):
    counties = COUNTIES
    replies_num = []
    last_id_num = int(float(last_id))
    votes_num = []
    if last_id == "0":
        news = Local.query.filter(Local.location == county_code).order_by(desc(Local.id)).all()
        if len(news) == 0:
            title = "YaoTech welcome you to " + county_code + " platform. Sema Ukweli Yako"
            local = Local(title=title, body="", source="yaotech",
                          vote_up=0, vote_down=0, vote_flat=0, location=county_code, official=0)
            db.session.add(local)
            db.session.commit()
            news = Local.query.filter(Local.location == county_code).order_by(desc(Local.id)).all()

    else:
        news = Local.query.filter(Local.location == county_code).filter(Local.id > last_id_num).order_by(
            desc(Local.id)).all()

        for id in range(0, last_id_num + 1):
            n = Local.query.filter(Local.id == id).first()
            if n is not None:
                votes_num.append({
                    "id": id,
                    "num": str(n.vote_up - n.vote_down)

                })

            try:
                num = Comment.query.filter(Comment.post_id == id).filter(Comment.parent_id == None).count()
                replies_num.append({
                    "id" : id,
                    "num": num
                })
            except:
                print("comment not present")



    # create json file
    titles = []
    comments = []
    authors = []
    mids = []
    nids = []
    pids = []
    votes = []
    replies = []
    curr_time = datetime.datetime.utcnow()
    times = []

    for n in news:
        n_time = n.time_stamp
        diff_time = int(float((curr_time - n_time).total_seconds()))
        times.append(getTimePass(diff_time))
        titles.append(n.title)
        comments.append(n.body)
        authors.append(n.source)
        pids.append(str(n.id))
        nids.append("0")
        mids.append("0")
        num = Comment.query.filter(Comment.post_id == n.id).filter(Comment.parent_id == None).count()
        votes.append(n.vote_up - n.vote_down)
        replies.append(str(num))
    return jsonify(
        {"comments": comments, "authors": authors, "titles": titles, "mids": mids, "nids": nids, "pids": pids,
         "polls": votes, "replies": replies, "replies_num": replies_num, "times": times, "votes_num": votes_num})


@app.route('/collect_news', methods=['POST', 'GET'])
def collect_news():
    first_id = request.args.get('fid', None)
    last_id = request.args.get('lid', None)
    filter = request.args.get('filter', None)
    dir = request.args.get('dir', None)
    replies_num = []
    first_id_num = int(float(first_id))
    last_id_num = int(float(last_id))
    counties = COUNTIES
    news = []
    votesNum = []

    if last_id == "0":
        news = News.query.filter(News.filter == filter).order_by(News.id.desc()).limit(10).all()
    else:
        if dir == "0":
            news = News.query.filter(News.id > first_id_num).filter(News.filter == filter).order_by(News.id.desc()).limit(10).all()
        else:
            news = News.query.filter(News.id < int(float(last_id))).filter(News.filter == filter).order_by(News.id.desc()).limit(10).all()
        for id in range(last_id_num, first_id_num+1):
            n = News.query.filter(News.id == id).first()
            if n is not None:
                votesNum.append({
                    "id": id,
                    "likes": n.likes,
                    "dis": n.dislikes
                })
            try:
                num = Comment.query.filter(Comment.news_id == id).filter(Comment.parent_id == None).count()
                replies_num.append({
                    "id" : id,
                    "num": num
                })
            except:
                print("comment not present")

        # if filter == "-1":
        #     news = News.query.filter(News.id > int(float(last_id))).order_by(News.id.desc()).limit(10).all()
        #     if len(news) == 0:
        #         return "no_nuevo"
        # else:
        #     if filter == '0' and last_id == '0':
        #         news = News.query.order_by(News.id.desc()).limit(10).all()
        #     elif filter == '0' and last_id != '0':
        #         news = News.query.filter(News.id < int(float(last_id))).order_by(News.id.desc()).limit(10).all()
        #     else:
        #         if last_id == '0':
        #             print("right hrer")
        #             news = News.query.filter(News.filter == filter).order_by(News.id.desc()).limit(10).all()
        #             print(news)
        #         else:
        #             news = News.query.filter(News.id < int(float(last_id))).filter(News.filter == filter).order_by(News.id.desc()).limit(10).all()


    titles = []
    comments = []
    authors = []
    mids = []
    nids = []
    pids = []
    votes = []
    replies = []
    news_links = []
    image_links = []
    likes = []
    dislikes = []
    dates = []
    for n in news:

        titles.append(n.title)
        comments.append(n.body)
        authors.append(n.source)
        nids.append(str(n.id))
        pids.append("0")
        mids.append("0")
        num = Comment.query.filter(Comment.news_id == n.id).count()
        replies.append(str(num))
        news_links.append(n.news_link)
        image_links.append(n.image_link)
        likes.append(n.likes)
        dislikes.append(n.dislikes)
        dates.append(n.date)
    return jsonify(
        {"comments": comments, "authors": authors, "titles": titles, "mids": mids, "nids": nids, "pids": pids,
         "replies": replies, "news_links": news_links, "image_links": image_links, "likes": likes, "dislikes": dislikes,
         "dates": dates, "replies_num": replies_num, "votes_num": votesNum})


@app.route('/submit_survey', methods=['POST'])
def submit_survey():
    form = request.form

    county_code = form.get('selectCountyOption', "0")
    age = form.get('selectAgeOption', "0")
    symptoms_str = '&'.join(form.getlist('symptomslist')) + "$" + form.get("covidStatus")
    # + '&'.join(form.getlist('severe_symptomslist')) + "$" + form.get("covidStatus")
    # symptomslist = form.getlist('symptomslist', "") + form.getlist('severe_symptomslist', "")
    # symptoms_str = "&".join(symptomslist)
    # underlyinglist = form.getlist("underlyinglist", "")
    underlying_str = '&'.join(form.getlist('underlyinglist'))
    # underlying_str = "&".join(underlyinglist)
    gender = form.get('genderHiddenInput', "1")
    other = form.get("checkerHiddenInput", "1")
    dummy_phone = "0000000000"
    user = User(phone_number=dummy_phone, other=other, county=county_code,
                age=age, gender=gender, symptoms=symptoms_str, underlying=underlying_str)
    db.session.add(user)
    db.session.commit()
    return "success"


@app.route('/corona-updates.html', methods=['POST', 'GET'])
def corona_updates():
    symptoms = SYMPTOMS
    underlying = UNDERLYING
    counties = COUNTIES
    form = request.form
    news = Local.query.filter(Local.body != '').order_by(desc(Local.time_stamp)).all()
    if request.method == 'POST':
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


@app.route('/submit_report', methods=['POST', 'GET'])
def submit_report():
    if not verify_post():
        return 'no_existo'
    source = request.args.get('user', None)
    title = request.args.get('title', None)
    location = request.args.get('loc', None)
    if source == '':
        source = 'usr'
    local = Local(title=title, body="", source=source,
                  vote_up=0, vote_down=0, vote_flat=0, location=location, official=0)
    db.session.add(local)
    db.session.commit()
    return str(local.id)


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
    if not verify_post():
        return 'no_existo'

    vote = request.args.get('vote', None)
    post_id = request.args.get('pid', None)
    news_id = request.args.get('nid', None)
    username = request.args.get('user', None)
    curr_vote = Vote.query.filter(Vote.username == username).filter(Vote.comment_id == 0).filter(
        Vote.post_id == int(float(post_id))).filter(
        Vote.news_id == int(float(news_id))).order_by(Vote.timestamp).first()
    if news_id is not "0":
        if curr_vote is None:
            curr_vote = Vote(username=username, comment_id=0, post_id=int(float(post_id)), news_id=int(float(news_id)),
                             vote_type=0)
            news = News.query.filter(News.id == int(float(news_id))).first()
            if vote == "0":
                news.likes += 1
            if vote == "1":
                news.dislikes += 1

            db.session.add(news)
            db.session.commit()
            db.session.add(curr_vote)
            db.session.commit()
            return "1"

        return "failed"

    accept_vote = True
    if curr_vote is not None:
        if curr_vote.vote_type == 1 and vote == '0':
            accept_vote = False
        if curr_vote.vote_type == -1 and vote == '1':
            accept_vote = False

    if accept_vote:
        if post_id is not "0":
            post = Local.query.filter(Local.id == int(float(post_id))).first()
            if vote == '0':
                post.vote_up += 1
            elif vote == '1':
                post.vote_down += 1
            db.session.add(post)
            db.session.commit()

        if curr_vote is None:
            curr_vote = Vote(username=username, comment_id=0, post_id=int(float(post_id)), news_id=int(float(news_id)),
                             vote_type=0)

        if vote == '0':
            curr_vote.vote_type += 1
        elif vote == '1':
            curr_vote.vote_type -= 1

        db.session.add(curr_vote)
        db.session.commit()
        return str(curr_vote.vote_type)

    return "failed"


@app.route('/vote_comment', methods=['POST', 'GET'])
def vote_comment():
    if not verify_post():
        return 'no_existo'

    comment_id = request.args.get('mid', None)
    post_id = request.args.get('pid', None)
    news_id = request.args.get('nid', None)
    vote = request.args.get('vote', None)
    username = request.args.get('user', None)
    curr_vote = Vote.query.filter(Vote.username == username).filter(Vote.comment_id == int(float(comment_id))).filter(
        Vote.post_id == int(float(post_id))).filter(
        Vote.news_id == int(float(news_id))).first()

    accept_vote = True
    if curr_vote is not None:
        if curr_vote.vote_type == 1 and vote == '00':
            accept_vote = False
        if curr_vote.vote_type == -1 and vote == '11':
            accept_vote = False

    if accept_vote:
        curr_comment = Comment.query.filter(Comment.id == int(float(comment_id))).first()
        if vote == '00':
            curr_comment.vote_up += 1
        elif vote == '11':
            curr_comment.vote_down += 1

        curr_comment.save()

        if curr_vote is None:
            curr_vote = Vote(username=username, comment_id=comment_id, post_id=int(float(post_id)),
                             news_id=int(float(news_id)), vote_type=0)

        if vote == '00':
            curr_vote.vote_type += 1
        elif vote == '11':
            curr_vote.vote_type -= 1

        db.session.add(curr_vote)
        db.session.commit()
        return str(curr_vote.vote_type)

    return "failed"


@app.route('/update_subcounty', methods=['POST', 'GET'])
def update_subcounty():
    county = request.args.get('county', None)
    sub = request.args.get('sub', None)
    if current_user.is_authenticated:
        user = Person.query.filter_by(username=current_user.username).first()
        if user is not None:
            user.village = sub
            user.state = county
            db.session.add(user)
            db.session.commit()
            return "success"
    return "failed"


@app.route('/collect_subcounty', methods=['POST', 'GET'])
def collect_subcounty():
    county = request.args.get('county', None)
    index = 0
    for i, c in enumerate(COUNTIES):
        if c["name"] == county:
            index = i
            break
    if current_user.is_authenticated:
        user = Person.query.filter_by(username=current_user.username).first()
        if user is not None:
            user.village = ""
            user.state = county
            user.county = "kenya"
            db.session.add(user)
            db.session.commit()

    subcounties = SUBCOUNTIES[index]
    return jsonify(
        {"subcounties": subcounties})


@app.route('/collect_comments', methods=['POST', 'GET'])
def collect_comment():
    post_id = request.args.get('pid', None)
    my_id = request.args.get('mid', None)
    username = request.args.get('user', None)
    news_id = request.args.get("nid", None)
    last_id = request.args.get("lid", None)
    pid = int(float(post_id))
    nid = int(float(news_id))
    mid = int(float(my_id))
    lid_num = int(float(last_id))
    replies_num = []
    votes_num = []
    if my_id == '0':
        comments_all = Comment.query.filter(Comment.post_id == pid).filter(Comment.news_id == nid).filter(
            Comment.parent_id == None).filter(Comment.id > lid_num).all()
        comments_yote = Comment.query.filter(Comment.post_id == pid).filter(Comment.news_id == nid).filter(
            Comment.parent_id == None).all()

        for c in comments_yote:
            votes_num.append({
                "id": c.id,
                "num": str(c.vote_up - c.vote_down)

            })


            num = Comment.query.filter(Comment.parent_id == c.id).count()
            replies_num.append({
                "id": c.id,
                "num": num
            })
    else:
        parent_id = int(float(my_id))
        comments_all =  Comment.query.filter(Comment.post_id == pid).filter(Comment.news_id == nid).filter(
            Comment.parent_id == parent_id).filter(Comment.id > lid_num).all()

    curr_time = datetime.datetime.utcnow()
    times = []
    comments = []
    authors = []
    levels = []
    mids = []
    votes = []
    replies = []
    nids = []
    pids = []
    for comment in comments_all:
        n_time = comment.timestamp
        diff_time = int(float((curr_time - n_time).total_seconds()))
        times.append(getTimePass(diff_time))
        comments.append(comment.text)
        authors.append(comment.author)
        levels.append(str(comment.level()))
        mids.append(str(comment.id))
        nids.append(str(comment.news_id))
        pids.append(str(comment.post_id))
        votes.append(str(comment.vote_up - comment.vote_down))
        replies.append(str(Comment.query.filter(Comment.parent_id == comment.id).count()))
    return jsonify(
        {"comments": comments, "authors": authors, "levels": levels, "mids": mids, "nids": nids, "pids": pids,
         "polls": votes, "replies": replies, "replies_num": replies_num, "times": times, "votes_num": votes_num})


@app.route('/comment', methods=['POST', 'GET'])
def comment():
    if not verify_post():
        return 'no_existo'

    author = request.args.get('author', "")
    parent_id = request.args.get('id', "")
    msg = request.args.get('msg', "")
    post_id = request.args.get('pid', "")
    news_id = request.args.get('nid', "")
    if parent_id == '0':
        c1 = Comment(text=msg, author=author, post_id=post_id, news_id=news_id, vote_up=0, vote_down=0)
    else:
        parent = Comment.query.filter(Comment.id == int(float(parent_id))).all()
        c1 = Comment(text=msg, author=author, parent=parent[0], post_id=post_id, news_id=news_id, vote_up=0,
                     vote_down=0)

    c1.save()

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
    covid_numbers = covid_status
    kenya_numbers = list(filter(lambda country: country['country'] == 'Kenya', covid_numbers))[0]
    world_numbers = list(filter(lambda country: country['country'] == 'All', covid_numbers))[0]
    symptoms = SYMPTOMS
    underlying = UNDERLYING
    counties = COUNTIES
    severe_symptoms = SEVERE_SYMPTOMS
    autoName = ANIMALS[random.randint(0, 115)] + "_" + str(Person.query.count())
    autoPassword = str(random.randint(1001, 9999))
    news = Local.query.filter(Local.location == "kenya").order_by(desc(Local.id)).all()
    replies = []
    curr_time = datetime.datetime.utcnow()
    times = []
    for n in news:
        n_time = n.time_stamp
        diff_time = int(float((curr_time - n_time).total_seconds()))
        times.append(getTimePass(diff_time))
        num = Comment.query.filter(Comment.post_id == n.id).filter(Comment.parent_id == None).count()
        replies.append(str(num))

    users = User.query.filter(User.symptoms != '').all()
    not_ill = User.query.filter(User.symptoms == '').count()
    fever = 0
    cough = 0
    breath = 0
    total = not_ill + len(users)
    ill = 0
    news_kenya_now = News.query.all()
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
    corona_news = News.query.filter(News.filter == "kenya").order_by(News.id.desc()).limit(10).all()
    corona_news.pop(0)
    corona_news.pop(0)
    comments = []
    old_news_id = -1
    for i, n in enumerate(corona_news):
        comments.append("  " + str(Comment.query.filter(Comment.news_id == n.id).filter(Comment.parent_id == None).count()))
        if i == len(corona_news) - 1:
            old_news_id = n.id
    return render_template('prev_index.html', **locals())


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


@app.route('/service-worker.js')
def sw():
    return app.send_static_file('service-worker.js')


@app.route('/.well-known/assetlinks.json')
def assetlink():
    return app.send_static_file('assetlinks.json')


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


def check_db_req(new):
    title = new["title"]
    body = new["body"]
    news_link = new["news_link"]
    image_link = new["image_link"]
    date = new["date"]

    if title is None or body is None or news_link is None or image_link is None or date is None:
        return False
    if len(title) > 850 or len(body) > 1900 or len(image_link) > 890 or len(news_link) > 890 or len(date) > 19:
        return False
    return True


def update_news():
    global news_kenya
    curr_news = kenya_covid19_news()
    for i in range(len(curr_news)):
        while i + 2 < len(curr_news):
            if curr_news[i + 1]["title"] == curr_news[i]["title"]:
                i += 1
            else:
                break

        n = curr_news[i]
        new = News.query.filter(News.title.contains(n["title"])).first()
        new1 = News.query.filter(News.body.contains(n["body"])).first()

        if new is None and new1 is None and check_db_req(n):
            new = News(title=n["title"], body=n["body"], source=n["source"],
                       image_link=n["image_link"], news_link=n["news_link"], date=n["date"], likes=0, dislikes=0,
                       filter=n["filter"])
            db.session.add(new)
            db.session.commit()

    threading.Timer(1000, update_news).start()


update_news()


def covid19_numbers():
    global covid_status
    covid_status = current_covid19_numbers()
    threading.Timer(3600, covid19_numbers).start()


covid19_numbers()
