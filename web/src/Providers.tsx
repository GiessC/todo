import { QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { queryClient } from './config/queryClient';

const Providers = ({ children }: PropsWithChildren) => {
    const client = useQueryClient(queryClient);

    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
};

export default Providers;
