import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Dashboard from './components/container/dashboard/dashboard';
import Home from './components/container/home/home';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
]);

function App() {
    return <RouterProvider router={routes} />;
}

export default App;
