import styled from 'styled-components'



const AdminCategoriasDiv = styled.div`
display: flex;
flex: 1 1 auto;

#categorias {
  text-transform: capitalize;
  display: flex;
  flex: 1 1 auto;
  gap: 10px;
}

#categorias > div {
  width: 20vw;
  height: 10vh;
  border-radius: 20px;
  background-size: cover;
  display: flex;
}

#categorias > div > span {
  background-color: rgba(0,0,0,0.4);
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1 1 auto;
  border-radius: 20px;
}

.no-photo {
  background-image: url('/images/categoria-placeholder.jpg')
}
`

  // width: 20vw;
  // height: 10vh;
export default AdminCategoriasDiv