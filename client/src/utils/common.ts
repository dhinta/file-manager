export type DateFormat = 'long' | 'short';
export interface CurrentDateTime {
    currentDate: string;
    currentTime: string;
}

export function getInitials(name: string): string {
    const nameArr = name.split(' ');
    if (nameArr.length > 1) {
        return (
            nameArr[0].charAt(0).toUpperCase() +
            nameArr[1].charAt(0).toUpperCase()
        );
    } else {
        return nameArr[0].slice(0, 2).toUpperCase();
    }
}

export function getCurrentTime(): string {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export function getCurrentDate(format: DateFormat = 'short'): string {
    if (format === 'long') return getLongDate();

    return getShortDate();
}

export function getCurrentDateTime(
    format: DateFormat = 'short'
): CurrentDateTime {
    return {
        currentDate: getCurrentDate(format),
        currentTime: getCurrentTime(),
    };
}

export function getLongDate() {
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const day = days[new Date().getDay()];

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const month = months[new Date().getMonth()];

    return `${day}, ${month} ${new Date().getDate()}`;
}

export function getShortDate() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${month}-${day}-${year}`;
}
