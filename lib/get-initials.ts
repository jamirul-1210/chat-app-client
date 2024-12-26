export function getInitials(name: string): string {    
    return name
    ?.split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase();
}