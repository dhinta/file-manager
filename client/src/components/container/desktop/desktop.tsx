import Bin from '../../ui/bin/bin';

export default function Desktop(): JSX.Element {
    return (
        <div
            className="flex h-screen bg-center bg-cover p-4"
            style={{
                backgroundImage: `url(public/images/windows-10-wallpaper.webp)`,
            }}
        >
            <Bin type="empty" />
        </div>
    );
}
