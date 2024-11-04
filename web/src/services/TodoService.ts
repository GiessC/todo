import TodoItem, { TodoItemJSON } from '@/domain/TodoItem';
import BaseError from '@/errors/BaseError';
import ServiceError from '@/errors/ServiceError';
import Endpoints from '@/utils/Endpoints';
import { get, patch, post } from '@/utils/fetch';
import { StatusCodes } from 'http-status-codes';

type ApiResponse<TEntity> = {
    item?: TEntity;
    items?: TEntity[];
    error?: string;
};

export default class TodoService {
    static async create(label: string): Promise<TodoItem> {
        const request = {
            label,
            isCompleted: false,
        };
        const response = await post<ApiResponse<TodoItemJSON>>(
            '/todo',
            request,
        );
        if (response?.status !== StatusCodes.CREATED) {
            throw new ServiceError(
                response?.error ?? 'Failed to create todo item.',
                response?.status,
            );
        }
        if (!response.body.item) {
            throw new BaseError('Failed to create todo item.');
        }
        return TodoItem.fromJSON(response.body.item);
    }

    // TODO: userId is temporary and should be removed once authentication is implemented.
    static async getTodoList(userId: string = '1'): Promise<TodoItem[]> {
        const response = await get<ApiResponse<TodoItemJSON>>(
            `${Endpoints.TODO}/all`,
            {
                userId,
            },
        );
        if (response?.status !== StatusCodes.OK) {
            throw new ServiceError(
                response?.error ?? 'Failed to fetch todo list.',
                response?.status,
            );
        }
        if (!response.body.items) {
            throw new BaseError('Failed to fetch todo list.');
        }
        return response.body.items.map((todoItem) =>
            TodoItem.fromJSON(todoItem),
        );
    }

    static async updateCompleted(
        id: string,
        checked: boolean,
    ): Promise<TodoItem> {
        const response = await patch<ApiResponse<TodoItemJSON>>(
            `${Endpoints.TODO}/${id}`,
            {
                checked,
            },
        );
        if (response?.status !== StatusCodes.NO_CONTENT) {
            throw new ServiceError(
                response?.error ?? 'Failed to update todo item.',
                response?.status,
            );
        }
        if (!response.body.item) {
            throw new BaseError('Failed to update todo item.');
        }
        return TodoItem.fromJSON(response.body.item);
    }
}
