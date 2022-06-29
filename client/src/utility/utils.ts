import { NavigateFunction } from "react-router"

export {
  getFile,
  getImage,
  checkLogin,
  getUser,
  logoutUser,

  getLanches,
  getCategorias,
  getCategoriaFoto
}

// For development:
const mainFolder = '/'

// For production:
// const mainFolder = '/client/build/'

const imageFolder = mainFolder + 'images/'

function getFile(file: string) {
  return mainFolder + file
}

function getCategoriaFoto(file: string) {
  if (file === null || file === '') {
    return mainFolder + 'images/categoria-placeholder.jpg'
  }
  return mainFolder + 'images/categorias/' + file
}

function getImage(image: string) {
  return imageFolder + image
}

async function checkLogin(token: string, navi: NavigateFunction, setWentWrong: any) {
  const url = document.location.pathname

  if (token === undefined || token === '') {
    if (
      !(url === '/' ||
        url === '/login' ||
        url === '/cadastro')
    )
    navi('/')
    return
  }
  
  if (setWentWrong === null)
    setWentWrong = (a: any) => {}

  setWentWrong('Checando se o token existente é válido...')

  let data = await fetch(`/api/get_usuario`)
  .then(res => res.json())
  .catch(reason => setWentWrong('Não foi possível verificar usuário já existente'))

  if (Object.keys(data).length < 3) {
    if (
      !(
        url === '/login' ||
        url === '/cadastro')
    )
      navi('/')
    return
  }

  if (
    url === '/' ||
    url === '/login' ||
    url === '/cadastro'
  ) {
    navi('/inicio')
  }

  setWentWrong('Login expirado, realize-o de novo')
}

async function getUser(state: any) {
  let user = await fetch(`/api/get_usuario`)
  .then(res => res.json())

  state(user)
}

async function logoutUser(delCookie: any) {
  await fetch(`/api/deslogar_usuario`, {
    method: 'POST',
  })
  delCookie('access-token')
}

async function getCategorias(setCategorias: any) {
  let data = await fetch(`/api/get_categorias`).then(res => res.json())
  setCategorias(data)
}

async function getLanches(setLanches: any, categoria: string) {
  let data = await fetch(`/api/get_lanches?categoria=${categoria}`)
                    .then(res => res.json())
  setLanches(data)
}