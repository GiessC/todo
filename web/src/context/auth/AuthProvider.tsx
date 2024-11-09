import { useContext, type PropsWithChildren } from 'react';
import AuthContext from './AuthContext';
import SupabaseContext from '../supabase/SupabaseContext';
import AuthErrorThrower from './errors/AuthErrorThrower';

const AuthProvider = ({ children }: PropsWithChildren) => {
    const { supabase } = useContext(SupabaseContext);

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

    const checkAuthenticated = async (): Promise<boolean> => {
        const response = await supabase!.auth.getSession();
        if (response.error || !response.data.session) {
            return false;
        }
        return true;
    };

    return (
        <AuthContext.Provider value={{ signUp, checkAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
