import { deleteColumn } from "../../js/painel/crudColumn";
import style from "../../css/Painel.module.css";

export default function Column({ coluna, showTopic, showAddTopic, setColumnIdForTopic, setExistsColumn }) {

    // Deletar colunas
    async function deleteColumnFunction(id) {
    try {
        await deleteColumn(id);
        setExistsColumn((prev) => prev.filter((coluna) => coluna.id !== id));
    } catch (error) {
        console.error(error);
    }
    }


  return (
    <div key={coluna.id} className={style.board}>
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
          {Array.isArray(coluna.topics) && coluna.topics.length > 0 ? (
            coluna.topics.map((topic, idx) => (
              <div
                key={idx}
                className={style.topic}
                onClick={() => showTopic(topic)}
              >
                {topic.name}
              </div>
            ))
          ) : (
            <p className="text-muted px-2">Nenhum tópico ainda</p>
          )}
        </div>

        <div
          className={style.add_topic}
          onClick={() => {
            setColumnIdForTopic(coluna.id);
            showAddTopic();
          }}
        >
          + Adicionar tópico
        </div>
      </div>
    </div>
  );
}
