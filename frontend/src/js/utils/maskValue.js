/** Função que formata o valor para BRL (sem o R$)
 *  
 * @param {*} value Valor que será formatado
 * @returns input => 11.11 | output => 11,11
 */
export function maskValue(value) {

  // Converte para string e verifica se começa com "-"
  const isNegative = String(value).trim().startsWith("-");

  // Converte o valor para string e divide por 100 para pegar
  // as casas decimais corretamente
  value = String(value).replace(/\D/g, "");
  const decimal = parseFloat(value) / 100;

  if (isNaN(decimal)) return "0,00";

  // Formata o valor
  const formatted = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(decimal)

  const finalValue = isNegative ? `-${formatted}` : formatted;

  return finalValue;
}

/** Retira a formatação do valor
 * 
 * @param {*} value Valor que terá a formatação retirada
 * @returns input => 11,11 | output => 11.11
 */
export function unmaskValue(value) {
  if (typeof value === "number") {
    return value;
  }

  // Remove espaços
  value = value.trim();

  // Já está no formato com ponto decimal (ex: "3240.00")
  if (/^\-?\d+(\.\d+)?$/.test(value)) return parseFloat(value);

  // Se for no formato brasileiro ("3.240,00")
  const cleanValue = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(cleanValue);
}

/** Converte o valor de acordo com o isNegative
 * 
 * @param {*} value Valor a ser convertdido
 * @param {*} isNegative Se vai ser negativo ou positivo
 * @returns Valor negativo em caso de TRUE e valor positivo em caso de FALSE
 */
export function convertNegative(value, isNegative) {
  const absValue = Math.abs(value);
  return isNegative ? -absValue : absValue;
}