import { Link, useNavigate } from 'react-router-dom'
import Div from './styles/loginStyle'
import { useEffect, useState } from 'react'
import { useCookies, withCookies } from 'react-cookie'

function Login() {
  const [wentWrong, setWentWrong] = useState('')
  const [cookies, setCookie] = useCookies(['access-token'])
  const navi = useNavigate()

  useEffect(() => {
    let token = cookies['access-token']
    
    if (token === null)
      return
    
    let data: any = fetch(`/api/get_usuario?access_token=${token}`)
                .then(res => res.json())
                .catch(reason => setWentWrong('Não foi possível verificar usuário já existente'))
    
    if (data.length > 0) {
      navi('/inicio')
      return
    }

    setWentWrong('Login expirado, realize-o de novo')
  }, [])

  const enviarLogin = async (e: any) => {
    e.preventDefault()
    setWentWrong('')

    let email: string = e.target[0].value
    let senha: string = e.target[1].value

    let data = await fetch(`/api/logar_usuario?email=${email}&senha=${senha}`, {
      method: 'POST'
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
    <Div>
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
    </Div>
  )
}

export default withCookies(Login)