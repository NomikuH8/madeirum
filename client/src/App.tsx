import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

import Pesquisar from "./pages/Pesquisar";
import Cadastro from "./pages/Cadastro";
import Pedidos from "./pages/Pedidos";
import Layout from "./pages/Layout";
import Conta from "./pages/Conta";
import Login from "./pages/Login";
import Root from "./pages/Root";
import Home from "./pages/Home";

function App() {
  return (
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// export default withCookies(App);
export default App
