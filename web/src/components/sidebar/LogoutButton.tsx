import { LogOut } from 'lucide-react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import AuthContext from '@/context/auth/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Pages from '@/pages/pages';

const LogoutButton = () => {
    const { signOut } = useContext(AuthContext);
    const navigate = useNavigate();

    async function signUserOut() {
        try {
            await signOut();
            navigate(Pages.SignIn);
        } catch (error: unknown) {
            console.error(error);
            forceLocalSignOut();
        }
    }

    function forceLocalSignOut() {
        // jwt data needs to be cleared from local storage
        // no other use of local storage in this app, so clearing all
        localStorage.clear();
        navigate(Pages.SignIn);
    }

    return (
        <DropdownMenuItem
            className='hover:cursor-pointer]'
            onClick={signUserOut}
        >
            <LogOut />
            Logout
        </DropdownMenuItem>
    );
};

export default LogoutButton;
