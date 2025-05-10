
/** Função que formata o valor para BRL (sem o R$)
 *  
 * @param {*} value Valor que será formatado
 * @returns input => 11.11 | output => 11,11
 */
export function maskValue(value){

    // Converte para string e verifica se começa com "-"
    const isNegative = String(value).trim().startsWith("-");

    // Converte o valor para string e divide por 100 para pegar
    // as casas decimais corretamente
    value = String(value).replace(/\D/g, "");
    const decimal = parseInt(value) / 100;

    if (isNaN(decimal)) return "0,00";
        
    // Formata o valor
    const formatted =  new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(decimal)

    return isNegative ? `-${formatted}` : formatted;
}

/** Retira a formatação do valor
 * 
 * @param {*} value Valor que terá a formatação retirada
 * @returns input => 11,11 | output => 11.11
 */
export function unmaskValue(value){
    return value.replace(/\./g, "")  
                .replace(",", ".")  
                .trim()
}