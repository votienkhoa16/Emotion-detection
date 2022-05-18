from flask.json import jsonify
import base64
from flask_cors import CORS, cross_origin
import os
from jinja2 import Undefined
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
import datetime

from matplotlib import dates

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
        'SELECT email FROM user WHERE user_name = %s', (username,))
    account = cursor.fetchone()

    if account:
        msg = 'Account already exists!'
    elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        msg = 'Invalid email!'
    elif not re.match(r'[A-Za-z0-9]+', username):
        msg = 'Username must contain only characters and numbers!'
    elif not username or not password or not email:
        msg = 'Please fill out the form!'
        # if account doesn't exists and form data is valid, insert new account into database
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
    os.remove("savedimage.jpeg")
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
    resultAcc = request.json['resultAcc']
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    # get user ID in database based on username
    cursor.execute(
        'SELECT id from user where user_name = %s', (username,)
    )
    user_id = cursor.fetchone()
    cursor.execute(
        'INSERT INTO result(USER_ID, RESULT, RESULT_ACC) VALUES (%s, %s, %s)', (user_id['id'], result, resultAcc))
    mysql.connection.commit()
    msg = 'SUCCESS'

    return jsonify(msg)


@app.route("/get/result", methods=['POST'])
def getResultTable():
    username = 'orekisora'  # request.json

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'SELECT id from user where user_name = %s', (username,)
    )
    user_id = cursor.fetchone()
    cursor.execute(
        'SELECT * from result where USER_ID = %s', (user_id['id'],)
    )

    result = cursor.fetchall()

    return jsonify(result)


@app.route("/get/result2", methods=['POST'])
def getResults2():
    username = request.json
    # print(username)
    user_id = getUserID(username)

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    # GET DAY - MONTH FOR CHART LABELS
    cursor.execute(
        "SELECT DISTINCT DATE_FORMAT(RESULT_DATE,'%%d-%%m') AS date FROM result WHERE USER_ID = %s" % (user_id)
    )

    date = cursor.fetchall()

    list_date = []
    for row in date:
        list_date.append(row['date'])

    # get sad result
    cursor.execute(
        "SELECT RESULT_ACC, DATE_FORMAT(RESULT_DATE,'%%d-%%m') AS date FROM result WHERE RESULT = 'sad' and user_ID = %s" %
        (user_id)
    )
    result_sad = cursor.fetchall()
    # add accuracy to sad list
    list_sad = add_to_list(list_date, result_sad)

    # get angry result
    cursor.execute(
        "SELECT RESULT_ACC, DATE_FORMAT(RESULT_DATE,'%%d-%%m') AS date FROM result WHERE RESULT = 'angry' and user_ID = %s" %
        (user_id)
    )
    result_angry = cursor.fetchall()
    # add accuracy to angry list
    list_angry = add_to_list(list_date, result_angry)

    # get disgust result
    cursor.execute(
        "SELECT RESULT_ACC, DATE_FORMAT(RESULT_DATE,'%%d-%%m') AS date FROM result WHERE RESULT = 'disgust' and user_ID = %s" %
        (user_id)
    )
    result_disgust = cursor.fetchall()
    # add accuracy to disgust list
    list_disgust = add_to_list(list_date, result_disgust)

    # get fear result
    cursor.execute(
        "SELECT RESULT_ACC, DATE_FORMAT(RESULT_DATE,'%%d-%%m') AS date FROM result WHERE RESULT = 'fear' and user_ID = %s" %
        (user_id)
    )
    result_fear = cursor.fetchall()
    # add accuracy to fear list
    list_fear = add_to_list(list_date, result_fear)

    # get happy result
    cursor.execute(
        "SELECT RESULT_ACC, DATE_FORMAT(RESULT_DATE,'%%d-%%m') AS date FROM result WHERE RESULT = 'happy' and user_ID = %s" %
        (user_id)
    )
    result_happy = cursor.fetchall()
    # add accuracy to happy list
    list_happy = add_to_list(list_date, result_happy)

    # get surprise result
    cursor.execute(
        "SELECT RESULT_ACC, DATE_FORMAT(RESULT_DATE,'%%d-%%m') AS date FROM result WHERE RESULT = 'surprise' and user_ID = %s" %
        (user_id)
    )
    result_surprise = cursor.fetchall()
    # add accuracy to suprise list
    list_suprise = add_to_list(list_date, result_surprise
                               )
    # get neutral result
    cursor.execute(
        "SELECT RESULT_ACC, DATE_FORMAT(RESULT_DATE,'%%d-%%m') AS date FROM result WHERE RESULT = 'neutral' and user_ID = %s" %
        (user_id)
    )
    result_neutral = cursor.fetchall()
    # add accuracy to neutral list
    list_neutral = add_to_list(list_date, result_neutral)

    mysql.connection.commit()
    # zip the list
    return jsonify(list_date, list_angry, list_disgust, list_fear, list_happy, list_sad,
                   list_suprise, list_neutral)

# get user ID


def getUserID(username):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'SELECT id from user where user_name = %s', (username,)
    )

    user_ID = cursor.fetchone()
    return user_ID['id']

# This is a function that helps add the results to a list has the same date in the date
# list.


def add_to_list(date_list, tupleDB):

    result_list = [0] * len(date_list)

    date_result_list = []
    accuracy_list = []

    # get date list and accuracy of the result from the database and append it into the list
    # accuracy's position will be the same position of day in date_result_list that they had
    # been taken
    for row in tupleDB:
        accuracy_list.append(row['RESULT_ACC'])
        date_result_list.append(row['date'])
    # loop the overall date list from the database
    for i in range(len(date_list)):
        # loop the date_result_list
        for j in range(len(date_result_list)):
            # if the date in overall datelist == the date in the date_result_list
            if date_list[i] == date_result_list[j]:
                # take that date position and add to result's position with the same position
                # of the date
                result_list[i] = accuracy_list[j]
                break
            elif date_list[i] != date_result_list[j]:
                # if not the same, add 0 to the position
                result_list[i] = 0

    return result_list
#----------------------------------------#


if __name__ == "__main__":
    app.run(host='192.168.0.103', port=3000, debug=True)
