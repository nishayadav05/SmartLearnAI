from fastapi import Depends,APIRouter
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from schemas.stud_profile import StudentCreate
from database import get_db


router = APIRouter(tags=["Profile"])

@router.get("/states")
def get_states(db:Session=Depends(get_db)):
      return db.query(models.State).all()


@router.get("/cities/{state_id}")
def get_cities(state_id:int,db:Session=Depends(get_db)):
     return db.query(models.City).filter(models.City.state_id==state_id).all()

@router.get("/cities_display")
def cities_display(db:Session=Depends(get_db)):
    data = db.query(models.City).order_by(models.City.city_id.asc()).all()
    return data


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
        "language": stud_data.language
    }



# @router.get("/get_student_by_user/{user_id}")
# def get_student_by_user(user_id: int, db: Session = Depends(get_db)):
#     try:
#         student = db.query(models.Student)\
#             .filter(models.Student.user_id == user_id)\
#             .first()

#         return student
#     except Exception as e:
#         print("ERROR:", e)
#         raise e
    

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
    data: StudentCreate,
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
            language=data.language
        )

        db.add(new_student)
        db.commit()
        db.refresh(new_student)

        return {"status": True, "message": "Student Inserted Successfully"}


@router.get("/students_display")
def students_display(db:Session=Depends(get_db)):
      data = db.query(models.Student).order_by(models.Student.stud_id.asc()).all()
      return data