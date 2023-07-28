from routes import Session
from schemas.appn import ApplicationOut
from models.appn import Application
from models.appn_status import ApplicationStatus
from helpers.post import getData as getPostData

def getData(appn: Application) -> ApplicationOut:
    appn.app_post = getPostData(appn.app_post)
    appn.app_appt
    appn.app_status
    
    return appn


def getStatusID(status_str):
    with Session() as db:
        status = db.query(ApplicationStatus).filter(ApplicationStatus.status == status_str).one_or_none()
        return status.id
