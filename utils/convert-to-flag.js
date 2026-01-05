/**
 * Country Code to Emoji Flag Converter
 * 
 * Converts ISO 3166-1 alpha-2 country codes to emoji flags.
 * Uses Unicode regional indicator symbols (U+1F1E6 to U+1F1FF).
 * 
 * @param {Object} options - Options object
 * @param {string} options.countryCode - ISO 3166-1 alpha-2 country code (e.g., "AR", "US")
 * @returns {string} Emoji flag or white flag if code is invalid
 * 
 * @example
 * getCountryFlag({ countryCode: "AR" }) // Returns: 🇦🇷
 * getCountryFlag({ countryCode: "US" }) // Returns: 🇺🇸
 * getCountryFlag({ countryCode: "" })   // Returns: 🏳
 */
export const getCountryFlag = ({ countryCode = '' }) => {
    // Convert each letter to its regional indicator symbol
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());

    // Return white flag if no country code provided
    if (!countryCode) return '🏳'

    return String.fromCodePoint(...codePoints);
};