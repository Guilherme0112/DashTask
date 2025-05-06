import { useState } from "react";
import style from "../../css/Painel.module.css";

export default function CreateTopic({ showAddTopic }) {

  const [topicDescription, setTopicDescription] = useState("");
  const [topicValue, setTopicValue] = useState("");
  const [topicTitle, setTopicTitle] = useState("");

  const [errorTopic, setErrorTopic] = useState("");


  // Função de criar topico

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

        <button className="btn btn-primary">Salvar</button>
      </div>
    </div>
  );
}
