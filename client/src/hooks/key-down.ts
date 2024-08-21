import { KeyCode } from '../models/key-code';

export default function useKeyDown(
    code: KeyCode | KeyCode[],
    callback: () => void
) {
    const onKeyDown = (event: KeyboardEvent) => {
        if (isArray(code) && code.includes(<KeyCode>event.code)) {
            callback();
            return;
        }
        if (!isArray(code) && event.code === code) {
            callback();
        }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
}

function isArray(code: KeyCode | KeyCode[]): code is KeyCode[] {
    return Array.isArray(code);
}
