import { KeyboardEvent, useState } from 'react';
import { Directory } from '../../../models/context-menu';
import { KeyCode } from '../../../models/key-code';

interface Props extends Directory {
    setDirName?: (name: string) => void;
}

export default function Dir({ name, position, setDirName = () => {} }: Props) {
    const [selected, setSelected] = useState(false);
    const opacity = name ? 'opacity-100' : 'opacity-60';

    const saveDirName = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === KeyCode.ENTER) {
            setDirName(e.currentTarget.value);
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
                className={`${selected ? 'bg-sky-400 text-slate-600' : 'text-white'} px-1`}
                onClick={() => setSelected(true)}
                onBlur={() => setSelected(false)}
            >
                <img
                    src={`/public/images/folder.png`}
                    alt="Folder"
                    className={`${opacity}`}
                />
                {name ? (
                    <div className="text-xs mt-1">{name}</div>
                ) : (
                    <input
                        type="text"
                        className="text-gray-900 border-none outline-none text-xs w-full"
                        autoFocus
                        onKeyUp={saveDirName}
                        onClick={(e) => e.stopPropagation()}
                    />
                )}
            </button>
        </div>
    );
}
