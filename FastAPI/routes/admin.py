from fastapi import APIRouter, Depends,Request
from fastapi.responses import JSONResponse
from database import get_db
from models import Admin,OTP
from schemas.admin import AdminLogin,ChangePassword
import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from utils.email import send_otp_email

router = APIRouter(tags=["Admin"])

@router.post("/admin_login")
def admin_login(data: AdminLogin, db = Depends(get_db)):
    admin = db.query(Admin).filter(
        Admin.admin_email == data.admin_email,
        Admin.admin_password == data.admin_password
    ).first()

    if admin:
        return {
            "success": True,
            "message": "Login successful",
            "admin_email": admin.admin_email,
            "admin_name": admin.admin_name 
        }
    else:
        return JSONResponse(
            status_code=401,
            content={"success": False, "message": "Invalid credentials"}
        )
    

@router.post("/change_password")
def change_password(
    data: ChangePassword,
    request: Request,
    db = Depends(get_db)
):
    # Get logged-in user (example using session/token)
    admin_email = request.headers.get("email")  # OR from token

    if not admin_email:
        return {"success": False, "message": "Unauthorized"}

    # Find admin
    admin = db.query(Admin).filter(
        Admin.admin_email == admin_email
    ).first()

    if not admin:
        return {"success": False, "message": "Admin not found"}

    # Check old password
    if admin.admin_password != data.old_password:
        return {"success": False, "message": "Old password is incorrect"}

    # Update password
    admin.admin_password = data.new_password
    db.commit()

    return {
        "success": True,
        "message": "Password changed successfully"
    }

@router.post("/forgot_password")
def forgot_password(data: dict, db: Session = Depends(get_db)):
    email = data.get("email")

    # Check admin exists
    admin = db.query(Admin).filter(Admin.admin_email == email).first()
    if not admin:
        return {"success": False, "message": "Admin email not registered"}

    # Generate OTP
    otp_code = str(random.randint(100000, 999999))
    expiry = datetime.utcnow() + timedelta(minutes=5)

    # Save OTP
    new_otp = OTP(
        admin_email=email,
        otp=otp_code,
        expiry=expiry
    )

    db.add(new_otp)
    db.commit()

    #  TEMP: print OTP (replace with email sending later)
    send_otp_email(email, otp_code)

    return {
        "success": True,
        "message": "OTP sent to registered email"
    }

@router.post("/verify_otp")
def verify_otp(data: dict, db: Session = Depends(get_db)):
    email = data.get("email")
    otp = data.get("otp")

    record = (
        db.query(OTP)
        .filter(OTP.admin_email == email, OTP.otp == otp)
        .order_by(OTP.otp_id.desc())
        .first()
    )

    if not record:
        return {"success": False, "message": "Invalid OTP"}

    # check expiry
    if record.expiry < datetime.utcnow():
        return {"success": False, "message": "OTP expired"}

    return {"success": True, "message": "OTP verified"}

from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/reset_password")
def reset_password(data: dict, db: Session = Depends(get_db)):
    email = data.get("email")
    new_password = data.get("new_password")

    admin = db.query(Admin).filter(Admin.admin_email == email).first()
    if not admin:
        return {"success": False, "message": "Admin not found"}

    # hash password
    hashed_password = pwd_context.hash(new_password)

    admin.admin_password = new_password
    db.commit()

    return {"success": True, "message": "Password reset successful"}