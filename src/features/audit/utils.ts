import {WCAGCriterias} from "@/shared/staticData/audit/criteria";

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
