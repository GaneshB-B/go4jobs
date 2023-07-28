from models import *
from models import post

class Team(Base):
    __tablename__ = "jobs_team"

    id = Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    name = Column(VARCHAR(length=256), nullable=False)

    team_posts = relationship("Post", back_populates="post_team")
