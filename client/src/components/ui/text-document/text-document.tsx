import { useEffect, useRef } from 'react';
import styles from './text-document.module.css';

interface Refs {
    title: HTMLDivElement | null;
    editor: HTMLDivElement | null;
}

export default function TextDocument(): JSX.Element {
    const ref = useRef<Refs>({
        title: null,
        editor: null,
    });
    const noEmit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onSave = (e: React.KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
            e.preventDefault();
            console.log(ref.current.editor!.innerHTML);
        }
    };

    useEffect(() => {
        const editor = ref.current.editor!;

        const callback = (entries: ResizeObserverEntry[]) => {
            const entry = entries[0].borderBoxSize[0];
            const width = entry.inlineSize;
            ref.current.title!.style.width = `${width}px`;
        };
        const observer = new ResizeObserver(callback);
        observer.observe(editor.parentElement!);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            className="font-mono w-[40rem] z-10"
            onContextMenu={noEmit}
            onClick={noEmit}
        >
            <div
                ref={(element) => (ref.current!.title = element)}
                className={`${styles.title} flex justify-between items-center py-2 px-4 font-bold`}
            >
                <span>Text Document</span>

                <button>
                    <img
                        className="w-3 h-3"
                        src="./public/images/close.png"
                        alt="Close text document"
                    />
                </button>
            </div>
            <div className=" h-[24rem] overflow-y-auto overflow-x-hidden resize bg-white">
                <div
                    ref={(element) => (ref.current!.editor = element)}
                    className={`${styles.notepad} p-1`}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onKeyDown={onSave}
                ></div>
            </div>
        </div>
    );
}
