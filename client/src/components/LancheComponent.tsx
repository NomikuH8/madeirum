import { addOrder } from "../utility/orderWrapper"
import { getLancheFoto } from "../utility/utils"
import { ReactElement, useState } from "react"
import { useNavigate } from "react-router"

function LancheButton(props: any) {
  const [observation, setObservation] = useState('')
  const [quantity, setQuantity] = useState(1)
  const lanche = props.lanche
  const navi = useNavigate()
  
  let inside: ReactElement = <></>

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

    addOrder(data)
    navi(window.location.pathname)
  }

  if (props.className === 'expanded') {
    inside = (
      <div className="other-info">
        <span className="descricao">{lanche.descricao_produto}</span>
        <div className="controls">
          <div className="quantity">
            <button onClick={() => quantityHandler(+1)} id="addQt">+</button>
            <span>{quantity}</span>
            <button onClick={() => quantityHandler(-1)} id="subtQt">-</button>
          </div>
          <textarea
            id="observacao"
            cols={30}
            rows={3}
            placeholder={'Observações (ex.: Tirar milho)'}
            maxLength={100}
            onChange={observationHandler}
            value={observation}
          ></textarea>
          <button onClick={buttonHandler}>Adicionar ao carrinho</button>
        </div>
      </div>
    )
  }

  return (
    <div className={props.className} onClick={props.onClick}>
      <div className="main-info">
        <img src={getLancheFoto(lanche.foto_produto)} alt={lanche.nome_produto} />
        <div>
          <div className="basic-info">
            <span>{lanche.nome_produto}</span>
            <span className="preco">R${lanche.preco_produto}</span>
          </div>
        </div>
      </div>
        {inside}
    </div>
  )
}

export default LancheButton