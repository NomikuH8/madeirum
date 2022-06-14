import AdminCategoriasDiv from "../../styles/admin/adminCategoriasStyle"
import { getCategoriaFoto, getCategorias } from "../../utility/utils"
import { useEffect, useState } from "react"

function AdminCategorias() {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    getCategorias(setCategorias)
  }, [])

  if (categorias === [])
    return (<div>Carregando...</div>)

  return (
    <AdminCategoriasDiv>
      <div id="categorias">
        {categorias.map((item: any) => { return (
          <div style={{backgroundImage: `url(${getCategoriaFoto(item.foto_categoria)})`}}>
            <span>{item.nome_categoria}</span>
          </div>
        )})}
      </div>
    </AdminCategoriasDiv>
  )
}

export default AdminCategorias