import { useReducer } from 'react';
import { createPortal } from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Dashboard from './components/container/dashboard/dashboard';
import Home from './components/container/home/home';
import ContextMenu from './components/ui/context-menu/context-menu';
import { initialState, MenuContext, reducer } from './context/menu-context';

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
    const [state, dispatch] = useReducer(reducer, initialState);
    const contextMenuPortal = state.items.length
        ? createPortal(
              <ContextMenu items={[...state.items]} styles={state.event} />,
              document.getElementById('context-menu')!
          )
        : null;

    console.log(state);
    return (
        <>
            {contextMenuPortal}
            <MenuContext.Provider value={{ state, dispatch }}>
                <RouterProvider router={routes} />
            </MenuContext.Provider>
        </>
    );
}

export default App;
