import { MouseEvent, useContext } from 'react';
import { MenuContext } from '../../../context/menu-context';
import {
    ContextMenuActionType,
    DESKTOP_CONTEXT_MENU_ITEMS,
} from '../../../models/context-menu';
import Bin from '../../ui/bin/bin';
import Dir from '../../ui/dir/dir';

export default function Desktop(): JSX.Element {
    const { dispatch } = useContext(MenuContext);

    const onDesktopRightClick = (e: MouseEvent) => {
        e.preventDefault();
        dispatch({
            type: ContextMenuActionType.RIGHT_CLICK,
            payload: {
                event: {
                    left: e.clientX,
                    top: e.clientY,
                },
                items: [...DESKTOP_CONTEXT_MENU_ITEMS],
            },
        });
    };

    const onDesktopClick = () => {
        dispatch({
            type: ContextMenuActionType.CLICK,
            payload: {
                items: [],
            },
        });
    };

    return (
        <div
            className="h-screen bg-center bg-cover p-4"
            style={{
                backgroundImage: `url(public/images/windows-10-wallpaper.webp)`,
            }}
            onContextMenu={onDesktopRightClick}
            onClick={onDesktopClick}
        >
            <div className="inline-flex flex-col gap-8">
                <Bin type="empty" />
                <Dir />
            </div>
        </div>
    );
}
