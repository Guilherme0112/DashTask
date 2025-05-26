import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Table from "../components/Financas/Table";
import { fetchColumn } from "../js/painel/crudColumn";
import { formatDate } from "../js/utils/formatDate";
import { maskValue } from "../js/utils/maskValue";

function Financas() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [column, setColumn] = useState([]);

  useEffect(() => {
    async function fetchData(idColumn) {
      try {

        const res = await fetchColumn(idColumn);

        const topic = {
          name: "Ganho por KM",
          value: ((res.endKM - res.startKM) * res.valueForKM).toFixed(2),
          description: `Total de quilometros rodados ${res.endKM - res.startKM} km, cobrando R$${maskValue(res.valueForKM)} por quilometro`,
          created_at: new Date().toISOString().replace(/\.\d{3}Z$/, ".000000Z")
        }

        const updatedColumn = {
          ...res,
          topics: [...(res.topics || []), topic],
        };

        setColumn(updatedColumn);

      } catch (error) {
        console.error(error);
        navigate("/painel");

      }
    }
    fetchData(id);

  }, [id]);

  return (
    <main className={"p-5"}>
      <div className="d-flex justify-content-evenly">
        <h1>{column.name}</h1>
        <div className="d-grid text-muted">
          <span>Data do serviço:</span>
          <h5>{formatDate(column.dateOfFleet)}</h5>
        </div>
      </div>

      <div className={"mt-3 mb-3"}>
        <Table topics={column.topics || []} />
      </div>
    </main>
  );
}

export default Financas;
