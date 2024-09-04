import { useEffect, useReducer, useState } from 'react';
import { createPortal } from 'react-dom';
import {
    initialState,
    MenuContext,
    reducer,
} from '../../../context/menu-context';
import {
    Asset,
    ContextMenuActionType,
    ContextMenuClientRect,
    ContextMenuItemType,
} from '../../../models/context-menu';
import ContextMenu from '../../ui/context-menu/context-menu';
import Taskbar from '../../ui/taskbar/taskbar';
import Desktop from '../desktop/desktop';

export default function Dashboard(): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [itemType, setItemType] = useState<ContextMenuItemType>();
    const [newAsset, setNewAsset] = useState<Asset | null>(null);

    const createAsset = (
        event: ContextMenuClientRect,
        type = ContextMenuItemType.NEW_FOLDER,
        parent = 'Desktop'
    ): Asset => {
        const asset: Asset = {
            name: '',
            position: {
                left: event.left,
                top: event.top,
            },
            parent,
            type:
                type === ContextMenuItemType.NEW_FOLDER
                    ? ContextMenuItemType.NEW_FOLDER
                    : ContextMenuItemType.TEXT_DOCUMENT,
        };

        dispatch({
            type: ContextMenuActionType.CLICK,
            payload: {
                items: [],
            },
        });

        return asset;
    };

    useEffect(() => {
        // New asset placeholder - Yet to be created
        if (itemType === ContextMenuItemType.NEW_FOLDER) {
            const dir = createAsset(state.event);
            setNewAsset(dir);
        }
        if (itemType === ContextMenuItemType.TEXT_DOCUMENT) {
            const doc = createAsset(
                state.event,
                ContextMenuItemType.TEXT_DOCUMENT
            );
            setNewAsset(doc);
        }
    }, [itemType, state.event]);

    useEffect(() => {
        // Remove unsaved directory
        if (newAsset === null) {
            setItemType(undefined);
        }
    }, [newAsset]);

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
                <Desktop newAsset={newAsset} setNewAsset={setNewAsset} />
                <Taskbar />
            </MenuContext.Provider>
        </>
    );
}
