import { ToastActionElement } from '@/components/ui/toast';

export default class BaseError extends Error {
    action?: ToastActionElement;

    constructor(message: string, action?: ToastActionElement) {
        super(message);
        this.name = this.constructor.name;
        this.action = action;
    }
}
