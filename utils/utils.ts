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