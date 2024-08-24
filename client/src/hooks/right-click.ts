import { useEffect } from 'react';

export default function useRightClick(
    callback: (clientX: number, clientY: number) => void,
    element: HTMLElement = document.body
) {
    useEffect(() => {
        const handler = (event: MouseEvent) => {
            event.preventDefault();
            const { clientX, clientY } = event;

            callback(clientX, clientY);
        };

        element.addEventListener('contextmenu', handler);

        return () => element.removeEventListener('contextmenu', handler);
    }, [callback, element]);
}
