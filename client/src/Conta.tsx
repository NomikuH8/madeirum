/* eslint-disable @typescript-eslint/no-unused-vars */

import { getFile, getUser, logoutUser } from "./utility/utils"
import { Logout, Settings } from "@mui/icons-material"
import { useEffect, useState } from "react"
import ContaDiv from "./styles/contaStyle"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router"

function Conta() {
  const [cookies, setCookie, delCookie] = useCookies(['access-token'])
  const [user, setUser]: any = useState({})
  const navi = useNavigate()

  useEffect(() => {
    getUser(cookies['access-token'], setUser)
  }, [cookies])

  if (user === {})
    return <div className="loading">Loading...</div>
  

  const handleLogout = () => {
    logoutUser(cookies['access-token'], delCookie)
    navi('/')
  }

  return (
    <ContaDiv>
      <div className="info">
        <img src={getFile('pfp.jpg')} alt="foto de perfil" id="pfp" />
        <span>{user['nome']}</span>
      </div>
      <div className="options">
        <button>
          <Settings />
          <span>Configurações</span>
        </button>
        <button onClick={handleLogout}>
          <Logout />
          <span>Sair da conta</span>
        </button>
      </div>
    </ContaDiv>
  )
}

export default Conta