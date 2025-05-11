import { convertNegative } from "../utils/maskValue";

/** Função que salva um tópico
 * 
 * @param {*} topic Array que tem os dados do tópico'
 */
export async function saveTopic(topic, id, isNegative){

    
    // Construção do formulário
    const formData = new FormData();
    formData.append("name", topic.name);
    formData.append("description", topic.description);
    formData.append("value", convertNegative(topic.value, isNegative));
    formData.append("column_id", topic.columnId);
    if(id) formData.append("_method", "PATCH");
    
    try {

        // Requisição para criar tópica
        const res = await fetch(id 
            ? `http://localhost:8000/api/topics/${id}` 
            : "http://localhost:8000/api/topics", {
            method: "POST",
            credentials: "include",
            body: formData
        });

        // Em caso de erro
        if(!res.ok){
            const error = await res.json();
            throw error;
        }
        
        // Retorna o valor criado
        const data = await res.json();
        return data;

    } catch (error) {
        throw error;
    }
}


/** Função que deleta um tópico
 * 
 * @param {*} id Id do tópico
 */
export async function deleteTopic(id){
    
    try {

        // Request para deletar o tópico
        const res = await fetch(`http://localhost:8000/api/topics/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        // Em caso de erro
        if(!res.ok){
            const error = await res.json();
            throw error;
        }

    } catch (error) {
        throw error;
    }

}