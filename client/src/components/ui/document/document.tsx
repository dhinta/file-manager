import { KeyboardEvent, ReactPortal, useState } from 'react';
import { createPortal } from 'react-dom';
import { Doc } from '../../../models/context-menu';
import { KeyCode } from '../../../models/key-code';
import { noEmit } from '../../../utils/common';
import TextDocument from '../text-document/text-document';

interface Props extends Doc {
    setDocName?: (name: string) => void;
}

export default function Document({
    name,
    position,
    setDocName = () => {},
}: Props) {
    const [isSelected, setIsSelected] = useState(false);
    const [docPortal, setDocPortal] = useState<ReactPortal | null>(null);
    const opacity = name ? 'opacity-100' : 'opacity-60';

    const saveDocName = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === KeyCode.ENTER) {
            noEmit(e);
            setDocName(e.currentTarget.value);
        }
    };

    const openFile = () => {
        setDocPortal(
            createPortal(
                <TextDocument name={name} onClose={() => setDocPortal(null)} />,
                document.body
            )
        );
    };

    const onEnterKeyPress = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === KeyCode.ENTER) {
            openFile();
        }
    };

    return (
        <>
            <div
                className={`w-14 flex justify-center items-center absolute`}
                style={position}
                onContextMenu={noEmit}
            >
                <button
                    className={`${isSelected ? 'bg-sky-400 text-slate-600' : 'text-white'} p-1`}
                    onClick={() => setIsSelected(true)}
                    onBlur={() => setIsSelected(false)}
                    onDoubleClick={openFile}
                    onKeyUp={onEnterKeyPress}
                >
                    <img
                        src={`/public/images/text-doc.png`}
                        alt="Folder"
                        className={`${opacity}`}
                    />
                    {name ? (
                        <div className="text-white text-xs mt-1">{name}</div>
                    ) : (
                        <input
                            type="text"
                            className="text-gray-900 border-none outline-none text-xs w-full"
                            autoFocus
                            onKeyUp={saveDocName}
                            onClick={noEmit}
                        />
                    )}
                </button>
            </div>

            {docPortal}
        </>
    );
}
