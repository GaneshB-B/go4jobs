from schemas import BaseSchema, Optional

class Applicant(BaseSchema):

    id = int
    email: Optional[str] = None
    location: Optional[str] = None
    company: Optional[str] = None
    experience_months: Optional[str] = None
    resume: Optional[str] = None
    contact: Optional[str] = None
    name: Optional[str] = None
    gender: Optional[str] = None
    notice_period: Optional[str] = None
    skills: Optional[str] = None
