import styled from 'styled-components'



const AdminCategoriasDiv = styled.div`
display: flex;
flex: 1 1 auto;

button {
  outline: none;
  border: 0px solid transparent;
  padding: 0;
}

#categorias {
  text-transform: capitalize;
  display: flex;
  flex: 1 1 auto;
  gap: 10px;
}

#categorias > button {
  width: 20vw;
  height: 10vh;
  border-radius: 20px;
  background-size: cover;
  display: flex;
}

#categorias > button > span {
  background-color: rgba(0,0,0,0.4);
  color: white;
  font-weight: bold;
  font-size: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1 1 auto;
  border-radius: 20px;
}

#categorias > button > span:hover {
}

.no-photo {
  background-image: url('/images/categoria-placeholder.jpg')
}
`

export default AdminCategoriasDiv