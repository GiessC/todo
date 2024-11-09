import { AuthResponse } from '@supabase/supabase-js';
import AuthError from './AuthError';
import UserAlreadyExistsError from './sign-up/UserAlreadyExists';
import InvalidCredentialsError from './sign-in/InvalidCredentialsError';

export default class AuthErrorThrower {
    // based on supabase's error codes
    private static errorFactoryByCode: Record<string, () => AuthError> = {
        user_already_exists: () => new UserAlreadyExistsError(),
        invalid_credentials: () => new InvalidCredentialsError(),
    };

    static throwErrorIfInvalid(response: AuthResponse): void {
        if (!response.error) {
            return;
        }
        const code = response.error.code;
        if (!code || !(code in this.errorFactoryByCode)) {
            throw new AuthError('An unknown authentication error occurred.');
        }
        throw this.errorFactoryByCode[code]();
    }
}
