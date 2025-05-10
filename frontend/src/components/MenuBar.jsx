import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../css/MenuBar.module.css";
import { useAuth } from "./Auth/AuthContext";

function MenuBar() {
  const { setAuthorization, authorization } = useAuth();
  const [menuHidden, setMenuHidden] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuHidden(!menuHidden);
  };

  async function logout() {
    try {
      const res = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        console.error(await res.json());
        alert("ocorreu algum erro ao fazer logout");
        return;
      }

      setAuthorization(false);

      return navigate("/");
    } catch (error) {
      console.error(error);
      setAuthorization(false);
      return navigate("/");
    }
  }

  return (
    <>
      <div onClick={toggleMenu} className={style.menuButton}>
        ☰
      </div>
      <div className={`${style.menu} ${menuHidden ? style.menu_hidden : ""}`}>
        <div style={{ paddingTop: "50px " }}>
          {authorization ? (
            <>
              <Link to="/painel">Painel</Link>
              <Link to="/financas">Finanças</Link>
              <button onClick={logout} className={"btn text-primary"}>Sair</button>
            </>
          ) : (
            <Link to="/">Entrar</Link>
          )}
        </div>
      </div>
    </>
  );
}

export default MenuBar;
