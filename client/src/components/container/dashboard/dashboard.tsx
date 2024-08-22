import Taskbar from '../../ui/taskbar/taskbar';

export default function Dashboard(): JSX.Element {
    return (
        <>
            <div
                className="flex h-screen bg-center bg-cover"
                style={{
                    backgroundImage: `url(public/images/windows-10-wallpaper.webp)`,
                }}
            ></div>

            <Taskbar />
        </>
    );
}
