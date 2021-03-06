/* eslint-disable react-hooks/exhaustive-deps */

import { getCategoriaFoto, getLanches } from "../utility/utils"
import LancheButton from "../components/LancheComponent"
import LanchesDiv from "../styles/LanchesStyle"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

function Lanches() {
  const [selected, setSelected]: any = useState()
  const [lanches, setLanches]: any = useState([])
  const [cat, setCat]: any = useState({})
  const { categoria } = useParams()

  useEffect(() => {
    getLanches(setCat, setLanches, String(categoria))
  }, [])

  const handleLancheClick = (idx: number) => {
    setSelected(idx)
  }

  if (lanches === [])
    return (
      <div>Carregando...</div>
    )
  
  return (
    <LanchesDiv>
      <div className="info">
        <img src={getCategoriaFoto(cat.foto_categoria)} alt="" />
        <span>{cat.nome_categoria}</span>
      </div>
      <div className="lanches">
        {lanches.map((item: any, idx: any) => {
          return (
            <LancheButton
              key={idx}
              className={selected === idx ? 'expanded' : ''}
              onClick={() => handleLancheClick(idx)}
              lanche={item}
            />
          )
        })}
      </div>
    </LanchesDiv>
  )
}

export default Lanches