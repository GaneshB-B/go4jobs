from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import INTEGER, CHAR, VARCHAR, TIME, YEAR, TEXT

from config.db import Base
