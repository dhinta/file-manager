import { useEffect, useRef } from 'react';
import styles from './text-document.module.css';

export default function TextDocument(): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);
    const noEmit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onSave = (e: React.KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
            e.preventDefault();
            console.log(ref.current?.innerHTML);
        }
    };

    useEffect(() => {
        const editor = ref.current!;

        const callback = (entries: ResizeObserverEntry[]) => {
            const entry = entries[0].borderBoxSize[0];
            const width = entry.inlineSize;
            document.getElementById('text-document-title')!.style.width =
                `${width}px`;
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
                id="text-document-title"
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
                    ref={ref}
                    className={`${styles.notepad} p-1`}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onKeyDown={onSave}
                ></div>
            </div>
        </div>
    );
}
