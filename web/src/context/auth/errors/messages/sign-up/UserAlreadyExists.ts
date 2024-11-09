import AuthError from '../AuthError';

export default class UserAlreadyExistsError extends AuthError {
    constructor() {
        super('A user with this email already exists.');
    }
}
