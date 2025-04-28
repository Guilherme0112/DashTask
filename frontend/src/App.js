import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Meu App</h1>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Aumentar</button>
    </div>
  );
}

export default App;
