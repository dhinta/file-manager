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
    payload?: Partial<ContextMenuState>;
}

export interface ContextMenuState {
    event: ContextMenuClientRect;
    items: ContextMenuItem[];
}

export enum ContextMenuItemType {
    TEXT_DOCUMENT = 'New Text Document',
    NEW_FOLDER = 'New Folder',
    CHANGE_BACKGROUND = 'Change Background',
    OPEN = 'Open',
    EMPTY_BIN = 'Empty Bin',
    RESTORE = 'Restore items',
    SHORT_CUT = 'Shortcut',
}

export enum AssetType {
    DIRECTORY = 'Directory',
    DOCUMENT = 'Document',
}

export interface ContextMenuItem {
    text: string;
    type: ContextMenuItemType;
}

export interface AssetDetails {
    position: ContextMenuClientRect;
    parent: string;
    name: string;
}

export interface Directory extends AssetDetails {
    type: ContextMenuItemType.NEW_FOLDER;
}

export interface Doc extends AssetDetails {
    type: ContextMenuItemType.TEXT_DOCUMENT;
}

export type Asset = Doc | Directory;

export const DESKTOP_CONTEXT_MENU_ITEMS: ContextMenuItem[] = [
    {
        text: 'New Text Document',
        type: ContextMenuItemType.TEXT_DOCUMENT,
    },
    {
        text: 'New Folder',
        type: ContextMenuItemType.NEW_FOLDER,
    },
    {
        text: 'New Shortcut',
        type: ContextMenuItemType.SHORT_CUT,
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
