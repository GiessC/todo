import {
    useCallback,
    useContext,
    type PropsWithChildren,
    useMemo,
} from 'react';
import AuthContext from './AuthContext';
import SupabaseContext from '../supabase/SupabaseContext';
import AuthErrorThrower from './errors/AuthErrorThrower';
import { User } from '@supabase/supabase-js';

const AuthProvider = ({ children }: PropsWithChildren) => {
    const { supabase } = useContext(SupabaseContext);

    const session = useMemo(async () => {
        const response = await supabase!.auth.getSession();
        if (response.error) {
            return null;
        }
        return response.data.session;
    }, [supabase]);

    const getUser = useCallback(async (): Promise<User> => {
        const response = await supabase!.auth.getUser();
        if (!response || response.error) {
            throw new Error('Failed to get user.');
        }
        return response.data.user;
    }, [supabase]);

    const signIn = async (
        email: string,
        password: string,
        captchaToken: string,
    ) => {
        const response = await supabase!.auth.signInWithPassword({
            email,
            password,
            options: {
                captchaToken,
            },
        });
        if (!response || response.error) {
            AuthErrorThrower.throwErrorIfInvalid(response);
        }
        return response.data;
    };

    const signUp = async (
        email: string,
        password: string,
        captchaToken: string,
    ) => {
        const response = await supabase!.auth.signUp({
            email,
            password,
            options: {
                captchaToken,
            },
        });
        if (!response || response.error) {
            AuthErrorThrower.throwErrorIfInvalid(response);
        }
        return response.data;
    };

    const signOut = async () => {
        const response = await supabase!.auth.signOut();
        if (response.error) {
            AuthErrorThrower.throwErrorIfInvalid(response);
        }
    };

    const checkAuthenticated = async (): Promise<boolean> => {
        const response = await supabase!.auth.getSession();
        if (response.error || !response.data.session) {
            return false;
        }
        return true;
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                getUser,
                signIn,
                signOut,
                signUp,
                checkAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
