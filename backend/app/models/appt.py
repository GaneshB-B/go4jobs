from models import *
from models import appt_ed, appn

class Applicant(Base):
    __tablename__ = "jobs_applicant"

    id = Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    email = Column(VARCHAR(length=512), unique=True)
    location = Column(VARCHAR(length=256))
    company = Column(VARCHAR(length=512))
    experience_months = Column(VARCHAR(length=256))
    resume = Column(VARCHAR(length=256))
    contact = Column(VARCHAR(length=20))
    name = Column(VARCHAR(length=256))
    gender = Column(VARCHAR(length=256))
    notice_period = Column(VARCHAR(length=256))
    skills = Column(VARCHAR(length=512))

    appt_educations = relationship("ApplicantEducation", back_populates="ed_applicant")
    appt_apps = relationship("Application", back_populates="app_appt")
