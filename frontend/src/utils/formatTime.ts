export const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const remainingSeconds = totalSeconds % 60;

    if (hours > 0) {
        return remainingMinutes > 0
            ? `${hours}h ${remainingMinutes}min`
            : `${hours}h`;
    } else if (totalMinutes > 0) {
        return remainingSeconds > 0
            ? `${totalMinutes}min ${remainingSeconds}sec`
            : `${totalMinutes}min`;
    } else {
        return `${totalSeconds}sec`;
    }
};
