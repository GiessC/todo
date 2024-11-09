import HCaptcha from '@hcaptcha/react-hcaptcha';
import {
    ControllerRenderProps,
    FieldValues,
    Path,
    useFormContext,
} from 'react-hook-form';

const SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY;

export interface CaptchaInputProps<TFormValues extends FieldValues>
    extends Omit<ControllerRenderProps<TFormValues>, 'ref'> {
    ref: React.RefObject<HCaptcha>;
    resetCaptcha: () => void;
    requestCaptchaReverification: (reason?: string) => void;
}

const CaptchaInput = <TFormValues extends FieldValues>({
    ref,
    resetCaptcha,
    requestCaptchaReverification,
    ...field
}: CaptchaInputProps<TFormValues>) => {
    const { setError, setValue } = useFormContext();

    const onCaptchaError = () => {
        resetCaptcha();
        setError(field.name, {
            message: 'Invalid captcha. Please try again.',
        });
    };

    const onCaptchaExpire = () => {
        resetCaptcha();
        requestCaptchaReverification('Captcha expired.');
    };

    const onVerify = (token: string) => {
        setError(field.name, {
            message: '',
        });
        setCaptchaToken(token);
    };

    const setCaptchaToken = (token: string) => {
        setValue(
            field.name as Path<TFormValues>,
            token as TFormValues[Path<TFormValues>],
        );
    };

    return (
        <div className='captcha-container'>
            <HCaptcha
                {...field}
                sitekey={SITE_KEY}
                onVerify={onVerify}
                onError={onCaptchaError}
                onExpire={onCaptchaExpire}
                ref={ref}
            />
        </div>
    );
};

export default CaptchaInput;
