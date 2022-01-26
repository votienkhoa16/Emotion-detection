from argparse import FileType
from flask import Flask, Response, request
from io import BytesIO
from flask.json import jsonify
import base64
from flask_cors import CORS, cross_origin
import os
import sys

from markupsafe import string
# import emotion detection
from emotion_detection import analyze
#import matplotlib.pyplot as plt

app = Flask(__name__)
cors = CORS(app)


@app.route("/", methods=['GET', 'POST'])
# get the image from client (byte)
def image():
    if(request.method == "POST"):
        bytesOfImage = request.get_data()
        print("Image Read!!!")
    stringBase64 = base64.b64encode(bytesOfImage)
    with open('text.txt', 'wb') as out:
        out.write(stringBase64)
    # get base64 path
    # analyze(stringBase64)
    # print(imageBase64)
    # return(stringBase64)
    return("read!!!!")


if __name__ == "__main__":
    app.run(host='192.168.0.2', port=3000, debug=True)
