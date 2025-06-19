import { useState } from "react";
import style from "../../css/Painel.module.css";
import { saveTopic } from "../../js/painel/crudTopic";
import { maskValue, unmaskValue } from "../../js/utils/maskValue";

export default function CreateTopic({ showAddTopic, column_id, setExistsColumn }) {

  // Valores do tópico
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [topicValue, setTopicValue] = useState("");
  const [isNegative, setIsNegative] = useState(false);
  const [launchDate, setLaunchDate] = useState("");

  const [errorTopic, setErrorTopic] = useState("");

  const [loadCreateTopic, setLoadCreateTopic] = useState(false);

  async function submit() {
    setLoadCreateTopic(true);
    try {
      const topic = {
        name: topicTitle,
        description: topicDescription,
        value: unmaskValue(topicValue || "0"),
        launchDate: launchDate,
        columnId: column_id
      }

      const data = await saveTopic(topic, null, isNegative);

      setExistsColumn(prevColumns =>
        prevColumns.map(col =>
          String(col.id) === data.column_id
            ? {
              ...col,
              topics: [...col.topics || [], {
                ...data,
                value: parseFloat(data.value).toFixed(2)
              }]
            }
            : col
        )
      );
      showAddTopic();
    } catch (error) {
      setErrorTopic(error.errors.name[0]);
    } finally {
      setLoadCreateTopic(false);
    }
  }

  return (
    <div className={style.background_container}>
      <div className={style.container_add_topic}>
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
            required
          />
          <label htmlFor="floatingInput">Titulo do tópico *</label>

          {errorTopic && (
            <div className="invalid-feedback">{errorTopic}</div>
          )}
        </div>

        <div className="form-floating mb-3">
          <input type="date"
            id="floatingInput"
            className="form-control"
            value={launchDate}
            onChange={(e) => setLaunchDate(e.target.value)}
            onClick={(e) => e.target.showPicker()}
          />
          <label htmlFor="floatingInput">Data do lançamento</label>
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
              value={maskValue(topicValue)}
              onChange={(e) => setTopicValue(maskValue(e.target.value))}
            />
            <label htmlFor="floatingInputGroup1">Valor</label>
          </div>
        </div>

        <div className={"form-check"} style={{ width: "35%" }}>
          <input className={"form-check-input"}
            type="checkbox"
            value={isNegative}
            onChange={(e) => setIsNegative(!isNegative)}
            id="checkIndeterminate" />
          <label className={"form-check-label"} htmlFor="checkIndeterminate">
            Valor de saída
          </label>
        </div>

        <button className="btn btn-primary mt-4" onClick={() => submit()} disabled={loadCreateTopic}>
          {loadCreateTopic ? (
            <div className={"spinner-border spinner-border-sm text-white"} role="status">
              <span className={"visually-hidden"}></span>
            </div>
          ) : (
            <span>Salvar</span>
          )}

        </button>
      </div>
    </div>
  );
}
