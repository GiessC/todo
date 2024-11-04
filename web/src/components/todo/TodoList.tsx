import { useTodoList } from '@/hooks/useTodo';
import Loading from '../common/loading/Loading';
import Todo from './Todo';
import { Card, CardContent, CardHeader } from '../ui/card';
import CreateTodoDialog from '../dialog/CreateTodoDialog';

const TodoList = () => {
    const { data, error, isError, isPending } = useTodoList();

    if (isPending) return <Loading />;
    if (isError) return <div>Error: {error.message}</div>;

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
                        {data?.map((todo) => (
                            <Todo
                                key={todo.id}
                                todo={todo}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TodoList;