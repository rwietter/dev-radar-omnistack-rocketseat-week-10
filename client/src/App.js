import React, { useEffect, useState } from "react";
import Form from "./components/form/form";
import Main from "./components/main/main";
import "./css/app.css";
import "./css/global.css";
import "./css/main.css";
import "./css/sidebar.css";
import api from "./services/api";

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);
    console.log(response.data);

    setDevs([...devs, response.data]); // - copiar os devs e adicionar o novo (imutabilidade = recriar do zero)
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <Form onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <Main dev={dev} key={dev._id} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
