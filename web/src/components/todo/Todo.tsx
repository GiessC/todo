import TodoItem from '@/domain/TodoItem';
import { Checkbox } from '../ui/checkbox';
import IconButton from '../common/button/IconButton';
import { Trash } from 'lucide-react';
import { useDeleteTodo, useUpdateTodo } from '@/hooks/useTodo';
import { toast } from '@/hooks/use-toast';
import { toastError } from '@/utils/toastError';

export interface TodoProps {
    className?: string;
    todo: TodoItem;
    onUpdate: (todoId: string, isCompleted: boolean) => void;
    onDelete: (todoId: string) => void;
}

const Todo = ({ className = '', todo, onUpdate, onDelete }: TodoProps) => {
    const { mutateAsync: deleteTodoAsync, isPending: isDeleting } =
        useDeleteTodo();
    const { mutateAsync: updateTodoAsync, isPending: isUpdating } =
        useUpdateTodo(todo.todoId);

    const updateCompleted = async (isCompleted: boolean) => {
        try {
            await updateTodoAsync(isCompleted);
            onUpdate(todo.todoId, isCompleted);
        } catch (error: unknown) {
            toastError(error, 'Failed to update to-do.');
        }
    };

    return (
        <div className={`${className} flex justify-between`}>
            <div className='flex items-center min-w-full flex-grow pr-4'>
                <Checkbox
                    id={todo.todoId}
                    defaultChecked={todo.isCompleted}
                    onCheckedChange={async (checked: boolean) => {
                        await updateCompleted(checked);
                        todo.setCompleted(checked);
                    }}
                    disabled={isDeleting || isUpdating}
                    required
                />
                <label
                    htmlFor={todo.todoId}
                    className={`ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 truncate break-words text-balance hover:cursor-pointer ${
                        todo.isCompleted && 'line-through'
                    }`}
                >
                    {todo.label}
                </label>
            </div>
            <IconButton
                className='w-4 bg-red-600 flex-shrink-0'
                icon={<Trash />}
                onClick={() =>
                    deleteTodoAsync(todo.todoId, {
                        onSuccess: () => {
                            onDelete(todo.todoId);
                            toast({
                                title: 'Todo deleted',
                                description: `Successfully deleted to-do item with label "${todo.label}".`,
                            });
                        },
                        onError: (error) => {
                            toastError(error, 'Failed to delete to-do');
                        },
                    })
                }
                disabled={isDeleting || isUpdating}
            />
        </div>
    );
};

export default Todo;
