export const formatPrice = (value: string) => {
    // Remueve todo lo que no sea número
    const numericValue = value.replace(/\D/g, "");

    // Aplica formato de miles (con punto)
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};