import CarrinhoDrawerDiv from "../styles/carrinhoDrawerStyle"
import { useNavigate } from "react-router-dom"
import { ShoppingCart } from "@mui/icons-material"

function CarrinhoDrawer() {
  const navi = useNavigate()

  let items = JSON.parse(localStorage.getItem('cart')!)

  if (items === null)
    return <></>

  return (
    <CarrinhoDrawerDiv onClick={() => navi('/carrinho')}>
      <span id="itens-no-carrinho"><ShoppingCart />Itens no carrinho: {items.length}</span>
    </CarrinhoDrawerDiv>
  )
}

export default CarrinhoDrawer