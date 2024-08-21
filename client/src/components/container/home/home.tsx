import { useState } from 'react';
import useKeyUp from '../../../hooks/key-up';
import { KeyCode } from '../../../models/key-code';
import { DateTime } from '../../ui/date-time/date-time';
import { Login } from '../login/login';
import './home.css';

export default function Home(): JSX.Element {
    const [showLogin, setShowLogin] = useState(false);
    useKeyUp(KeyCode.ESC, () => setShowLogin(false));
    useKeyUp([KeyCode.SPACE, KeyCode.ENTER], () => setShowLogin(true));

    return (
        <div
            className={`background ${showLogin ? 'active' : ''}`}
            onClick={() => setShowLogin(true)}
        >
            <div className="background-image"></div>

            {!showLogin && <DateTime />}

            <div className={`background-info ${showLogin ? 'hide' : ''}`}>
                <a href="https://support.microsoft.com/en-us/help/18826/natural-wonders-wallpaper">
                    Background: Dolomites at Sunrise (Italy)
                </a>
            </div>

            {showLogin && <Login />}
        </div>
    );
}
