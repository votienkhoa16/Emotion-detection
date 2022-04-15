import smtplib
from pathlib import Path
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.utils import COMMASPACE, formatdate
from email import encoders

from flask import send_from_directory


def send_email(emailProtector, bodyEmail):
    #
    send_from = "DLA"
    send_to = emailProtector
    subject = "One of your friend need help!!!!!"
    body = bodyEmail
    username = "emotionbotsora1123@gmail.com"
    password = "emotion1123"

    msg = MIMEMultipart()

    msg['from'] = send_from
    msg['To'] = send_to
    msg['Date'] = formatdate(localtime=True)
    msg['Subject'] = subject
    server = "smtp.gmail.com"
    port = 587
    use_tls = True

    msg.attach(MIMEText(body))

    smtp = smtplib.SMTP(server, port)
    if use_tls:
        smtp.starttls()

    smtp.login(username, password)
    smtp.sendmail(send_from, send_to, msg.as_string())
    smtp.quit()

    print("Message sent!")
