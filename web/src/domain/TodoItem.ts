export interface TodoItemJSON {
    todoId: string;
    label: string;
    isCompleted: boolean;
}

export default class TodoItem {
    private _todoId: string;
    private _label: string;
    private _isCompleted: boolean;

    constructor() {
        this._todoId = '';
        this._label = '';
        this._isCompleted = false;
    }

    static fromJSON(json: TodoItemJSON): TodoItem {
        const todo = new TodoItem();
        todo._todoId = json.todoId;
        todo._label = json.label;
        todo._isCompleted = json.isCompleted;
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

    setCompleted(isCompleted: boolean) {
        this._isCompleted = isCompleted;
    }
}
