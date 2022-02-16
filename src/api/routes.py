"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint, redirect
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from argon2 import PasswordHasher
from werkzeug.utils import secure_filename
import hashlib


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
UPLOAD_FOLDER = './uploads'

ph = PasswordHasher()

api = Blueprint('api', __name__)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@api.route('/see', methods=['GET'])
def see():
    return "See", 200




@api.route('/upload', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    if 'image' not in request.files:
        return 'no-image', 400
        
    image = request.files['image']

    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if image.filename == '':
        return 'no-filename', 400

    if image and allowed_file(image.filename):
        filename = image.filename
        image.save(os.path.join(UPLOAD_FOLDER, filename))

        # TODO: Move the image to your storage
        # TODO: Clean the temp file

        return filename, 200


@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():
    current_user_id = get_jwt_identity()

    user = User.query.filter(User.id == current_user_id).first()

    response_body = {
        "message": f"Hello I Am {user.email}"        
    }
    return jsonify(response_body), 200


@api.route('/register', methods=["POST"])
def register_user():
    data = request.get_json()

    # Check if User exists
    if User.query.filter(User.email == data['email']).count() > 0:
        return 'user-exists', 400

    # Create the User
    user = User(
        email=data['email'], 
        password=ph.hash(data['password']), 
        is_active=True
    )
    db.session.add(user)
    db.session.commit()

    return '', 204


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter(User.email == data['email']).first()
    if user is None:
        return '', 404
    
    try:
        ph.verify(user.password, data['password'])
    except: 
        return 'wrong-password', 400

    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

