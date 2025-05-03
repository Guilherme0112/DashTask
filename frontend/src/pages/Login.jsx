import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(event) {

    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.message || "Erro ao fazer login");
      return;
    }

    navigate("/painel");
  }

  return (
    <form
      class="border p-5 rounded shadow"
      style={{ width: "400px" }}
      onSubmit={submit}
    >
      <div class="mb-3 text-start">
        <label htmlFor="exampleInputEmail1" class="form-label">
          Email
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div class="mb-3 text-start">
        <label htmlFor="exampleInputPassword1" class="form-label">
          Senha
        </label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <button type="submit" class="btn btn-primary">
        Entrar
      </button>
    </form>
  );
}

export default Login;
