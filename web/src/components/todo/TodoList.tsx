import { useTodoList } from '@/hooks/useTodo';
import Loading from '../common/loading/Loading';
import Todo from './Todo';
import { Card, CardContent, CardHeader } from '../ui/card';
import CreateTodoDialog from '../dialog/CreateTodoDialog';

const TodoList = () => {
    const { data, error, isError, isPending } = useTodoList();

    return (
        <div className='w-full h-full flex'>
            <Card className='relative p-4 flex flex-col w-1/5 h-fit m-auto'>
                <CreateTodoDialog className='absolute top-2 right-2' />
                <CardHeader className='flex flex-row justify-between'>
                    <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
                        To-do List
                    </h3>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col space-y-2'>
                        {isPending ? (
                            <Loading className='w-12 h-12 text-gray-500 m-auto' />
                        ) : (
                            data?.map((todo) => (
                                <Todo
                                    key={todo.id}
                                    todo={todo}
                                />
                            ))
                        )}
                        {isError && <div>Error: {error.message}</div>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TodoList;
