import { useReducer } from 'react';
import { createPortal } from 'react-dom';
import {
    initialState,
    MenuContext,
    reducer,
} from '../../../context/menu-context';
import ContextMenu from '../../ui/context-menu/context-menu';
import Taskbar from '../../ui/taskbar/taskbar';
import Desktop from '../desktop/desktop';

export default function Dashboard(): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState);
    const contextMenuPortal = state.items.length
        ? createPortal(
              <ContextMenu items={[...state.items]} event={state.event} />,
              document.getElementById('context-menu')!
          )
        : null;

    return (
        <>
            {contextMenuPortal}
            <MenuContext.Provider value={{ state, dispatch }}>
                <Desktop />
                <Taskbar />
            </MenuContext.Provider>
        </>
    );
}
