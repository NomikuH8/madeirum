import './css/login.css'

function Login() {
  const enviarLogin = () => {

  }

  return (
    <>
    <form onSubmit={enviarLogin} method="post">
      <div id="emailDiv">
        <label htmlFor="email">E-mail:</label>
        <br />
        <input type="text" id='email' name='email' required />
      </div>

      <div id="senhaDiv">
        <label htmlFor="senha">Senha:</label>
        <br />
        <input type="text" id='senha' name='senha' required />
      </div>

      <button type="submit">Logar</button>
    </form>
    </>
  )
}

export default Login