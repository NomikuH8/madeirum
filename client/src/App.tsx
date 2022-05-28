import { useCookies, withCookies } from 'react-cookie'
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router";
import { useEffect, useState } from 'react'

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
  const [cookies, setCookie] = useCookies(['access-token'])
  const navi = useNavigate()

  useEffect(() => {
    if (!(document.location.pathname === '/login' ||
        document.location.pathname === '/cadastro'))
        return

    let token = cookies['access-token']
    
    if (token === null)
      return
    
    let data: any = fetch(`/api/get_usuario?access_token=${token}`)
                    .then(res => res.json())
    
    if (data.length > 0) {
      navi('/inicio')
      return
    }
  }, [])

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

export default withCookies(App);
