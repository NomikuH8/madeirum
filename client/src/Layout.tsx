import { Link } from "react-router-dom"
import { Outlet } from "react-router"

function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to={'/'}>Início</Link></li>
          <li><Link to={'/pedidos'}>Pedidos</Link></li>
          <li><Link to={'/sobre'}>Sobre</Link></li>
        </ul>
      </nav>
      <div id="content">
        <Outlet />
      </div>
    </>
  )
}

export default Layout