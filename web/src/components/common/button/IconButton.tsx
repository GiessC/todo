import Button, { ButtonProps } from '@/components/common/button/Button';
import React from 'react';

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
    icon: React.ReactNode;
}

const IconButton = ({ icon, ...props }: IconButtonProps) => {
    return <Button {...props}>{icon}</Button>;
};

export default IconButton;
