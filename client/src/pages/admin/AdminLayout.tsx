import { AdminDiv, AdminLayoutContent, AdminNav } from "../../styles/admin/adminLayoutStyle"
import { Outlet, useNavigate } from "react-router"
import { getFile } from "../../utility/utils"

function AdminLayout() {
  const navi = useNavigate()

  const moveToPath = (path: string) => {
    navi(path)
  }

  let menuOptions = [
    {
      'text': 'Início',
      'path': '/admin/inicio'
    },
    {
      'text': 'Categorias',
      'path': '/admin/categorias'
    },
    {
      'text': 'Adicionar pessoas',
      'path': '/admin/mudar-permissoes'
    }
  ]

  return (
    <AdminDiv>
      <AdminNav>
        <div>
          <img src={getFile('logo.svg')} alt="logo" />
          <span>Painel Administrativo</span>
        </div>
        <ul>
          {menuOptions.map((item) =>
            <button 
              className={item.path === document.location.pathname ? 'selected' : ''}
              onClick={() => moveToPath(item.path)}>
                <li>{item.text}</li>
            </button>)}
        </ul>
      </AdminNav>
      <AdminLayoutContent id="content">
        <Outlet />
      </AdminLayoutContent>
    </AdminDiv>
  )
}

export default AdminLayout