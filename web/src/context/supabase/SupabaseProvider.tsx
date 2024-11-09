import { createClient } from '@supabase/supabase-js';
import { PropsWithChildren, useMemo } from 'react';
import SupabaseContext from './SupabaseContext';
import { SupabaseConfig } from './config/SupabaseConfig';

export interface SupabaseProviderProps extends PropsWithChildren {
    config?: SupabaseConfig;
}

const SupabaseProvider = ({
    config = SupabaseConfig.fromEnvironment(),
    children,
}: SupabaseProviderProps) => {
    const supabase = useMemo(
        () => createClient(config.supabaseUrl, config.supabaseKey),
        [config.supabaseKey, config.supabaseUrl],
    );

    return (
        <SupabaseContext.Provider
            value={{
                supabase,
            }}
        >
            {children}
        </SupabaseContext.Provider>
    );
};

export default SupabaseProvider;
