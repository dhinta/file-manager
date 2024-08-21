export function getInitials(name: string): string {
    // Debasish Chowdhury => DC
    // Debasish => DE

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
