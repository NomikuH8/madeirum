import { Receipt } from "@mui/icons-material"
import { useEffect, useState } from "react"
import PedidosDiv from "../styles/pedidosStyle"
import { getOrders } from "../utility/orderWrapper"

function Pedidos() {
  const [orders, setOrders]: any = useState([])

  useEffect(() => {
    getOrders(setOrders)
  }, [])

  let conteudo = <></>

  if (orders === [])
    conteudo = <div>Carregando...</div>
  
  if (typeof orders === 'object')
    conteudo = <div className="nenhum-pedido">Nenhum pedido até agora :(</div>

  if (orders.length > 0) {
    conteudo = orders.map((pedido: any, idx: number) => {
      return (
        <div className="pedido">
          <span>Pedido #{pedido[0]}</span>
        </div>
      )
    })
  }
  
  return (
    <PedidosDiv>
      <div className="title">
        <Receipt />
        <span>Pedidos</span>
        <Receipt />
      </div>
      <div className="pedidos">
        {conteudo}
      </div>
    </PedidosDiv>
  )
}

export default Pedidos