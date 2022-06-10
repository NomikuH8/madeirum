/* eslint-disable react-hooks/exhaustive-deps */

import { useCookies, withCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { checkLogin } from '../utility/utils';
import { useEffect, useState } from 'react';
import LoginDiv from '../styles/loginStyle';

function Login() {
  const [wentWrong, setWentWrong] = useState('')
  const [cookies, setCookie] = useCookies(['access-token'])
  const navi = useNavigate()


  useEffect(() => {
    const token = cookies['access-token']
    checkLogin(token, navi, setWentWrong)
  }, [])

  const enviarLogin = async (e: any) => {
    e.preventDefault()
    setWentWrong('')

    let email: string = e.target[0].value
    let senha: string = e.target[1].value

    let data = await fetch(`/api/logar_usuario`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        senha: senha
      })
    }).then(res => res.json())
    .catch(reason => setWentWrong('Algo inesperado aconteceu... Tente de novo depois'))

    if (data['success']) {
      setCookie('access-token', data['token'], { path: '/' })
      navi('/inicio')
      return
    }

    if (data['help'] === 'user not found')
      setWentWrong('Usuário não encontrado!')
    
    if (data['help'] === 'wrong password')
      setWentWrong('Senha incorreta!')
  }

  return (
    <LoginDiv>
      <p>Login</p>
      <form onSubmit={(e) => enviarLogin(e)} name='loginForm'>
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

        <span>{wentWrong}</span>
        <button type="submit">Logar</button>
      </form>
      <Link to={'/cadastro'}>Não tenho uma conta :(</Link>
    </LoginDiv>
  )
}

export default withCookies(Login)