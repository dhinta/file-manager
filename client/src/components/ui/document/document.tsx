import { KeyboardEvent, useState } from 'react';
import { Doc } from '../../../models/context-menu';
import { KeyCode } from '../../../models/key-code';

interface Props extends Doc {
    setDocName?: (name: string) => void;
}

export default function Document({
    name,
    position,
    setDocName = () => {},
}: Props) {
    const [selected, setSelected] = useState(false);
    const opacity = name ? 'opacity-100' : 'opacity-60';

    const saveDocName = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === KeyCode.ENTER) {
            setDocName(e.currentTarget.value);
        }
    };

    return (
        <div
            className={`w-14 flex justify-center items-center absolute`}
            style={position}
            onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <button
                className={`${selected ? 'bg-sky-400 text-slate-600' : 'text-white'} p-1`}
                onClick={() => setSelected(true)}
                onBlur={() => setSelected(false)}
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
                        onClick={(e) => e.stopPropagation()}
                    />
                )}
            </button>
        </div>
    );
}
