import SupabaseContext from '@/context/supabase/SupabaseContext';
import { type SupabaseClient } from '@supabase/supabase-js';
import { useContext } from 'react';

export const useSupabase = (): SupabaseClient => {
    const { supabase } = useContext(SupabaseContext);
    if (!supabase) {
        throw new Error('SupabaseProvider not found');
    }
    return supabase;
};
