import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import TodoService from '@/services/TodoService';
import TodoItem from '@/domain/TodoItem';
import BaseError from '@/errors/BaseError';
import { useToast } from '@/hooks/use-toast';
import { ToastActionElement } from '../ui/toast';
import { CreateTodoValues } from '../dialog/CreateTodoDialog';
import { useFormContext } from 'react-hook-form';

export interface CreateTodoFormProps {
    id: string;
    onSuccess: (todo: TodoItem) => void;
    onError?: (error: unknown) => void;
}

const CreateTodoForm = ({ id, onSuccess, onError }: CreateTodoFormProps) => {
    const form = useFormContext<CreateTodoValues>();
    const { toast } = useToast();

    async function onSubmit(values: CreateTodoValues) {
        try {
            const todo = await TodoService.create(values.label);
            onSuccess(todo);
            toast({
                title: 'Created to-do',
                description: `Successfully created to-do item with label "${todo.label}".`,
            });
        } catch (error: unknown) {
            onError?.(error);
            console.error(error);
            let description: string = 'An unknown error occurred.';
            let action: ToastActionElement | undefined = undefined;
            if (error instanceof BaseError) {
                description = error.message;
                action = error.action;
            }
            toast({
                variant: 'destructive',
                title: 'Error',
                description,
                action,
            });
        }
    }

    return (
        <Form {...form}>
            <form
                id={id}
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
            >
                <FormField
                    control={form.control}
                    name='label'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Ex. Buy groceries'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default CreateTodoForm;
