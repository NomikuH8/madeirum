import { NavigateFunction } from "react-router"

export {
  getFile,
  getImage,
  checkLogin
}

const mainFolder = '/client/build/'
const imageFolder = mainFolder + 'images/'

function getFile(file: string) {
  return mainFolder + file
}

function getImage(image: string) {
  return imageFolder + image
}

async function checkLogin(token: string, navi: NavigateFunction, setWentWrong: any) {
  const url = document.location.pathname

  if (token === undefined) {
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

  let data = await fetch(`/api/get_usuario?access_token=${token}`)
  .then(res => res.json())
  .catch(reason => setWentWrong('Não foi possível verificar usuário já existente'))

  if (Object.keys(data).length < 3) {
    console.log(url)
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