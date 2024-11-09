import { PropsWithChildren } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Root from './root';

const AuthenticatedLayout = ({ children }: PropsWithChildren) => {
    return (
        <Root>
            <main className='w-screen h-screen'>{children}</main>
            <Sidebar />
        </Root>
    );
};

export default AuthenticatedLayout;
