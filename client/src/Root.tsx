import { Link } from "react-router-dom";

function Root() {
  return (
    <div>
      <Link to={'/login'}>Login</Link>
      <br />
      <Link to={'/cadastro'}>Cadastro</Link>
    </div>
  )
}

export default Root