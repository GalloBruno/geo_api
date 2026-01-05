export const getCountryFlag = ({ countryCode = '' }) => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    if (!countryCode) return '🏳'
    return String.fromCodePoint(...codePoints);
};