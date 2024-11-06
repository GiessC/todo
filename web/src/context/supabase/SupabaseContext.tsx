import { type SupabaseClient } from '@supabase/supabase-js';
import { createContext } from 'react';

const SupabaseContext = createContext<{ supabase: SupabaseClient | undefined }>(
    { supabase: undefined },
);

export default SupabaseContext;
