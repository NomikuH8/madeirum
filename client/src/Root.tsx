/* eslint-disable react-hooks/exhaustive-deps */

import { checkLogin, getFile } from "./utility/utils";
import { useNavigate } from 'react-router';
import { useCookies } from "react-cookie";
import Div from "./styles/rootStyle";
import { useEffect } from "react";

function Root() {
  const [cookies] = useCookies(['access-token'])
  const navi = useNavigate()

  useEffect(() => {
    const token = cookies['access-token']
    checkLogin(token, navi, null)
  }, [])

  const handleClick = (to: string) => {
    navi(to)
  }

  return (
    <Div>
      <div id="whiteCover">
        <img src={getFile('favicon.ico')} alt="" />
        <div>
          <button className="loginBtn" onClick={() => handleClick('/login')}>Fazer login</button>
          <button className="cadastroBtn" onClick={() => handleClick('/cadastrar')}>Criar conta</button>
        </div>
      </div>
    </Div>
  )
}

export default Root