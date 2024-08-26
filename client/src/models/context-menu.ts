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

export interface ContextMenuItem {
    text: string;
    onSelect: () => void;
}

export interface ContextMenuProps {
    styles: ContextMenuClientRect;
    items: ContextMenuItem[];
}

export interface ContextMenuState {
    event: ContextMenuClientRect;
    items: ContextMenuItem[];
}

export const DESKTOP_CONTEXT_MENU_ITEMS: ContextMenuItem[] = [
    {
        text: 'New File',
        onSelect: () => {
            console.log('New file');
        },
    },
    {
        text: 'New Folder',
        onSelect: () => {
            console.log('New Folder');
        },
    },
    {
        text: 'Change Background',
        onSelect: () => {
            console.log('Change Background');
        },
    },
];

export const BIN_CONTEXT_MENU_ITEMS: ContextMenuItem[] = [
    {
        text: 'Empty Bin',
        onSelect: () => {
            console.log('Empty Bin');
        },
    },
];
