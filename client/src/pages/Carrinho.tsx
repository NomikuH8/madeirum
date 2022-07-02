import { useNavigate } from "react-router"

function Carrinho() {
  const navi = useNavigate()

  const refreshCart = () => {
    localStorage.clear()
    navi(window.location.pathname)
  }

  return (
    <div>
      <button onClick={refreshCart}>excluir pedidos</button>
    </div>
  )
}

export default Carrinho