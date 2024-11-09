import { Session, User } from '@supabase/supabase-js';
import { createContext } from 'react';

type IAuthContext = {
    session: Promise<Session | null>;
    checkAuthenticated: () => Promise<boolean>;
    getUser: () => Promise<User>;
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
    signOut: () => Promise<void>;
};

const AuthContext = createContext<IAuthContext>({
    session: Promise.resolve(null),
    getUser: () => {
        throw new Error('AuthProvider not found');
    },
    checkAuthenticated: () => {
        throw new Error('AuthProvider not found');
    },
    signUp: () => {
        throw new Error('AuthProvider not found');
    },
    signIn: () => {
        throw new Error('AuthProvider not found');
    },
    signOut: () => {
        throw new Error('AuthProvider not found');
    },
});

export default AuthContext;
