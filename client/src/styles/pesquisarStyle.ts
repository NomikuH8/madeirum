import styled from 'styled-components'

const PesquisarDiv = styled.div`
display: flex;
flex-direction: column;
flex: 1 1 auto;
justify-content: center;

.search {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

.search > input {
  border: 1px solid; 
  border-radius: 20px;

  padding: 5px;
  margin-left: 0;
  flex: 1 1 auto;
  max-width: 80%;
  max-width: 520px;
}

.categorias {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  justify-content: center;
}

.catDiv {
  display: flex;
  justify-content: center;
  flex: 1 1 auto;
  max-width: 300px;
}

.catDiv > button {
  height: 90px;
  display: flex;
  flex: 1 1 auto;
  max-width: 300px;
  min-width: 150px;
  border-radius: 20px;
  background-size: cover;
  margin: 0 5px;

  outline: none;
  border: 0px solid transparent;
  padding: 0;
}

.catDiv > button > span {
  background-color: rgba(0,0,0,0.4);
  color: white;
  font-weight: bold;
  font-size: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1 1 auto;
  border-radius: 20px;
  text-transform: capitalize;
}

.catDiv > button > span:hover {
  background-color: rgba(0,0,0,0.6);
}
`

export default PesquisarDiv