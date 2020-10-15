/**
 *
 * @param value
 * @returns {boolean}
 */

export function isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
}
