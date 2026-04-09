from fastapi import Depends,APIRouter
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from schemas.instructor_profile import InstructorCreate
from database import get_db
from fastapi import Header, HTTPException
import os
from models import Instructor

router = APIRouter(tags=["Instructor Profile"])

STUDENT_DIR=r"\\192.168.41.96\SharedVideos\StudentPhotos"
os.makedirs(STUDENT_DIR,exist_ok=True)
# @router.post("/insert_update_instructor_profile/{user_id}")
# def insert_update_profile(user_id: int, data: InstructorCreate, db: Session = Depends(get_db)):

#     instructor = db.query(models.Instructor).filter(
#         models.Instructor.user_id == user_id
#     ).first()

#     if instructor:
#         instructor.photo = data.photo
#         instructor.gender = data.gender
#         instructor.mobile = data.mobile
#         instructor.qualification = data.qualification
#         instructor.experience = data.experience
#         instructor.skills = data.skills
#         instructor.language = data.language
#         instructor.bio = data.bio
#         instructor.state_id = data.state_id
#         instructor.city_id = data.city_id

#         db.commit()
#         db.refresh(instructor)

#         return {"status": True, "message": "Updated Successfully"}

#     else:
#         new_instructor = models.Instructor(
#             user_id=user_id,
#             photo=data.photo,
#             gender=data.gender,
#             mobile=data.mobile,
#             qualification=data.qualification,
#             experience=data.experience,
#             skills=data.skills,
#             language=data.language,
#             bio=data.bio,
#             state_id=data.state_id,
#             city_id=data.city_id
#         )

#         db.add(new_instructor)
#         db.commit()
#         db.refresh(new_instructor)

#         return {"status": True, "message": "Inserted Successfully"}

# @router.post("/insert_update_instructor_profile/{user_id}")
# def insert_update_profile(
#     user_id: int,
#     data: InstructorCreate,
#     db: Session = Depends(get_db)
# ):

#     # Check existing instructor
#     instructor = db.query(models.Instructor).filter(
#         models.Instructor.user_id == user_id
#     ).first()

#     if instructor:
#         # UPDATE
#         instructor.photo = data.photo 
#         instructor.gender = data.gender
#         instructor.mobile = data.mobile
#         instructor.qualification = data.qualification 
#         instructor.experience = data.experience
#         instructor.skills = data.skills
#         instructor.bio = data.bio
#         instructor.language = data.language
#         instructor.state_id = data.state_id
#         instructor.city_id = data.city_id

#         db.commit()
#         db.refresh(instructor)

#         return {"status": True, "message": "Student Updated Successfully"}

#     else:
#         # INSERT
#         new_instructor = models.Instructor(
#             user_id=user_id,
#             photo = data.photo, 
#             gender = data.gender,
#             mobile = data.mobile,
#             qualification = data.qualification, 
#             experience = data.experience,
#             skills = data.skills,
#             bio = data.bio,
#             language = data.language,
#             state_id = data.state_id,
#             city_id = data.city_id
#         )

#         db.add(new_instructor)
#         db.commit()
#         db.refresh(new_instructor)

#         return {"status": True, "message": "Instructor Inserted Successfully"}


# @router.post("/insert_update_instructor_profile")
# def insert_update_profile(
#     data: InstructorCreate,
#     authorization: str = Header(None),
#     db: Session = Depends(get_db)
# ):
#     try:
#         #  Check token
#         if not authorization:
#             raise HTTPException(status_code=401, detail="Token missing")

#         token = authorization.split(" ")[1]
#         payload = decode_access_token(token)

#         if not payload:
#             raise HTTPException(status_code=401, detail="Invalid token")

#         user_id = payload["user_id"]

#         #  Check existing instructor
#         instructor = db.query(models.Instructor).filter(
#             models.Instructor.user_id == user_id
#         ).first()

#         if instructor:
#             # 🔄 UPDATE
#             instructor.photo = data.photo
#             instructor.gender = data.gender
#             instructor.mobile = data.mobile
#             instructor.qualification = data.qualification
#             instructor.experience = data.experience
#             instructor.skills = data.skills
#             instructor.language = data.language
#             instructor.bio = data.bio
#             instructor.state_id = data.state_id
#             instructor.city_id = data.city_id

#             db.commit()
#             db.refresh(instructor)

#             return {"status": True, "message": "Instructor Updated Successfully"}

#         else:
#             # ➕ INSERT
#             new_instructor = models.Instructor(
#                 user_id=user_id,
#                 photo=data.photo,
#                 gender=data.gender,
#                 mobile=data.mobile,
#                 qualification=data.qualification,
#                 experience=data.experience,
#                 skills=data.skills,
#                 language=data.language,
#                 bio=data.bio,
#                 state_id=data.state_id,
#                 city_id=data.city_id
#             )

#             db.add(new_instructor)
#             db.commit()
#             db.refresh(new_instructor)

#             return {"status": True, "message": "Instructor Created Successfully"}

#     except Exception as e:
#         db.rollback()
#         print("ERROR:", str(e))
#         raise HTTPException(status_code=500, detail="Something went wrong")

# @router.get("/total_instructor")
# def total_student(db: Session = Depends(get_db)):
#     count = db.query(models.Instructor).count()
#     return {"total_instructor": count}

# @router.get('/single_instructor_profile/{instructor_id}')
# def single_instructor_profile(instructor_id: int, db: Session = Depends(get_db)):
#     instructor_data = db.query(models.Instructor)\
#         .options(joinedload(models.Instructor.state),
#                  joinedload(models.Instructor.city))\
#         .filter(models.Instructor.instructor_id == instructor_id)\
#         .first()

#     if not instructor_data:
#         return {"error": "Instructor not found"}

#     return {
#         "photo": instructor_data.photo,
#         "gender": instructor_data.gender,
#         "mobile": instructor_data.mobile,
#         "qualification": instructor_data.qualification, 
#         "experience": instructor_data.experience,
#         "skills": instructor_data.skills,
#         "bio": instructor_data.bio,
#         "language": instructor_data.language,
#         "state_id": instructor_data.state_id,
#         "city_id": instructor_data.city_id,
#         "state_name": instructor_data.state.state_name if instructor_data.state else None,
#         "city_name": instructor_data.city.city_name if instructor_data.city else None,
#     }


@router.get("/instructor_display")
def instructor_display(db:Session=Depends(get_db)):
      data = db.query(models.Instructor).order_by(models.Instructor.instructor_id.asc()).all()
      return data

@router.get("/total_instructor")
def total_instructor(db: Session = Depends(get_db)):
    count = db.query(models.Instructor).count()
    return {"total_instructor": count}

@router.get("/get_instructor_by_user/{user_id}")
def get_student_by_user(user_id: int, db: Session = Depends(get_db)):
    
    instructor = db.query(models.Instructor)\
        .filter(models.Instructor.user_id == user_id)\
        .first()

    # If instructor does not exist → create new
    if not instructor:
        student = models.Instructor(user_id=user_id)
        db.add(instructor)
        db.commit()
        db.refresh(instructor)

    return instructor


from fastapi import Form, File, UploadFile
import json

# @router.post("/insert_update_instructor_profile/{user_id}")
# async def insert_update_profile(
#     user_id: int,
#      photo: UploadFile = File(None),
#     gender: str = Form(...),
#     mobile: str = Form(...),
#     qualification: str = Form(...),
#     experience: str = Form(...),
#     skills: str = Form(...),
#     bio: str = Form(...),
#     language: str = Form(...),
#     state_id: int = Form(...),
#     city_id: int = Form(...),
#     db: Session = Depends(get_db)
# ):
    
#     # convert string → list
#     skills_list = json.loads(skills)
#     language_list = json.loads(language)

#     # check existing
#     instructor = db.query(models.Instructor).filter(
#         models.Instructor.user_id == user_id
#     ).first()

#     if instructor:
#         instructor.gender = gender
#         instructor.mobile = mobile
#         instructor.qualification = qualification
#         instructor.experience = experience
#         instructor.skills = skills_list
#         instructor.language = language_list
#         instructor.bio = bio
#         instructor.state_id = state_id
#         instructor.city_id = city_id

#         db.commit()
#         db.refresh(instructor)

#         return {"status": True, "message": "Updated"}

#     return {"status": False, "message": "Not found"}

@router.post("/insert_update_instructor_profile/{user_id}")
async def insert_profile(
    user_id: int,
    gender: str = Form(...),
    mobile: str = Form(...),
    qualification: str = Form(...),
    bio: str = Form(...),
    experience: int = Form(...),
    state_id: int = Form(...),
    city_id: int = Form(...),
    language: str = Form(...),
    skills: str = Form(...),
    photo: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    try:
        file_name = None

        print("DATA RECEIVED:")
        print("gender:", gender)
        print("mobile:", mobile)
        print("experience:", experience)
        print("state_id:", state_id)
        print("city_id:", city_id)
        print("language:", language)
        print("skills:", skills)

        import os

        # ✅ FIXED FILE SAVE
        if photo:
            file_name = photo.filename
            file_location = os.path.join(STUDENT_DIR, file_name)

            print("Saving file to:", file_location)

            with open(file_location, "wb") as f:
                f.write(await photo.read())

        # ✅ DB insert
        new_profile = Instructor(
            user_id=user_id,
            gender=gender,
            mobile=mobile,
            qualification=qualification,
            bio=bio,
            experience=experience,
            state_id=state_id,
            city_id=city_id,
            language=language,
            skills=skills,
            photo=file_name
        )

        db.add(new_profile)
        db.commit()
        db.refresh(new_profile)

        print("INSERT SUCCESS")  # debug

        return {"message": "Data inserted successfully"}

    except Exception as e:
        print("ERROR:", e)
        return {"error": str(e)}
    

@router.put("/update_instructor_profile/{user_id}")
async def update_profile(
    user_id: int,
    gender: str = Form(None),
    mobile: str = Form(None),
    qualification: str = Form(None),
    bio: str = Form(None),
    experience: int = Form(None),
    state_id: int = Form(None),
    city_id: int = Form(None),
    language: str = Form(None),
    skills: str = Form(None),
    photo: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    import os

    instructor = db.query(Instructor).filter(
        Instructor.user_id == user_id
    ).first()

    if not instructor:
        raise HTTPException(status_code=404, detail="Instructor not found")

    # UPDATE FIELDS
    if gender: instructor.gender = gender
    if mobile: instructor.mobile = mobile
    if qualification: instructor.qualification = qualification
    if bio: instructor.bio = bio
    if experience: instructor.experience = experience
    if state_id: instructor.state_id = state_id
    if city_id: instructor.city_id = city_id
    if language: instructor.language = language
    if skills: instructor.skills = skills

    # IMAGE UPDATE
    if photo:
        file_name = photo.filename
        file_location = os.path.join(STUDENT_DIR, file_name)

        with open(file_location, "wb") as f:
            f.write(await photo.read())

        instructor.photo = file_name

    db.commit()

    return {"message": "Instructor updated successfully"}  

@router.delete("/delete_instructor/{user_id}")
def delete_instructor(user_id: int, db: Session = Depends(get_db)):
    instructor = db.query(Instructor).filter(
        Instructor.user_id == user_id
    ).first()

    if not instructor:
        raise HTTPException(status_code=404, detail="Instructor not found")

    db.delete(instructor)
    db.commit()

    return {"message": "Instructor deleted successfully"}