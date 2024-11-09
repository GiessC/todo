const ErrorPage = () => {
    return (
        <div className='flex flex-col h-full w-full justify-center'>
            <div className='m-auto'>
                <div>Something went wrong.</div>
                <a
                    href='/'
                    className='underline text-blue-500'
                >
                    Return home
                </a>
            </div>
        </div>
    );
};

export default ErrorPage;
