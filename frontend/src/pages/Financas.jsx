import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../components/Financas/Table";
import { fetchColumn } from "../js/painel/crudColumn";

function Financas() {
  
  const { id } = useParams();

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    async function fetchData(idColumn) {
      try {
        const res = await fetchColumn(idColumn)
        setColumns(res);
      } catch (error) {
        console.error(error);
      }
    } 
    fetchData(id);
  }, [id]);


  return (
    <main className={"p-5"}>
      <div className={"mt-3 mb-3"}>
        <Table topics={columns.topics} />
      </div>
    </main>
  );
}

export default Financas;
