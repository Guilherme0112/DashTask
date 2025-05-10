import { useEffect, useState } from "react";
import style from "../../css/Painel.module.css";
import { deleteTopic, saveTopic } from "../../js/painel/crudTopic";
import { maskValue, unmaskValue } from "../../js/utils/maskValue";

export default function EditTopic({
  showTopic,
  editTopic,
  enableEditTopic,
  selectedTopic,
  setExistsColumn
}) {

  const [topicTitle, setTopicTitle] = useState(selectedTopic.name ?? "");
  const [topicDescription, setTopicDescription] = useState(selectedTopic.description ?? "");
  const [topicValue, setTopicValue] = useState(selectedTopic.value ?? "0,00");
  const [isNegative, setIsNegative] = useState(false);

  const [loadUpdate, setLoadUpdate] = useState(false);
  const [loadDelete, setLoadDelete] = useState(false);
  const [errorTopic, setErrorTopic] = useState("");

useEffect(() => {
  const numericValue = Number(String(selectedTopic.value).replace(",", "."));
  setIsNegative(numericValue < 0);
}, [selectedTopic.value]);

  
  async function submit() {
    
    const numericValue = parseFloat(unmaskValue(topicValue));
    const finalValue = isNegative ? -Math.abs(numericValue) : Math.abs(numericValue);

    setLoadUpdate(true);

    const topic = {
      name: topicTitle,
      description: topicDescription,
      value: finalValue.toFixed(2) || "0,00",
      columnId: selectedTopic.column_id
    }

    try {

      const data = await saveTopic(topic, selectedTopic.id, isNegative);

      setExistsColumn(prevColumns =>
        prevColumns.map(col =>
          String(col.id) === data.column_id
            ? {
                ...col,
                topics: (col.topics || []).map(topic =>
                  topic.id === data.id ? { ...topic, ...data } : topic
                )
              }
            : col
        )
      );

      enableEditTopic()

    } catch (error) {
      setErrorTopic(error.errors.name[0]);
    } finally {
      setLoadUpdate(false);
    }
  }

  // Deletar tópico
  async function submitDelete() {
    
    try {

      setLoadDelete(true);

      await deleteTopic(selectedTopic.id);
      
      // Remove o tópico da array de colunas
      setExistsColumn(prevColumns => 
        prevColumns.map(col =>
          String(col.id) === String(selectedTopic.column_id)
          ? {
            ...col,
            topics: (col.topics || []).filter(topic => String(topic.id) !== String(selectedTopic.id))
          }
          : col
        )
      );

      showTopic();

    } catch (error) {
      console.log(error)
      setErrorTopic(error);
    } finally {
      setLoadDelete(false);
    }
  }

  return (
    <div className={style.background_container}>
      <div className={style.container_add_topic}>
        {/* Botão para fechar */}
        <div className={`d-flex justify-content-end`}>
          <p onClick={showTopic}
             className="fs-3 fw-bold"
             style={{ cursor: "pointer" }}>×</p>
        </div>

        {/* Botão de editar/salvar */}
        <div
          style={{ cursor: "pointer" }}
          className={`d-flex justify-content-end`}
        >

          <button className={"btn btn-danger m-2"} onClick={submitDelete} disabled={loadDelete}>
            {loadDelete ? (
              <div className={"spinner-border spinner-border-sm text-white"} role="status">
                <span className={"visually-hidden"}></span>
              </div>
            ) : (
              "🗑️"
            )}
          </button>

          {editTopic ? (
            <button onClick={submit} className={`btn ${editTopic ? "btn-success" : "btn-primary"} fw-bold m-2`} disabled={loadUpdate}>
               {loadUpdate ? (
                <div className={"spinner-border spinner-border-sm text-white"} role="status">
                  <span className={"visually-hidden"}></span>
                </div>
              ) : (
                "✓"
              )}</button>
          ) : (
            <button onClick={enableEditTopic} className={`btn ${editTopic ? "btn-success" : "btn-primary"} fw-bold m-2`} disabled={loadUpdate}>
                {loadUpdate ? (
                  <div className={"spinner-border spinner-border-sm text-white"} role="status">
                    <span className={"visually-hidden"}></span>
                  </div>
              ) : (
                "✎"
              )}
            </button>
          )}
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
            value={topicTitle}
            readOnly={!editTopic}
            onChange={(e) => setTopicTitle(e.target.value)}
          />
          <label htmlFor="floatingInput">Titulo do tópico</label>

          {errorTopic && (
            <div className="invalid-feedback">{errorTopic}</div>
          )}
        </div>

        {/* Descrição do tópico */}
        <div className="form-floating mb-3">
          <textarea
            className={`${editTopic ? "form-control" : "form-control-plaintext"}`}
            id="floatingTextarea"
            placeholder="Descrição"
            readOnly={!editTopic}
            value={topicDescription ?? ""   }
            style={{ maxHeight: "200px", height: "auto" }}
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
              className={`${editTopic ? "form-control" : "form-control-plaintext"}`}
              id="floatingInputGroup1"
              readOnly={!editTopic}
              value={maskValue(topicValue)}
              onChange={(e) => setTopicValue(maskValue(e.target.value))}
              placeholder="Valor"
            />
            <label htmlFor="floatingInputGroup1">Valor</label>
          </div>
        </div>

        <div className={"form-check"} style={{width: "35%"}}>
          <input className={"form-check-input"}
                 type="checkbox" 
                 checked={isNegative}
                 disabled={!editTopic}
                 onChange={(e) => setIsNegative(e.target.checked)}
                 id="checkIndeterminate" />
          <label className={"form-check-label"} htmlFor="checkIndeterminate">
            Valor de saída
          </label>
        </div>

      </div>
    </div>
  );
}
