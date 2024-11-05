import ServiceError from '@/errors/ServiceError';
import { QueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';

const FIVE_MINUTES = 1000 * 60 * 5;

const IGNORE_STATUS: Set<number> = new Set([
    StatusCodes.OK,
    StatusCodes.NO_CONTENT,
    StatusCodes.BAD_REQUEST,
    StatusCodes.UNAUTHORIZED,
    StatusCodes.FORBIDDEN,
    StatusCodes.METHOD_NOT_ALLOWED,
    StatusCodes.CONFLICT,
    StatusCodes.UNSUPPORTED_MEDIA_TYPE,
    StatusCodes.UNPROCESSABLE_ENTITY,
]);

const retry = (failureCount: number, error: Error): boolean => {
    if (
        error instanceof ServiceError &&
        error.status &&
        error.status in IGNORE_STATUS
    )
        return false;

    if (failureCount > 3) return false;

    return true;
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry,
            retryDelay: 1000,
            throwOnError: true,
            staleTime: FIVE_MINUTES,
        },
        mutations: {
            retry,
            retryDelay: 1000,
            throwOnError: true,
        },
    },
});
