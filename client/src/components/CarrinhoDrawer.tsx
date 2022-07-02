import CarrinhoDrawerDiv from "../styles/carrinhoDrawerStyle"
import { useNavigate } from "react-router-dom"

function CarrinhoDrawer() {
  const navi = useNavigate()

  let items = JSON.parse(localStorage.getItem('cart')!)

  if (items === null)
    return <></>

  return (
    <CarrinhoDrawerDiv onClick={() => navi('/carrinho')}>
      <span id="ir-carrinho">Ir para o carrinho</span>
      <span>{items.length}</span>
    </CarrinhoDrawerDiv>
  )
}

export default CarrinhoDrawer