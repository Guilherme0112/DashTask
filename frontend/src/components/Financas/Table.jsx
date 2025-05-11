import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import formatDate from "../../js/utils/formatDate";
import { maskValue } from "../../js/utils/maskValue";

export default function Table({ topics }) {

  const [total, setTotal] = useState("");

  useEffect(() => {

    if (!Array.isArray(topics)) return;

    const rawTotal = topics.reduce((acc, topic) => acc + Number(topic.value ?? 0), 0);

    const formattedTotal = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(rawTotal);

    setTotal(formattedTotal);

  })

  return (

    <>
      <table className={"table table-sm mt-5 overflow-hidden rounded"}>
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
            <>
              {topics.map((topic, index) => (
                <tr key={index} className={topic.value < 0 ? `table-danger` : `table-success`}>
                  <td>{topic.name}</td>
                  <td style={{ fontSize: "14px" }} className="text-muted">
                    {topic.description ?? ""}
                  </td>
                  <td>{maskValue(topic.value)}</td>
                  <td>{formatDate(topic.created_at)}</td>
                </tr>
              ))}
              <tr className={"table-primary"}>
                <td colSpan="4">
                  Total: {total}
                </td>
              </tr>
            </>
          ) : (
            <tr className={"table-primary"}>
              <td colSpan="4">
                Sem dados
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </>
  );
}
