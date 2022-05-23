import { Article, ArticleOutlined, Face, FaceOutlined, Home, HomeOutlined } from "@mui/icons-material"
import { Outlet, useNavigate } from "react-router"
import { ReactElement, useState } from "react"
import './css/layout.css'


function Layout() {
  const [menuSelected, setMenuSelected] = useState('home')
  let navigate = useNavigate()

  const handleClick = (stateName: string, path: string) => {
    setMenuSelected(stateName)
    navigate(path)
  }

  let icons: any = {
    'home': [<li className="selected"><Home /></li>, <li><HomeOutlined /></li>],
    'pedidos': [<li className="selected"><Article /></li>, <li><ArticleOutlined /></li>],
    'conta': [<li className="selected"><Face /></li>, <li><FaceOutlined /></li>],
  }

  let choseIcons: Array<ReactElement> = []
  for (let i in icons) {
    let chosenIcon = (i === menuSelected) ? 0 : 1
    choseIcons.push(icons[i][chosenIcon])
  }

  return (
    <>
      <div id="content">
        <Outlet />
      </div>
      <nav>
        <ul>
          <button onClick={() => handleClick('home', '/')}>{choseIcons[0]}</button>
          <button onClick={() => handleClick('pedidos', '/pedidos')}>{choseIcons[1]}</button>
          <button onClick={() => handleClick('conta', '/conta')}>{choseIcons[2]}</button>
          {/* <Link to={'/'} onClick={() => setMenuSelected('home')}><li>{homeIcon}</li></Link>
          <Link to={'/pedidos'} onClick={() => setMenuSelected('pedidos')}><li>{pedidosIcon}</li></Link>
          <Link to={'/conta'} onClick={() => setMenuSelected('conta')}><li>{contaIcon}</li></Link> */}
        </ul>
      </nav>
    </>
  )
}

export default Layout