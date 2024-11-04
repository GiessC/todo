import './App.css';
import TodoList from './components/todo/TodoList';
import Providers from './Providers';

function App() {
    return (
        <Providers>
            <div className='h-screen w-screen'>
                <TodoList />
            </div>
        </Providers>
    );
}

export default App;
