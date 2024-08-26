import { createContext } from 'react';
import {
    ContextMenuAction,
    ContextMenuActionType,
    ContextMenuClientRect,
    ContextMenuState,
} from '../models/context-menu';

type MenuContextType = {
    state: ContextMenuState;
    dispatch: React.Dispatch<ContextMenuAction>;
};

export const initialState: ContextMenuState = {
    event: {} as ContextMenuClientRect,
    items: [],
};

export const MenuContext = createContext<MenuContextType>({
    state: initialState,
    dispatch: () => {},
});

export function reducer(
    state: ContextMenuState,
    action: ContextMenuAction
): ContextMenuState {
    switch (action.type) {
        case ContextMenuActionType.RIGHT_CLICK:
            return { ...state, ...action.payload };
        case ContextMenuActionType.CLICK:
            return { ...state, items: [] };
        default:
            return { ...state };
    }
}
