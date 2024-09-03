import { KeyboardEvent } from 'react';
import { Doc } from '../../../models/context-menu';
import { KeyCode } from '../../../models/key-code';

interface Props extends Doc {
    setDocName?: (name: string) => void;
}

export default function Document({
    docName,
    position,
    setDocName = () => {},
}: Props) {
    const opacity = docName ? 'opacity-100' : 'opacity-60';

    const saveDocName = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === KeyCode.ENTER) {
            setDocName(e.currentTarget.value);
        }
    };

    return (
        <div
            className={`w-12 flex justify-center items-center absolute`}
            style={position}
            onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <button>
                <img
                    src={`/public/images/text-doc.png`}
                    alt="Folder"
                    className={`${opacity}`}
                />
                {docName ? (
                    <div className="text-white text-xs mt-1">{docName}</div>
                ) : (
                    <input
                        type="text"
                        className="text-gray-900 border-none outline-none text-xs w-full"
                        autoFocus
                        onKeyUp={saveDocName}
                    />
                )}
            </button>
        </div>
    );
}
