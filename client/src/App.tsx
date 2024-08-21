import { useState } from 'react';
import './App.css';
import { Login } from './components/container/login/login';
import { DateTime } from './components/ui/date-time/date-time';
import useKeyDown from './hooks/key-down';
import { KeyCode } from './models/key-code';

function App() {
    const [showLogin, setShowLogin] = useState(false);
    useKeyDown(KeyCode.ESC, () => setShowLogin(false));
    useKeyDown([KeyCode.SPACE, KeyCode.ENTER], () => setShowLogin(true));

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

export default App;
