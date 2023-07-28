from models import *

class Country(Base):
    __tablename__ = "COUNTRIES"

    id = Column('ID', INTEGER, primary_key=True)
    name = Column('NAME', VARCHAR(length=64))
    code = Column('CODE', CHAR(length=4))
    sregion_id = Column('SREGION_ID', INTEGER)
    pregion_id = Column('PREGION_ID', INTEGER)
    continent = Column('CONTINENT', VARCHAR(length=16))
    iso3 = Column('ISO3', VARCHAR(length=50))
    region = Column('REGION', VARCHAR(length=50))
