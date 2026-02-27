from fastapi import FastAPI,Depends,Form,File,UploadFile,HTTPException,APIRouter
import models
from database import engine,SessionLocal, SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from schemas.course import CourseModel
from typing import Annotated,Literal
from pydantic import Field
import shutil
from supabase import create_client

SUPABASE_URL = "https://rwompwlcjbigfbnovqxu.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3b21wd2xjamJpZ2Zibm92cXh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDM1ODE0NCwiZXhwIjoyMDg1OTM0MTQ0fQ.dT_PtR54M_Roi3tYOeSWYMfeQ-C9yGGbdF9CH0RyUxY"
supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

router = APIRouter(tags=["Course"])

UPLOAD_DIR="images/thumbnail"
UPLOAD_DIR1="images/coursevideo"

def get_db():
      db = SessionLocal()
      try:
            yield db
      finally:
            db.close()


# @router.post("/course_upload")
# def course_upload(
#     course_title:str =Form(...),
#     category:Literal["Artificial Intelligence & Data Science","Development","IT & Software","Business", "Personal Development","Design","Marketing"]=Form(...),
#     skill_level:Literal["Beginner","Intermediate","Advanced"]=Form(...),
#     # category: str = Form(...),
#     # skill_level: str = Form(...),
#     prerequisites:str=Form(...),
#     description:str=Form(...),
#     tag:str=Form(...),
#     thumbnail: UploadFile =File(...),
#     video: UploadFile =File(...),
#     course_price:int=Form(...),
#     db: Session=Depends(get_db)
# ):
#         # thumbnail_path = f"{UPLOAD_DIR}/{thumbnail.filename}"
#         # with open(thumbnail_path, "wb") as buffer:
#         #      shutil.copyfileobj(thumbnail.file, buffer)

#         video_path = f"{UPLOAD_DIR1}/{video.filename}"
#         with open(video_path, "wb") as buffer:
#              shutil.copyfileobj(video.file, buffer)

        
#         db_course = models.Course(
#             course_title=course_title,
#             category=category,
#             skill_level=skill_level,
#             prerequisites=prerequisites,
#             description=description,
#             tag=tag,
#            thumbnail=thumbnail.filename,
#            video=video.filename,
#            course_price=course_price
#         )

#         db.add(db_course)
#         db.commit()
#         db.refresh(db_course)

#         return{
#         "message":"video uploaded successfully",
#         "data":db_course
#         }

from pydantic import BaseModel

class CourseRequest(BaseModel):
    course_title: str
    category: str
    skill_level: str
    prerequisites: str
    description: str
    tag: str
    thumbnail: str
    video: str
    course_price: str

@router.post("/course_upload")
def course_upload(data: CourseRequest, db: Session = Depends(get_db)):
    
    db_course = models.Course(
        course_title=data.course_title,
        category=data.category,
        skill_level=data.skill_level,
        prerequisites=data.prerequisites,
        description=data.description,
        tag=data.tag,
        thumbnail=data.thumbnail,
        video=data.video,
        course_price=data.course_price,
    )

    db.add(db_course)
    db.commit()
    db.refresh(db_course)

    return {"message": "Course uploaded successfully", "data": db_course}

# @router.post("/course_upload")
# def course_upload(
#     course_title: str = Form(...),
#     category: Literal["Artificial Intelligence & Data Science","Development","IT & Software","Business","Personal Development","Design","Marketing"] = Form(...),
#     skill_level: Literal["Beginner","Intermediate","Advanced"] = Form(...),
#     prerequisites: str =Form(...),
#     description: str = Form(...),
#     tag:str =Form(...), 
#     video : str = Form(...),
#     thumbnail: str =Form(...),
#     course_price : str = Form(...),
#      db: Session = Depends(get_db)
# ):
#     db_course = models.Course(
#         course_title=course_title,
#         category=category,
#         skill_level=skill_level,
#         prerequisites=prerequisites,
#         description=description,
#         tag=tag,
#         thumbnail=thumbnail,
#         video=video,
#         course_price=course_price,
       
#     )

#     db.add(db_course)
#     db.commit()
#     db.refresh(db_course)

#     return {"message": "Course uploaded successfully", "data": db_course}

# # @router.post("/course_upload")
# def course_upload(data: dict, db: Session = Depends(get_db)):

#     # CHECK IF THIS VIDEO URL ALREADY EXISTS
#     existing_video = (
#         db.query(models.Course)
#         .filter(models.Course.video == data["video"])
#         .first()
#     )

#     if existing_video:
#         raise HTTPException(
#             status_code=400,
#             detail="This video already exists in the database. Please upload a new video."
#         )

#     # CHECK IF SAME THUMBNAIL EXISTS (optional)
#     existing_thumbnail = (
#         db.query(models.Course)
#         .filter(models.Course.thumbnail == data["thumbnail"])
#         .first()
#     )

#     if existing_thumbnail:
#         raise HTTPException(
#             status_code=400,
#             detail="This thumbnail is already used. Upload a different thumbnail."
#         )

#     # SAVE COURSE IF NO DUPLICATES
#     db_course = models.Course(
#         course_title=data["course_title"],
#         category=data["category"],
#         skill_level=data["skill_level"],
#         prerequisites=data["prerequisites"],
#         description=data["description"],
#         tag=data["tag"],
#         thumbnail=data["thumbnail"],
#         video=data["video"],
#         course_price=data["course_price"]
#     )

#     db.add(db_course)
#     db.commit()
#     db.refresh(db_course)

#     return {"message": "Course uploaded successfully", "data": db_course}



# @router.post("/upload_video/")
# async def upload_video(file:UploadFile=File(...)):
#     file_path=os.path.join(UPLOAD_DIR1,file.filename)
#     with open(file_path,"wb") as buffer:
#         shutil.copyfileobj(file.file,buffer)
    

#     return{
#         "message":"video uploaded successfully",
#         "filename":file.filename,
#         "url":f"/coursevideo/{file.filename}"}


@router.get("/course_display")
async def display(db:Session=Depends(get_db)):
    data=db.query(models.Course).order_by(models.Course.course_id.asc()).all()
    return data

# @router.get("/single_video_data/{course_id}")
# async def single_data(course_id:int,db:Session=Depends(get_db)):
#     result=db.query(models.Course).filter(models.Course.course_id==course_id).first()
#     if not result:
#         raise HTTPException(status_code=404,detail="Employee not found")
#     # return result
#     # ---- VIDEO URL FIX ----
#     video = result.video

#     if video.startswith("http://") or video.startswith("https://"):
#         video_url = video               # Supabase video
#     else:
#         video_url = f"http://localhost:8000/images/coursevideo/{video}"

#     # ---- THUMBNAIL URL FIX ----
#     thumbnail = result.thumbnail

#     if thumbnail.startswith("http://") or thumbnail.startswith("https://"):
#         thumbnail_url = thumbnail
#     else:
#           thumbnail_url = f"http://localhost:8000/images/thumbnail/{thumbnail}"

#     return {
#         "course_id": result.course_id,
#         "course_title": result.course_title,
#         "category": result.category,
#         "skill_level": result.skill_level,
#         "prerequisites": result.prerequisites,
#         "description": result.description,
#         "tag": result.tag,
#         "course_price": result.course_price,
#         "video_url": video_url,             # final cleaned URL
#         "thumbnail_url": thumbnail_url
#     }


# from supabase import create_client, Client
# from fastapi import HTTPException, Depends
# from sqlalchemy.orm import Session
# from . import models
# from .database import get_db

# SUPABASE_URL = "YOUR_SUPABASE_URL"
# SUPABASE_SERVICE_KEY = "YOUR_SERVICE_ROLE_KEY"  # service role required for signed URLs
# supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# BUCKET_NAME = "course_videos"   # <-- your Supabase bucket name


@router.get("/single_video_data/{course_id}")
async def single_data(course_id: int, db: Session = Depends(get_db)):

    result = db.query(models.Course).filter(models.Course.course_id == course_id).first()

    if not result:
        raise HTTPException(status_code=404, detail="Course not found")

    # 1. Generate SIGNED Supabase VIDEO URL

    video_file = result.video   # e.g. "python.mp4" (not a URL)

    if video_file.startswith("http://") or video_file.startswith("https://"):
        video_url = video_file   # already a URL
    else:
        signed = supabase.storage.from_("course_videos").create_signed_url(
            video_file, 3600  # URL valid for 1 hour
        )
        video_url = signed.get("signedURL")

    # 2. Thumbnail URL (local or already URL)
    
    thumbnail = result.thumbnail

    if thumbnail.startswith("http://") or thumbnail.startswith("https://"):
        thumbnail_url = thumbnail
    else:
        thumbnail_url = f"http://localhost:8000/images/thumbnail/{thumbnail}"


    # 3. Return response

    return {
        "course_id": result.course_id,
        "course_title": result.course_title,
        "category": result.category,
        "skill_level": result.skill_level,
        "prerequisites": result.prerequisites,
        "description": result.description,
        "tag": result.tag,
        "course_price": result.course_price,
        "video_url": video_url,       #NOW A REAL SUPABASE URL
        "thumbnail_url": thumbnail_url
    }



# @router.get("/single_video_data/{course_id}")
# async def single_data(course_id: int):
#     course = db.query(Course).filter(Course.course_id == course_id).first()

#     if not course:
#         return {"error": "Course not found"}

#     # create signed URL / get public URL
#     video = course.video

#     signed = supabase.storage.from_("course_videos").create_signed_url(
#         video,
#         60 * 60  # expires in 1 hour
#     )

#     return {
#         "course_id": course.course_id,
#         "course_title": course.course_title,
#         "author": course.author,
#         "description": course.description,
#         "tag": course.tag,
#         "course_price": course.course_price,
#         "thumbnail": course.thumbnail,
#         "course_date": course.course_date,
#         "video": video,
#         "signedVideoUrl": signed.get("signedUrl")
#     }

@router.delete("/course/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):

    # 1. Fetch the course
    course = (
        db.query(models.Course)
        .filter(models.Course.course_id == course_id)
        .first()
    )

    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    video_name = course.video
    thumbnail_name = course.thumbnail


    # 3. Delete video file (only file name stored)
    try:
        if course.video:
            supabase.storage.from_("course_videos").remove([course.video])
    except Exception as e:
        print("Video delete error:", e)

    # 4. Delete thumbnail file
    try:
        if course.thumbnail:
            supabase.storage.from_("course_thumbnail").remove([course.thumbnail])
    except Exception as e:
        print("Thumbnail delete error:", e)

    # 5. Delete the DB record
    db.delete(course)
    db.commit()

    return {"status": "success", "message": "Course + files deleted successfully","video_name": video_name,
        "thumbnail_name": thumbnail_name}