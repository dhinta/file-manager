import { useState } from 'react';
import useKeyUp from '../../../hooks/key-up';
import { KeyCode } from '../../../models/key-code';
import styles from './brightness-bar.module.css';

interface Props {
    onClose: () => void;
}

export default function BrightnessBar({ onClose }: Props): JSX.Element {
    const [brightness, setBrightness] = useState(100);

    useKeyUp(KeyCode.ESC, onClose);

    document.body.style.opacity = brightness / 100 + '';

    return (
        <div className="flex fixed bottom-11 right-0 bg-sky-900 w-96 py-6">
            <div className="flex w-full justify-center items-center">
                <div className={styles.brightnessIcon}></div>
                <input
                    type="range"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-2/3 h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"
                />
                <div className="text-white text-xs ml-3 w-5">{brightness}%</div>
            </div>
        </div>
    );
}
