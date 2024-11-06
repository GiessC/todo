import { QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { queryClient } from './config/queryClient';
import SupabaseProvider from './context/supabase/SupabaseProvider';

const Providers = ({ children }: PropsWithChildren) => {
    const client = useQueryClient(queryClient);

    return (
        <SupabaseProvider>
            <QueryClientProvider client={client}>
                {children}
            </QueryClientProvider>
        </SupabaseProvider>
    );
};

export default Providers;
