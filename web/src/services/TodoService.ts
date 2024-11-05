import TodoItem, { TodoItemJSON } from '@/domain/TodoItem';
import BaseError from '@/errors/BaseError';
import ServiceError from '@/errors/ServiceError';
import Endpoints from '@/utils/Endpoints';
import { del, get, patch, post } from '@/utils/fetch';
import { StatusCodes } from 'http-status-codes';
import { FetchResponse } from '../utils/fetch';

type ApiResponse<TEntity> = {
    item?: TEntity;
    items?: TEntity[];
    error?: string;
};

export default class TodoService {
    static throwIfError(
        response: FetchResponse<ApiResponse<unknown>> | undefined,
        errorMessage: string,
        expectedResponse: StatusCodes = StatusCodes.OK,
        throwIfNoItem = true,
    ) {
        if (response?.status !== expectedResponse) {
            throw new ServiceError(
                response?.error ?? errorMessage,
                response?.status,
            );
        }
        if (throwIfNoItem && !response.body.item) {
            throw new BaseError(errorMessage);
        }
    }

    static async create(label: string): Promise<TodoItem> {
        const request = {
            label,
            isCompleted: false,
        };
        const response = await post<ApiResponse<TodoItemJSON>>(
            '/todo',
            request,
        );
        this.throwIfError(
            response,
            'Failed to create to-do item.',
            StatusCodes.CREATED,
        );
        return TodoItem.fromJSON(response!.body.item!);
    }

    // TODO: userId is temporary and should be removed once authentication is implemented.
    static async getTodoList(userId: string = '1'): Promise<TodoItem[]> {
        const response = await get<ApiResponse<TodoItemJSON>>(
            `${Endpoints.TODO}/all`,
            {
                userId,
            },
        );
        this.throwIfError(
            response,
            'Failed to get to-do list.',
            StatusCodes.OK,
            false,
        );
        return response!.body.items!.map((todoItem) =>
            TodoItem.fromJSON(todoItem),
        );
    }

    static async updateCompleted(
        id: string,
        completed: boolean,
    ): Promise<TodoItem> {
        const response = await patch<ApiResponse<TodoItemJSON>>(
            `${Endpoints.TODO}/${id}`,
            {
                completed,
            },
        );
        this.throwIfError(
            response,
            'Failed to update to-do item.',
            StatusCodes.NO_CONTENT,
        );
        return TodoItem.fromJSON(response!.body.item!);
    }

    static async deleteTodo(todoId: string): Promise<TodoItem> {
        const response = await del<ApiResponse<TodoItemJSON>>(
            `${Endpoints.TODO}/${todoId}`,
            {},
        );
        this.throwIfError(response, 'Failed to delete to-do item.');
        return TodoItem.fromJSON(response!.body.item!);
    }
}
