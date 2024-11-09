import { SIGN_UP_FORM_ID, SignUpValues } from '@/pages/auth/SignUp';
import { useNavigate } from 'react-router-dom';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import AuthContext from '@/context/auth/AuthContext';
import Pages from '@/pages/pages';
import { toastError } from '@/utils/toastError';
import { useContext, useRef } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import UserAlreadyExistsError from '@/context/auth/errors/sign-up/UserAlreadyExists';
import CaptchaInput from '../common/captcha/CaptchaInput';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export interface SignUpFormProps {
    form: UseFormReturn<SignUpValues>;
}

const SignUpForm = ({ form }: SignUpFormProps) => {
    const { handleSubmit, setValue, setError } = form;
    const { signUp } = useContext(AuthContext);
    const navigate = useNavigate();
    const captchaRef = useRef<HCaptcha | null>(null);

    const submit = async (values: SignUpValues) => {
        try {
            await signUpUser(values);
        } catch (error: unknown) {
            console.error(error);
            resetCaptcha();
            requestCaptchaReverification();
            toastErrorToUser(error);
        }
    };

    function requestCaptchaReverification(reason?: string) {
        const defaultMessage = 'Please re-verify the captcha.';
        setError('captchaToken', {
            message: reason ? `${reason} ${defaultMessage}` : defaultMessage,
        });
    }

    function resetCaptcha() {
        captchaRef.current?.resetCaptcha();
        setValue('captchaToken', '');
    }

    function toastErrorToUser(error: unknown) {
        if (error instanceof UserAlreadyExistsError) {
            toastError(error, 'User already exists');
            return;
        }
        toastError(error);
    }

    const signUpUser = async ({
        email,
        password,
        captchaToken,
    }: SignUpValues): Promise<void> => {
        const response = await signUp(email, password, captchaToken);
        if (!response) {
            throw new Error('Sign-up failed');
        }
        navigate(Pages.TodoList);
    };

    return (
        <FormProvider {...form}>
            <Form {...form}>
                <form
                    id={SIGN_UP_FORM_ID}
                    onSubmit={handleSubmit(submit)}
                    className='space-y-8'
                >
                    <FormField
                        control={form.control}
                        name='email'
                        defaultValue=''
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
                        defaultValue=''
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
                        name='confirmPassword'
                        defaultValue=''
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
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
                        defaultValue=''
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <CaptchaInput
                                        {...field}
                                        ref={captchaRef}
                                        resetCaptcha={resetCaptcha}
                                        requestCaptchaReverification={
                                            requestCaptchaReverification
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </FormProvider>
    );
};

export default SignUpForm;
