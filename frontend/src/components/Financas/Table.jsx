import formatDate from "../../js/utils/formatDate";
import { maskValue } from "../../js/utils/maskValue";

export default function Table({ topics }) {
  return (
    <table className={"table table-sm mt-5"}>
      <thead>
        <tr className={"table-primary"}>
          <th scope="col">Nome</th>
          <th scope="col">Descrição</th>
          <th scope="col">Valor (R$)</th>
          <th scope="col">Criação</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(topics) && topics.length > 0 ? (
          topics.map((topics, index) => (
            <tr
              key={index}
              className={topics.value < 0 ? `table-danger` : `table-success`}
            >
              <td>{topics.name}</td>
              <td style={{ fontSize: "14px" }} className={"text-muted"}>
                {topics.description ?? ""}
              </td>
              <td>{maskValue(topics.value)}</td>
              <td>{formatDate(topics.created_at)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className={"text-center"}>
              Sem dados
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
