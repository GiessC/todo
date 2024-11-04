import { Loader2Icon } from 'lucide-react';
import {
    Button as ShadButton,
    ButtonProps as ShadButtonProps,
} from '../../ui/button';

export interface ButtonProps extends ShadButtonProps {
    isLoading?: boolean;
}

const Button = ({ isLoading = false, children, ...props }: ButtonProps) => {
    return (
        <ShadButton {...props}>
            {isLoading && <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />}
            {children}
        </ShadButton>
    );
};

export default Button;
