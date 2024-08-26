import { MouseEvent, useContext, useEffect, useMemo } from 'react';
import { MenuContext } from '../../../context/menu-context';
import {
    BIN_CONTEXT_MENU_ITEMS,
    ContextMenuActionType,
} from '../../../models/context-menu';

interface Props {
    type: 'full' | 'empty';
}

export default function Bin({ type = 'empty' }: Props): JSX.Element {
    const { dispatch } = useContext(MenuContext);
    const images = useMemo(
        () => ['/public/images/empty-bin.png', '/public/images/full-bin.png'],
        []
    );

    useEffect(() => {
        preLoadImages(images);
    }, [images]);

    const onBinRightClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
            type: ContextMenuActionType.RIGHT_CLICK,
            payload: {
                event: {
                    left: e.clientX,
                    top: e.clientY,
                },
                items: [...BIN_CONTEXT_MENU_ITEMS],
            },
        });
    };

    const onClick = () => {
        dispatch({
            type: ContextMenuActionType.CLICK,
            payload: { items: [] },
        });
    };

    return (
        <div className="w-12" onContextMenu={onBinRightClick} onClick={onClick}>
            <a href="#">
                <img src={`/public/images/${type}-bin.png`} width={'100%'} />
            </a>
        </div>
    );
}

function preLoadImages(images: string[] = []): void {
    for (let i = 0; i < images.length; i++) {
        new Image().src = images[i];
    }
}
