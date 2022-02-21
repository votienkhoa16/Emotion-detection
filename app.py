from argparse import FileType
from flask import Flask, Response, request
from io import BytesIO
from flask.json import jsonify
import base64
from flask_cors import CORS, cross_origin
import os
from markupsafe import string
from emotion_detection import analyze

app = Flask(__name__)
cors = CORS(app)


@app.route("/", methods=['GET', 'POST'])
# get the image from client (byte)
def image():
    if(request.method == "POST"):
        # get the encrypted data
        bytesOfImage = request.get_data()
        print("Image Read!!!")
    # encrypt the data to base64
    stringBase64 = base64.b64encode(bytesOfImage)

    # check if the file exists, delete the file first
    if (os.path.exists("savedimage.jpeg") == True):
        os.remove("savedimage.jpeg")
        # create the image from stringBase64
        with open('savedimage.jpeg', 'wb') as out:
            out.write(base64.b64decode(stringBase64))
        # analyze the image
        detectedEmotion = analyze("savedimage.jpeg")
        print(detectedEmotion)
        os.remove("savedimage.jpeg")
    else:
        with open('savedimage.jpeg', 'wb') as out:
            out.write(base64.b64decode(stringBase64))
        detectedEmotion = analyze("savedimage.jpeg")
        os.remove("savedimage.jpeg")

    return(detectedEmotion)


if __name__ == "__main__":
    app.run(host='192.168.0.103', port=3000, debug=True)
