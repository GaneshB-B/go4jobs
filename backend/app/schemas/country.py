from schemas import BaseSchema, Optional

class Country(BaseSchema):

    id: int
    name: Optional[str] = None
    code: Optional[str] = None
    sregion_id: Optional[int] = None
    pregion_id: Optional[int] = None
    continent: Optional[str] = None
    iso3: Optional[str] = None
    region: Optional[str] = None
