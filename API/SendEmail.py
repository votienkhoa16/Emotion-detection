import smtplib
from pathlib import Path
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.utils import COMMASPACE, formatdate
from email import encoders


def send_email(emailProtector, username):
    #
    send_from = "DLA"
    send_to = emailProtector
    subject = "Result from " + username
    body = "*THIS IS AN AUTO EMAIL, PLEASE DO NOT RESPOND!\nHello, this an auto email from emotion detector app, your friend, " + \
        username + "is currently sad right now, and he/she needs to talk with you."
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
