import { useState } from "react"

function AdminCategoriasEditar() {
  const [wentWrong, setWentWrong] = useState('')

  const sendForm = async (e: any) => {
    e.preventDefault()

    let nome = e.target[0].value
    let foto = e.target[1].files[0]
    let data: any = new FormData()

    if (foto !== undefined)
      data.append('foto', foto)
    
    if (foto === undefined)
      data = JSON.stringify({})

    let respImage = await fetch(`/api/add_categorias?nome_categoria=${nome}`, {
      method: 'POST',
      body: data
    }).then(res => res.json())

    if (respImage['success'])
      setWentWrong('Categoria criada!')
  }

  return (
    <form onSubmit={(e) => sendForm(e)}>
      <div>
        <label htmlFor="nome">Nome categoria:</label>
        <br />
        <input type="text" name="nome" id="nome" required />
      </div>
      <div>
        <label htmlFor="nome">Foto categoria:</label>
        <br />
        <input type="file" name="foto" id="foto" accept="image/*" />
      </div>
      <span>{wentWrong}</span>
      <input type="submit" value="Criar categoria" />
    </form>
  )
}

export default AdminCategoriasEditar