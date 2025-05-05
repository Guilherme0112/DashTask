import { useEffect, useState } from "react";
import style from "../css/Painel.module.css";

function Painel() {
  const [editTopic, setEditTopic] = useState(false);

  const [errorTopic, setErrorTopic] = useState("");
  const [errorValue, setErrorValue] = useState("");

  const [showCreateTopicBox, setshowCreateTopicBox] = useState(false);
  const [showTopicDetails, setShowTopicDetails] = useState(false);
  // Coluna
  const [newColumn, setNewColumn] = useState("");
  const [columnTitle, setColumnTitle] = useState("");
  const [existsColumn, setExistsColumn] = useState([]);
  // Criar tópico
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [topicValue, setTopicValue] = useState("");

  // Abrir dialog para adicionar tópico
  const addTopic = () => {
    setshowCreateTopicBox(true);
  };
  // Fechar container de adicionar tópico
  const closeAddTopic = () => {
    setshowCreateTopicBox(false);
  };
  // Fechar container de detalhes do tópico
  const closeTopicDetails = () => {
    setShowTopicDetails(false);
  };
  // Mudar o botão para editar/salvar (Na box de visualizar tópico)
  const enableEditTopic = () => {
    editTopic ? setEditTopic(false) : setEditTopic(true);
  };
  // Abrir/fechar dialog para exibir detalhes do tópico
  const showTopic = () => {
    showTopicDetails ? setShowTopicDetails(false) : setShowTopicDetails(true);
  };
  // Abrir/fechar dialog para cirar coluna
  const showNewColumn = () => {
    newColumn ? setNewColumn(false) : setNewColumn(true);
  };

  const submitColumn = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", columnTitle);

    const res = await fetch("http://localhost:8000/api/column", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      console.log(await res.json());
      return;
    }

    const newColuna = await res.json();

    setNewColumn(false);
    setExistsColumn((prev) => [...prev, newColuna]);
    setColumnTitle("");
  };

  const submitTopic = async () => {
    const formData = new FormData();

    const res = await fetch("http://localhost:8000/api/column", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      console.log(await res.json());
      return;
    }

    console.log(await res.json());

    setshowCreateTopicBox(false);
  };

  useEffect(() => {
    async function fecthData() {
      const res = await fetch("http://localhost:8000/api/column", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.log(await res.json());
        return;
      }

      setExistsColumn(await res.json());
    }

    fecthData();
  }, []);

  return (
    <>
      {/* Template Coluna */}
      <section className="d-flex justify-content-start align-items-center flex-wrap w-100">
  

        {newColumn && (
          <div className={style.background_container}>
            <div className={style.container_add_topic}>
              <div className={`d-flex justify-content-end`}>
                <p
                  onClick={() => setNewColumn(false)}
                  className="fs-3 fw-bold"
                  style={{ cursor: "pointer" }}
                >
                  ×
                </p>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className={"form-control"}
                  id="floatingInput"
                  placeholder="Titulo do tópico"
                  value={columnTitle}
                  onChange={(e) => setColumnTitle(e.target.value)}
                />
                <label for="floatingInput">Titulo da coluna</label>

                <button onClick={submitColumn} className="btn btn-primary mt-3">
                  Criar Coluna
                </button>

                {errorTopic && (
                  <div className="invalid-feedback">Mensagem de erro</div>
                )}
              </div>
            </div>
          </div>
        )}

        <button onClick={showNewColumn} className="btn btn-primary m-3">
          Criar Coluna
        </button>

        {existsColumn.length > 0 &&
          existsColumn.map((coluna, index) => (
            <div key={index} className={style.board}>
              <div className={style.column}>
                <div className={style.column_header}>{coluna.name}</div>

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
          ))}


      </section>

      {/* Editar/Mostrar detalhes do tópico */}
      {showTopicDetails && (
        <div className={style.background_container}>
          <div className={style.container_add_topic}>
            {/* Botão para fechar */}
            <div className={`d-flex justify-content-end`}>
              <p
                onClick={closeTopicDetails}
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
                type="email"
                className={`${
                  editTopic ? "form-control" : "form-control-plaintext"
                } ${errorTopic ? "is-invalid" : ""}`}
                id="floatingInput"
                placeholder="Titulo do tópico"
                readOnly={!editTopic}
                onChange={(e) => setTopicTitle(e.target.value)}
              />
              <label for="floatingInput">Titulo do tópico</label>

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
                  className={`${
                    editTopic ? "form-control" : "form-control-plaintext"
                  } ${errorTopic ? "is-invalid" : ""}`}
                  id="floatingInputGroup1"
                  readOnly={!editTopic}
                  placeholder="Valor"
                />
                <label for="floatingInputGroup1">Valor</label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Criar novo tópico */}
      {showCreateTopicBox && (
        <div className={style.background_container}>
          <div className={style.container_add_topic}>
            {/* Botão para fechar */}
            <div className={`d-flex justify-content-end`}>
              <p
                onClick={closeAddTopic}
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
                value={topicDescription}
                onChange={(e) => setTopicDescription(e.target.value)}
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
                  value={topicValue}
                  onChange={(e) => setTopicValue(e.target.value)}
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
