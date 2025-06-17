export function maskValue(value) {
  const isNegative = String(value).trim().startsWith("-");

  value = String(value).replace(/\D/g, "");
  const decimal = parseFloat(value) / 100;

  if (isNaN(decimal)) return "0,00";

  const formatted = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(decimal)

  const finalValue = isNegative ? `-${formatted}` : formatted;

  return finalValue;
}

export function unmaskValue(value) {
  if (typeof value === "number") return value;
  
  value = value.trim();

  if (/^\-?\d+(\.\d+)?$/.test(value)) return parseFloat(value);

  const cleanValue = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(cleanValue);
}

export function convertNegative(value, isNegative) {
  const absValue = Math.abs(value);
  return isNegative ? -absValue : absValue;
}