import { PropsWithChildren } from 'react';
import Root from './root';

const DefaultLayout = ({ children }: PropsWithChildren) => {
    return (
        <Root>
            <main className='w-screen h-screen'>{children}</main>
        </Root>
    );
};

export default DefaultLayout;
