import {
    Button as ShadButton,
    ButtonProps as ShadButtonProps,
} from '../../ui/button';
import Loading from '../loading/Loading';

export interface ButtonProps extends ShadButtonProps {
    isLoading?: boolean;
}

const Button = ({ isLoading = false, children, ...props }: ButtonProps) => {
    return (
        <ShadButton {...props}>
            {isLoading && <Loading className='mr-2 h-4 w-4' />}
            {children}
        </ShadButton>
    );
};

export default Button;
