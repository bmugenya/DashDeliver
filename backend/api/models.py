from api import db
from datetime import datetime, timedelta
from time import time
from werkzeug.security import generate_password_hash, check_password_hash
from hashlib import md5
from sqlalchemy.dialects.postgresql import ARRAY


class Updateable:
    def update(self, data):
        for attr, value in data.items():
            setattr(self, attr, value)


class User(db.Model,Updateable):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    mobile = db.Column(db.String)
    email_verified = db.Column(db.DateTime)
    user_role = db.Column(db.String)
    password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, onupdate=datetime.now)
    favorite_ids = db.Column(db.String)
    status = db.Column(db.String(20), default='Available')

    accounts = db.relationship('Account', back_populates='user')
    listings = db.relationship('Listing', back_populates='user')
    shipments = db.relationship('Shipment', back_populates='user')
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
            'status': self.status,
            'user_role': self.user_role,
            'mobile': self.mobile,
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


class Delivery(db.Model,Updateable):
    __tablename__ = 'deliveries'

    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String)
    description = db.Column(db.String)

    pickup_time =  db.Column(db.String)
    drop_time = db.Column(db.String)
    status = db.Column(db.String(20), default='In Progress')
    driver_coordinates =  db.Column(ARRAY(db.Float))

    driver_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    shipments_id = db.Column(db.Integer, db.ForeignKey('shipments.id'))

    shipments = db.relationship('Shipment', back_populates='deliveries')
    chats = db.relationship('Chat', back_populates='deliveries')

    def __repr__(self):
        return '<Delivery {}>'.format(self.id)

    @property
    def url(self):
        return url_for('deliveries.get', id=self.id)



    def serialize(self):
        return {
            'id':self.id,
            'task': self.task,
            'description': self.description,
            'driver_coordinates': self.driver_coordinates,
            'pickup_time': self.pickup_time,
            'drop_time':self.drop_time,
            'status': self.status,
            'shipments': self.shipments.serialize() if self.shipments else None


        }




class  Chat(db.Model,Updateable):
    __tablename__ = 'chats'

    id = db.Column(db.Integer, primary_key=True)
    message =  db.Column(db.String)

    email = db.Column(db.String(20))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    deliverId = db.Column(db.Integer, db.ForeignKey('deliveries.id'))

    deliveries = db.relationship('Delivery', back_populates='chats')


    def __repr__(self):
        return '<Chat {}>'.format(self.id)

    @property
    def url(self):
        return url_for('chats.get', id=self.id)



    def serialize(self):
        return {
            'id':self.id,
            'email': self.email,
            'message': self.message,
            'timestamp': self.timestamp,
            'deliveries': self.deliveries.serialize() if self.deliveries else None


        }



class Shipment(db.Model,Updateable):
    __tablename__ = 'shipments'

    id = db.Column(db.Integer, primary_key=True)
    sender_name = db.Column(db.String)
    sender_contact = db.Column(db.String)
    pickup_time =  db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    sender_location = db.Column(db.String, nullable=False)
    sender_coordinates = db.Column(ARRAY(db.Float), nullable=False)
    pickup_address = db.Column(db.String)
    details = db.Column(db.String)


    reciever_name = db.Column(db.String)
    reciever_contact = db.Column(db.String)
    reciever_email = db.Column(db.String)
    reciever_location =  db.Column(db.String, nullable=False)
    reciever_coordinates =  db.Column(ARRAY(db.Float), nullable=False)
    drop_address = db.Column(db.String)
    status = db.Column(db.String(20), default='UNASSIGNED')  # 'UNASSIGNED, 'ASSIGNED', 'COMPLETED',
    

    parcel = db.Column(db.String)
    quantity = db.Column(db.String)
    weight = db.Column(db.String)


    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    delivery_id = db.Column(db.Integer)
    user = db.relationship('User', back_populates='shipments')
    deliveries = db.relationship('Delivery', back_populates='shipments')
  


    def __repr__(self):
        return '<Shipment {}>'.format(self.package)

    @property
    def url(self):
        return url_for('shipments.get', id=self.id)


    def serialize(self):
        return {
            'id':self.id,
            'sender_name': self.sender_name,
            'status': self.status,
            'sender_contact': self.sender_contact,
            'pickup_time': self.pickup_time,
            'parcel':self.parcel,
            'created_at':self.created_at,
            'sender_location':self.sender_location,
            'sender_coordinates':self.sender_coordinates,
            'reciever_location':self.reciever_location,
            'reciever_coordinates':self.reciever_coordinates,
            'pickup_address':self.pickup_address,
            'reciever_name':self.reciever_name,
            'reciever_contact':self.reciever_contact,
            'reciever_email':self.reciever_email,
            'delivery_id':self.delivery_id,
            'user': self.user.serialize() if self.user else None 

        }


