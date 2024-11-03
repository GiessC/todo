import { Plus } from 'lucide-react';
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

const CreateTodoDialog = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const formId = 'create-todo';

    function onSuccess(): void {
        setIsOpen(false);
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger>
                <Button>
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create To-do</DialogTitle>
                    <DialogDescription>
                        Create a new to-do item in your to-do list.
                    </DialogDescription>
                </DialogHeader>
                <CreateTodoForm
                    id={formId}
                    onSuccess={onSuccess}
                />
            </DialogContent>
            <DialogFooter>
                <Button
                    type='submit'
                    form={formId}
                >
                    Create
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default CreateTodoDialog;
