import { Avatar, AvatarFallback } from '../ui/avatar';
import { CircleUserRound } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import LogoutButton from './LogoutButton';

const UserAvatarMenu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='hover:cursor-pointer !w-12 !h-12'>
                    <AvatarFallback className='hover:bg-gray-200'>
                        <CircleUserRound />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <LogoutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAvatarMenu;
