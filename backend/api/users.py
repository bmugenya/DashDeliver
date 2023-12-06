from flask import request, url_for,jsonify,json,Blueprint,render_template
from flask_mail import Message
import os
import requests
from api import db,mail
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

    msg = Message("Welcome to DashDeliver", sender=os.getenv('MAIL_USERNAME'), recipients=[registered_email])
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
    return jsonify({'message': 'Login successful', 'user': user.id,'token': token}), 200
 


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
def accept_delivery(shipments_id, driver_id):
    driver = User.query.get(driver_id)
    delivery = Shipment.query.get(shipments_id)

    if driver and delivery:
        # Update the driver's status to "In Progress"
        driver.status = 'In Progress'
        delivery.status = 'Waiting Response'

        # Assign the driver to the delivery (similar to the previous example)
        delivery.assign_driver(driver)

        # Commit changes to the database
        db.session.commit()

        # Other logic for notifying users, updating delivery status, etc.
        return "Delivery accepted successfully"
    else:
        return "Invalid delivery or driver ID", 404        




