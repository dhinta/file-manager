import { useCallback, useState } from 'react';
import useClock from '../../../hooks/clock';
import { CurrentDateTime } from '../../../utils/common';
import styles from './date-time.module.css';

export function DateTime(): JSX.Element {
    const [currentDateTime, setCurrentDateTime] =
        useState<CurrentDateTime | null>(null);

    const onClockTick = useCallback(
        ({ currentDate, currentTime }: CurrentDateTime) => {
            setCurrentDateTime({ currentDate, currentTime });
        },
        []
    );

    useClock(onClockTick, 'long');

    return (
        <>
            {currentDateTime && (
                <div className={styles.time}>
                    <div className={styles.clock}>
                        {currentDateTime.currentTime}
                    </div>
                    <div className={styles.date}>
                        {currentDateTime.currentDate}
                    </div>
                </div>
            )}
        </>
    );
}
