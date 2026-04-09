from fastapi import FastAPI,Depends,Form,HTTPException,APIRouter,Header
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session
from routes import blog
from auth.auth import hash_password, verify_password, create_access_token, decode_access_token
from database import get_db
from auth.dependencies import verify_token
from schemas.user import UserModel

router=APIRouter(tags=["Users"])
        
# with hashed
# @router.post("/stud_registration")
# def register_user( 
#     fullname: str = Form(...),
#     email: str = Form(...),
#     password: str = Form(...),
#     db: Session = Depends(get_db)
# ):

#     # Check email exists
#     existing_user = db.query(models.Users).filter(models.Users.email == email).first()
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     #  HASH PASSWORD
#     hashed_pwd = hash_password(password)

#     # Save user
#     new_user = models.Users(
#         fullname=fullname,
#         email=email,
#         password=hashed_pwd
#     )
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)

#     return {"message": "Registration successful"}

@router.post("/stud_registration")
def stud_registration(
    fullname: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),  # already SHA256 from frontend
    db: Session = Depends(get_db)
):
    user = db.query(models.Users).filter(models.Users.email == email).first()
    if user:
        raise HTTPException(400, "Email already exists")

    hashed_pwd = hash_password(password)

    new_user = models.Users(
        fullname=fullname,
        email=email,
        password=hashed_pwd
    )

    db.add(new_user)
    db.commit()

    return {"message": "User registered"}


@router.get("/users_display")
def users_display(
    # payload: dict = Depends(verify_token),  
    db: Session = Depends(get_db)
):
    data = db.query(models.Users).all()
    return data


@router.get("/get_student_by_user/{user_id}")
def get_student_by_user(user_id: int, db: Session = Depends(get_db)):

    student = db.query(models.Student).filter(
        models.Student.user_id == user_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    return {
        "stud_id": student.stud_id
    }


@router.post("/login")
def login(
    email: str = Form(...),
    password: str = Form(...),  # SHA256
    db: Session = Depends(get_db)
):
    user = db.query(models.Users).filter(models.Users.email == email).first()

    if not user or not verify_password(password, user.password):
        raise HTTPException(400, "Invalid credentials")

    token = create_access_token({"user_id": user.user_id})

    return {
        "token": token,
        "user_id": user.user_id 
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


@router.get("/total_users")
def total_users(db: Session = Depends(get_db)):
    count = db.query(models.Users).count()
    return {"total_users": count}


@router.put("/update_users/{user_id}")
def update_user(user_id: int, user: UserModel, db: Session = Depends(get_db)):
    db_user = db.query(user).filter(user.user_id == user_id).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.fullname = user.fullname
    db_user.email = user.email
    db_user.status = user.status   # ✅ only this

    db.commit()

    return {"message": "User updated"}