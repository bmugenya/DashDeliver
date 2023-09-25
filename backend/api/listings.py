from flask import request, url_for,jsonify,json,Blueprint
import requests
from api import db
from api.models import *
import json

listings = Blueprint('listings', __name__)

@listings.route('/listings', methods=['POST'])
def listing():
    data = request.get_json()
    print(data)
    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400

    location_value_json = json.dumps(data.get('location_value'))
    data['location_value'] = location_value_json

    amenity_json = json.dumps(data.get('amenity'))
    data['amenity'] = amenity_json

    print(data['amenity'])

    listing = Listing(**data)
    db.session.add(listing)
    db.session.commit()

    db.session.commit()

    return jsonify({'message': 'Listing created successfully'})
 


@listings.route('/listings', methods=['GET'])
def get_listing():
    listings = Listing.query.all()
    if listings:

        serialized_listings = [listing.serialize() for listing in listings]
        print(serialized_listings)
        return jsonify(serialized_listings)
    else:
        return jsonify({'message': 'No listings available'}), 404


@listings.route('/listing/<int:id>', methods=['GET'])
def get_single_listing(id):
    listing = Listing.query.filter_by(id=id).first()
    if listing:
        listing_data = listing.serialize()
        images = Image.query.filter_by(listing_id=listing.id).all()
        listing_data['images'] = [image.serialize() for image in images]
        print(listing_data)
        return jsonify(listing_data), 200
    else:
        return jsonify({'message': 'No listings available'}), 404


@listings.route('/favorite/<int:id>/<int:current_id>', methods=['POST'])
def add_favorite(id,current_id):
    listing = Listing.query.get(id)
    if not listing:
        return jsonify({'msg': 'Listing not found'}), 400

    user = User.query.get(current_id)
    
    if user.favorite_ids:
        favorite_ids = user.favorite_ids.split(",")
        if str(id) not in favorite_ids:
            favorite_ids.append(str(id))
            user.favorite_ids = ",".join(favorite_ids)
    else:
        user.favorite_ids = str(id)

    db.session.commit()

    return jsonify({'msg': f'Listing  has been favorited'}), 200


@listings.route('/unfavorite/<int:id>', methods=['POST'])
def remove_favorite(id):
    listing = Listing.query.get(id)
    if not listing:
        return jsonify({'msg': 'Listing not found'}), 400
    return jsonify({'msg': f'Listing has been unfavorited'}), 200




@listings.route('/reservation', methods=['POST'])
def add_reservation():
    data = request.get_json()
    print(data)
    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400


    reservation = Reservation(**data)
    db.session.add(reservation)
    db.session.commit()
    return jsonify({'message': 'Resevation created successfully'})



@listings.route('/reservation/<int:id>', methods=['GET'])
def get_reservation(id):
    reservations = Reservation.query.filter_by(listing_id=id).all()
    result = []
    if reservations:
        serialized_reservations = [reservation.serialize() for reservation in reservations]
        return jsonify(serialized_reservations)
    else:
        return jsonify({'message': 'No reservations available'}), 404


@listings.route('/trips/<int:id>', methods=['GET'])
def get_trips(id):
    reservations = Reservation.query.filter_by(user_id=id).all()
    serialized_reservations = [reservation.serialize() for reservation in reservations]
    return jsonify(serialized_reservations)


@listings.route('/favorites/<int:id>', methods=['GET'])
def get_favorites(id):
    user = User.query.get(id) 
    if user:
        favorite_ids = user.favorite_ids.split(',') if user.favorite_ids else []
        favorite_listings = Listing.query.filter(Listing.id.in_(favorite_ids)).all()
        favorite_data = [favorite_data.serialize() for favorite_data in favorite_listings]

        return jsonify(favorite_data)  

    return jsonify({'error': 'User not found'}), 404


@listings.route('/upload/images', methods=['POST'])
def upload_images():
    data = request.get_json()
    print(data)
    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400


    images = Image(**data)
    db.session.add(images)
    db.session.commit()

    db.session.commit()

    return jsonify({'message': 'Image Uploaded successfully'})