import { KeyboardEvent, useState } from 'react';
import { KeyCode } from '../../../models/key-code';

interface Props {
    name?: string;
}

export default function Dir({ name = '' }: Props) {
    const [dirName, setDirName] = useState(name);
    const opacity = dirName ? 'opacity-100' : 'opacity-60';

    const saveDirName = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === KeyCode.ENTER) {
            setDirName(e.currentTarget.value);
        }
    };

    return (
        <div
            className={`w-12 flex justify-center items-center`}
            onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <button>
                <img
                    src={`/public/images/folder.png`}
                    alt="Folder"
                    className={`${opacity}`}
                />
                {dirName ? (
                    <div className="text-white text-xs mt-1">{dirName}</div>
                ) : (
                    <input
                        type="text"
                        className="text-gray-900 border-none outline-none text-xs w-full"
                        autoFocus
                        onKeyUp={saveDirName}
                    />
                )}
            </button>
        </div>
    );
}
