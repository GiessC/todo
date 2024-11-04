import TodoItem, { TodoItemJSON } from '@/domain/TodoItem';
import BaseError from '@/errors/BaseError';
import { apiUrl } from '@/utils/api';
import { StatusCodes } from 'http-status-codes';

type CreateTodoResponse = {
    todoItem?: TodoItemJSON;
    error?: string;
};

export default class TodoService {
    static async create(label: string): Promise<TodoItem> {
        const request = {
            label,
            isCompleted: false,
        };
        const response = await fetch(apiUrl('/todo'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        const jsonResponse: CreateTodoResponse = await response.json();
        if (
            !jsonResponse?.todoItem ||
            'error' in jsonResponse ||
            response.status !== StatusCodes.CREATED
        ) {
            throw new BaseError(
                jsonResponse.error ?? 'Failed to create todo item.',
            );
        }
        return TodoItem.fromJSON(jsonResponse.todoItem);
    }
}
