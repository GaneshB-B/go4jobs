from schemas import BaseSchema, Optional

class Shift(BaseSchema):

    id: int
    title: str
    start_hours: int
    end_hours: int
    flexible_minutes: Optional[int] = None
