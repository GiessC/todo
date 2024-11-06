import './SignUp.css';
import SupabaseContext from '@/context/supabase/SupabaseContext';
import { useContext, useEffect, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useLocation, useNavigate } from 'react-router-dom';
import Pages from '../pages';
import { toastError } from '@/utils/toastError';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const SIGN_UP_FORM_ID = 'sign-up-form';

const formSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: 'Please specify an email address.',
        })
        .email({ message: 'Please specify a valid email.' })
        .default(''),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters.' })
        .default(''),
    captchaToken: z
        .string()
        .min(1, {
            message: 'Please verify the captcha.',
        })
        .optional()
        .default(''),
});
type SignUpValues = z.infer<typeof formSchema>;

const SignUp = () => {
    const form = useForm<SignUpValues>({
        resolver: zodResolver(formSchema),
    });
    const { handleSubmit, setValue } = form;
    const { signUp } = useContext(SupabaseContext);
    const captchaRef = useRef<HCaptcha | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state?.error) {
            return;
        }
        toastError(location.state.error, 'Sign-in error');
    }, [location.state?.error]);

    const handleSignUp = async ({
        email,
        password,
        captchaToken,
    }: SignUpValues) => {
        const response = await signUp(email, password, captchaToken);
        if (!response) {
            navigate(Pages.SignUp, {
                state: { error: 'Error signing up' },
            });
            return;
        }
        navigate(Pages.TodoList);
    };

    const setCaptchaToken = (token: string) => {
        setValue('captchaToken', token);
    };

    const onError = () => {
        toastError('Error verifying captcha', 'Captcha error');
    };

    const onExpire = () => {
        toastError('Captcha expired', 'Captcha error');
    };

    return (
        <div className='flex h-full w-full'>
            <Card className='m-auto p-2 w-1/5'>
                <CardHeader>
                    <CardTitle>Sign-up</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            id={SIGN_UP_FORM_ID}
                            onSubmit={handleSubmit(handleSignUp)}
                            className='space-y-8'
                        >
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                autoComplete='new-password'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='captchaToken'
                                render={() => (
                                    <FormItem>
                                        <FormControl>
                                            <div className='captcha-container'>
                                                <HCaptcha
                                                    sitekey={
                                                        import.meta.env
                                                            .VITE_CAPTCHA_SITE_KEY
                                                    }
                                                    onVerify={setCaptchaToken}
                                                    onError={onError}
                                                    onExpire={onExpire}
                                                    ref={captchaRef}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className='justify-end'>
                    <Button
                        form={SIGN_UP_FORM_ID}
                        type='submit'
                    >
                        Sign-up
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignUp;
