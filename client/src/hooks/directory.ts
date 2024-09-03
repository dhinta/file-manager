import { useCallback } from 'react';
import {
    ContextMenuClientRect,
    ContextMenuItemType,
    Directory,
} from '../models/context-menu';

interface DirectoryActions {
    create: (event: ContextMenuClientRect, parent?: string) => Directory;
    remove: () => void;
    rename: () => void;
}

export default function useDirectory(): DirectoryActions {
    const create = useCallback(
        (event: ContextMenuClientRect, parent = 'Desktop'): Directory => {
            const dir = {
                type: ContextMenuItemType.NEW_FOLDER,
                position: {
                    left: event.left,
                    top: event.top,
                },
                parent,
                dirName: '',
            };

            // dispatch({
            //     type: ContextMenuActionType.CLICK,
            //     payload: {
            //         items: [],
            //     },
            // });

            return dir;
        },
        []
    );

    return {
        create,
        remove() {},
        rename() {},
    };
}
