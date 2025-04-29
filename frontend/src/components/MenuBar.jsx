import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from "../css/MenuBar.module.css";

function MenuBar() {
    const [menuHidden, setMenuHidden] = useState(true);

    const toggleMenu = () => {
        setMenuHidden(!menuHidden);
    };

    return (
        <div className={`${style.menu} ${menuHidden ? style.menu_hidden : ""}`}>
            <div onClick={toggleMenu} className={style.menuButton}>
                ☰
            </div>

            <div style={{paddingTop: "50px "}}>
                <Link to="/login">Entrar</Link>
                <Link to="/painel">Painel</Link>
                <Link to="/financas">Finanças</Link>
                <Link to="/logout">Sair</Link>
            </div>
        </div>
    );
}

export default MenuBar;
