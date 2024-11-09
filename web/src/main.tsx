import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from './components/ui/toaster.tsx';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import TodoList from './components/todo/TodoList.tsx';
import SignUp from './pages/auth/SignUp.tsx';
import Pages from './pages/pages.ts';
import ErrorPage from './pages/error.tsx';
import ProtectedRoute from './components/auth/ProtectedRoute.tsx';
import SignIn from './pages/auth/sign-in/SignIn.tsx';
import Providers from './Providers.tsx';
import DefaultLayout from './components/layouts/DefaultLayout.tsx';

const router = createBrowserRouter([
    {
        path: Pages.TodoList,
        element: (
            <Providers>
                <Outlet />
            </Providers>
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
                element: (
                    <DefaultLayout>
                        <Outlet />
                    </DefaultLayout>
                ),
                children: [
                    {
                        path: Pages.SignIn,
                        element: <SignIn />,
                    },
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
        <RouterProvider router={router} />
        <Toaster />
    </StrictMode>,
);
