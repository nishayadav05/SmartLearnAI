import smtplib
from email.mime.text import MIMEText

def send_otp_email(to_email, otp):
    sender_email = "smartlearnai399@gmail.com"
    sender_password = "culvbjlqndwwpkrl"

    subject = "Password Reset OTP - SmartLearn.AI"

    #  Professional HTML Email Body
    body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        
        <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; text-align: center;">
            
            <h2 style="color: #4CAF50;">SmartLearn.AI</h2>
            
            <h3>Password Reset Request</h3>
            
            <p>Hello,</p>
            
            <p>Your OTP for password reset is:</p>
            
            <h1 style="color: #2196F3; letter-spacing: 5px;">{otp}</h1>
            
            <p>This OTP is valid for <b>5 minutes</b>.</p>
            
            <p style="color: red;">Do not share this OTP with anyone.</p>
            
            <hr style="margin: 20px 0;">
            
            <p style="font-size: 12px; color: gray;">
                If you did not request this, please ignore this email.
            </p>

        </div>

    </body>
    </html>
    """

    #  HTML email
    msg = MIMEText(body, "html")
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = to_email

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        print("Email sent successfully ✅")
    except Exception as e:
        print("Error:", e)