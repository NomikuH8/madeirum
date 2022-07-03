/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import CarrinhoEditarDiv from "../styles/carrinhoEditarStyle"
import { changeOrder } from "../utility/orderWrapper"

function CarrinhoEditar() {
  const [observation, setObservation] = useState('')
  const [quantity, setQuantity]: any = useState(1)
  const [lanche, setLanche]: any = useState({})
  const { index }: any = useParams()
  const navi = useNavigate()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart')!)

    if (data === null) {
      navi('/inicio')
      return
    }

    setLanche(data[index]) 
    setQuantity(data[index].quantity)
    setObservation(data[index].observation)
  }, [])

  const quantityHandler = (amount: number) => {
    if (
      quantity + amount > 0 &&
      quantity + amount < 100 
    )
      setQuantity(quantity + amount)
  }

  const observationHandler = () => {
    const val: any = document.querySelector('#observacao')!
    setObservation(val.value)
  }

  const buttonHandler = () => {
    let data = {
      'id_produto': lanche.id_produto,
      'nome_produto': lanche.nome_produto,
      'preco_produto': lanche.preco_produto,
      'observation': observation,
      'quantity': quantity,
    }

    changeOrder(data, index)
    navi('/carrinho')
  }

  return (
    <CarrinhoEditarDiv className="carrinho-editar">
      <span id="title">{lanche.nome_produto}</span>
      <div className="controls">
        <textarea
          id="observacao"
          cols={30}
          rows={3}
          placeholder={'Observações (ex.: Tirar milho)'}
          maxLength={100}
          onChange={observationHandler}
          value={observation}
        ></textarea>
        <div className="quantity">
          <button onClick={() => quantityHandler(-1)} id="subtQt">-</button>
          <span>{quantity}</span>
          <button onClick={() => quantityHandler(+1)} id="addQt">+</button>
        </div>
      </div>
      <span id="preco">Valor total: {lanche.preco_produto * quantity}</span>
      <button id="confirm" onClick={buttonHandler}>Confirmar</button>
    </CarrinhoEditarDiv>
  )
}

export default CarrinhoEditar