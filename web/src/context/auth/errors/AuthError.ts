import BaseError from '@/errors/BaseError';

export default class AuthError extends BaseError {
    constructor(message: string) {
        super(message);
    }
}
