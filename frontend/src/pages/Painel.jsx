import { useState } from "react";
import style from "../css/Painel.module.css";

function Painel() {

    const [editTopic, setEditTopic] = useState(false);

    const [errorTopic, setErrorTopic] = useState("");
    const [errorValue, setErrorValue] = useState("");

    const [showColumnBox, setShowColumnBox] = useState(false);
    const [showTopicDetails, setShowTopicDetails] = useState(false);

    // Abrir dialog para adicionar tópico
    const addTopic = () => {
        setShowColumnBox(true);
    };

    const submitTopic = () => {
        console.log("Novo tópico:", newTopicTitle);
        setNewTopicTitle("");
        setShowColumnBox(false);
    };

    // Abrir/fechar dialog para exibir detalhes do tópico
    const showTopic = () => {
        showTopicDetails ? setShowTopicDetails(false) : setShowTopicDetails(true);
    };

    // Fechar container de adicionar tópico
    const closeAddTopic = () => {
        setShowColumnBox(false);
    };

    // Fechar container de detalhes do tópico
    const closeTopicDetails = () => {
        setShowTopicDetails(false);
    };

    const enableEditTopic = () => {
        editTopic ? setEditTopic(false) : setEditTopic(true);
    }

  return (
    <>
      {/* Template das colunas */}
      <section className="d-flex justify-content-start align-items-center flex-wrap">
        <div className={style.board}>
          <div className={style.column}>
            <div className={style.column_header}>Coluna 1</div>
            <div className={style.topics}>
              <div className={style.topic} onClick={showTopic}>
                Tópico 1
              </div>
              <div className={style.topic}>Tópico 2</div>
            </div>
            <div className={style.add_topic} onClick={addTopic}>
              + Adicionar tópico
            </div>
          </div>
        </div>

        <div className={style.board}>
          <div className={style.column}>
            <div className={style.column_header}>Coluna 1</div>
            <div className={style.topics}>
              <div className={style.topic} onClick={showTopic}>
                Tópico 1
              </div>
              <div className={style.topic}>Tópico 2</div>
            </div>
            <div className={style.add_topic} onClick={addTopic}>
              + Adicionar tópico
            </div>
          </div>
        </div>
      </section>

      {/* Mostrar detalhes do tópico */}
      {showTopicDetails && (
        <div className={style.background_container}>
        <div className={style.container_add_topic}>
          {/* Botão para fechar */}
          <div className={`d-flex justify-content-end`}>
            <p onClick={closeTopicDetails} className="fs-3 fw-bold" style={{cursor: "pointer"}}>×</p>
          </div>

            {/* Botão de editar/salvar */}
          <div style={{cursor: "pointer"}} className={`d-flex justify-content-end`}>
            <p onClick={enableEditTopic} className={`btn ${ editTopic ? 'btn-success' : 'btn-primary'} fw-bold`}>
                {editTopic ? '✓' : '✎'}
            </p>
          </div>

          {/* Título do tópico */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className={`${editTopic ? 'form-control' : 'form-control-plaintext'} ${errorTopic ? 'is-invalid' : ''}`}
              id="floatingInput"
              placeholder="Titulo do tópico"
              readOnly={!editTopic}
              onChange={(e) => setNewTopicTitle(e.target.value)}
            />
            <label for="floatingInput">Titulo do tópico</label>

            {errorTopic && (
              <div className="invalid-feedback">Mensagem de erro</div>
            )}
          </div>

          {/* Descrição do tópico */}
          <div className="form-floating mb-3">
            <textarea
              className={`${editTopic ? 'form-control' : 'form-control-plaintext'} ${errorTopic ? 'is-invalid' : ''}`}
              id="floatingTextarea"
              placeholder="Descrição"
              readOnly={!editTopic}
              style={{ maxHeight: "200px" }}
            ></textarea>
            <label for="floatingTextarea">Descrição</label>
          </div>

          {/* Valor (opcional) */}
          <div className="input-group mb-3">
            <span className="input-group-text">R$</span>
            <div className="form-floating">
              <input
                type="text"
                className={`${editTopic ? 'form-control' : 'form-control-plaintext'} ${errorTopic ? 'is-invalid' : ''}`}
                id="floatingInputGroup1"
                readOnly={!editTopic}
                placeholder="Valor"
              />
              <label for="floatingInputGroup1">Valor</label>
            </div>
          </div>

          <button onClick={submitTopic} className="btn btn-primary d-none">
            Salvar
          </button>
        </div>
      </div>
      )}

      {/* Criar novo tópico */}
      {showColumnBox && (
        <div className={style.background_container}>
          <div className={style.container_add_topic}>
            {/* Botão para fechar */}
            <div className={`d-flex justify-content-end`}>
                <p onClick={closeAddTopic} className="fs-3 fw-bold" style={{cursor: "pointer"}}>×</p>
            </div>

            <h3 className="mb-4">Criar novo tópico</h3>

            {/* Título do tópico */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${errorTopic ? 'is-invalid' : ''}`}
                id="floatingInput"
                placeholder="Titulo do tópico"
                onChange={(e) => setNewTopicTitle(e.target.value)}
              />
              <label for="floatingInput">Titulo do tópico</label>

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
              ></textarea>
              <label for="floatingTextarea">Descrição</label>
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
                />
                <label for="floatingInputGroup1">Valor</label>
              </div>
            </div>

            <button onClick={submitTopic} className="btn btn-primary">
              Salvar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Painel;
