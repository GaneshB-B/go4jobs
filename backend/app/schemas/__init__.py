from pydantic import BaseModel, EmailStr
from typing import Optional

class BaseSchema(BaseModel):

    class Config:
        orm_mode = True