import './SignUp.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SignUpForm from '@/components/forms/SignUpForm';

export const SIGN_UP_FORM_ID = 'sign-up-form';

const formSchema = z
    .object({
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
        confirmPassword: z.string().default(''),
        captchaToken: z
            .string()
            .min(1, {
                message: 'Please verify the captcha.',
            })
            .optional()
            .default(''),
    })
    .refine(
        (data) => {
            return data.password === data.confirmPassword;
        },
        {
            message: 'Passwords do not match.',
            path: ['confirmPassword'],
        },
    );
export type SignUpValues = z.infer<typeof formSchema>;

const SignUp = () => {
    const form = useForm<SignUpValues>({
        resolver: zodResolver(formSchema),
    });
    const { formState } = form;
    const { isSubmitting, isLoading } = formState;

    return (
        <div className='flex h-full w-full'>
            <Card className='m-auto p-2 w-1/5'>
                <CardHeader>
                    <CardTitle>Sign-up</CardTitle>
                </CardHeader>
                <CardContent>
                    <SignUpForm form={form} />
                </CardContent>
                <CardFooter className='justify-end'>
                    <Button
                        form={SIGN_UP_FORM_ID}
                        type='submit'
                        disabled={isSubmitting || isLoading}
                    >
                        Sign-up
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignUp;
