import TodoService from '@/services/TodoService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAccessToken } from './useAuth';

type User = {
    userId: string;
};

const fakeUser: User = {
    userId: '1',
};

export const useTodoList = () => {
    const accessToken = useAccessToken();
    return useQuery({
        queryKey: ['todos', fakeUser.userId],
        queryFn: () => TodoService.getTodoList(fakeUser.userId, accessToken),
    });
};

export const useCreateTodo = () => {
    const accessToken = useAccessToken();
    return useMutation({
        mutationKey: ['create', 'todo'],
        mutationFn: (label: string) => TodoService.create(label, accessToken),
    });
};

export const useUpdateTodo = (todoId: string) => {
    const accessToken = useAccessToken();
    return useMutation({
        mutationKey: ['create', 'todo'],
        mutationFn: (isCompleted: boolean) =>
            TodoService.updateCompleted(todoId, isCompleted, accessToken),
    });
};

export const useDeleteTodo = () => {
    const accessToken = useAccessToken();
    return useMutation({
        mutationKey: ['delete', 'todo'],
        mutationFn: (todoId: string) =>
            TodoService.deleteTodo(todoId, accessToken),
    });
};
