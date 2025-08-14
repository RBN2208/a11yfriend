import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {WCAGCriterias} from "@/staticData/criteria";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Retrieves a filtered list of WCAG criteria based on the selected conformance level.
 *
 * @param {string} conformanceLevel - The selected conformance level ('A', 'AA', or 'AAA').
 * @param {any[]} [data] - An optional array of criteria data to filter. If not provided, a default set of criteria is used.
 * @return {any[]} A filtered array of criteria matching the specified conformance level.
 */
export function getCriteriasForSelectedConformanceLevel(conformanceLevel: string, data?: any[]) {
  const toFilter = (data && data.length) ? data : WCAGCriterias;
  return toFilter.filter(criteria => {
    if (conformanceLevel === 'A') {
      return criteria.conformance === 'A';
    } else if (conformanceLevel === 'AA') {
      return criteria.conformance === 'A' || criteria.conformance === 'AA';
    } else if (conformanceLevel === 'AAA') {
      return true;
    }
    return false;
  })
}


/**
 * Retrieves the error message from an Error object, or returns a fallback message if the provided value is not an Error.
 *
 * @param {unknown} error - The error object or unknown value to retrieve the message from.
 * @param {string} fallback - The fallback message to use if the provided value is not an Error object.
 * @return {string} The error message if the value is an Error object, otherwise the fallback message.
 */
export function getErrorOfUnknownError(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}