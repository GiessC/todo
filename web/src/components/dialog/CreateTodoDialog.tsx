import { CheckCircle, Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import CreateTodoForm from '../forms/CreateTodoForm';
import { Button } from '../ui/button';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TodoItem from '@/domain/TodoItem';

const formSchema = z.object({
    label: z.string().min(1, { message: 'Please specify a label.' }),
});

export type CreateTodoValues = z.infer<typeof formSchema>;

const DEFAULT_VALUES: CreateTodoValues = {
    label: '',
};

export interface CreateTodoDialogProps {
    className?: string;
    onSuccess: (todo: TodoItem) => void;
}

const CreateTodoDialog = ({
    className,
    onSuccess: successCallback,
}: CreateTodoDialogProps) => {
    const form = useForm<CreateTodoValues>({
        resolver: zodResolver(formSchema),
        defaultValues: DEFAULT_VALUES,
    });
    const { formState } = form;
    const { isSubmitting } = formState;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const formId = 'create-todo';

    function onSuccess(todo: TodoItem): void {
        successCallback(todo);
        cleanup();
    }

    function cleanup(isOpen: boolean = false): void {
        form.reset();
        setIsOpen(isOpen);
    }

    return (
        <FormProvider {...form}>
            <Dialog
                open={isOpen}
                onOpenChange={cleanup}
            >
                <DialogTrigger className={`${className} w-min h-min`}>
                    <Button>
                        <Plus />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='flex'>
                            <CheckCircle className='mr-2 w-5 h-5' />
                            Add To-do
                        </DialogTitle>
                        <DialogDescription>
                            Add a new to-do item to your to-do list.
                        </DialogDescription>
                    </DialogHeader>
                    <CreateTodoForm
                        id={formId}
                        onSuccess={onSuccess}
                    />
                    <DialogFooter>
                        <Button
                            variant='ghost'
                            onClick={() => cleanup()}
                            form={formId}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            form={formId}
                            disabled={isSubmitting}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </FormProvider>
    );
};

export default CreateTodoDialog;
