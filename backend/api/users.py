from flask import request, url_for,jsonify,json,Blueprint,render_template
from flask_mail import Message
import os
import requests
from api.app import db,mail
from werkzeug.security import check_password_hash
from api.models import *
from api.auth import create_auth_token

users = Blueprint('users', __name__)







@users.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print(data)
    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400

    user = User(**data)
    db.session.add(user)

    try:
        db.session.commit()

    except Exception as e:

        error_message = f"An error occurred: {str(e)}"
        print(error_message)
   
        return jsonify({'message': error_message}), 500

    name = data.get('name')
    registered_email = data.get('email')
    password = data.get('password')

    email_html = render_template('mail.html', institute_name=name, registered_email=registered_email, password=password)

    msg = Message("Welcome to Provision Errands", sender=os.getenv('MAIL_USERNAME'), recipients=[registered_email])
    msg.html = email_html
    mail.send(msg)

  
    return jsonify({'message': 'user created successfully'}), 200
 





@users.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Invalid credentials'}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': 'Invalid email'}), 401

    if not user.verify_password(password):
        return jsonify({'error': 'Invalid password'}), 401

    # User is authenticated, return success response
    token = create_auth_token(user.id)
    return jsonify({'message': 'Login successful', 'user': user.id,'user_role': user.user_role,'token': token}), 200
 


@users.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.filter_by(id=id).first()
    if user is not None:
        print(user)
        return jsonify(user.serialize()), 200
    else:
        return jsonify({'message': 'User not found'}), 404


@users.route('/user/drivers', methods=['GET'])
def get_drivers():
    drivers = User.query.filter_by(user_role='Driver').all()
    if drivers:
        # Assuming you want to return a list of serialized drivers
        serialized_drivers = [driver.serialize() for driver in drivers]
        
        return jsonify(serialized_drivers), 200
    else:
        return jsonify({'message': 'No drivers found'}), 404




@users.route('/accept_delivery/<int:shipments_id>/<int:driver_id>', methods=['POST'])
def add_delivery(shipments_id, driver_id):
    driver = User.query.get(driver_id)
    shipment = Shipment.query.get(shipments_id)

    if driver and shipment:

        data = {
        'driver_id':driver_id,
         'shipments_id':shipments_id

        }


        delivery = Delivery(**data)
        db.session.add(delivery)

        shipment.status = 'ASSIGNED'

    

        try:
            db.session.commit()
            print(delivery.id)
            shipment.delivery_id = delivery.id
            db.session.commit()

        except Exception as e:

            error_message = f"An error occurred: {str(e)}"
            print(error_message)
   
            return jsonify({'message': error_message}), 500

        return "Delivery accepted successfully"
    else:
        return "Invalid delivery or driver ID", 404        







# Define the route for accepting a delivery
@users.route('/delivery/status', methods=['POST'])
def accept_delivery():
    # Get data from the request
    data = request.get_json()

    # Extract driverId and status from the data
    driver_id = data.get('driverId')
    status = data.get('status')
    driver_coordinates = data.get('location')

    # Perform the update in the database
    delivery = Delivery.query.filter_by(id=driver_id).first()

    if delivery:
        # Update the status of the delivery
        delivery.status = status
        delivery.driver_coordinates = driver_coordinates
        db.session.commit()

        return jsonify({'message': f'Delivery {status} successfully'}), 200
    else:
        return jsonify({'error': 'No active delivery found for the specified driver'}), 404




@users.route('/chat', methods=['POST'])
def add_chat():
    data = request.get_json()

    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400
        
    chat = Chat(**data)
    db.session.add(chat)

    try:
        db.session.commit()

    except Exception as e:

        error_message = f"An error occurred: {str(e)}"
        print(error_message)
   
        return jsonify({'message': error_message}), 500

    return "chat accepted successfully"






@users.route('/chat/<int:id>/messages', methods=['GET'])
def get_chat_messages(id):
    chats = Chat.query.filter_by(deliverId=id).all()
    result = []
    if chats:
        serialized_chats = [chat.serialize() for chat in chats]
        return jsonify(serialized_chats)
    else:
        return jsonify(result), 404
