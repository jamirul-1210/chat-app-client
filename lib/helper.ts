// helper functions
export const isOnline = (lastSeen: Date): boolean => {
    const THREE_MINUTES_IN_MS = 3 * 60 * 1000; // 3 minutes in milliseconds
    const currentTime = new Date().getTime();
    const lastSeenTime = lastSeen.getTime();

    return currentTime - lastSeenTime <= THREE_MINUTES_IN_MS;
};


// get when last seen in areadable format like -- 2 minites ago
export function lastSeenFormat(date: Date): string {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();

    // Convert milliseconds to different units
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    } else {
        return `${diffInDays} days ago`;
    }
}



export const formatTo12HourTime = (data: string): string => {

    const date = new Date(data);
    // Check if the date is valid
    if (isNaN(date.getTime()))return " "; 
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    // Format minutes to always have two digits
    const minutesFormatted = (minutes < 10) ? `0${minutes}` : minutes;
    // console.log(minutesFormatted)
    return `${hours}:${minutesFormatted} ${ampm}`;
};