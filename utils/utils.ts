export const getInitials = (name?: string) => {
    if (!name) return "";

    const words = name.trim().split(/\s+/); // Divide el nombre por espacios múltiples
    if (words.length === 1) {
        // Si solo hay una palabra, tomar las primeras 2 letras
        return words[0].slice(0, 2).toUpperCase();
    }

    // Tomar la primera letra del primer y segundo nombre
    return (words[0][0] + words[1][0]).toUpperCase();
};

export function formatCurrency(value: number | string, currency: string, returnType: "symbol" | "name", currencyNames: Record<string, string>): string {
    const currencySymbols: Record<string, string> = {
        "320": "₡",
        "840": "$",
        "978": "€",
        "826": "£",
        "484": "MX$",
        "392": "¥",
    };

    if (returnType === "symbol") {
        return `${currencySymbols[currency] || currency}${value.toLocaleString()}`;
    } else {
        return currencyNames[currency] || "Unknown";
    }
}

export const formatDate = (date: string): string => {
    const parts = date.split('/'); // Separa la fecha en partes [dd, mm, yyyy]

    if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}/${month}/${day}`; // Reorganiza en formato 'yyyy/mm/dd'
    }

    return date; // Si la fecha no tiene el formato esperado, retorna el valor original
};

export const formatToTwoDecimals = (value: string): string => {
    const number = parseFloat(value); // Convierte el string a número
    if (isNaN(number)) return '0.00'; // Si el valor no es un número válido, retorna '0.00'
    return number.toFixed(2); // Formatea a dos decimales
};