import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Retrieves the error message from an Error object, or returns a fallback message if the provided value is not an Error.
 *
 * @param {unknown} error - The error object or unknown value to retrieve the message from.
 * @param {string} fallback - The fallback message to use if the provided value is not an Error object.
 * @return {string} The error message if the value is an Error object, otherwise the fallback message.
 */
export function getErrorOfUnknownError(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}
