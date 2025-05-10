import { useEffect, useState } from "react";
import { fetchColumns } from "../js/painel/crudColumn";
import CreateColumn from "../components/Painel/CreateColumn";
import CreateTopic from "../components/Painel/CreateTopic";
import EditTopic from "../components/Painel/EditorOrShowTopic";
import Column from "../components/Painel/Column";
import style from "../css/Painel.module.css";

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
    if (editTopic) enableEditTopic();
    setShowTopicDetails((prev) => !prev); 
  };
  const showNewColumn = () => {
    setNewColumn((prev) => !prev);
  };

  // Buscar colunas
  useEffect(() => {
    async function fetchData() {
      try {
        setLoadsColumns(true);
        const res = await fetchColumns();
        setExistsColumn(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadsColumns(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {/* Template criar coluna */}
      <section className="d-flex justify-content-start align-items-center flex-wrap w-100 position-fixed pt-5">

        {/* Botão para abrir dialog de criar colunas */}
        <button
          onClick={() => showNewColumn()}
          className="btn btn-primary mb-n1 ms-1 m-3"
          style={{marginTop: "70px"}}>
          Criar Coluna
        </button>
        <div className={`w-100 d-flex align-items-start justify-content-start ${style.board}`}>

          {/* Renderização as colunas existentes */}
          {loadColumns ? (
            <div className={"m-2 w-100 text-center"}>
              <div className={"spinner-border"} role="status">
                <span className={"visually-hidden"}></span>
              </div>
            </div>
          ) : (
            existsColumn.length > 0 ? (
              existsColumn.map((coluna, index) => (
                <Column 
                  key={coluna.id}
                  coluna={coluna}
                  showTopic={showTopic}
                  showAddTopic={showAddTopic}
                  setColumnIdForTopic={setColumnIdForTopic}
                  setExistsColumn={setExistsColumn}
                />
              )   
          )) : (
            <h5 className={"w-100 m-2 text-center"}>Nenhuma coluna encontrada</h5>
          )
          )}
        </div>
      </section>


      {/* Dialog criar colunas */}
      {newColumn && (
        <CreateColumn
          setNewColumn={setNewColumn}
          setExistsColumn={setExistsColumn}
        />
      )}

      {/* Criar novo tópico */}
      {addTopic && <CreateTopic 
                    showAddTopic={showAddTopic}
                    column_id={columnIdForTopic} 
                    setExistsColumn={setExistsColumn}/> }

      {/* Editar/Mostrar detalhes do tópico */}
      {showTopicDetails && (
        <EditTopic
          showTopic={showTopic}
          editTopic={editTopic}
          enableEditTopic={enableEditTopic}
          selectedTopic={selectedTopic}
          setExistsColumn={setExistsColumn}
        />
      )}

      
    </>
  );
}

export default Painel;
