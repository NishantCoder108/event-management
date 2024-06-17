export const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
        const hrTime = `${hours}h`;

        const timeLeft = remainingMinutes === 0 ? "" : remainingMinutes + "min";
        return hrTime + timeLeft;
    } else if (minutes > 0) {
        const miTime = `${minutes}h`;

        const timeLeft = remainingSeconds === 0 ? "" : remainingSeconds + "sec";
        return miTime + timeLeft;
    } else {
        return `${seconds}sec`;
    }
};
