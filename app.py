from argparse import FileType
from io import BytesIO
from flask.json import jsonify
import base64
from flask_cors import CORS, cross_origin
import os
from markupsafe import string
from emotion_detection import analyze
from email.policy import default
from pickle import FALSE
from sqlite3 import Cursor
from tkinter.tix import Tree
from aiohttp import request
from flask import Flask, jsonify, render_template, request, redirect, url_for, session, Response
from itsdangerous import json
from flask_sqlalchemy import SQLAlchemy
import bcrypt
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re

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


@app.route('/login', methods=['GET', 'POST'])
def login():
    msg = ''
    # check if "username" and "password" POST exist
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        # create variables for easy access
        username = request.json['username']
        password = request.json['password']
        # check login form exists in database
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(
            'SELECT * FROM user WHERE user_name = %s', [username])
        account = cursor.fetchone()
        print(account['password'])
    # check if account exists
        if account:
            if bcrypt.checkpw(password.encode('utf-8'), account['password'].encode('utf-8')):
                session['loggedin'] = True
                session['id'] = account['id']
                session['username'] = account['user_name']
                msg = 'Loggedin'
            else:
                msg = 'You entered wrong password! Please try again!'
        else:
            msg = 'Incorrect username! Please try again!'

    return (msg)


# register session


@app.route('/login/register', methods=['GET', 'POST'])
def register():
    msg = ''

    # check if user_name and password already exist in database
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form:
        # create variables for easy access
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

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
            msg = 'You have successfully registered!'

    elif request.method == 'POST':
        msg = 'Please fill out the form!'

    return (msg)


@app.route('/login/logout')
def logout():
    session.pop('logged in!', None)
    session.pop('id', None)
    session.pop('username', None)
    return ("Logged out!")


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


@app.route("/get", methods=['GET'])
def responeAnalyze():
    result = analyze('savedimage.jpeg')
    os.remove("savedimage.jpeg")
    return jsonify(result)


if __name__ == "__main__":
    app.run(host='10.123.1.234', port=3000, debug=True)
