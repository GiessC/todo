import BaseError from '@/errors/BaseError';

export interface IAuthError {
    getMessage(): string;
}

export default class AuthError extends BaseError implements IAuthError {
    constructor(message: string) {
        super(message);
    }

    getMessage(): string {
        return this.message;
    }
}
