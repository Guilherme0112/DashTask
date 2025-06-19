import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Auth/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loadLogin, setLoadLogin] = useState(false);

  const navigate = useNavigate();
  const { setAuthorization } = useAuth();

  async function submit(event) {

    setLoadLogin(true);
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const res = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        if(res.status() === 401){
          setError("Erro ao fazer login");
          return;
        }

        const errorData = await res.json();
        throw errorData;
      }
      setAuthorization(true);

      navigate("/painel");
    } catch (error) {
      setError("Erro ao fazer login");
    } finally {
      setLoadLogin(false);
    }
  }

  return (
    <main
      className={
        "h-100 d-flex align-items-center justify-content-center flex-wrap"
      }
    >
      <form
        className="border p-5 rounded shadow"
        style={{ width: "400px" }}
        onSubmit={submit}
      >
        {/* Email */}
        <div className="mb-3 text-start">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Fim do email */}

        {/* Senha */}
        <div className="mb-3 text-start">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Senha
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Fim da senha */}

        {/* Mensagem de erro */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Botão para fazer login */}
        <button type="submit" className="btn btn-primary" disabled={loadLogin}>
          {loadLogin ? (
            <div className={"spinner-border spinner-border-sm text-white"} role="status">
              <span className={"visually-hidden"}></span>
            </div>
          ) : (
            "Entrar"
          )}
        </button>
      </form>
    </main>
  );
}

export default Login;
