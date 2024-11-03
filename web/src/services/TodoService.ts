import TodoItem from '@/domain/TodoItem';

export default class TodoService {
    static async create(label: string): Promise<TodoItem> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    TodoItem.fromJSON({
                        id: 1,
                        label,
                        completed: false,
                    }),
                );
            }, 1000);
        });
    }
}
