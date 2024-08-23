import { useEffect } from 'react';

export default function useRightClick(
    callback: (clientX: number, clientY: number) => void
) {
    useEffect(() => {
        const handler = (event: MouseEvent) => {
            event.preventDefault();
            const { clientX, clientY } = event;

            callback(clientX, clientY);
        };
        document.addEventListener('contextmenu', handler);

        return () => document.removeEventListener('contextmenu', handler);
    }, [callback]);
}
