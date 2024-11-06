export interface TodoItemJSON {
    todoId: string;
    label: string;
    isCompleted: boolean;
    createdAt: string;
}

export default class TodoItem {
    private _todoId: string;
    private _label: string;
    private _isCompleted: boolean;
    private _createdAt: Date;

    constructor() {
        this._todoId = '';
        this._label = '';
        this._isCompleted = false;
        this._createdAt = new Date();
    }

    static fromJSON(json: TodoItemJSON): TodoItem {
        const todo = new TodoItem();
        todo._todoId = json.todoId;
        todo._label = json.label;
        todo._isCompleted = json.isCompleted;
        todo._createdAt = new Date(json.createdAt);
        return todo;
    }

    get todoId(): string {
        return this._todoId;
    }

    get label(): string {
        return this._label;
    }

    get isCompleted(): boolean {
        return this._isCompleted;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    setCompleted(isCompleted: boolean) {
        this._isCompleted = isCompleted;
    }
}
