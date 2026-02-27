from fastapi import FastAPI,HTTPException,Depends,APIRouter,Form
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from schemas.stud_profile import StudentCreate
# from schemas.stud_profile import UpdateProfile

router = APIRouter(tags=["Profile"])

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/states")
def get_states(db:Session=Depends(get_db)):
      return db.query(models.State).all()


@router.get("/cities/{state_id}")
def get_cities(state_id:int,db:Session=Depends(get_db)):
     return db.query(models.City).filter(models.City.state_id==state_id).all()

# @router.post("/insert_stud_data")
# def insert_stud_data(
#     user_id: int = Form(...),
#     age:int=Form(...),
#     education:str=Form(...),
#     state:str=Form(...),
#     city:str=Form(...),
#     skills:str=Form(...),
#     language:str=Form(...),
#     db:Session=Depends(get_db)
# ):
    
#     stud = models.Student(
#          user_id = user_id,
#          age=age,
#          education=education,
#          state=state,
#          city=city,
#          skills=skills,
#          language=language
#     )
#     db.add(stud)
#     db.commit()
#     db.refresh(stud)
    

#     return {"message": "Registration successful"}


# @router.put("/update_profile/{user_id}")
# def update_profile(
#     user_id: int,
#     data: UpdateProfile,
#     db: Session = Depends(get_db)
# ):
#     student = db.query(models.Student)\
#         .filter(models.Student.user_id == user_id)\
#         .first()

#     if not student:
#         raise HTTPException(status_code=404, detail="Student not found")

#     student.age = data.age
#     student.education = data.education
#     student.state_id = data.state_id
#     student.city_id = data.city_id
#     student.skills = data.skills
#     student.language = data.language

#     db.commit()
#     db.refresh(student)

#     return {"message": "Profile Updated Successfully"}

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
# def get_student_by_user(
#     user_id: int,
#     db: Session = Depends(get_db)
# ):
#     student = db.query(models.Student).filter(models.Student.user_id == user_id).first()
#     if not student:
#         return {"error": "Student not found"}
#     return student


@router.get("/get_student_by_user/{user_id}")
def get_student_by_user(user_id: int, db: Session = Depends(get_db)):
    try:
        student = db.query(models.Student)\
            .filter(models.Student.user_id == user_id)\
            .first()

        return student
    except Exception as e:
        print("ERROR:", e)
        raise e
    




@router.post("/insert_update_profile/{user_id}")
def insert_update_profile(
    user_id: int,
    data: StudentCreate,
    db: Session = Depends(get_db)
):
    # Check if record exists
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

        return {"message": "Student Updated Successfully"}

    else:
        #  INSERT
        new_student = models.Student(
            stud_id=data.stud_id,
            user_id=data.user_id,
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

        return {"message": "Student Inserted Successfully"}