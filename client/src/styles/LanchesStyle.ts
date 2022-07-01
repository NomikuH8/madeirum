import styled from 'styled-components'

const LanchesDiv = styled.div`
display: flex;
flex-direction: column;

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  text-transform: capitalize;
  font-size: 18pt;
  margin: 15px;
}

.info > img {
  border-radius: 50%;
  height: 100px;
  width: auto;
}

.lanches {
  display: flex;
  flex-direction: column;
}

.main-info {
  flex: 0 1 auto;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14pt;
  text-transform: capitalize;
}

.other-info {
  display: flex;
  flex: 1 1 auto;
  justify-content: start;
  margin: 10px;
  margin-top: 0;
  text-align: justify;
}

.lanches > div {
  display: flex;
  flex-direction: column;
  border-top: 1px solid black;
}

.lanches > div:hover {
  background-color: rgba(0,0,0,0.1)
}

.basic-info {
  display: flex;
  flex-direction: column;
  pointer-events: none;
  user-select: none;
}

.preco {
  color: green;
}

.main-info > img {
  border-radius: 20px;
  width: 120px;
  margin: 10px;
  pointer-events: none;
  user-select: none;
}

.descricao {
  text-transform: none;
  font-size: 11pt;
  color: gray;
  pointer-events: none;
  user-select: none;
}

.expanded {
  height: 300px;
  align-items: start;
}

.expanded > div {
  display: flex;
}
`

export default LanchesDiv