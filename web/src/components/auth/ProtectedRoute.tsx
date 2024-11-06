import SupabaseContext from '@/context/supabase/SupabaseContext';
import Pages from '@/pages/pages';
import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../common/loading/Loading';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState<
        boolean | undefined
    >();
    const { checkAuthenticated } = useContext(SupabaseContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getSession = async () => {
            const authenticated = await checkAuthenticated();
            if (!authenticated) {
                navigate(Pages.SignIn);
            }
            setIsAuthenticated(authenticated);
        };
        getSession();
    }, [checkAuthenticated, navigate]);

    if (isAuthenticated === undefined) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
