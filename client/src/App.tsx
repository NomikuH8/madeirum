import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

import Pedidos from "./Pedidos";
import Layout from "./Layout";
import Sobre from "./Sobre";
import Home from "./Home";
import Conta from "./Conta";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="sobre" element={<Sobre />} />
            <Route path="pedidos" element={<Pedidos />} />
            <Route path="conta" element={<Conta />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
