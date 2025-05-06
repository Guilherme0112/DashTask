import { useEffect, useState } from "react";
import { fecthColumns } from "../js/painel/crudColumn";
import CreateColumn from "../components/Painel/CreateColumn";
import CreateTopic from "../components/Painel/CreateTopic";
import EditTopic from "../components/Painel/EditorOrShowTopic";
import Column from "../components/Painel/Column";

function Painel() {
  // Tópicos
  const [editTopic, setEditTopic] = useState(false);
  const [showTopicDetails, setShowTopicDetails] = useState(false);
  const [columnIdForTopic, setColumnIdForTopic] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  // Coluna
  const [newColumn, setNewColumn] = useState("");
  const [existsColumn, setExistsColumn] = useState([]);
  const [loadColumns, setLoadsColumns] = useState(false);
  const [addTopic, setAddTopic] = useState(false);

  // Eventos para abrir e fechar dialogs
  const showAddTopic = () => {
    setAddTopic((prev) => !prev);
  };
  const enableEditTopic = () => {
    setEditTopic((prev) => !prev);
  };
  const showTopic = (topic) => {
    setSelectedTopic(topic); 
    setShowTopicDetails((prev) => !prev); 
  };
  const showNewColumn = () => {
    setNewColumn((prev) => !prev);
  };

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
          <button
            onClick={() => showNewColumn()}
            className="btn btn-primary m-3">
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
              <Column 
                key={coluna.id}
                coluna={coluna}
                showTopic={showTopic}
                showAddTopic={showAddTopic}
                setColumnIdForTopic={setColumnIdForTopic}
              />
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
          selectedTopic={selectedTopic}
        />
      )}

      {/* Criar novo tópico */}
      {addTopic && <CreateTopic 
                    showAddTopic={showAddTopic}
                    columnId={columnIdForTopic} 
                    setExistsColumn={setExistsColumn}/> }
    </>
  );
}

export default Painel;
