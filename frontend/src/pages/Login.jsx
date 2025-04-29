// src/components/Login.jsx
import styles from '../css/Components.module.css';

function Login() {


  // Lógica do formulário


  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.title}>Entrar</h2>

        <input 
          type="email" 
          placeholder="Email" 
          className={styles.input}
        />

        <input 
          type="password" 
          placeholder="Senha" 
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
