import { PropsWithChildren } from 'react';

const Root = ({ children }: PropsWithChildren) => {
    return (
        <div
            id='root'
            className='w-screen h-screen'
        >
            {children}
        </div>
    );
};

export default Root;
