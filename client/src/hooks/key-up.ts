import { useEffect } from 'react';
import { KeyCode } from '../models/key-code';

export default function useKeyUp(
    code: KeyCode | KeyCode[],
    callback: () => void
) {
    useEffect(() => {
        const onKeyUp = (event: KeyboardEvent) => {
            if (isArray(code) && code.includes(<KeyCode>event.code)) {
                callback();
                return;
            }
            if (!isArray(code) && event.code === code) {
                callback();
            }
        };

        document.addEventListener('keyup', onKeyUp);

        return () => document.removeEventListener('keyup', onKeyUp);
    });
}

function isArray(code: KeyCode | KeyCode[]): code is KeyCode[] {
    return Array.isArray(code);
}
