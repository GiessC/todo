import TodoService from '@/services/TodoService';
import { useMutation, useQuery } from '@tanstack/react-query';

type User = {
    userId: string;
};

const fakeUser: User = {
    userId: '1',
};

export const useTodoList = () => {
    return useQuery({
        queryKey: ['todos', fakeUser.userId],
        queryFn: () => TodoService.getTodoList(fakeUser.userId),
    });
};

export const useDeleteTodo = () => {
    return useMutation({
        mutationKey: ['delete', 'todo'],
        mutationFn: (todoId: string) => TodoService.deleteTodo(todoId),
    });
};
