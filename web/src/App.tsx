import './App.css';
import CreateTodoDialog from './components/dialog/CreateTodoDialog';
import TodoList from './components/todo/TodoList';
import Providers from './Providers';

function App() {
    return (
        <Providers>
            <div className='h-screen w-screen'>
                <CreateTodoDialog />
                <TodoList />
            </div>
        </Providers>
    );
}

export default App;
