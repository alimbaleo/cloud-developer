require('dotenv').config();
export const config = {
  "dev": {
    "username": process.env.POSTGRES_USERNAME,// "hellopostgres",
    "password": process.env.POSTGRES_PASSWORD,//"hellopostgres",
    "database": process.env.POSTGRES_DATABASE,//"hellopostgres",N
    "host": process.env.POSTGRES_HOST,//"hellopostgres.ctfqokbwtlld.us-east-1.rds.amazonaws.com",
    "dialect": process.env.DATABASE_DIALECT,//"postgres",
    "aws_region": process.env.AWS_REGION,//"us-east-1",
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.S3_BUCKET_NAME,//"udagram-aleo-dev"
  },
  "jwt": {
    "secret": "helloworld"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
