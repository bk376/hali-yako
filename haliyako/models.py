from datetime import datetime
from haliyako import db, login_manager, ma
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
    ke = db.Column(db.Integer)

    def __repr__(self):
        time = self.time_stamp.strftime("%H:%M")

        return f"User({self.phone_number}, {self.other}, {self.county}, {self.age}, {self.gender}, " \
               f"{self.symptoms}, {self.underlying}, {time})"


class Update(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(2000), nullable=False)
    source = db.Column(db.String(2000), nullable=False)
    value = db.Column(db.Integer, nullable=False)
    time_stamp = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)

    def __repr__(self):
        # time = self.time_stamp.strftime("%H:%M")
        return f"Update({self.text}, {self.source}, {self.value})"


class Community(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)
    about = db.Column(db.String(2000), nullable=False)
    admin = db.Column(db.String(300), nullable=False)
    location = db.Column(db.String(300), nullable=False)
    time_stamp = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)

    def __repr__(self):
        # time = self.time_stamp.strftime("%H:%M")
        return f"Community({self.name}, {self.about}, {self.id})"


class Local(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(2000), nullable=False)
    body = db.Column(db.String(2000), nullable=False)
    source = db.Column(db.String(300), nullable=False)
    vote_up = db.Column(db.Integer, nullable=False)
    vote_down = db.Column(db.Integer, nullable=False)
    vote_flat = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(600), nullable=False)
    official = db.Column(db.Integer, nullable=False)
    time_stamp = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)

    # person_id = db.Column(db.Integer, db.ForeignKey('person.id'), nullable=False)

    def __repr__(self):
        # time = self.time_stamp.strftime("%H:%M")
        return f"Local({self.title}, {self.body}, {self.source}, {self.location}, " \
               f"{self.vote_up}, {self.vote_down}, {self.vote_flat})"


class LocalSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Local


# A model for user info from the web app
class Person(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    village = db.Column(db.String(120), nullable=False)
    state = db.Column(db.String(120), nullable=False)
    country = db.Column(db.String(120), nullable=False)

    # posts = db.relationship('Local', backref='author', lazy=True)

    def __repr__(self):
        # time = self.time_stamp.strftime("%H:%M")
        return f"Person({self.id}, {self.username}, {self.password})"


class Comment(db.Model):
    _N = 6

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(2000))
    author = db.Column(db.String(32))
    timestamp = db.Column(db.DateTime(), default=datetime.utcnow, index=True)
    path = db.Column(db.Text, index=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('comment.id'))
    post_id = db.Column(db.Integer);
    news_id = db.Column(db.Integer);
    vote_up = db.Column(db.Integer, nullable=False)
    vote_down = db.Column(db.Integer, nullable=False)
    replies = db.relationship(
        'Comment', backref=db.backref('parent', remote_side=[id]),
        lazy='dynamic')

    def save(self):
        db.session.add(self)
        db.session.commit()
        prefix = self.parent.path + '.' if self.parent else ''
        self.path = prefix + '{:0{}d}'.format(self.id, self._N)
        db.session.commit()

    def level(self):
        return len(self.path) // self._N - 1

    def __repr__(self):
        # time = self.time_stamp.strftime("%H:%M")
        return f"Comment({self.id}, {self.parent_id}, {self.author}, {self.text}, " \
               f"{self.path}, {self.post_id}, {self.news_id})"


class CommentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Comment


class Vote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    timestamp = db.Column(db.DateTime(), default=datetime.utcnow, index=True)
    comment_id = db.Column(db.Integer, nullable=False)
    post_id = db.Column(db.Integer, nullable=False)
    news_id = db.Column(db.Integer, nullable=False)
    vote_type = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        # time = self.time_stamp.strftime("%H:%M")
        return f"Vote({self.id}, {self.username}, {self.comment_id}, {self.post_id}, " \
               f"{self.vote_type})"


class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(900), nullable=False)
    body = db.Column(db.String(2000), nullable=False)
    source = db.Column(db.String(120), nullable=False)
    filter = db.Column(db.String(120), nullable=False)
    image_link = db.Column(db.String(900), nullable=False)
    news_link = db.Column(db.String(900), nullable=False)
    date = db.Column(db.String(120), nullable=False)
    likes = db.Column(db.Integer, nullable=False)
    dislikes = db.Column(db.Integer, nullable=False)
    time_stamp = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)

    # person_id = db.Column(db.Integer, db.ForeignKey('person.id'), nullable=False)

    def __repr__(self):
        # time = self.time_stamp.strftime("%H:%M")
        return f"News({self.title}, {self.body}, {self.source}, {self.date}, " \
               f"{self.likes})"
