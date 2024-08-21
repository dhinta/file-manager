interface SessionStorage {
    set(key: string, val: string): void;
    get(key: string): string;
}

export default function useSessionStorage(): SessionStorage {
    return {
        set(key: string, value: string) {
            sessionStorage.setItem(key, value);
        },
        get(key: string): string {
            return sessionStorage.getItem(key) || '';
        },
    };
}
