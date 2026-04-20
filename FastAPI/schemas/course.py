from pydantic import BaseModel
from datetime import datetime
class CourseRequest(BaseModel):
    course_title: str
    category: str
    skill_level: str
    prerequisites: str
    description: str
    tag: str
    thumbnail: str   # URL or local filename
    video: str       # URL or local filename
    course_price: str

class CourseRatingRequest(BaseModel):
    course_id: int
    rating: int



class CourseViewPercentage(BaseModel):
    course_id: int
    total_views: int
    percentage: float
