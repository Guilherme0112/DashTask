import { unmaskValue } from "../utils/maskValue";

/** Busca todas as colunas no banco de dados
 *
 * @returns Colunas no banco de dados
 */
export async function fetchColumns() {
  try {
    // Request para obter os dados
    const res = await fetch("http://localhost:8000/api/column", {
      method: "GET",
      credentials: "include",
    });

    // Se houver erros lança a exception
    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    // Retorna os dados
    return await res.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchColumn(id) {
  try {
    // Request para obter os dados
    const res = await fetch(`http://localhost:8000/api/column/${id}`, {
      method: "GET",
      credentials: "include",
    });

    // Se houver erros lança a exception
    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    // Retorna os dados
    return await res.json();
  } catch (error) {
    throw error;
  }
}

/** Método para salvar/atualizar uma coluna
 *
 * @param {*} column Dados da coluna
 * @returns Coluna que foi salva ou atuaizada
 */
export async function saveColumn(column) {
  try {

    column.valueForKM = unmaskValue(column.valueForKM);

    // Objeto do formulário que será enviado
    const formData = new FormData();
    formData.append("name", column.name || "");
    formData.append("dateOfFleet", column.dateOfFleet || "");
    formData.append("startKM", column.startKM || "");
    formData.append("endKM", column.endKM || "");
    formData.append("valueForKM", column.valueForKM ?? 0);
    
    // Request
    const res = await fetch("http://localhost:8000/api/column", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    // Em caso de erro
    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}

/** Função para deletar coluna
 *
 * @param {*} id Id da coluna que será deletada
 * @returns Confirmação de deleção da coluna
 *
 * @throws Erros genéricos
 */
export async function deleteColumn(id) {
  try {
    // Request com o id da coluna para o delete
    const res = await fetch("http://localhost:8000/api/column/" + id, {
      method: "DELETE",
      credentials: "include",
    });

    // Verifica se ocorreu tudo certo, se não ele lança a exceção
    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}
