import { QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { queryClient } from './config/queryClient';
import AuthProvider from './context/auth/AuthProvider';
import SupabaseProvider from './context/supabase/SupabaseProvider';

const Providers = ({ children }: PropsWithChildren) => {
    const client = useQueryClient(queryClient);

    return (
        <SupabaseProvider>
            <AuthProvider>
                <QueryClientProvider client={client}>
                    {children}
                </QueryClientProvider>
            </AuthProvider>
        </SupabaseProvider>
    );
};

export default Providers;
