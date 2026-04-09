from fastapi import Depends,APIRouter ,UploadFile,Form,HTTPException,File
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from schemas.stud_profile import StudentCreate,CityBase
from database import get_db
import os,shutil

router = APIRouter(tags=["Profile"])

STUDENT_DIR = "SharedVideos/StudentPhotos"
os.makedirs(STUDENT_DIR, exist_ok=True)

# @router.get("/states")
# def get_states(db:Session=Depends(get_db)):
#       return db.query(models.State).all()
@router.get("/states")
def get_states(db: Session = Depends(get_db)):
    states = db.query(models.State).order_by(models.State.state_name.asc()).all()
    return states

@router.put("/update_states/{state_id}")
def update_state(
    state_id: int,
    state_name: str = Form(...),
    db: Session = Depends(get_db)
):
    db_state = db.query(models.State).filter(models.State.state_id == state_id).first()

    if not db_state:
        raise HTTPException(status_code=404, detail="State not found")

    db_state.state_name = state_name

    db.commit()
    db.refresh(db_state)

    return {"message": "State updated successfully"}


@router.get("/cities/{state_id}")
def get_cities(state_id:int,db:Session=Depends(get_db)):
     return db.query(models.City).filter(models.City.state_id==state_id).all()

@router.get("/cities_display")
def cities_display(db:Session=Depends(get_db)):
    data = db.query(models.City).order_by(models.City.city_id.asc()).all()
    return data

@router.put("/cities/{city_id}")
def update_city(
    city_id: int,
    city_name: str = Form(...),
    state_id: int = Form(...),
    db: Session = Depends(get_db)
):
    db_city = db.query(models.City).filter(models.City.city_id == city_id).first()

    db_city.city_name = city_name
    db_city.state_id = state_id

    db.commit()
    
    return {"message": "City updated"}



@router.get('/single_profile/{stud_id}')
def single_profile(stud_id: int, db: Session = Depends(get_db)):
    stud_data = db.query(models.Student)\
        .options(joinedload(models.Student.state),
                 joinedload(models.Student.city))\
        .filter(models.Student.stud_id == stud_id)\
        .first()

    if not stud_data:
        return {"error": "Student not found"}

    return {
        "age": stud_data.age,
        "education": stud_data.education,
        "state_id": stud_data.state_id,
        "city_id": stud_data.city_id,
        "state_name": stud_data.state.state_name if stud_data.state else None,
        "city_name": stud_data.city.city_name if stud_data.city else None,
        "skills": stud_data.skills,
        "language": stud_data.language,
        "photo":stud_data.photo
    }

    
@router.get("/get_student_by_user/{user_id}")
def get_student_by_user(user_id: int, db: Session = Depends(get_db)):
    
    student = db.query(models.Student)\
        .filter(models.Student.user_id == user_id)\
        .first()

    # If student does not exist → create new
    if not student:
        student = models.Student(user_id=user_id)
        db.add(student)
        db.commit()
        db.refresh(student)
    return student


@router.post("/insert_update_profile/{user_id}")
def insert_update_profile(
    user_id: int,
    data:StudentCreate,
    db: Session = Depends(get_db)
):

    # Check existing student
    student = db.query(models.Student).filter(
        models.Student.user_id == user_id
    ).first()

    if student:
        # UPDATE
        student.age = data.age
        student.education = data.education
        student.state_id = data.state_id
        student.city_id = data.city_id
        student.skills = data.skills
        student.language = data.language

        db.commit()
        db.refresh(student)

        return {"status": True, "message": "Student Updated Successfully"}

    else:
        # INSERT
        new_student = models.Student(
            user_id=user_id,
            age=data.age,
            education=data.education,
            state_id=data.state_id,
            city_id=data.city_id,
            skills=data.skills,
            language=data.language,
        )

        db.add(new_student)
        db.commit()
        db.refresh(new_student)

        return {"status": True, "message": "Student Inserted Successfully"}


@router.get("/students_display")
def students_display(db:Session=Depends(get_db)):
      data = db.query(models.Student).order_by(models.Student.stud_id.asc()).all()
      return data

@router.get("/total_student")
def total_student(db: Session = Depends(get_db)):
    count = db.query(models.Student).count()
    return {"total_student": count}

@router.post("/profile_photo/{user_id}")
def profile_photo(
    user_id: int,
    photo:UploadFile=File(...),
    db: Session = Depends(get_db)
):
    # Check existing student
    student = db.query(models.Student).filter(
        models.Student.user_id == user_id
    ).first()

    filename = photo.filename
    file_path = f"{STUDENT_DIR}/{photo.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(photo.file, buffer)

    if student:
        # UPDATE
        student.photo = filename
        db.commit()
        db.refresh(student)
        return {"status": True, "message": "Student Photo Updated Successfully"}

    else:
        # INSERT
        new_student = models.Student(
            user_id=user_id,
            photo=filename
        )
        db.add(new_student)
        db.commit()
        db.refresh(new_student)
        return {"status": True, "message": "Student photo Inserted Successfully"}
