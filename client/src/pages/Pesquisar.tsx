/* eslint-disable react-hooks/exhaustive-deps */

import PesquisarDiv from "../styles/pesquisarStyle"
import { getCategorias } from "../utility/utils"
import { useEffect, useState } from "react"

function Pesquisar() {
  const [categorias, setCategorias]: any = useState([])

  useEffect(() => {
    if (categorias.length === 0)
      getCategorias(setCategorias)
  }, [])

  const handleSearch = (e: any) => {
    let value = document.querySelector("input")!.value
  }

  console.log(categorias);
  

  if (categorias === [])
    return <div className="carregando">Carregando...</div>

  if (categorias === {})
    window.location.reload()
    
  return (
    <PesquisarDiv>
      <div className="search">
        <input 
          type="text"
          placeholder="Procurar algo..."
          onChange={handleSearch}
          maxLength={50}
        />
      </div>
      <div className="categorias">
        {categorias.map((categoria: any, idx: number) => {
          return <button key={idx}>{categoria.nome_categoria}</button>
        })}
      </div>
    </PesquisarDiv>
  )
}

export default Pesquisar