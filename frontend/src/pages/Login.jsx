function Login() {


  

  return (
    <form class="border p-5 rounded shadow" style={{width: "400px"}}>
      <div class="mb-3 text-start">
        <label htmlFor="exampleInputEmail1" class="form-label">
          Email
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
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
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Entrar
      </button>
    </form>
  );
}

export default Login;
