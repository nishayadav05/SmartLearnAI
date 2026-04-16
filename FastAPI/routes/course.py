from fastapi import FastAPI,Depends,Form,File,UploadFile,HTTPException,APIRouter,Cookie
import models
from sqlalchemy.orm import Session
from sqlalchemy import func
from schemas.course import CourseRatingRequest,CourseViewPercentage
import shutil
from database import get_db
import os
from auth.auth import decode_access_token

app = FastAPI()
router = APIRouter(tags=["Course"])


THUMBNAIL_DIR = r"SharedVideos/Thumbnail"
os.makedirs(THUMBNAIL_DIR, exist_ok=True)

UPLOAD_DIR1 = r"SharedVideos/Coursevideo"
os.makedirs(UPLOAD_DIR1, exist_ok=True)

@router.post("/course_upload")
def course_upload(
    course_title: str = Form(...),
    category: str = Form(...),
    skill_level: str = Form(...),
    prerequisites: str = Form(...),
    description: str = Form(...),
    tag: str = Form(...),
    course_price: str = Form(...),
    thumbnail: UploadFile = File(...),
    video: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    thumb_path = os.path.join(THUMBNAIL_DIR, thumbnail.filename)

    with open(thumb_path, "wb") as buffer:
        shutil.copyfileobj(thumbnail.file, buffer)

    video_path = os.path.join(UPLOAD_DIR1, video.filename)

    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)
    # output_mpd=f"{UPLOAD_DIR1}/manifest.mpd"

   
    db_course = models.Course(
        course_title=course_title,
        category=category,
        skill_level=skill_level,
        prerequisites=prerequisites,
        description=description,
        tag=tag,
        course_price=course_price,
        thumbnail=thumbnail.filename,
        video=video.filename
    )

    db.add(db_course)
    db.commit()
    db.refresh(db_course)

    return {
        "message": "Course uploaded successfully", "Video uploaded and converted"
        "course_id": db_course.course_id
    }


@router.get("/course_display")
async def display(db:Session=Depends(get_db)):
    data=db.query(models.Course).order_by(models.Course.course_id.asc()).all()
    return data



@router.get("/single_video_data/{course_id}")
def single_data(course_id: int, db: Session = Depends(get_db)):
    result = db.query(models.Course).filter(models.Course.course_id == course_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Course not found")

    # Local URLs
    video_url = f"http://localhost:8000/Coursevideo/{result.video}" if not result.video.startswith("http") else result.video
    thumbnail_url = f"http://localhost:8000/Thumbnail/{result.thumbnail}" if not result.thumbnail.startswith("http") else result.thumbnail

    return {
        "course_id": result.course_id,
        "course_title": result.course_title,
        "category": result.category,
        "skill_level": result.skill_level,
        "prerequisites": result.prerequisites,
        "description": result.description,
        "tag": result.tag,
        "course_price": result.course_price,
        "video_url": video_url,
        "thumbnail_url": thumbnail_url
    }


@router.delete("/course/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.course_id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Cour/se not found")

    # Delete files locally
    try:
        if course.video:
            video_path = os.path.join(UPLOAD_DIR1, course.video)
            if os.path.exists(video_path):
                os.remove(video_path)
        if course.thumbnail:
            thumb_path = os.path.join(THUMBNAIL_DIR, course.thumbnail)
            if os.path.exists(thumb_path):
                os.remove(thumb_path)
    except Exception as e:
        print("File deletion error:", e)

    db.delete(course)
    db.commit()

    return {"status": "success", "message": "Course + files deleted successfully"}


@router.post("/rate_course")
def rate_course(data: CourseRatingRequest, db: Session = Depends(get_db)):

    course = db.query(models.Course).filter(
        models.Course.course_id == data.course_id
    ).first()

    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    total = (course.rating or 0) * (course.total_reviews or 0)
    total += data.rating

    course.total_reviews = (course.total_reviews or 0) + 1
    course.rating = total / course.total_reviews

    db.commit()
    db.refresh(course)

    return {"message": "Rating added", "rating": course.rating}


@router.post("/track_course_view/{course_id}")
def track_course_view(
    course_id: int,
    token: str = Cookie(None),
    db: Session = Depends(get_db)
):
    if not token:
        raise HTTPException(401, "Not logged in")

    payload = decode_access_token(token)
    user_id = payload.get("user_id")

    print("INSERTING VIEW:")
    print("User ID:", user_id)
    print("Course ID:", course_id)   #  FIXED

    new_view = models.CourseView(
        user_id=user_id,
        course_id=course_id
    )

    db.add(new_view)
    db.commit()

    return {"message": "Tracked"}

@router.get("/recent_courses")
def get_recent_courses(
    token: str = Cookie(None),
    db: Session = Depends(get_db)
):
    if not token:
        raise HTTPException(401, "Token missing")

    payload = decode_access_token(token)
    user_id = payload.get("user_id")

    data = db.query(
        models.Course.course_id,
        models.Course.course_title,
        models.Course.thumbnail
    ).join(
        models.CourseView,
        models.Course.course_id == models.CourseView.course_id
    ).filter(
        models.CourseView.user_id == user_id
    ).order_by(
        models.CourseView.viewed_at.desc()
    ).limit(5).all()

    print("TRACK API HIT")
    print("User ID:", user_id)
    print("Token:", token)

    return [
        {
            "course_id": c.course_id,
            "title": c.course_title,
            "thumbnail": c.thumbnail
        }
        for c in data
    ]

from sqlalchemy import func

@router.get("/course_view_percentage")
def course_view_percentage(
    token: str = Cookie(None),
    db: Session = Depends(get_db)
):
    if not token:
        raise HTTPException(401, "Token missing")

    payload = decode_access_token(token)
    user_id = payload.get("user_id")

    total_views = db.query(models.CourseView)\
        .filter(models.CourseView.user_id == user_id)\
        .count()

    if total_views == 0:
        return []

    data = db.query(
        models.Course.course_id,
        models.Course.course_title,
        models.Course.thumbnail,
        models.Course.category,
        func.count(models.CourseView.course_id).label("views")
    ).join(
        models.Course,
        models.Course.course_id == models.CourseView.course_id
    ).filter(
        models.CourseView.user_id == user_id
    ).group_by(
        models.Course.course_id
    ).all()

    result = []

    for item in data:
        percentage = (item.views / total_views) * 100

        result.append({
            "course_id": item.course_id,
            "title": item.course_title,
            "thumbnail": item.thumbnail,
            "category": item.category,
            "percentage": round(percentage, 2)
        })

    return result