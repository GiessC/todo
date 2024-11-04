import TodoItem, { TodoItemJSON } from '@/domain/TodoItem';
import BaseError from '@/errors/BaseError';
import { get, post } from '@/utils/fetch';

type CreateTodoResponse = {
    todoItem?: TodoItemJSON;
    error?: string;
};

type TodoListResponse = {
    todoList?: TodoItemJSON[];
    error?: string;
};

export default class TodoService {
    static async create(label: string): Promise<TodoItem> {
        const request = {
            label,
            isCompleted: false,
        };
        const response = await post<CreateTodoResponse>('/todo', request);
        if (!response?.todoItem || 'error' in response) {
            throw new BaseError(response?.error ?? 'Failed to create todo.');
        }
        return TodoItem.fromJSON(response.todoItem);
    }

    // TODO: userId is temporary and should be removed once authentication is implemented.
    static async getTodoList(userId: string = '1'): Promise<TodoItem[]> {
        const response = await get<TodoListResponse>('/todo/all', { userId });
        if (!response?.todoList || 'error' in response) {
            throw new BaseError(response?.error ?? 'Failed to get todo list.');
        }
        return response.todoList.map((todoItem) => TodoItem.fromJSON(todoItem));
    }
}
