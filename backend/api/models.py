from api import db
from datetime import datetime, timedelta
from time import time
from werkzeug.security import generate_password_hash, check_password_hash
from hashlib import md5

class Updateable:
    def update(self, data):
        for attr, value in data.items():
            setattr(self, attr, value)


class User(db.Model,Updateable):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    email_verified = db.Column(db.DateTime)
    password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, onupdate=datetime.now)
    favorite_ids = db.Column(db.String)

    accounts = db.relationship('Account', back_populates='user')
    listings = db.relationship('Listing', back_populates='user')
    reservations = db.relationship('Reservation', back_populates='user')

    @property
    def avatar_url(self):
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return f'https://www.gravatar.com/avatar/{digest}?d=identicon'

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.email)

    @property
    def url(self):
        return url_for('users.get', id=self.id)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'email_verified':self.email_verified,
            'created_at':self.created_at,
            'updated_at':self.updated_at,
            'favorite_ids':self.favorite_ids,
            'accounts':self.accounts,
            'avatar_url': self.avatar_url

        }




class Account(db.Model,Updateable):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    acc_type = db.Column(db.String)
    provider = db.Column(db.String)
    provider_account_id = db.Column(db.String)
    refresh_token = db.Column(db.String)
    access_token = db.Column(db.String)
    expires_at = db.Column(db.Integer)
    token_type = db.Column(db.String)
    scope = db.Column(db.String)
    id_token = db.Column(db.String)
    session_state = db.Column(db.String)

    user = db.relationship('User', back_populates='accounts')




class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))
    image_src = db.Column(db.String)

    listings = db.relationship('Listing', back_populates='images')

    def serialize(self):
        return {
            'id': self.id,
            'listing_id': self.listing_id,
            'image_src': self.image_src
        }

class Listing(db.Model,Updateable):
    __tablename__ = 'listings'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    image_src = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    category = db.Column(db.String)
    amenity = db.Column(db.String)
    room_count = db.Column(db.Integer)
    bathroom_count = db.Column(db.Integer)
    guest_count = db.Column(db.Integer)
    location_value = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    price = db.Column(db.Integer)

    user = db.relationship('User', back_populates='listings')
    reservations = db.relationship('Reservation', back_populates='listings')
    images = db.relationship('Image', back_populates='listings')

    def __repr__(self):
        return '<Listing {}>'.format(self.title)

    @property
    def url(self):
        return url_for('listings.get', id=self.id)


    def serialize(self):
        return {
            'id':self.id,
            'title': self.title,
            'description': self.description,
            'image_src': self.image_src,
            'created_at':self.created_at,
            'category':self.category,
            'amenity':self.amenity,
            'room_count':self.room_count,
            'bathroom_count':self.bathroom_count,
            'guest_count':self.guest_count,
            'location_value':self.location_value,
            'price':self.price,
            'user': self.user.serialize() if self.user else None 

        }




class Reservation(db.Model,Updateable):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    total_price = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='reservations')
    listings = db.relationship('Listing', back_populates='reservations')

    def __repr__(self):
        return '<Reservation {}>'.format(self.id)

    @property
    def url(self):
        return url_for('reservations.get', id=self.id)

    @property
    def duration(self):
        if self.start_date and self.end_date:
            return self.end_date - self.start_date
        return None


    def serialize(self):
        return {
            'id':self.id,
            'user_id': self.user_id,
            'listing_id': self.listing_id,
            'start_date': self.start_date,
            'end_date':self.end_date,
            'duration': self.duration.days if self.duration else None,
            'total_price':self.total_price,
            'created_at':self.created_at,
            'listings': self.listings.serialize() if self.listings else None


        }


