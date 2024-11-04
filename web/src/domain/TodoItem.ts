export interface TodoItemJSON {
    todoId: string;
    label: string;
    completed: boolean;
}

export default class TodoItem {
    private _todoId: string;
    private _label: string;
    private _completed: boolean;

    constructor() {
        this._todoId = '';
        this._label = '';
        this._completed = false;
    }

    static fromJSON(json: TodoItemJSON): TodoItem {
        const todo = new TodoItem();
        todo._todoId = json.todoId;
        todo._label = json.label;
        todo._completed = json.completed;
        return todo;
    }

    get todoId(): string {
        return this._todoId;
    }

    get label(): string {
        return this._label;
    }

    get completed(): boolean {
        return this._completed;
    }

    setCompleted(completed: boolean) {
        this._completed = completed;
    }
}
