from models import *
from models import appn

class ApplicationStatus(Base):
    __tablename__ = "jobs_application_status"

    id = Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    status = Column(VARCHAR(length=32), nullable=False)

    status_apps = relationship("Application", back_populates="app_status")
