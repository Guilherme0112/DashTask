import { useState } from "react";
import style from "../../css/Painel.module.css";
import { saveColumn } from "../../js/painel/crudColumn";

/** Componente que renderiza a box de criar colunas
 * 
 * @param {*} setNewColumn Manipular o abrir/fechar da dialog
 * @param {*} setExistsColumn Adicionar a coluna criada a array de colunas que serão renderizadas
 */
export default function CreateColumn({ setNewColumn, setExistsColumn }) {

    const [columnTitle, setColumnTitle] = useState("");
    const [errorColumn, setErrorColumn] = useState(false);

    // Criar colunas
    const submitColumn = async (event) => {
        event.preventDefault();
    
        try {
            const res = await saveColumn(columnTitle);
        
            setNewColumn(false);
            setExistsColumn((prev) => [...prev, res]);
            setColumnTitle("");

        } catch (error) {
            console.error(error);
            setErrorColumn(true);
        }
    };


  return (

    // Fundo escuro
    <div className={style.background_container}>

    {/* Container de criar coluna */}
      <div className={style.container_add_topic}>

        {/* Botçao de fechar */}
        <div className={`d-flex justify-content-end`}>
          <p
            onClick={() => setNewColumn(false)}
            className="fs-3 fw-bold"
            style={{ cursor: "pointer" }}
          >
            ×
          </p>
        </div>

        {/* Input para colocar nome da coluna */}
        <div className="form-floating mb-3">
            <input
            type="email"
            className={"form-control"}
            id="floatingInput"
            placeholder="Titulo do tópico"
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            />
            <label htmlFor="floatingInput">Titulo da coluna</label>

            {/* Botão de submit */}
            <button onClick={submitColumn} className="btn btn-primary mt-3">
                Criar Coluna    
            </button>

            {/* Exibir erros */}
            {errorColumn && (   
                <div className="invalid-feedback">Mensagem de erro</div>
            )}
        </div>
      </div>
    </div>
  );
}
