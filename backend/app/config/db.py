from config.env import *
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote

# URL Encoded SQL DB Credentials
UE_SQL_DIALECT = quote(SQL_DIALECT)
UE_SQL_DRIVER = quote(SQL_DRIVER)
UE_SQL_USERNAME = quote(SQL_USERNAME)
UE_SQL_PASSWORD = quote(SQL_PASSWORD)
UE_SQL_HOST = quote(SQL_HOST)
UE_SQL_DATABASE = quote(SQL_DATABASE)

# SQL DB URL Format = "dialect+driver://username:password@host:port/database"

# Default Driver
# SQLALCHEMY_DB_URL = f"{UE_SQL_DIALECT}://{UE_SQL_USERNAME}:{UE_SQL_PASSWORD}@{UE_SQL_HOST}:{SQL_PORT}/{UE_SQL_DATABASE}"

# PyMySQL Driver
SQLALCHEMY_DB_URL = f"{UE_SQL_DIALECT}+{UE_SQL_DRIVER}://{UE_SQL_USERNAME}:{UE_SQL_PASSWORD}@{UE_SQL_HOST}:{SQL_PORT}/{UE_SQL_DATABASE}"

engine = create_engine(SQLALCHEMY_DB_URL)

Session = sessionmaker(bind=engine)

Base = declarative_base()
