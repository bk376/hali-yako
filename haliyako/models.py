from datetime import datetime
from haliyako import  db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.String(12), nullable=False)
    age = db.Column(db.String(3), nullable=False)
    gender = db.Column(db.String(1), nullable=False)
    time_stamp = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"
