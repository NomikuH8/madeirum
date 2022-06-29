import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

import AdminCategoriasEditar from "./pages/admin/AdminCategoriasEditar";
import AdminMudarPermissoes from "./pages/admin/AdminMudarPermissoes";
import AdminCategorias from "./pages/admin/AdminCategorias";
import AdminLanches from "./pages/admin/AdminLanches";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import Pesquisar from "./pages/Pesquisar";
import Cadastro from "./pages/Cadastro";
import Lanches from "./pages/Lanches";
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
          <Route path=":categoria/lanches" element={<Lanches />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="admin/inicio" element={<AdminHome />} />
          <Route path="admin/categorias" element={<AdminCategorias />} />
          <Route path="admin/:categoria/lanches" element={<AdminLanches />} />
          <Route path="admin/:categoria/editar" element={<AdminCategoriasEditar />} />
          <Route path="admin/mudar-permissoes" element={<AdminMudarPermissoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
