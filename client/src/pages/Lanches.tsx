/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getLanches } from "../utility/utils"

function Lanches() {
  const [lanches, setLanches] = useState([])
  const { categoria } = useParams()

  useEffect(() => {
    getLanches(setLanches, String(categoria))
  }, [])

  if (lanches === [])
    return (
      <div>Carregando...</div>
    )

  return (
    <div>{categoria} page
      {lanches.map((item: any, idx: any) => {
        return (
          <div key={idx}>{item.nome_produto}</div>
        )
      })}
    </div>
  )
}

export default Lanches