from datetime import datetime
from haliyako import db, login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return Person.query.get(int(user_id))


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.String(12), nullable=False)
    other = db.Column(db.String(4), nullable=False)
    county = db.Column(db.String(4), nullable=False)
    age = db.Column(db.String(3), nullable=False)
    gender = db.Column(db.String(1), nullable=False)
    symptoms = db.Column(db.String(120), nullable=False)
    underlying = db.Column(db.String(120), nullable=False)
    time_stamp = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)

    def __repr__(self):
        time = self.time_stamp.strftime("%H:%M")

        return f"User({self.phone_number},{self.other}, {self.county},{self.age}, {self.gender}," \
               f"{self.symptoms}, {self.underlying}, {time})"


class Update(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(120), nullable=False)
    source = db.Column(db.String(20), nullable=False)
    value = db.Column(db.Integer, nullable=False)
    time_stamp = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)

    def __repr__(self):
        # time = self.time_stamp.strftime("%H:%M")
        return f"Update({self.text}, {self.source}, {self.value})"


class Local(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    body = db.Column(db.String(120), nullable=False)
    source = db.Column(db.String(20), nullable=False)
    vote_up = db.Column(db.Integer, nullable=False)
    vote_down = db.Column(db.Integer, nullable=False)
    vote_flat = db.Column(db.Integer, nullable=False)
    county = db.Column(db.String(20), nullable=False)
    official = db.Column(db.Integer, nullable=False)
    time_stamp = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'), nullable=False)

    def __repr__(self):
        # time = self.time_stamp.strftime("%H:%M")
        return f"Local({self.title}, {self.body}, {self.source}, {self.county}, " \
               f"{self.vote_up}, {self.vote_down}, {self.vote_flat})"


# A model for user info from the web app
class Person(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    posts = db.relationship('Local', backref='author', lazy=True)

# class News(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(120), nullable=False)
#     image_url = db.Column(db.String(200), nullable=False)
#     link = db.Column(db.String(200), nullable=False)
#     date_posted = db.Column(db.String(20), nullable=False)
#
#     def __repr__(self):
#         # time = self.time_stamp.strftime("%H:%M")
#         return f"Update({self.title}, {self.image_url}, {self.link}, {self.date_posted})"
#
