from schemas import BaseSchema, Optional
from schemas.post import PostOut
from schemas.appt import Applicant
from schemas.appn_status import ApplicationStatus

class ApplicationIn(BaseSchema):
    post: int
    applicant: int
    expected_salary: Optional[int] = None
    currency: Optional[str] = None
    status: int


class ApplicationOut(ApplicationIn):
    app_post: PostOut
    app_appt: Applicant
    app_status: ApplicationStatus
    
    id: int
