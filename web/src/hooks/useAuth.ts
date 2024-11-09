import AuthContext from '@/context/auth/AuthContext';
import { useContext } from 'react';

export const useAccessToken = () => {
    const { session } = useContext(AuthContext);

    return session.then((session) => session?.access_token);
};
