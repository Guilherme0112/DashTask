import { useState } from "react";
import style from "../../css/Painel.module.css";

/** Componente de criação de tópicos
 * 
 * @param showAddTopic Função que abre/fecha dialog
 * @param columnId Id da coluna que receberá o tópico
 * @param setExistsColumn Colunas existentes até o momento 
 */
export default function CreateTopic({ showAddTopic, columnId, setExistsColumn }) {

  // Valores do tópico
  const [topicDescription, setTopicDescription] = useState("");
  const [topicValue, setTopicValue] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  // Erro do tópico
  const [errorTopic, setErrorTopic] = useState("");

  // Função para salvar o tópico
  async function submit() {

    // Construção do formulário
    const formData = new FormData();
    formData.append("name", topicTitle);
    formData.append("description", topicDescription);
    formData.append("value", topicValue);
    formData.append("column_id", columnId);

    try {
      
      // Requisição para criar
      const res = await fetch("http://localhost:8000/api/topics", {
        method: "POST",
        credentials: "include",
        body: formData
      });

      // Erro na requisição
      if(!res.ok){
        const data = await res.json();
        setErrorTopic(data.errors || "Erro ao criar tópico");
        showAddTopic();
        return;
      }

      // Pega o tópico retornado e adiciona na array topics onde o id da
      // coluna retornada corresponda ao id da coluna da array
      const data = await res.json();
      setExistsColumn(prevColumns =>
        prevColumns.map(col =>
          String(col.id) === data.column_id
            ? { ...col, topics: [...col.topics || [], data] }
            : col
        )
      );

      showAddTopic();

    } catch (error) {
      setErrorTopic("Ocorreu algum erro. Tente novamente mais tarde");
      console.log(error);
    }
  }


  return (
    <div className={style.background_container}>
      <div className={style.container_add_topic}>
        {/* Botão para fechar */}
        <div className={`d-flex justify-content-end`}>
          <p
            onClick={showAddTopic}
            className="fs-3 fw-bold"
            style={{ cursor: "pointer" }}
          >
            ×
          </p>
        </div>

        <h3 className="mb-4">Criar novo tópico</h3>

        {/* Título do tópico */}
        <div className="form-floating mb-3">
          <input
            type="email"
            className={`form-control ${errorTopic ? "is-invalid" : ""}`}
            id="floatingInput"
            placeholder="Titulo do tópico"
            value={topicTitle}
            onChange={(e) => setTopicTitle(e.target.value)}
          />
          <label htmlFor="floatingInput">Titulo do tópico</label>

          {errorTopic && (
            <div className="invalid-feedback">Mensagem de erro</div>
          )}
        </div>

        {/* Descrição do tópico */}
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="floatingTextarea"
            placeholder="Descrição"
            style={{ maxHeight: "200px" }}
            value={topicDescription}
            onChange={(e) => setTopicDescription(e.target.value)}
          ></textarea>
          <label htmlFor="floatingTextarea">Descrição</label>
        </div>

        {/* Valor (opcional) */}
        <div className="input-group mb-3">
          <span className="input-group-text">R$</span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInputGroup1"
              placeholder="Valor"
              value={topicValue}
              onChange={(e) => setTopicValue(e.target.value)}
            />
            <label htmlFor="floatingInputGroup1">Valor</label>
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => submit()}>Salvar</button>
      </div>
    </div>
  );
}
