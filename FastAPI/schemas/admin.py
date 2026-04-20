from pydantic import BaseModel

class AdminLogin(BaseModel):
    admin_email: str
    admin_password: str

class ChangePassword(BaseModel):
    old_password: str
    new_password: str