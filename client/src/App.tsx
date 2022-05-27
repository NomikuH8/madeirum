import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

import Pesquisar from "./Pesquisar";
import Cadastro from "./Cadastro";
import Pedidos from "./Pedidos";
import Layout from "./Layout";
import Conta from "./Conta";
import Sobre from "./Sobre";
import Login from "./Login";
import Root from "./Root";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Root />} />
          <Route path="login" element={<Login />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route element={<Layout />}>
            <Route path="inicio" element={<Home />} />
            <Route path="pesquisar" element={<Pesquisar />} />
            <Route path="pedidos" element={<Pedidos />} />
            <Route path="conta" element={<Conta />} />
            <Route path="sobre" element={<Sobre />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
