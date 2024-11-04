export interface TodoItemJSON {
    id: string;
    label: string;
    completed: boolean;
}

export default class TodoItem {
    private _id: string;
    private _label: string;
    private _completed: boolean;

    constructor() {
        this._id = '';
        this._label = '';
        this._completed = false;
    }

    static fromJSON(json: TodoItemJSON): TodoItem {
        const todo = new TodoItem();
        todo._id = json.id;
        todo._label = json.label;
        todo._completed = json.completed;
        return todo;
    }

    get id(): string {
        return this._id;
    }

    get label(): string {
        return this._label;
    }

    get completed(): boolean {
        return this._completed;
    }
}
