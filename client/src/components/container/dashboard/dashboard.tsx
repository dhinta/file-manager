import { useEffect, useReducer, useState } from 'react';
import { createPortal } from 'react-dom';
import {
    initialState,
    MenuContext,
    reducer,
} from '../../../context/menu-context';
import {
    ContextMenuActionType,
    ContextMenuClientRect,
    ContextMenuItemType,
    Directory,
} from '../../../models/context-menu';
import ContextMenu from '../../ui/context-menu/context-menu';
import Taskbar from '../../ui/taskbar/taskbar';
import Desktop from '../desktop/desktop';

export default function Dashboard(): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [itemType, setItemType] = useState<ContextMenuItemType>();
    const [newDir, setNewDir] = useState<Directory | null>(null);

    const createDirectory = (
        event: ContextMenuClientRect,
        parent = 'Desktop'
    ): Directory => {
        const dir = {
            type: ContextMenuItemType.NEW_FOLDER,
            position: {
                left: event.left,
                top: event.top,
            },
            parent,
            dirName: '',
        };

        dispatch({
            type: ContextMenuActionType.CLICK,
            payload: {
                items: [],
            },
        });

        return dir;
    };

    useEffect(() => {
        // Save new directory
        if (itemType === ContextMenuItemType.NEW_FOLDER) {
            const dir = createDirectory(state.event);
            setNewDir(dir);
        }
    }, [itemType, state.event]);

    useEffect(() => {
        // Remove unsaved directory
        if (newDir === null) {
            setItemType(undefined);
        }
    }, [newDir]);

    const contextMenuPortal = state.items.length
        ? createPortal(
              <ContextMenu
                  items={[...state.items]}
                  event={state.event}
                  action={setItemType}
              />,
              document.getElementById('context-menu')!
          )
        : null;

    return (
        <>
            {contextMenuPortal}
            <MenuContext.Provider value={{ state, dispatch }}>
                <Desktop newDir={newDir} setNewDir={setNewDir} />
                <Taskbar />
            </MenuContext.Provider>
        </>
    );
}
