from models import *
from models import post

class Status(Base):
    __tablename__ = "jobs_status"

    id = Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    status = Column(VARCHAR(length=32), nullable=False)

    status_posts = relationship("Post", back_populates="post_status")
