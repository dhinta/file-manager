export interface ContextMenuClientRect {
    left: number;
    top: number;
}

export enum ContextMenuActionType {
    CLICK = 'click',
    RIGHT_CLICK = 'contextmenu',
}

export interface ContextMenuAction {
    type: ContextMenuActionType;
    payload: Partial<ContextMenuState>;
}

export interface ContextMenuState {
    event: ContextMenuClientRect;
    items: ContextMenuItem[];
}

export enum ContextMenuItemType {
    NEW_FILE = 'New File',
    NEW_FOLDER = 'New Folder',
    CHANGE_BACKGROUND = 'Change Background',
    OPEN = 'Open',
    EMPTY_BIN = 'Empty Bin',
    RESTORE = 'Restore items',
}

export interface ContextMenuItem {
    text: string;
    type: ContextMenuItemType;
}

export const DESKTOP_CONTEXT_MENU_ITEMS: ContextMenuItem[] = [
    {
        text: 'New File',
        type: ContextMenuItemType.NEW_FILE,
    },
    {
        text: 'New Folder',
        type: ContextMenuItemType.NEW_FOLDER,
    },
    {
        text: 'Change Background',
        type: ContextMenuItemType.CHANGE_BACKGROUND,
    },
];

export const BIN_CONTEXT_MENU_ITEMS: ContextMenuItem[] = [
    {
        text: 'Open',
        type: ContextMenuItemType.OPEN,
    },
    {
        text: 'Empty Bin',
        type: ContextMenuItemType.EMPTY_BIN,
    },
    {
        text: 'Restore items',
        type: ContextMenuItemType.RESTORE,
    },
];
