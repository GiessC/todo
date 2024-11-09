import { PropsWithChildren } from 'react';
import Sidebar from './components/sidebar/Sidebar';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div
            id='root'
            className='w-screen h-screen'
        >
            <Sidebar />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
