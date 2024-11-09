import { Session, User } from '@supabase/supabase-js';
import { createContext } from 'react';

type IAuthContext = {
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
    signIn: (
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

const AuthContext = createContext<IAuthContext>({
    checkAuthenticated: () => {
        throw new Error('AuthProvider not found');
    },
    signUp: () => {
        throw new Error('AuthProvider not found');
    },
    signIn: () => {
        throw new Error('AuthProvider not found');
    },
});

export default AuthContext;
