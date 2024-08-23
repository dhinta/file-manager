export interface ContextMenuStyles {
    left: string;
    top: string;
}

export interface ContextMenuItem {
    text: string;
    onSelect: () => void;
}

export interface ContextMenuProps {
    styles: ContextMenuStyles | null;
    items: ContextMenuItem[];
    closeContextMenu: () => void;
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
