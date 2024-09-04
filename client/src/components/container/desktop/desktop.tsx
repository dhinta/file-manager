import { MouseEvent, useContext, useState } from 'react';
import { MenuContext } from '../../../context/menu-context';
import {
    Asset,
    ContextMenuActionType,
    ContextMenuItemType,
    DESKTOP_CONTEXT_MENU_ITEMS,
} from '../../../models/context-menu';
import { isDirectory, isDocument } from '../../../utils/common';
import Bin from '../../ui/bin/bin';
import Dir from '../../ui/dir/dir';
import Document from '../../ui/document/document';

interface Props {
    newAsset: Asset | null;
    setNewAsset: React.Dispatch<React.SetStateAction<Asset | null>>;
}

// Temp DB
const ASSETS: Asset[] = [
    {
        type: ContextMenuItemType.NEW_FOLDER,
        position: {
            left: 200,
            top: 500,
        },
        parent: 'Desktop',
        name: 'My Folder',
    },
    {
        type: ContextMenuItemType.TEXT_DOCUMENT,
        position: {
            left: 700,
            top: 150,
        },
        parent: 'Desktop',
        name: 'My File',
    },
];

export default function Desktop({ newAsset, setNewAsset }: Props): JSX.Element {
    const { dispatch } = useContext(MenuContext);
    const [assets, setAssets] = useState<Asset[]>(ASSETS);

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

        if (newAsset) {
            setNewAsset(null);
        }
    };

    const saveAsset = (asset: Asset, assets: Asset[]): void => {
        const isNameExists = assets.some(({ name }) => name === asset.name);
        if (isNameExists) {
            asset.name = `${asset.name}-${Math.ceil(Math.random() * 100)}`;
            return saveAsset(asset, assets);
        }
        setNewAsset(null);
        setAssets((assets) => [...assets, asset]);
    };

    const newAssetPlaceholder = (asset: Asset | null): JSX.Element | null => {
        if (!asset) return null;
        if (asset.name !== '') return null;

        if (isDirectory(asset)) {
            return (
                <Dir
                    key="new_directory"
                    {...asset}
                    setDirName={(name) =>
                        saveAsset(
                            {
                                ...asset,
                                name,
                            },
                            assets
                        )
                    }
                />
            );
        }
        if (isDocument(asset)) {
            return (
                <Document
                    key="new_document"
                    {...asset}
                    setDocName={(name) =>
                        saveAsset(
                            {
                                ...asset,
                                name,
                            },
                            assets
                        )
                    }
                />
            );
        }

        return null;
    };

    const assetsTemplate = assets.map((dir) => {
        if (isDirectory(dir)) {
            return <Dir key={dir.name} {...dir} />;
        } else {
            return <Document key={dir.name} {...dir} />;
        }
    });

    console.log(newAsset);

    const newAssetTemplate = newAssetPlaceholder(newAsset);

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
                {/* <TextDocument /> */}
                {assetsTemplate}

                {newAssetTemplate}
            </div>
        </div>
    );
}
