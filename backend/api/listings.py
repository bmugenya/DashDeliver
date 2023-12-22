from flask import request, url_for,jsonify,json,Blueprint
import requests
from api import db
from api.models import *
import json
from collections import defaultdict



listings = Blueprint('listings', __name__)


from flask import request, jsonify



@listings.route('/driver/geocode', methods=['POST'])
def drivergeocode():

    try:
     
        receiver_location = request.json['receiverLocation']

        receiver_coordinates = get_coordinates(receiver_location)
        print(receiver_location)
        print(receiver_coordinates)
        return jsonify({

            'receiverCoordinates': receiver_coordinates
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500



@listings.route('/geocode', methods=['POST'])
def geocode():


    
    try:
        # Get the sender and receiver locations from the request
        sender_location = request.json['senderLocation']
        receiver_location = request.json['receiverLocation']

        # Make requests to Mapbox Geocoding API for sender and receiver locations
        sender_coordinates = get_coordinates(sender_location)
        receiver_coordinates = get_coordinates(receiver_location)
        return jsonify({
            'senderCoordinates': sender_coordinates,
            'receiverCoordinates': receiver_coordinates
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_coordinates(location):
    try:
        # Make a request to Mapbox Geocoding API
        mapbox_access_token = 'pk.eyJ1IjoibXVnZW4yNDciLCJhIjoiY2t6YXc1d3ZtMWp5cDJvczhtaHNzNng5ZiJ9.ChuFB5ls73656qlh1alvwA'
        mapbox_url = f'https://api.mapbox.com/geocoding/v5/mapbox.places/{location}.json?access_token={mapbox_access_token}'
        response = requests.get(mapbox_url)
        data = response.json()

        # Extract coordinates
        coordinates = data['features'][0]['center']
        return coordinates

    except Exception as e:
        return None  # Handle the case where coordinates cannot be obtained



@listings.route('/delivery/<int:shipment_id>/route', methods=['GET'])
def delivery_route(shipment_id):
    shipment = Delivery.query.filter_by(id=shipment_id).first()
    if shipment:
        shipment_data = shipment.serialize()
        shipment_data['pickup_time'] = '04:00 pm'
        print(shipment_data)

       
        return jsonify(shipment_data), 200
    else:
        return jsonify({'message': 'No shipments available'}), 404






























@listings.route('/shipment', methods=['POST'])
def shipment():
    data = request.get_json()
   
    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400

    try:

        allowed_keys = ['user_id','reciever_coordinates', 'sender_name', 'sender_contact', 'pickup_time', 'pickup_address', 'details',
                        'parcel', 'sender_location', 'reciever_name', 'reciever_contact', 'reciever_email',
                        'drop_address', 'quantity', 'weight', 'sender_coordinates', 'reciever_location']

        # Create a new dictionary with only the allowed keys
        filtered_data = {key: data[key] for key in allowed_keys if key in data}


        listing = Shipment(**filtered_data)
        db.session.add(listing)
        db.session.commit()

        db.session.commit()

        return jsonify({'msg': 'Data received successfully'}), 200

    except Exception as e:
        print(f'Error processing data: {e}')
        return abort(500, 'Internal Server Error')

    



    return jsonify({'message': 'Listing created successfully'})
 


@listings.route('/shipments/<int:user_id>', methods=['GET'])
def get_shipments(user_id):
    try:
        listings = Shipment.query.filter_by(user_id=user_id).all()
        if listings:
            serialized_listings = [listing.serialize() for listing in listings]
            print(serialized_listings)
            return jsonify(serialized_listings)
        else:
            return jsonify({'message': 'No listings available for the user'}), 404
    except Exception as e:
        print(f'Error retrieving shipments: {e}')
        return jsonify({'error': 'Internal Server Error'}), 500


@listings.route('/shipment/<int:id>', methods=['GET'])
def get_single_listing(id):
    listing = Shipment.query.filter_by(id=id).first()
    if listing:
        listing_data = listing.serialize()
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



@listings.route('/delivery/<int:driver_id>', methods=['GET'])
def get_delivery(driver_id):

    deliveries = Delivery.query.filter_by(driver_id=driver_id).all()
    grouped = []

    if listings:
        for delivery in deliveries:
            shipments = Shipment.query.filter_by(id=delivery.shipments_id).all()

            for shipment in shipments:

                grouped.append({
                    "id": delivery.id,
                    "task": delivery.task,
                    "parcel": shipment.parcel,
                    "sender_location": shipment.sender_location,
                    "reciever_location": shipment.reciever_location,
                    "sender_coordinates": shipment.sender_coordinates,
                    "reciever_coordinates": shipment.reciever_coordinates,
                    "description": delivery.description,
                    "status": delivery.status,
 
                })


        return jsonify(grouped), 200
    else:
        return jsonify({'message': 'No shipments available'}), 404


