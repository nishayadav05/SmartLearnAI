from fastapi import FastAPI,Depends,Form,HTTPException,APIRouter,Header
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session
from routes import blog
from auth import hash_password,verify_password,create_access_token,decode_access_token
from database import get_db

router=APIRouter(tags=["Users"])
        
# with hashed
@router.post("/stud_registration")
def register_user( 
    fullname: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):

    # Check email exists
    existing_user = db.query(models.Users).filter(models.Users.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    #  HASH PASSWORD
    hashed_pwd = hash_password(password)

    # Save user
    new_user = models.Users(
        fullname=fullname,
        email=email,
        password=hashed_pwd
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Registration successful"}


@router.get("/users_display")
def users_display(db:Session=Depends(get_db)):
      data = db.query(models.Users).order_by(models.Users.user_id.asc()).all()
      return data


@router.post("/login")
def login_user(
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
):
    user = db.query(models.Users).filter(
        models.Users.email == email
    ).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # VERIFY HASHED PASSWORD
    if not verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token({"user_id": user.user_id})

    return {
        "success": True,
        "token": token,
        "user_id": user.user_id,
        "user": {
            "fullname": user.fullname,
            "email": user.email
        }
    }


#  GET LOGGED-IN USER
@router.get("/me")
def get_me(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    if not authorization:
        raise HTTPException(401, "Token missing")

    token = authorization.split(" ")[1]
    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(401, "Invalid token")

    user = db.query(models.Users).filter(
        models.Users.user_id == payload["user_id"]
    ).first()

    return {
        "user_id":user.user_id,
        "fullname": user.fullname,
        "email": user.email
    }