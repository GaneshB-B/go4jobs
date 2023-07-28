from routes import APIRouter, HTTPException, List, Session
from schemas.status import Status as PostStatusSchema
from models.status import Status as PostStatusModel
from schemas.appn_status import ApplicationStatus as AppStatusSchema
from models.appn_status import ApplicationStatus as AppStatusModel


route_name = "Statuses"


router = APIRouter(
    prefix=f"/{route_name.lower()}",
    tags=[f"{route_name}"]
)

# Read All Job Post Statuses
@router.get("/post", response_model=List[PostStatusSchema])
def read_post_statuses():
    with Session() as db:
        statuses = db.query(PostStatusModel).all()
        return statuses


# Read All Application Statuses
@router.get("/app", response_model=List[AppStatusSchema])
def read_app_statuses():
    with Session() as db:
        statuses = db.query(AppStatusModel).all()
        return statuses
