import { Loader2Icon } from 'lucide-react';

export interface LoadingProps {
    className?: string;
}

const Loading = ({ className = '' }: LoadingProps) => {
    return <Loader2Icon className={`${className} animate-spin`} />;
};

export default Loading;
