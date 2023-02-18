from email.policy import default
from store import db

class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    fav = db.Column(db.String(),default='false')
    img = db.Column(db.String())
    price = db.Column(db.String(50))
    desc = db.Column(db.String())
    date = db.Column(db.String(50))
    spec = db.Column(db.String())
    quote = db.Column(db.String())
    count = db.Column(db.Integer,default=0)

class Titles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data1 = db.Column(db.String())

class Titles1(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    buy = db.Column(db.String())

class Titles3(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    buy = db.Column(db.String())
    browse = db.Column(db.String())