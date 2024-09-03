import { useLayoutEffect, useRef, useState } from 'react';
import {
    ContextMenuClientRect,
    ContextMenuItemType,
    ContextMenuState,
} from '../../../models/context-menu';

interface Props extends ContextMenuState {
    action: (type: ContextMenuItemType) => void;
}

export default function ContextMenu({
    event,
    items,
    action,
}: Props): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<ContextMenuClientRect>(event);

    useLayoutEffect(() => {
        if (ref.current && event) {
            const pos = adjustOnViewPort(
                ref.current?.getBoundingClientRect(),
                event
            );
            setPosition(pos);
        }
    }, [event]);

    return (
        <div
            ref={ref}
            className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${position ? '' : 'hidden'} `}
            style={position || {}}
        >
            <ul
                className="flex flex-col justify-start py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
            >
                {items.map((item, index) => (
                    <li key={index}>
                        <button
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                            onClick={() => action(item.type)}
                        >
                            {item.text}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function adjustOnViewPort(
    rect: DOMRect,
    styles: ContextMenuClientRect
): ContextMenuClientRect {
    let top = Number(styles.top);
    let left = Number(styles.left);

    const hasExceedBottomBoundary = top + rect.height > window.innerHeight;
    const hasExceedRightBoundary = left + rect.width > window.innerWidth;

    if (hasExceedBottomBoundary) {
        top = top - rect.height;
    }
    if (hasExceedRightBoundary) {
        left = left - rect.width;
    }

    return { top, left };
}
