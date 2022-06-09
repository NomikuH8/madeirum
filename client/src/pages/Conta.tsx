/* eslint-disable @typescript-eslint/no-unused-vars */

import { getFile, getUser, logoutUser } from "../utility/utils"
import { Close, Info, Logout } from "@mui/icons-material"
import { useEffect, useState } from "react"
import ContaDiv from "../styles/contaStyle"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router"

function Conta() {
  const [cookies, setCookie, delCookie] = useCookies(['access-token'])
  const [activeMenu, setActiveMenu]: any = useState()
  const [user, setUser]: any = useState({})
  const navi = useNavigate()

  const handleLogout = () => {
    logoutUser(cookies['access-token'], delCookie)
    navi('/')
  }

  let infoMenu: any
  let mainMenu: any

  mainMenu = (
    <>
      <button onClick={() => setActiveMenu(infoMenu)}>
        <Info />
        <span>Informações</span>
      </button>
      <button onClick={handleLogout}>
        <Logout />
        <span>Sair da conta</span>
      </button>
    </>
  )

  infoMenu = (
    <>
      <button>
        <span>Versão 0.0.1-dev</span>
      </button>
      <button>
        <span>Feito por <a href="https://github.com/NomikuH8">NomikuH8</a></span>
      </button>
      <button>
        <span>Repositório: <a href="https://github.com/NomikuH8/madeirum">Github</a></span>
      </button>
      <button onClick={() => setActiveMenu(mainMenu)}>
        <Close />
        <span>Voltar</span>
      </button>
    </>
  )

  useEffect(() => {
    getUser(cookies['access-token'], setUser)
    setActiveMenu(mainMenu)
    // eslint-disable-next-line
  }, [cookies])

  if (user === {})
    return <div className="loading">Loading...</div>




  return (
    <ContaDiv>
      <div className="info">
        <img src={getFile('pfp.jpg')} alt="foto de perfil" id="pfp" />
        <span>{user['nome']}</span>
      </div>
      <div className="options">
        {activeMenu}
      </div>
    </ContaDiv>
  )
}

export default Conta