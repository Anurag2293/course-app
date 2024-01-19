import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatDate(dateTime: Date) {
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1; // Months are zero-based
    const year = dateTime.getFullYear();
	const stringDay = day < 10 ? "0" + day : day;
	const stringMonth = month < 10 ? '0' + month : month

    return stringDay + '/' + stringMonth + '/' + year;
}

export function toEpochSeconds(date: Date) {
    return Math.floor(date.getTime() / 1000);
}

export function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export function capitalizeSentence(sentence: string) {
    return sentence
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}