import AuthError from '../AuthError';

export default class InvalidCredentialsError extends AuthError {
    constructor() {
        super('No user exists with the specified email and password.');
    }
}
