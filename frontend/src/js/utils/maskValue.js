

export function maskValue(value){

    value = String(value).replace(/\D/g, "");
    const decimal = parseInt(value) / 100;

    if (isNaN(decimal)) return "0,00";
        
    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(decimal)
}

export function unmaskValue(value){
    return value.replace(/\./g, "")  
                .replace(",", ".")  
                .trim()
}