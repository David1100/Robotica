export const formatPrice = (value: string) => {
    // Remueve todo lo que no sea número
    const numericValue = value.replace(/\D/g, "");

    // Aplica formato de miles (con punto)
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatString = (path:any) => {
  // 1. Tomar solo lo que está después de la última barra
  let lastPart = path.split('/').pop();

  // 2. Reemplazar guiones bajos por espacios
  lastPart = lastPart.replace(/_/g, ' ');

  // 3. Primera letra mayúscula y resto igual
  return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
}

export const functionToken = (term:string  | null = null) => {
  let tokenEnv = '2216e1364f6fee04807be02c2ed86b7d'
  if(term){
    tokenEnv = term
  }
  return tokenEnv;
}