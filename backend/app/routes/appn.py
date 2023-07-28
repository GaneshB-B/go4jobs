from routes import APIRouter, HTTPException, Optional, List, Session, S3, FileResponse, os, Path, Queue, TEMP_FOLDER, RESUME_MAX, AWS_BUCKET_NAME, AWS_BASE_PATH
from schemas.appn import ApplicationOut
from models.appn import Application as AppnModel
from helpers.appn import getStatusID, getData
import botocore

route_name = "Apps"


router = APIRouter(
    prefix=f"/{route_name.lower()}",
    tags=[f"{route_name}"]
)

actions = {
    "reset": getStatusID("Applied"),
    "approve": getStatusID("Approved"),
    "reject": getStatusID("Rejected"),
    "block": getStatusID("Blocked"),
    "delete": getStatusID("Deleted")
}

# print(actions)

temp_folder = Path(TEMP_FOLDER)
resume_folder = temp_folder / 'resumes'

resume_folder.mkdir(parents=True, exist_ok=True)

resumes = next(os.walk(resume_folder), (None, None, []))[2]

resume_queue = Queue(RESUME_MAX)

for resume in resumes:
    resume_queue.put_nowait(resume)

# Read All Applications for a Post
@router.get("/", response_model=List[ApplicationOut])
def read_apps(post_id: Optional[int] = None, status: Optional[int] = None):
    with Session() as db:
        apps = db.query(AppnModel)

        if post_id:
            apps = apps.filter(AppnModel.post == post_id)
        
        if status:
            apps = apps.filter(AppnModel.status == status)
        
        apps = apps.all()
        
        if len(apps) == 0:
            raise HTTPException(status_code=404, detail="No Applications Found")
        
        for app in apps:
            app = getData(app)

        return apps


# Read An Application
@router.get("/{appn_id}", response_model=ApplicationOut)
def read_appn(appn_id: int):
    with Session() as db:
        appn = db.get(AppnModel, appn_id)
        
        if appn is None:
            raise HTTPException(status_code=404, detail="Job Application Not Found")
        
        return getData(appn)


# Get the resume for an Application
@router.get("/{appn_id}/resume")
def get_resume(appn_id: int):
    with Session() as db:
        appn = db.get(AppnModel, appn_id)

        if appn is None:
            raise HTTPException(status_code=404, detail="Job Application Not Found")

        filename = appn.app_appt.resume

        if filename is None:
            raise HTTPException(status_code=404, detail="Resume Not Uploaded")

        filepath = resume_folder / filename

        key = f"{AWS_BASE_PATH}/{appn.app_appt.email}/{filename}"

        if not os.path.exists(filepath):
            if resume_queue.full():
                file_del = resume_queue.get_nowait()
                file_del_path = resume_folder / file_del

                if os.path.exists(file_del_path):
                    os.remove(file_del_path)
            
            try:
                S3.Bucket(AWS_BUCKET_NAME).download_file(key, str(filepath))
                resume_queue.put_nowait(filename)
        
            except botocore.exceptions.ClientError as e:
                if e.response['Error']['Code'] == "404":
                    raise HTTPException(status_code=404, detail="Resume Not Found")
                else:
                    raise
        
        return FileResponse(path=filepath, filename=filename)


# Act on an Application
@router.put("/{appn_id}/{action}", response_model=ApplicationOut)
def act_on_appn(appn_id: int, action: str):
    with Session() as db:
        if action not in actions.keys():
            raise HTTPException(status_code=400, detail="Undefined Action")
        
        db_appn = db.get(AppnModel, appn_id)

        if db_appn is None:
            raise HTTPException(status_code=404, detail="Job Application Not Found")
        
        try:
            db_appn.status = actions.get(action)
            
            db.add(db_appn)
            db.commit()
            db.refresh(db_appn)
        
        except Exception as e:
            print(e)
            db.rollback()
            raise HTTPException(status_code=400, detail="Job Application Not Acted Upon")

        return getData(db_appn)
