import { useState } from 'react';
import { createPortal } from 'react-dom';
import useRightClick from '../../../hooks/right-click';
import {
    ContextMenuStyles,
    DESKTOP_CONTEXT_MENU_ITEMS,
} from '../../../models/context-menu';
import Bin from '../../ui/bin/bin';
import ContextMenu from '../../ui/context-menu/context-menu';

export default function Desktop(): JSX.Element {
    const [styles, setStyles] = useState<ContextMenuStyles | null>(null);

    useRightClick((left, top) => {
        setStyles({ left: `${left}px`, top: `${top}px` });
    });

    const contextMenuPortal =
        styles &&
        createPortal(
            <ContextMenu
                items={[...DESKTOP_CONTEXT_MENU_ITEMS]}
                styles={styles}
                closeContextMenu={() => setStyles(null)}
            />,
            document.body
        );

    return (
        <>
            {contextMenuPortal}
            <div
                className="flex h-screen bg-center bg-cover p-4"
                style={{
                    backgroundImage: `url(public/images/windows-10-wallpaper.webp)`,
                }}
            >
                <Bin type="empty" />
            </div>
        </>
    );
}
