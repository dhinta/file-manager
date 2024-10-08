import { MouseEvent, useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from '../../../context/menu-context';
import useClock from '../../../hooks/clock';
import { ContextMenuActionType } from '../../../models/context-menu';
import { CurrentDateTime } from '../../../utils/common';
import BrightnessBar from '../brightness-bar/brightness-bar';
import styles from './taskbar.module.css';

export default function Taskbar(): JSX.Element {
    const [showBrightnessBar, setShowBrightnessBar] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState<CurrentDateTime>();
    const { dispatch } = useContext(MenuContext);
    const navigate = useNavigate();
    const onDateTimeChange = useCallback(
        ({ currentDate, currentTime }: CurrentDateTime) =>
            setCurrentDateTime({ currentDate, currentTime }),
        []
    );

    useClock(onDateTimeChange);

    const closeContextMenu = (e: MouseEvent) => {
        e.stopPropagation();
        dispatch({ type: ContextMenuActionType.CLICK, payload: { items: [] } });
    };

    const brightnessWindowPortal =
        showBrightnessBar &&
        createPortal(
            <BrightnessBar onClose={() => setShowBrightnessBar(false)} />,
            document.body
        );

    return (
        <>
            {brightnessWindowPortal}
            <div
                className="flex fixed w-full left-0 bottom-0 h-11 bg-cyan-950 justify-between"
                onClick={closeContextMenu}
                onContextMenu={closeContextMenu}
            >
                <div className="flex">
                    <button
                        className={`${styles.btn} ${styles.invert}`}
                        onClick={() => navigate('/')}
                    >
                        <img
                            id="icon"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHRSURBVFhH7ZbrKgVRFMePj5Lv7hG5PAtJoYQXOLkl4VEk3yiFkNuriE/KC7gUufP/rWbndJoze8/l4/zqF2udNWvWnLNnz1RKSlLSFf11/EbWUl9TCJ1yT35Y9E/cANTsyg6LCmBaPkpO9E6ihrgBqCH3ICdJ5GFF/kgansheWUvcAH3yVJL/lksyE1OSk+MyiRjiBnCsSnf8BIk08Js/SZrzLTQiaQBgCD6nV6o1wYLjwGOLGuMbANzPwcIMgqv/lG+yh0QCIQOwbliY3B3tJHysS5ruW5RMyABwKKlbs8jDlaSY289H6AAzkroLizzcS4q5nXyEDtAvqbuzyMOrpLjZomRCB6AXdS8WeXiWFLdaVAz0oie9vdxKigctKoYhSc8bizy4RThrUTHMS3peWuRhQVJ8YFExHEl6Vi3y0C3ZiNg8WL15GZBsQvQM3o53JBPzBMxDkzyX9NoiEQqTuneADRIZ2ZT0oFcbiTSMy69IGqWBK+cY3gc4flRmgvcAmnAVZ5Lf0wc17mvn5IsyF2PSvRuwMHmwzMlh2SLZZEaiHKvdvZJxTOYrr4fH6LZkJdM8SWpYcEGP3rTwrsC9zIZyLdlakf/J8Rk1JSWBVCp/uyqQefe2sLAAAAAASUVORK5CYII="
                        />
                    </button>
                    <button
                        className={`${styles.search} ${styles.btn} ${styles.btnBg}`}
                    ></button>
                </div>
                <div className="flex mr-8 justify-center">
                    <div
                        className={`${styles.linkedIn} mr-2 flex justify-center items-center`}
                    >
                        <a
                            href="https://www.linkedin.com/in/debasish-chowdhury"
                            target="_blank"
                            className="w-full h-full"
                            rel="noopener noreferrer"
                        ></a>
                    </div>

                    <div
                        className={`${styles.github} mr-1 flex justify-center items-center`}
                    >
                        <a
                            href="https://github.com/dhinta/file-manager"
                            target="_blank"
                            className="w-full h-full"
                            rel="noopener noreferrer"
                        ></a>
                    </div>

                    <button
                        onClick={() => setShowBrightnessBar((prev) => !prev)}
                        className={`${styles.brightness} ${styles.btn} ${styles.btnBg}`}
                    ></button>
                    {currentDateTime && (
                        <div className={`${styles.datetime} pt-1`}>
                            <span
                                className={`block text-white text-center ${styles.smallText}`}
                            >
                                {currentDateTime.currentTime}
                            </span>
                            <span
                                className={`block text-white text-center ${styles.smallText}`}
                            >
                                {currentDateTime.currentDate}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
