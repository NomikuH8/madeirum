/* eslint-disable react-hooks/exhaustive-deps */

import { useCookies, withCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { checkLogin } from '../utility/utils';
import { useEffect, useState } from 'react';
import LoginDiv from '../styles/loginStyle';

function Cadastro() {
  const [wentWrong, setWentWrong] = useState('')
  const [cookies] = useCookies(['access-token'])
  const navi = useNavigate()

  useEffect(() => {
    const token = cookies['access-token']
    checkLogin(token, navi, setWentWrong)
  }, [])

  const enviarCadastro = async (e: any) => {
    e.preventDefault()
    setWentWrong('')

    let nome: string = e.target[0].value
    let email: string = e.target[1].value
    let senha: string = e.target[2].value
    let confSenha: string = e.target[3].value

    if (senha !== confSenha) {
      setWentWrong('Senhas não correspondem')
      return
    }

    let url = `/api/cadastrar_usuario?nome=${nome}&email=${email}&senha=${senha}`
    let data = await fetch(url, {
      method: 'POST'
    })
    .then(res => res.json())
    .catch((reason => setWentWrong('Algo inesperado aconteceu... Tente de novo depois')))

    if (data['success']) {
      navi('/login')
      return
    }

    if (data['help'] === 'email already used') {
      setWentWrong('Email já cadastrado')
      return
    }

    setWentWrong('Não foi possível criar sua conta, provavelmente erro no servidor!')
  }

  return (
    <LoginDiv>
      <p>Cadastro</p>
      <form onSubmit={(e) => enviarCadastro(e)} name='loginForm'>
        <div id="nomeDiv">
          <label htmlFor="email">Nome:</label>
          <br />
          <input type="text" id='nome' name='nome' required />
        </div>

        <div id="emailDiv">
          <label htmlFor="email">E-mail:</label>
          <br />
          <input type="email" id='email' name='email' required />
        </div>

        <div id="senhaDiv">
          <label htmlFor="senha">Senha:</label>
          <br />
          <input type="password" id='senha' name='senha' required />
        </div>

        <div id="senhaDiv">
          <label htmlFor="confSenha">Confirmar senha:</label>
          <br />
          <input type="password" id='confSenha' name='confSenha' required />
        </div>

        <span>{wentWrong}</span>
        <button type="submit">Cadastrar</button>
      </form>
      <Link to={'/login'}>Já tenho uma conta</Link>
    </LoginDiv>
  )
}

export default withCookies(Cadastro)