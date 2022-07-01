import { getLancheFoto } from "../utility/utils"
import { ReactElement } from "react"

function LancheButton(props: any) {
  const lanche = props.lanche
  let inside: ReactElement = <></>

  if (props.className === 'expanded') {
    inside = (
      <div className="other-info">
        <span className="descricao">{lanche.descricao_produto}</span>
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