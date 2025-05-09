import { unmaskValue } from "../utils/maskValue";

/** Função que salva um tópico
 * 
 * @param {*} topic Array que tem os dados do tópico
 */
export async function saveTopic(topic){

    // Construção do formulário
    const formData = new FormData();
    formData.append("name", topic.name);
    formData.append("description", topic.description);
    formData.append("value", unmaskValue(topic.value));
    formData.append("column_id", topic.columnId);
    
    try {

        // Requisição para criar tópica
        const res = await fetch("http://localhost:8000/api/topics", {
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

/** Função que edita o tópico
 * 
 * @param {*} topic Array onde se encontra os dados do tópico
 * @param {*} id Id do tópico
 */
export async function updateTopic(topic, id){

    // Construção do formulário
    const formData = new FormData();
    formData.append("name", topic.name);
    formData.append("description", topic.description);
    formData.append("value", unmaskValue(topic.value));
    formData.append("column_id", topic.columnId);
    formData.append("_method", "PATCH");
    
    try {

        // Requisição para atualizar tópico
        const res = await fetch(`http://localhost:8000/api/topics/${id}`, {
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