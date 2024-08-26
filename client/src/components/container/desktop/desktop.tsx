import { MouseEvent, useContext, useRef } from 'react';
import { MenuContext } from '../../../context/menu-context';
import {
    ContextMenuActionType,
    DESKTOP_CONTEXT_MENU_ITEMS,
} from '../../../models/context-menu';
import Bin from '../../ui/bin/bin';

export default function Desktop(): JSX.Element {
    const ref = useRef<HTMLElement>()!;
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
        <>
            <div
                ref={ref as React.RefObject<HTMLDivElement>}
                className="h-screen bg-center bg-cover p-4"
                style={{
                    backgroundImage: `url(public/images/windows-10-wallpaper.webp)`,
                }}
                onContextMenu={onDesktopRightClick}
                onClick={onDesktopClick}
            >
                <div className="inline-flex">
                    <Bin type="empty" />
                </div>
            </div>
        </>
    );
}
