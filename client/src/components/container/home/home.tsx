import { useEffect, useState } from 'react';
import useKeyUp from '../../../hooks/key-up';
import { KeyCode } from '../../../models/key-code';
import { DateTime } from '../../ui/date-time/date-time';
import { Login } from '../login/login';
import './home.css';

interface BackgroundScreen {
    file: string;
    text: string;
}

export default function Home(): JSX.Element | null {
    const [showLogin, setShowLogin] = useState(false);
    const [backgroundScreen, setBackgroundScreen] =
        useState<BackgroundScreen | null>(null);
    useKeyUp(KeyCode.ESC, () => setShowLogin(false));
    useKeyUp([KeyCode.SPACE, KeyCode.ENTER], () => setShowLogin(true));

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetch('http://localhost:3000/api/screens');
                const response: BackgroundScreen = await data.json();
                console.log(response);

                setBackgroundScreen(response);
            } catch (error: unknown) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchData();
    }, []);

    return backgroundScreen ? (
        <div
            className={`background ${showLogin ? 'active' : ''}`}
            onClick={() => setShowLogin(true)}
        >
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(/public/images/lock-screens/${backgroundScreen.file})`,
                }}
            ></div>

            {!showLogin && <DateTime />}

            <div className={`background-info ${showLogin ? 'hide' : ''}`}>
                Background: {backgroundScreen.text}
            </div>

            {showLogin && <Login />}
        </div>
    ) : null;
}
