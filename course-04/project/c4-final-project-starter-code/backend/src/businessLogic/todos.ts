import { TodosAccess } from '../dataLayer/todosAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
// import * as createError from 'http-errors'

// TODO: Implement businessLogic
const logger = createLogger('TodosAccess')
const attachmentUtils = new AttachmentUtils()
const todosAcess = new TodosAccess()

export async function getTodosForUser( userId: string): Promise<TodoItem[]> {
    logger.info('get user todos function');
    return await todosAcess.getAllTodos(userId);
}
export async function createTodo(newTodo:CreateTodoRequest, userId: string): Promise<TodoItem> {
    logger.info('Create todo function');
    const todoId = uuid.v4();
    const creationTime = new Date().toISOString();
    const attachmentUrl = attachmentUtils.getAttachmentUrl(todoId);
    const newItem = {
        userId,
        todoId,
        createdAt: creationTime,
        done: false,
        attachmentUrl,
        ...newTodo
    };

    return await todosAcess.createTodoItem(newItem);
}

export async function updateTodo( userId: string, todoId:string, todoUpdate: UpdateTodoRequest): Promise<UpdateTodoRequest> {
    logger.info('update todo function');
   
    return await todosAcess.updateTodoItem(todoId, userId, todoUpdate);
}
export async function deleteTodo( userId: string, todoId:string): Promise<void> {
    logger.info('delete todo function');
   
     await todosAcess.deleteTodoItem(todoId, userId);
}

export async function createAttachmentPresignedUrl( todoId:string): Promise<string> {
    logger.info('createAttachmentPresignedUrl function');
   
    return attachmentUtils.getUploadUrl(todoId);
}