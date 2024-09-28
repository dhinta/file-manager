import { useEffect, useRef } from 'react';
import { noEmit } from '../../../utils/common';
import styles from './text-document.module.css';

interface Props {
    name: string;
    onClose: () => void;
}

interface Refs {
    title: HTMLDivElement | null;
    editor: HTMLDivElement | null;
}

export default function TextDocument({ name, onClose }: Props): JSX.Element {
    const ref = useRef<Refs>({
        title: null,
        editor: null,
    });

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
            className="font-mono w-[40rem] z-10 fixed top-20 left-20"
            onContextMenu={noEmit}
            onClick={noEmit}
        >
            <div
                ref={(element) => (ref.current!.title = element)}
                className={`${styles.title} flex justify-between items-center py-2 px-4 font-bold`}
            >
                <span>{name}</span>

                <button onClick={onClose}>
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
