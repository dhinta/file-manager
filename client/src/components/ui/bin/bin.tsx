import { useEffect, useMemo } from 'react';

interface Props {
    type: 'full' | 'empty';
}

export default function Bin({ type = 'empty' }: Props): JSX.Element {
    const images = useMemo(
        () => ['/public/images/empty-bin.png', '/public/images/full-bin.png'],
        []
    );
    useEffect(() => {
        preLoadImages(images);
    }, [images]);

    return (
        <div className="w-16">
            <img
                src={`/public/images/${type}-bin.png`}
                alt="Windows Logo"
                width={'100%'}
            />
        </div>
    );
}

function preLoadImages(images: string[] = []): void {
    for (let i = 0; i < images.length; i++) {
        new Image().src = images[i];
    }
}
