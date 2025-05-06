import { useState } from "react";
import style from "../../css/Painel.module.css";

export default function EditTopic({showTopic, enableEditTopic, editTopic, selectedTopic}) {

  const [topicTitle, setTopicTitle] = useState("");
  const [errorTopic, setErrorTopic] = useState("");

  return (
    <div className={style.background_container}>
      <div className={style.container_add_topic}>
        {/* Botão para fechar */}
        <div className={`d-flex justify-content-end`}>
          <p
            onClick={showTopic}
            className="fs-3 fw-bold"
            style={{ cursor: "pointer" }}
          >
            ×
          </p>
        </div>

        {/* Botão de editar/salvar */}
        <div
          style={{ cursor: "pointer" }}
          className={`d-flex justify-content-end`}
        >
          <p
            onClick={enableEditTopic}
            className={`btn ${
              editTopic ? "btn-success" : "btn-primary"
            } fw-bold`}
          >
            {editTopic ? "✓" : "✎"}
          </p>
        </div>

        {/* Título do tópico */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`${
              editTopic ? "form-control" : "form-control-plaintext"
            } ${errorTopic ? "is-invalid" : ""}`}
            id="floatingInput"
            placeholder="Titulo do tópico"
            value={selectedTopic.name}
            readOnly={!editTopic}
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
            className={`${
              editTopic ? "form-control" : "form-control-plaintext"
            } ${errorTopic ? "is-invalid" : ""}`}
            id="floatingTextarea"
            placeholder="Descrição"
            readOnly={!editTopic}
            value={selectedTopic.description}
            style={{ maxHeight: "200px", height: "auto" }}
          ></textarea>
          <label htmlFor="floatingTextarea">Descrição</label>
        </div>

        {/* Valor (opcional) */}
        <div className="input-group mb-3">
          <span className="input-group-text">R$</span>
          <div className="form-floating">
            <input
              type="text"
              className={`${
                editTopic ? "form-control" : "form-control-plaintext"
              } ${errorTopic ? "is-invalid" : ""}`}
              id="floatingInputGroup1"
              readOnly={!editTopic}
              value={selectedTopic.value}
              placeholder="Valor"
            />
            <label htmlFor="floatingInputGroup1">Valor</label>
          </div>
        </div>
      </div>
    </div>
  );
}
