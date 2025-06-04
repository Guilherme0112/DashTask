import { useState } from "react";
import style from "../../css/Painel.module.css";
import { saveColumn } from "../../js/painel/crudColumn";
import { maskValue } from "../../js/utils/maskValue";

/** Componente que renderiza a box de criar colunas
 *
 * @param {*} setNewColumn Manipular o abrir/fechar da dialog
 * @param {*} setExistsColumn Adicionar a coluna criada a array de colunas que serão renderizadas
 */
export default function CreateColumn({ setNewColumn, setExistsColumn }) {

  const [loadCreateColumn, setLoadCreateColumn] = useState(false)

  const [columnTitle, setColumnTitle] = useState("");
  const [startKM, setStartKM] = useState("");
  const [endKM, setEndKM] = useState("");
  const [valueForKM, setValueForKM] = useState("0,00");
  const [dateFrota, setDateFrota] = useState("");

  const [errorNameColumn, setErrorNameColumn] = useState("");
  const [errorDateOfFleet, setDateOfFleet] = useState("");
  const [errorStartKM, setErrorStartKM] = useState("");
  const [errorEndKM, setErrorEndKM] = useState("");
  const [errorValueForKM, setErrorValueForKM] = useState("");

  // Criar colunas
  const submitColumn = async () => {

    setLoadCreateColumn(true);
    const dataColumn = {
      name: columnTitle,
      dateOfFleet: dateFrota,
      startKM: startKM,
      endKM: endKM,
      valueForKM: valueForKM
    }

    try {
      const res = await saveColumn(dataColumn);

      setNewColumn(false);
      setExistsColumn((prev) => [res, ...prev]);
      setColumnTitle("");

    } catch (error) {

      if (error.errors) {
        setErrorNameColumn(error.errors.name?.[0] ?? null);
        setErrorStartKM(error.errors.startKM?.[0] ?? null);
        setErrorEndKM(error.errors.endKM?.[0] ?? null);
        setErrorValueForKM(error.errors.valueForKM?.[0] ?? null);
        setDateOfFleet(error.errors.dateOfFleet?.[0] ?? null);
      }

    } finally {
      setLoadCreateColumn(false);
    }
  };

  return (
    // Fundo escuro
    <div className={style.background_container}>
      {/* Container de criar coluna */}
      <div className={style.container_add_topic}>
        {/* Botão de fechar */}
        <div className={`d-flex justify-content-end`}>
          <p
            onClick={() => setNewColumn(false)}
            className="fs-3 fw-bold"
            style={{ cursor: "pointer" }}
          >
            ×
          </p>
        </div>

        <h3 className="mb-4">Criar nova coluna</h3>

        {/* Input para colocar nome da coluna */}
        <div className="form-floating mb-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${errorNameColumn ? "is-invalid" : ""}`}
              id="floatingInput"
              placeholder="Título do tópico"
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Título da coluna *</label>

            {errorNameColumn && (
              <div id="validationServerUsernameFeedback" className="invalid-feedback">
                {errorNameColumn}
              </div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input type="date"
              id="floatingInput"
              className={`form-control ${errorDateOfFleet ? "is-invalid" : ""}`}
              value={dateFrota}
              onChange={(e) => setDateFrota(e.target.value)}
              onClick={(e) => e.target.showPicker()}
            />
            <label htmlFor="floatingInput">Data do serviço *</label>

            {errorDateOfFleet && (
              <div id="validationServerUsernameFeedback" className="invalid-feedback">
                {errorDateOfFleet}
              </div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              className={`form-control mb-3 ${errorStartKM ? "is-invalid" : ""}`}
              id="floatingInput"
              placeholder="Quilometragem inicial"
              value={startKM}
              onChange={(e) => setStartKM(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Quilometragem inicial *</label>
            {errorStartKM && (
              <div id="validationServerUsernameFeedback" className="invalid-feedback">
                {errorStartKM}
              </div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              className={`form-control mb-3 ${errorEndKM ? "is-invalid" : ""}`}
              id="floatingInput"
              placeholder="Quilometragem final"
              value={endKM}
              onChange={(e) => setEndKM(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Quilometragem final *</label>

            {errorEndKM && (
              <div id="validationServerUsernameFeedback" className="invalid-feedback">
                {errorEndKM}
              </div>
            )}
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">R$</span>
            <div className="form-floating">
              <input
                type="text"
                className={`form-control ${errorValueForKM ? "is-invalid" : ""}`}
                id="floatingInputGroup1"
                placeholder="Valor por KM"
                value={maskValue(valueForKM)}
                onChange={(e) => setValueForKM(maskValue(e.target.value))}
              />
              <label htmlFor="floatingInputGroup1">Valor por KM</label>
            </div>
            {errorValueForKM && (
                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                  {errorValueForKM}
                </div>
              )}
          </div>

          {/* Botão de submit */}
          <button onClick={submitColumn} className="btn btn-primary mt-3" disabled={loadCreateColumn}>
            {loadCreateColumn ? (
              <div className={"spinner-border spinner-border-sm text-white"} role="status">
                <span className={"visually-hidden"}></span>
              </div>
            ) : (
              <span>Criar Coluna</span>
            )}

          </button>

        </div>
      </div>
    </div>
  );
}
