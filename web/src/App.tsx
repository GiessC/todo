import { ErrorBoundary } from 'react-error-boundary';
import './App.css';
import TodoList from './components/todo/TodoList';
import Providers from './Providers';

function App() {
    return (
        <ErrorBoundary
            fallback={
                <div>
                    Something went wrong. Please refresh the page and try again.
                </div>
            }
        >
            <Providers>
                <div className='h-screen w-screen'>
                    <TodoList />
                </div>
            </Providers>
        </ErrorBoundary>
    );
}

export default App;
