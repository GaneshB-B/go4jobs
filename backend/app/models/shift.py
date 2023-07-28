from models import *
from models import post

class Shift(Base):
    __tablename__ = "jobs_shift"

    id = Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    title = Column(VARCHAR(length=128), nullable=False)
    start_hours = Column(TIME, nullable=False)
    end_hours = Column(TIME, nullable=False)
    flexible_minutes = Column(INTEGER)

    shift_posts = relationship("Post", back_populates="post_shift")
