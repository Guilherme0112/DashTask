
export function formatDateTime(date){

    if (!date) return "";
    
    const dateObj = new Date(String(date));
    return dateObj.toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })
}

export function formatDate(date){

    if (!date) return "";

    const dateObj = new Date(date.replace(/-/g, "/"));
    return dateObj.toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}