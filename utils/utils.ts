export const getInitials = (name?: string) => {
    if (!name) return "";

    const words = name.trim().split(/\s+/); // Split the name by multiple spaces
    if (words.length === 1) {
        // If there is only one word, take the first 2 letters
        return words[0].slice(0, 2).toUpperCase();
    }

    // Take the first letter of the first and second name
    return (words[0][0] + words[1][0]).toUpperCase();
};

export const formatDate = (date: string): string => {
    const parts = date.split('/'); // Split the date into parts [dd, mm, yyyy]

    if (parts.length === 3) {
        let [day, month, year] = parts;
        day = day.padStart(2, '0');
        month = month.padStart(2, '0');
        return `${year}/${month}/${day}`; // Reorganize in 'yyyy/mm/dd' format
    }

    return date; // If the date doesn't have the expected format, return the original value
};

export const formatToTwoDecimals = (value: string): string => {
    // Convert the string to a number, removing commas if any
    const number = parseFloat(value.replace(/,/g, ''));

    if (isNaN(number)) return '0.00'; // If the value is not a valid number, return '0.00'

    // Format the number with two decimals
    return number.toFixed(2);
};
