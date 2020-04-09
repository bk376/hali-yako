from marshmallow_sqlalchemy import ModelSchema
from marshmallow import fields

from haliyako import db
from haliyako.models import User, Update, Local, News


class UserSchema(ModelSchema):

    class Meta(ModelSchema.Meta):
        model = User
        sql_session = db.session

    id = fields.Number(dump_only=True)
    phone_number = fields.String(required=True)
    other = fields.String(required=True)
    county = fields.String(required=True)
    age = fields.String(required=True)
    gender = fields.String(required=True)
    symptoms = fields.String(required=True)
    underlying = fields.String(required=True)
    time_stamp = fields.String(required=True)


class UpdateSchema(ModelSchema):

    class Meta(ModelSchema.Meta):
        model = Update
        sql_session = db.session

    id = fields.Number(dump_only=True)
    text = fields.String(required=True)
    source = fields.String(required=True)
    value = fields.String(required=True)
    time_stamp = fields.String(required=True)


class LocalSchema(ModelSchema):
    class Meta(ModelSchema.Meta):
        model = Local
        sql_session = db.session

    id = fields.Number(dump_only=True)
    title = fields.String(required=True)
    body = fields.String(required=True)
    source = fields.String(required=True)
    vote_up = fields.String(required=True)
    vote_down = fields.String(required=True)
    vote_flat = fields.String(required=True)
    county = fields.String(required=True)
    official = fields.String(required=True)
    time_stamp = fields.String(required=True)


class NewsSchema(db.Model):
    class Meta(ModelSchema.Meta):
        model = News
        sql_session = db.session

    id = fields.Number(dump_only=True)
    title = fields.String(required=True)
    image_url = fields.String(required=True)
    link = fields.String(required=True)
    date_posted = fields.String(required=True)
