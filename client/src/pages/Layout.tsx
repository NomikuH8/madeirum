/* eslint-disable react-hooks/exhaustive-deps */

import {
  Face, FaceOutlined,
  Home, HomeOutlined,
  Search, SearchOutlined,
  Article, ArticleOutlined,
} from "@mui/icons-material"

import { LayoutContent, LayoutNav } from "../styles/layoutStyle";
import CarrinhoDrawer from "../components/CarrinhoDrawer";
import { ReactElement, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { checkLogin } from "../utility/utils"; 
import { useCookies } from "react-cookie";
import AppDiv from "../styles/appStyle";

function Layout() {
  const [menuSelected, setMenuSelected] = useState('inicio')

  const navi = useNavigate()
  const [cookies] = useCookies(['access-token'])

  useEffect(() => {
    const token = cookies['access-token']
    checkLogin(token, navi, null)
  }, [])

  useEffect(() => {
    setMenuSelected(window.location.pathname.slice(1))
  }, [])

  const handleClick = (stateName: string, path: string) => {
    setMenuSelected(stateName)
    navi(path)
  }

  let icons: any = {
    'inicio': [<li className="selected"><Home /></li>, <li><HomeOutlined /></li>],
    'pesquisar': [<li className="selected"><Search /></li>, <li><SearchOutlined /></li>],
    'pedidos': [<li className="selected"><Article /></li>, <li><ArticleOutlined /></li>],
    'conta': [<li className="selected"><Face /></li>, <li><FaceOutlined /></li>]
  }

  let choseIcons: Array<ReactElement> = []
  for (let i in icons) {
    let chosenIcon = (i === menuSelected) ? 0 : 1
    choseIcons.push(icons[i][chosenIcon])
  }

  return (
    <AppDiv>
      <LayoutContent id="content">
        <Outlet />
      </LayoutContent>
      <CarrinhoDrawer />
      <LayoutNav>
        <ul>
          <button onClick={() => handleClick('inicio', '/inicio')}>{choseIcons[0]}</button>
          <button onClick={() => handleClick('pesquisar', '/pesquisar')}>{choseIcons[1]}</button>
          <button onClick={() => handleClick('pedidos', '/pedidos')}>{choseIcons[2]}</button>
          <button onClick={() => handleClick('conta', '/conta')}>{choseIcons[3]}</button>
        </ul>
      </LayoutNav>
    </AppDiv>
  )
}

export default Layout