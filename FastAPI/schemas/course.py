from pydantic import BaseModel,EmailStr,Field
from typing import Annotated,Literal


class CourseModel(BaseModel):
    
    course_title : Annotated[str,Field(...,max_length=50)]
    category:Annotated[Literal["Artificial Intelligence & Data Science","Development","IT & Software","Business","Personal Development","Design","Marketing"],Field(title="Course Category")]
    skill_level:Annotated[Literal["Beginner","Intermediate","Advanced"],Field(title="Skill level")]
    prerequisites:Annotated[str,Field()]
    description:Annotated[str,Field()]
    tag:Annotated[str,Field()]
 