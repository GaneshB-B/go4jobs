from schemas import BaseSchema, Optional

class ApplicantEducation(BaseSchema):

    title: str
    institution: str
    city: str
    state: str
    country: int
    year_started: Optional[int] = None
    year_graduated: Optional[int] = None
    credentials: str
    applicant: int
