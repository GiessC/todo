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

export const useCreateTodo = () => {
    return useMutation({
        mutationKey: ['create', 'todo'],
        mutationFn: TodoService.create,
    });
};

export const useUpdateTodo = (todoId: string) => {
    return useMutation({
        mutationKey: ['create', 'todo'],
        mutationFn: (isCompleted: boolean) =>
            TodoService.updateCompleted(todoId, isCompleted),
    });
};

export const useDeleteTodo = () => {
    return useMutation({
        mutationKey: ['delete', 'todo'],
        mutationFn: TodoService.deleteTodo,
    });
};
