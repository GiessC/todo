import { createClient } from '@supabase/supabase-js';
import { useMemo, type PropsWithChildren } from 'react';
import SupabaseContext from './SupabaseContext';

const SupabaseProvider = ({ children }: PropsWithChildren) => {
    const supabase = useMemo(
        () =>
            createClient(
                import.meta.env.VITE_SUPABASE_URL,
                import.meta.env.VITE_SUPABASE_KEY,
            ),
        [],
    );

    const signUp = async (
        email: string,
        password: string,
        captchaToken: string,
    ) => {
        const response = await supabase?.auth.signUp({
            email,
            password,
            options: {
                captchaToken,
            },
        });
        if (!response || response.error) {
            throw new Error('An error occurred while signing up.');
        }
        return response.data;
    };

    const checkAuthenticated = async (): Promise<boolean> => {
        const response = await supabase?.auth.getSession();
        if (response.error || !response.data.session) {
            return false;
        }
        return true;
    };

    return (
        <SupabaseContext.Provider value={{ signUp, checkAuthenticated }}>
            {children}
        </SupabaseContext.Provider>
    );
};

export default SupabaseProvider;
