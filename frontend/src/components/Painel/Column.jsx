import { deleteColumn } from "../../js/painel/crudColumn";
import style from "../../css/Painel.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Column({
  coluna,
  showTopic,
  showAddTopic,
  setColumnIdForTopic,
  setExistsColumn,
}) {
  const [loadDeleteColumn, setLoadDeleteColumn] = useState(false);

  // Deletar colunas
  async function deleteColumnFunction(id) {
    try {
      setLoadDeleteColumn(true);
      await deleteColumn(id);
      setExistsColumn((prev) => prev.filter((coluna) => coluna.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadDeleteColumn(false);
    }
  }

  return (
    <div key={coluna.id}>
      <div className={style.column}>
        <div className={style.column_header}>
          <span>
            <Link to={`/financas/${coluna.id}`} className={"text-white text-decoration-none"}>{coluna.name}</Link>
          </span>
          <button
            className={style.trash_button}
            onClick={() => deleteColumnFunction(coluna.id)}
          >
            {loadDeleteColumn ? (
              <div
                className={"spinner-border spinner-border-sm text-white"}
                role="status"
              >
                <span className={"visually-hidden"}></span>
              </div>
            ) : (
              <span>🗑️</span>
            )}
          </button>
        </div>

        <div className={style.topics}>
          {Array.isArray(coluna.topics) && coluna.topics.length > 0 ? (
            coluna.topics.map((topic, idx) => (
              <div
                key={idx}
                className={`${style.topic} text-truncate"`}
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
