import { Card, CardContent } from '@/components/ui/card';
import Pages from '@/pages/pages';
import { Link } from 'react-router-dom';

const SignUpFooterCard = () => {
    return (
        <Card className='w-fit m-auto p-1'>
            <CardContent className='p-4 flex justify-center'>
                <p className='text-xs'>
                    Already have an account?{' '}
                    <Link
                        className={`hover:underline text-blue-500`}
                        to={Pages.SignIn}
                    >
                        Sign in
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
};

export default SignUpFooterCard;
