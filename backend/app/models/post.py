from models import *
from models import team, shift, status, appn

class Post(Base):
    __tablename__ = "jobs_post"

    id = Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    title = Column(VARCHAR(length=256), nullable=False)
    description = Column(TEXT, nullable=False)
    team = Column(INTEGER(unsigned=True), ForeignKey("jobs_team.id"))
    shift = Column(INTEGER(unsigned=True), ForeignKey("jobs_shift.id"))
    min_salary = Column(INTEGER(unsigned=True))
    max_salary = Column(INTEGER(unsigned=True))
    currency = Column(VARCHAR(length=32))
    location = Column(VARCHAR(length=256))
    joining_in_days = Column(INTEGER(unsigned=True))
    status = Column(INTEGER(unsigned=True), ForeignKey("jobs_status.id"), nullable=False)

    post_team = relationship("Team", back_populates="team_posts")
    post_shift = relationship("Shift", back_populates="shift_posts")
    post_status = relationship("Status", back_populates="status_posts")
    
    post_apps = relationship("Application", back_populates="app_post")
