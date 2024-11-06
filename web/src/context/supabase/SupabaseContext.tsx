import { Session, User } from '@supabase/supabase-js';
import { createContext } from 'react';

type ISupabaseContext = {
    checkAuthenticated: () => Promise<boolean>;
    signUp: (
        email: string,
        password: string,
        captchaToken: string,
    ) => Promise<
        | {
              user: User | null;
              session: Session | null;
          }
        | undefined
    >;
};

const SupabaseContext = createContext<ISupabaseContext>({
    checkAuthenticated: () => {
        throw new Error('SupabaseProvider not found');
    },
    signUp: () => {
        throw new Error('SupabaseProvider not found');
    },
});

export default SupabaseContext;
