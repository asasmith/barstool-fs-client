import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import { Root } from './routes/Root';
import { Boxscore } from './components/boxscore/Boxscore';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: 'boxscore/:id',
                element: <Boxscore />,
                loader: async ({ params }) => {
                    const { id } = params;

                    return await fetch(`http://localhost:1111/v1/boxscore/${id}`);
                },
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
