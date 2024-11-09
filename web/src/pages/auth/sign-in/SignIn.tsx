import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SignInForm from '@/components/forms/SignInForm';
import SignInFooterCard from './SignInFooterCard';

export const SIGN_IN_FORM_ID = 'sign-in-form';

const formSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: 'Please specify an email address.',
        })
        .email({ message: 'Please specify a valid email.' })
        .default(''),
    password: z.string().default(''),
    captchaToken: z
        .string()
        .min(1, {
            message: 'Please verify the captcha.',
        })
        .default(''),
});
export type SignInValues = z.infer<typeof formSchema>;

const SignIn = () => {
    const form = useForm<SignInValues>({
        resolver: zodResolver(formSchema),
    });
    const { formState } = form;
    const { isSubmitting, isLoading } = formState;

    return (
        <div className='flex flex-col h-full w-full'>
            <div className='flex flex-col space-y-6 m-auto w-1/5'>
                <Card className='p-2'>
                    <CardHeader>
                        <CardTitle>Sign-in</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SignInForm form={form} />
                    </CardContent>
                    <CardFooter className='justify-between'>
                        <Button
                            form={SIGN_IN_FORM_ID}
                            type='submit'
                            disabled={isSubmitting || isLoading}
                        >
                            Sign in
                        </Button>
                    </CardFooter>
                </Card>
                <SignInFooterCard />
            </div>
        </div>
    );
};

export default SignIn;
