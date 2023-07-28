from models import *
from models import country, appt

class ApplicantEducation(Base):
    __tablename__ = "jobs_applicant_education"

    id = Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    title = Column(VARCHAR(length=256), nullable=False)
    institution = Column(VARCHAR(length=256), nullable=False)
    city = Column(VARCHAR(length=256), nullable=False)
    state = Column(VARCHAR(length=256), nullable=False)
    country = Column(INTEGER, ForeignKey("COUNTRIES.ID"), nullable=False)
    year_started = Column(YEAR)
    year_graduated = Column(YEAR)
    credentials = Column(VARCHAR(length=256), nullable=False)
    applicant = Column(INTEGER(unsigned=True), ForeignKey("jobs_applicant.id"), nullable=False)

    ed_country = relationship("Country")
    ed_applicant = relationship("Applicant", back_populates="appt_educations")
