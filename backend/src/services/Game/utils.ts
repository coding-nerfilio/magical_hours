export function isMirror(timeString: string) {
  // Dividir la cadena de hora en horas y minutos
  const [hours, minutes] = timeString.split(":").map(Number);

  // Comprobar si las horas (HH) son iguales a los minutos (MM)
  return hours === minutes;
}

export function isReverse(time: string): boolean {
  const [hours, minutes] = time.split(":");
  const reversedMinutes = minutes.split("").reverse().join("");
  return hours === reversedMinutes;
}

export function isTriangle(timeString: string) {
  // Remover los dos puntos de la cadena de tiempo y convertirla en un array de caracteres
  const digits = timeString.replace(":", "").slice(1).split("");

  // Verificar si hay tres dígitos distintos
  const uniqueDigits = new Set(digits);
  return uniqueDigits.size === 1;
}
