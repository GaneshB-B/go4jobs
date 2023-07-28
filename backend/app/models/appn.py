from models import *
from models import post, appt, appn_status

class Application(Base):
    __tablename__ = "jobs_application"

    id = Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    post = Column(INTEGER(unsigned=True), ForeignKey("jobs_post.id"), nullable=False)
    applicant = Column(INTEGER(unsigned=True), ForeignKey("jobs_applicant.id"), nullable=False)
    expected_salary = Column(INTEGER)
    currency = Column(VARCHAR(length=32))
    status = Column(INTEGER(unsigned=True), ForeignKey("jobs_application_status.id"), nullable=False)

    app_post = relationship("Post", back_populates="post_apps")
    app_appt = relationship("Applicant", back_populates="appt_apps")
    app_status = relationship("ApplicationStatus", back_populates="status_apps")
