from schemas import BaseSchema, Optional
from schemas.team import Team
from schemas.shift import Shift
from schemas.status import Status

class PostIn(BaseSchema):

    title: str
    description: str
    team: Optional[int] = None
    shift: Optional[int] = None
    min_salary: Optional[int] = None
    max_salary: Optional[int] = None
    currency: Optional[str] = None
    location: Optional[str] = None
    joining_in_days: Optional[int] = None
    status: int


class PostOut(PostIn):

    post_team: Optional[Team] = None
    post_shift: Optional[Shift] = None
    post_status: Status

    app_count: Optional[int] = None

    id: int
