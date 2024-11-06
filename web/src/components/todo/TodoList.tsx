import { useTodoList } from '@/hooks/useTodo';
import Loading from '../common/loading/Loading';
import Todo from './Todo';
import { Card, CardContent, CardHeader } from '../ui/card';
import CreateTodoDialog from '../dialog/CreateTodoDialog';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '../ui/button';
import TodoItem from '@/domain/TodoItem';
import { useEffect, useMemo, useState } from 'react';

const Fallback = ({
    resetErrorBoundary,
}: {
    resetErrorBoundary: () => void;
}) => (
    <>
        <p>Something went wrong.</p>
        <Button onClick={() => resetErrorBoundary()}>Reload</Button>
    </>
);

const TodoList = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const { data, error, isError, isPending, refetch } = useTodoList();

    useEffect(() => {
        if (!data) return;
        setTodos(data);
    }, [data]);

    function updateTodo(todoId: string, isCompleted: boolean): void {
        setTodos((prev) =>
            prev.map((todo) => {
                if (todo.todoId === todoId) {
                    todo.setCompleted(isCompleted);
                }
                return todo;
            }),
        );
    }

    function deleteTodo(deletedTodoId: string) {
        setTodos((prev) =>
            prev.filter((todo) => todo.todoId !== deletedTodoId),
        );
    }

    const sortedTodos = useMemo((): TodoItem[] => {
        todos.sort((a, b) => {
            if (a.isCompleted && !b.isCompleted) return 1;
            if (!a.isCompleted && b.isCompleted) return -1;
            return a.createdAt.getTime() - b.createdAt.getTime();
        });
        return todos;
    }, [todos]);

    return (
        <div className='w-full h-full flex'>
            <Card className='relative p-4 flex flex-col w-1/5 h-fit m-auto'>
                <CreateTodoDialog
                    className='absolute top-2 right-2'
                    onSuccess={(todo: TodoItem) =>
                        setTodos((prev) => [...prev, todo])
                    }
                />
                <CardHeader className='flex flex-row justify-between'>
                    <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
                        To-do List
                    </h3>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col space-y-2'>
                        <ErrorBoundary
                            fallbackRender={Fallback}
                            onReset={() => refetch()}
                        >
                            {isPending ? (
                                <Loading className='w-12 h-12 text-gray-500 m-auto' />
                            ) : (
                                sortedTodos.map((todo) => (
                                    <Todo
                                        key={todo.todoId}
                                        todo={todo}
                                        onUpdate={updateTodo}
                                        onDelete={deleteTodo}
                                    />
                                ))
                            )}
                            {isError && <div>Error: {error.message}</div>}
                        </ErrorBoundary>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TodoList;
