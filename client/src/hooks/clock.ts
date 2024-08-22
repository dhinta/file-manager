import { useEffect } from 'react';
import {
    CurrentDateTime,
    DateFormat,
    getCurrentDateTime,
} from '../utils/common';

type timeChangeFn = (data: CurrentDateTime) => void;
export default function useClock(
    onTimeChange: timeChangeFn,
    format: DateFormat = 'short'
) {
    useEffect(() => {
        const sec = 60 - new Date().getSeconds();
        // First time
        onTimeChange(getCurrentDateTime(format));

        let interval = 0;
        // First interval - to be sync with system clock
        const initialInterval = initInterval(sec, () => {
            // Change date/time then clear first interval
            onTimeChange(getCurrentDateTime(format));
            clearInterval(initialInterval);

            // Now our clock is sync with system clock, run regular 60 seconds interval
            interval = initInterval(60, () =>
                onTimeChange(getCurrentDateTime(format))
            );
        });

        return () => clearInterval(interval);
    }, [onTimeChange, format]);
}

const initInterval = (time: number = 60, callback: () => void): number => {
    return setInterval(() => callback(), time * 1000);
};
