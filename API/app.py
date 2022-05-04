from flask.json import jsonify
import base64
from flask_cors import CORS, cross_origin
import os
from markupsafe import string
from email.policy import default
from pickle import FALSE
from aiohttp import request
from flask import Flask, jsonify, render_template, request, redirect, url_for, session, Response
from itsdangerous import json
from flask_sqlalchemy import SQLAlchemy
import bcrypt
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re

from SendEmail import send_email
from emotion_detection import analyze
app = Flask(__name__)
cors = CORS(app)


app.secret_key = 'emotion_detection'

# database connection details
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flask'

# Intialize MySQL
mysql = MySQL(app)

#_____________________________________________________________________#

# login session


@app.route('/login', methods=['POST', 'GET'])
def login():
    msg = ''
    # create variables for easy access
    username = request.json['username']
    password = request.json['password']
    # search login form in the database
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'SELECT * FROM user WHERE user_name = %s', [username])
    account = cursor.fetchone()
    # check if account exists
    if account:
        if bcrypt.checkpw(password.encode('utf-8'), account['password'].encode('utf-8')):
            session['loggedin'] = True
            session['id'] = account['id']
            session['username'] = account['user_name']
            msg = 'SUCCESS'
        else:
            msg = 'You entered wrong password! Please try again!'
    else:
        msg = 'Incorrect username! Please try again!'
    return jsonify(msg)


# register session


@app.route('/login/register', methods=['POST', 'GET'])
def register():
    msg = ''

    # create variables for easy access
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']

    # check if accounts already exists in database
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'SELECT * FROM user WHERE user_name = %s', (username,))
    account = cursor.fetchone()

    if account:
        msg = 'Account already exists!'
    elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        msg = 'Invalid email!'
    elif not re.match(r'[A-Za-z0-9]+', username):
        msg = 'Username must contain only characters and numbers!'
    elif not username or not password or not email:
        msg = 'Please fill out the form!'
        # account doesn't exists and form data is valid, insert new account into database
    else:
        password_hash = bcrypt.hashpw(
            password.encode('utf-8'), bcrypt.gensalt())
        cursor.execute(
            'INSERT INTO user(user_name, password, email) VALUES (%s, %s, %s)', (username, password_hash, email))
        mysql.connection.commit()
        msg = 'SUCCESS'
    return jsonify(msg)

#____________________________________________________________________________#

# image session


@app.route("/image", methods=['POST'])
# get the image from client (byte)
def getImage():
    if(request.method == "POST"):
        # get the encrypted data
        bytesOfImage = request.get_data()
        print("Image Read!!!")
        # encrypt the data to base64
        stringBase64 = base64.b64encode(bytesOfImage)

        # check if there is a image file in server
        if(os.path.exists("savedimage.jpeg")):
            os.remove('savedimage.jpeg')
        # decrypt base64 to img
        with open('savedimage.jpeg', 'wb') as out:
            out.write(base64.b64decode(stringBase64))

        return jsonify("Image Read!!!!")

# get the image and analyze the image, then send back result


@app.route("/get", methods=['GET'])
def responeAnalyze():
    result = analyze('savedimage.jpeg')
    # os.remove("savedimage.jpeg")
    return jsonify(result)

# get email and send it to database


@app.route("/email", methods=['POST'])
def sendEmailFunction():
    msg = ''

    email = request.json['email']
    username = request.json['username']

    print(email + " " + username)
    if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        msg = 'Invalid email! Please input the right email.'
    else:
        send_email(email, username)
        msg = 'SUCCESS'

    return jsonify(msg)

# upload ressult to the database


@app.route("/upload", methods=['POST'])
def uploadResult():
    msg = ''
    username = request.json['username']
    result = request.json['result']
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    # get user ID in database based on username
    cursor.execute(
        'SELECT id from user where user_name = %s', (username,)
    )
    user_id = cursor.fetchone()
    cursor.execute(
        'INSERT INTO result(user_ID, result) VALUES (%s, %s)', (user_id['id'], result,))
    mysql.connection.commit()
    msg = 'SUCCESS'

    return jsonify(msg)


@app.route("/get/result", methods=['POST'])
def getResultTable():
    username = request.json

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'SELECT id from user where user_name = %s', (username,)
    )
    user_id = cursor.fetchone()
    cursor.execute(
        'SELECT * from result where USER_ID = %s', (user_id['id'],)
    )
    result = cursor.fetchall()
    print(result)
    return jsonify(result)


if __name__ == "__main__":
    app.run(host='10.123.1.225', port=3000, debug=True)
