import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Auth/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthorization } = useAuth();

  // Submit login
  async function submit(event) {
    event.preventDefault();

    // Cria o objeto do formulário e adiciona os valroes
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    // Faz a requisição
    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    // Verifica se retornou erro
    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.message || "Erro ao fazer login");
      return;
    }

    setAuthorization(true);

    // Se não teve erro, redireciona para o painel
    navigate("/painel");
  }

  return (
    // Início do formulário
    <main className={"h-100 d-flex align-items-center flex-wrap"}>
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
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;
