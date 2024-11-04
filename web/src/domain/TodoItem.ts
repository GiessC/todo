export interface TodoItemJSON {
    id: number;
    label: string;
    completed: boolean;
}

export default class TodoItem {
    private _id: number;
    private _label: string;
    private _completed: boolean;

    constructor() {
        this._id = 0;
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

    get label(): string {
        return this._label;
    }
}
