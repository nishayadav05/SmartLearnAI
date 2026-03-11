# from fastapi import Depends,APIRouter
# import models
# from database import SessionLocal
# from sqlalchemy.orm import Session
# from schemas.contact import ContactModel
# from database import get_db

# router = APIRouter(tags=["Contact"])

# @router.post("/insert_contact_msg")
# def insert_contact_msg(
#     user_id: int,
#     data: ContactModel,
#     db: Session = Depends(get_db)
# ):

#       # Check existing user
#       contact = db.query(models.Users).filter(
#             models.Users.user_id == user_id
#             ).first()

#       if contact:
#             new_contact = models.Contact(
#                   user_id=user_id,
#                   message = data.message
#             )

#             db.add(new_contact)
#             db.commit()
#             db.refresh(new_contact)

#       return {"status": True, "message": "Contact Message insert successfully"}




from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import models
from database import get_db
from schemas.contact import ContactModel

router = APIRouter()

@router.post("/insert_contact_msg")
def insert_contact_msg(data: ContactModel, db: Session = Depends(get_db)):

    new_contact = models.Contact(
        user_id=data.user_id,
        message=data.message
    )

    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)

    return {
        "status": True,
        "message": "Contact message inserted successfully"
    }