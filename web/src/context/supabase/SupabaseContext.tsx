import { SupabaseClient } from '@supabase/supabase-js';
import { createContext } from 'react';

export interface ISupabaseContext {
    supabase: SupabaseClient | undefined;
}

const SupabaseContext = createContext<ISupabaseContext>({
    supabase: undefined,
});

export default SupabaseContext;
