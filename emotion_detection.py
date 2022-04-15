from distutils.log import error
from black import nullcontext
from deepface import DeepFace
from deepface.commons import functions, realtime, distance as dst
import cv2 as cv
# import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from tqdm import tqdm
import os


def calculatePredictions(emotionPredictions, sumOfPredictions):
    return round(100 * emotionPredictions / sumOfPredictions, 2)


def analyze(imgPath, models=None, enforce_detection=True, detectorBackend='opencv', progBar=True):

    # input models if true
    if not models:
        models = {}

    # get one or more img path
    imgPaths, bulkProcess = functions.initialize_input(imgPath)
    models['emotion'] = DeepFace.build_model('Emotion')

    # list all the models that are built
    # uiltModels = list(model.keys())

    # disable function
    disableOption = (False if len(imgPaths) > 1 else True) or not progBar

    gobPbar = tqdm(range(0, len(imgPaths)),
                   desc="Analyzing emotion", disable=disableOption)

    for iObj in gobPbar:
        imgPath = imgPaths[iObj]

        imgNone = None  # to prevent re-dectection

        # set region of image
        region = []

        regionLabels = ['x', 'y', 'w', 'h']

        isRegionSet = False

        # set emotion labels
        emotionLabels = ['angry', 'disgust', 'fear',
                         'happy', 'sad', 'surprise', 'neutral']

        img, region = functions.preprocess_face(img=imgPath, target_size=(
            48, 48), grayscale=True, enforce_detection=enforce_detection, detector_backend=detectorBackend, return_region=True)

        # Check Value error
        # get number of prediction
        emotionPredictions = models['emotion'].predict(img)[0, :]

        # sum the predictions
        sumOfPredictions = emotionPredictions.sum()

        # set predictions value of emotions
        # 'angry' = 0, 'disgust' = 1, 'fear' = 2, 'happy' = 3, 'sad' = 4, 'surprise' = 5, 'neutral' = 6

        angryAccuracy = calculatePredictions(
            emotionPredictions[0], sumOfPredictions)
        disgustAccuracy = calculatePredictions(
            emotionPredictions[1], sumOfPredictions)
        fearAccuracy = calculatePredictions(
            emotionPredictions[2], sumOfPredictions)
        happyAccuracy = calculatePredictions(
            emotionPredictions[3], sumOfPredictions)
        sadAccuracy = calculatePredictions(
            emotionPredictions[4], sumOfPredictions)
        supriseAccuracy = calculatePredictions(
            emotionPredictions[5], sumOfPredictions)
        neutralAccuracy = calculatePredictions(
            emotionPredictions[6], sumOfPredictions)

        print(sumOfPredictions)
        print("Angry: ", angryAccuracy, "%")
        print("Disgust: ", disgustAccuracy, "%")
        print("Fear: ", fearAccuracy, "%")
        print("Happy: ", happyAccuracy, "%")
        print("Sad: ", sadAccuracy, "%")
        print("Suprise: ", supriseAccuracy, "%")
        print("Neutral: ", neutralAccuracy, "%")

        # get predicted emotion
        dominantEmotion = emotionLabels[np.argmax(emotionPredictions)]
        print("Predicted emotion: ", dominantEmotion)

        # label advice with predicted emotion
        advices = getAdvice(dominantEmotion)

        analyzeTuple = (str(angryAccuracy), str(disgustAccuracy), str(fearAccuracy), str(
            happyAccuracy), str(sadAccuracy), str(supriseAccuracy), str(neutralAccuracy), dominantEmotion, advices)

        analyzeText = '/'.join(analyzeTuple)
        print(analyzeText)

    return analyzeText

# giving advice for user


def getAdvice(detectedEmotion):
    words = ""
    if (detectedEmotion == 'happy'):
        words = "You must've been having a nice day!"

    if (detectedEmotion == 'fear'):
        words = "Fear is natural! But don't let it control you. Leave it aside and you can forget it."

    if (detectedEmotion == 'angry'):
        words = "You must be angry with someone and it may be not worth. Just try to calm yourself. Maybe a good humor video can help you."

    if (detectedEmotion == 'sad'):
        words = "I see you have a rough day. I can have some lo-fi musics that can help you relax. Would you like to listen to it?"

    if (detectedEmotion == 'surprise'):
        words = "There is something that surprise you, isn't it? Hope you can share with me."

    if (detectedEmotion == 'neutral'):
        words = "Your face is very neutral and calm. Maybe today is a peaceful day for you, isn't it?"

    return words


if __name__ == "__main__":
    email = "otakutonyvo16@gmail.com"
    body = "This is a test email! Please do not respond."

    analyze("test.jpg")
