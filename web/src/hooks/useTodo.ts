import TodoService from '@/services/TodoService';
import { useQuery } from '@tanstack/react-query';

type User = {
    userId: string;
};

const fakeUser: User = {
    userId: '1',
};

export const useTodoList = () => {
    return useQuery({
        queryKey: ['todos', fakeUser.userId],
        queryFn: TodoService.getTodoList,
    });
};
