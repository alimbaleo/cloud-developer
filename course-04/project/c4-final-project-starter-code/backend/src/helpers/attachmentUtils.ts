import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic
const BUCKET_NAME = process.env.ATTACHMENT_S3_BUCKET;
const URL_EXPIRATION = 300;// process.env.SIGNED_URL_EXPIRATION;

export class AttachmentUtils{
    constructor(private readonly s3 = new XAWS.S3({signatureVersion: 'v4'}), private readonly bucketName = BUCKET_NAME){

    }
    getAttachmentUrl(todoId: string):string {
        return `https://${this.bucketName}.s3.amazonaws.com/${todoId}`;
    }
    getUploadUrl(todoId: string){
        return this.s3.getSignedUrl('putObject', {
            Bucket: this.bucketName,
            Key: todoId,
            Expires: URL_EXPIRATION 
        }) as string;
    }
}