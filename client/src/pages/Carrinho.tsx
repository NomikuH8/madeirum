/* eslint-disable react-hooks/exhaustive-deps */

import { ShoppingCart } from "@mui/icons-material"
import CarrinhoDiv from "../styles/carrinhoStyle"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

function Carrinho() {
  const [items, setItems] = useState([])
  const navi = useNavigate()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart')!)
    if (data === null) {
      navi('/inicio')
      return
    }

    setItems(data)
  }, [])

  const clearCart = () => {
    localStorage.clear()
    navi(window.location.pathname)
  }

  const removeItem = (idx: number) => {
    items.splice(idx, 1)
    
    localStorage.setItem('cart', JSON.stringify(items))
    navi(window.location.pathname)
  }

  const getValorTotal = () => {
    let valorTotal = 0
    items.forEach((e: any) => {
      valorTotal += e.preco_produto * e.quantity
    })
    return valorTotal
  }

  let valorTotal = getValorTotal()

  return (
    <CarrinhoDiv>
      <div className="title">
        <ShoppingCart />
        <span>Carrinho</span>
        <ShoppingCart />
      </div>
      <div className="lanches">
        {items.map((item: any, idx: number) => {
          return (
            <div>
              <div className="btn-info">
                <span id="nome-produto">{item.quantity}x. {item.nome_produto}</span>
                <span id="tem-obs">Possui observação: {item.observation ? 'sim' : 'não'}</span>
              </div>
              <span>R${item.quantity * item.preco_produto}</span>
              <div className="btn-button">
                <button onClick={() => navi(`/carrinho/${idx}/editar`)}>Editar</button>
                <button id="btn-excluir" onClick={() => removeItem(idx)}>Excluir</button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="lanches-controls">
        <button onClick={clearCart}>Limpar carrinho</button>
      </div>
      <div className="end-pedido">
        <span id="valor-total">Valor total: R${valorTotal}</span>
        <button>Finalizar pedido</button>
      </div>
    </CarrinhoDiv>
  )
}

export default Carrinho