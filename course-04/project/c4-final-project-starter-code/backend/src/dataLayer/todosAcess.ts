import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';
var AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic
export class TodosAccess{
    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly todosTable = process.env.TODOS_TABLE,
        private readonly todosIndex = process.env.INDEX_NAME
    ){}

    async getAllTodos(userId: string): Promise<TodoItem[]>{
        logger.info('get all todos');
        const result = await this.docClient.query({
            TableName: this.todosTable,
            IndexName: this.todosIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise();

        const resp = result.Items;
        return resp as TodoItem[];
    }

    async createTodoItem(todoItem: TodoItem): Promise<TodoItem>{
        logger.info('create todos');
        await this.docClient.put({
            TableName: this.todosTable,
            Item: todoItem
        }).promise();

        return todoItem;
    }
    async updateTodoItem(todoId: string, userId: string, todoUpdate: TodoUpdate): Promise<TodoUpdate>{
        logger.info('update todos');
        await this.docClient.update({
            TableName: this.todosTable,
            Key: {todoId, userId},
            UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
            ExpressionAttributeValues:{
                ':name' : todoUpdate.name,
                ':dueDate' : todoUpdate.dueDate,
                ':done' : todoUpdate.done,
            },
            ExpressionAttributeNames:{
                '#name': 'name'
            },
            ReturnValues: 'UPDATED_NEW'
        }).promise();

        return todoUpdate as TodoUpdate;
    }
    async updateTodoAttachmentUrl(todoId: string, userId: string, url: string): Promise<void>{
        logger.info('update todos');
        await this.docClient.update({
            TableName: this.todosTable,
            Key: {todoId, userId},
            UpdateExpression: 'set attachmentUrl = :attachmentUrl',
            ExpressionAttributeValues:{
                ':attachmentUrl' : url
            }
        }).promise();

    }
    async deleteTodoItem(todoId: string, userId: string): Promise<void>{
        logger.info('delete todos');
        await this.docClient.delete({
            TableName: this.todosTable,
            Key: {todoId, userId},
        }).promise();

    }
}