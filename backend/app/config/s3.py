from config.env import *
import boto3

S3 = boto3.resource(
    service_name = 's3',
    region_name = AWS_REGION,
    aws_access_key_id = AWS_ACCESS_KEY_ID,
    aws_secret_access_key = AWS_SECRET_ACCESS_KEY
)
