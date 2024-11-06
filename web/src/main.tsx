import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from './components/ui/toaster.tsx';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import TodoList from './components/todo/TodoList.tsx';
import SignUp from './pages/auth/SignUp.tsx';
import Pages from './pages/pages.ts';
import Providers from './Providers.tsx';
import ErrorPage from './pages/error.tsx';
import ProtectedRoute from './components/auth/ProtectedRoute.tsx';

const router = createBrowserRouter([
    {
        path: Pages.TodoList,
        element: (
            <div
                id='root'
                className='w-screen h-screen'
            >
                <Outlet />
            </div>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <TodoList />
                    </ProtectedRoute>
                ),
            },
            {
                path: Pages.Auth,
                children: [
                    {
                        path: Pages.SignUp,
                        element: <SignUp />,
                    },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Providers>
            <RouterProvider router={router} />
            <Toaster />
        </Providers>
    </StrictMode>,
);
