from smtplib import SMTP
from email.message import Message
import os


class EmailService:
    def sendEmail(self, email: str, subject: str, body: str):
        msg = Message()
        msg["Subject"] = subject
        msg["From"] = os.getenv("APPLICATION_EMAIL")
        msg["To"] = email
        msg.add_header("Content-Type", "text/html")
        msg.set_payload(body)

        smtp = SMTP("smtp.gmail.com: 587")
        smtp.starttls()
        APPLICATION_EMAIL_PASSWORD = os.getenv("APPLICATION_EMAIL_PASSWORD")
        smtp.login(msg["From"], password=APPLICATION_EMAIL_PASSWORD)
        smtp.sendmail(msg["From"], [msg["To"]],
                      msg.as_string().encode("utf-8"))
        smtp.close()
