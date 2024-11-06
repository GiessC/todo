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

    return (
        <SupabaseContext.Provider value={{ supabase }}>
            {children}
        </SupabaseContext.Provider>
    );
};

export default SupabaseProvider;
