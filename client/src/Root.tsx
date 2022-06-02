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

  const meuLink = <a href="https://github.com/NomikuH8">NomikuH8</a>
  const codigoFonte = <a href="https://github.com/NomikuH8/madeirum">Github</a>

  return (
    <Div>
      <div id="whiteCover">
        <img src={getFile('logo.svg')} alt="" />
        <div>
          <button className="loginBtn" onClick={() => handleClick('/login')}>Fazer login</button>
          <button className="cadastroBtn" onClick={() => handleClick('/cadastro')}>Criar conta</button>
        </div>
      <span id="about">Feito por {meuLink}. Código fonte: {codigoFonte}</span>
      </div>
    </Div>
  )
}

export default Root