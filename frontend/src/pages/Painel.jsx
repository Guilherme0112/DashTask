import { useEffect, useState } from "react";
import style from "../css/Painel.module.css";
import { deleteColumn, fecthColumns } from "../js/painel/crudColumn";
import CreateColumn from "../components/painel/createColumn";
import CreateTopic from "../components/painel/createTopic";
import EditTopic from "../components/painel/editTopic";

function Painel() {

  // Tópicos
  const [editTopic, setEditTopic] = useState(false);
  const [showTopicDetails, setShowTopicDetails] = useState(false);
  // Coluna
  const [newColumn, setNewColumn] = useState("");
  const [existsColumn, setExistsColumn] = useState([]);
  const [loadColumns, setLoadsColumns] = useState(false);
  const [addTopic, setAddTopic] = useState(false);

  // Eventos para abrir e fechar dialogs
  const showAddTopic = () => { setAddTopic((prev) => !prev) };
  const enableEditTopic = () => { setEditTopic((prev) => !prev) };
  const showTopic = () => { setShowTopicDetails((prev) => !prev) };
  const showNewColumn = () => { setNewColumn((prev) => !prev) };

  // Deletar colunas
  async function deleteColumnFunction(id) {
    try {
      await deleteColumn(id);
      setExistsColumn((prev) => prev.filter((coluna) => coluna.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  // Buscar colunas
  useEffect(() => {
    async function fecthData() {
      try {
        setLoadsColumns(true);
        const res = await fecthColumns();
        setExistsColumn(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadsColumns(false);
      }
    }

    fecthData();
  }, []);

  return (
    <>
      {/* Template criar coluna */}
      <section className="d-flex justify-content-start align-items-center flex-wrap w-100">
        {/* Dialog criar colunas */}
        {newColumn && (
          <CreateColumn
            setNewColumn={setNewColumn}
            setExistsColumn={setExistsColumn}
          />
        )}
        <div className={"w-100 d-flex align-items-start justify-content-start"}>
          {/* Botão para abrir dialog de criar colunas */}
          <button onClick={() => showNewColumn()} className="btn btn-primary m-3">
            Criar Coluna
          </button>

          {/* Renderização as colunas existentes */}
          {loadColumns ? (
            <div className={"ms-5 mt-3"}>
              <div className={"spinner-border"} role="status">
                <span className={"visually-hidden"}></span>
              </div>
            </div>
          ) : (
            existsColumn.length > 0 && existsColumn.map((coluna, index) => (
              <div key={index} className={style.board}>
                <div className={style.column}>
                  <div className={style.column_header}>
                    <span>{coluna.name}</span>
                    <button
                      className={style.trash_button}
                      onClick={() => deleteColumnFunction(coluna.id)}
                    >
                      🗑️
                    </button>
                  </div>

                  <div className={style.topics}>
                    <div className={style.topic} onClick={() => showTopic()}>
                      Tópico 1
                    </div>
                    <div className={style.topic}>Tópico 2</div>
                  </div>

                  <div className={style.add_topic} onClick={() => showAddTopic()}>
                    + Adicionar tópico
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Editar/Mostrar detalhes do tópico */}
      {showTopicDetails && (
        <EditTopic
          showTopic={showTopic}
          editTopic={editTopic}
          enableEditTopic={enableEditTopic}
        />
      )}

      {/* Criar novo tópico */}
      {addTopic && <CreateTopic showAddTopic={showAddTopic} />}
    </>
  );
}

export default Painel;
