from fastapi import FastAPI,Depends
from routes import users
import models 
from typing import Annotated
from database import engine,SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Annotated
from schemas.user import UserModel
from routes import blog,users
from fastapi.staticfiles import StaticFiles
from routes import stud_profile
from routes import course
import os



origins = [
    "http://localhost:5173",
]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(blog.router)
app.include_router(users.router)
app.include_router(stud_profile.router)
app.include_router(course.router)

#Blog Image Folder
UPLOAD_DIR="blogimages"
os.makedirs(UPLOAD_DIR,exist_ok=True)
app.mount("/blogimages", StaticFiles(directory="blogimages"), name="blogimages")


# create all database tables
models.Base.metadata.create_all(bind=engine)


# Dependency to get database session
def get_db():
      db = SessionLocal()
      try:
            yield db
      finally:
            db.close()


db_dependency = Annotated[Session,Depends(get_db)]



