import { MouseEvent, useContext, useState } from 'react';
import { MenuContext } from '../../../context/menu-context';
import {
    ContextMenuActionType,
    ContextMenuItemType,
    DESKTOP_CONTEXT_MENU_ITEMS,
    Directory,
} from '../../../models/context-menu';
import Bin from '../../ui/bin/bin';
import Dir from '../../ui/dir/dir';

interface Props {
    // itemType?: ContextMenuItemType;
    // setItemType: React.Dispatch<
    //     React.SetStateAction<ContextMenuItemType | undefined>
    // >;
    newDir: Directory | null;
    setNewDir: React.Dispatch<React.SetStateAction<Directory | null>>;
}

// Temp DB
const DIRECTORIES: Directory[] = [
    {
        type: ContextMenuItemType.NEW_FOLDER,
        position: {
            left: 200,
            top: 500,
        },
        parent: 'Desktop',
        dirName: 'My file',
    },
    {
        type: ContextMenuItemType.NEW_FOLDER,
        position: {
            left: 700,
            top: 150,
        },
        parent: 'Desktop',
        dirName: 'Your Folder',
    },
];

export default function Desktop({ newDir, setNewDir }: Props): JSX.Element {
    const { dispatch } = useContext(MenuContext);
    const [directories, setDirectories] = useState<Directory[]>(DIRECTORIES);

    const onDesktopRightClick = (e: MouseEvent) => {
        e.preventDefault();
        dispatch({
            type: ContextMenuActionType.RIGHT_CLICK,
            payload: {
                event: {
                    left: e.clientX,
                    top: e.clientY,
                },
                items: [...DESKTOP_CONTEXT_MENU_ITEMS],
            },
        });
    };

    const onDesktopClick = () => {
        dispatch({
            type: ContextMenuActionType.CLICK,
            payload: {
                items: [],
            },
        });

        if (newDir) {
            setNewDir(null);
        }
    };

    const saveDirectory = (dir: Directory) => {
        setNewDir(null);
        setDirectories((dirs) => [...dirs, dir]);
    };

    const directoriesTemplate = directories
        .filter(({ type }) => type === ContextMenuItemType.NEW_FOLDER)
        .map((dir) => <Dir key={dir.dirName} {...dir} />);

    const newDirectoryTemplate = newDir && !newDir.dirName && (
        <Dir
            key={newDir.dirName}
            {...newDir}
            setDirName={(dirName) =>
                saveDirectory({
                    ...newDir,
                    dirName,
                })
            }
        />
    );

    return (
        <div
            className="h-screen bg-center bg-cover p-4 relative"
            style={{
                backgroundImage: `url(public/images/windows-10-wallpaper.webp)`,
            }}
            onContextMenu={onDesktopRightClick}
            onClick={onDesktopClick}
        >
            <div className="inline-flex flex-col gap-8">
                <Bin type="empty" />
                {directoriesTemplate}
                {newDirectoryTemplate}
            </div>
        </div>
    );
}
