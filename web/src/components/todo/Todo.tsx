import TodoItem from '@/domain/TodoItem';
import { Checkbox } from '../ui/checkbox';
import IconButton from '../common/button/IconButton';
import { Trash } from 'lucide-react';

export interface TodoProps {
    className?: string;
    todo: TodoItem;
}

const Todo = ({ className = '', todo }: TodoProps) => {
    return (
        <div className={`${className} flex justify-between`}>
            <div className='flex items-center'>
                <Checkbox id={todo.id} />
                <label
                    htmlFor={todo.id}
                    className='ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                    {todo.label}
                </label>
            </div>
            <IconButton
                className='w-4 bg-red-600'
                icon={<Trash />}
            />
        </div>
    );
};

export default Todo;
