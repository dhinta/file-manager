import Taskbar from '../../ui/taskbar/taskbar';
import Desktop from '../desktop/desktop';

export default function Dashboard(): JSX.Element {
    return (
        <>
            <Desktop />
            <Taskbar />
        </>
    );
}
