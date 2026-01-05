/**
 * Browser Environment Check
 * 
 * Checks if code is running in a browser environment (where navigator is defined).
 * Useful for preventing errors when accessing browser-only APIs in server-side code.
 * 
 * @param {*} fx - Value to return if running in browser
 * @returns {*|null} The value if in browser, null if in Node.js
 * 
 * @example
 * const language = checkIfUndefined(navigator.language);
 * // In browser: returns navigator.language
 * // In Node.js: returns null
 */
export const checkIfUndefined = (fx) => {
  return typeof navigator !== 'undefined' ? fx : null
}
