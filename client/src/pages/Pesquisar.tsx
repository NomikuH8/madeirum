/* eslint-disable react-hooks/exhaustive-deps */

import PesquisarDiv from "../styles/pesquisarStyle"
import { getCategoriaFoto, getCategorias } from "../utility/utils"
import { useEffect, useState } from "react"
import { Search } from "@mui/icons-material"
import { useNavigate } from "react-router"

function Pesquisar() {
  const [categorias, setCategorias]: any = useState([])
  const navi = useNavigate()

  useEffect(() => {
    if (categorias.length === 0)
      getCategorias(setCategorias)
  }, [])

  const handleSearch = (e: any) => {
    const value = document.querySelector('input')!.value.toLowerCase()
    const spans = document.querySelectorAll('.categorias > div > button > span')
    const buttons = document.querySelectorAll('.categorias > div')

    for (let i = 0; i < spans.length; i++) {
      const condition = spans[i].innerHTML.search(value) === -1 ? 'none' : 'flex'
      buttons[i].setAttribute('style', `display: ${condition}`)
    }
  }

  if (categorias === [])
    return <div className="carregando">Carregando...</div>

  return (
    <PesquisarDiv>
      <div className="search">
        <Search />
        <input 
          type="text"
          placeholder="Procurar algo..."
          onChange={handleSearch}
          maxLength={50}
        />
      </div>
      <div className="categorias">
        {categorias.map((categoria: any, idx: number) => {
          return (
            <div key={idx} className={'catDiv'}>
              <button
                style={{backgroundImage: `url(${getCategoriaFoto(categoria.foto_categoria)})`}}
                onClick={() => navi(`/${categoria.nome_categoria}/lanches`)}>
                <span>{categoria.nome_categoria}</span>
              </button>
            </div>
          )
        })}
      </div>
    </PesquisarDiv>
  )
}

export default Pesquisar