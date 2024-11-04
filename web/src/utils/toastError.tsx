import BaseError from '@/errors/BaseError';
import { toast } from '@/hooks/use-toast';
import { Ban } from 'lucide-react';

export const toastError = (error: unknown, title: string = 'Error'): void => {
    toast({
        variant: 'destructive',
        title: (
            <span className='flex'>
                <Ban className='mr-2' />
                {title}
            </span>
        ) as unknown as string,
        description:
            error instanceof BaseError
                ? error.message
                : 'An unknown error occurred.',
        action: error instanceof BaseError ? error.action : undefined,
    });
};
