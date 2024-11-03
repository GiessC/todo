import TodoItem from '@/domain/TodoItem';
import BaseError from '@/errors/BaseError';
import { apiUrl } from '@/utils/api';
import { StatusCodes } from 'http-status-codes';

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
        const jsonResponse = await response.json();
        if (response.status !== StatusCodes.CREATED) {
            throw new BaseError(
                jsonResponse.error ?? 'Failed to create todo item.',
            );
        }
        return jsonResponse;
    }
}
