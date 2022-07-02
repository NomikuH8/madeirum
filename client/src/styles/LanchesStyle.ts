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
  flex-direction: column;
  width: 100%;
  justify-content: start;
  text-align: justify;
}

.lanches > div {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #646464;
}

.lanches > div:hover {
  background-color: rgba(0,0,0,0.1);
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
  font-size: 12pt;
  color: gray;
  pointer-events: none;
  user-select: none;
  margin: 0 5px;
}

.controls {
  display: flex;
  flex: 1 1 auto;
  justify-content: space-evenly;
}

.controls > button {
  margin: 10px 0;
  font-size: 10pt;
  width: 25vw;
  border: 0;
  outline: none;
  background-color: #e57596;
  border-radius: 5px;
}

.controls > button:hover {
  background-color: #ef7c9f;
}

#observacao {
  margin: 7px 0;
  resize: none;
  outline: none;
  font-size: 11pt;
  font-family: arial;
  width: 55%;
  text-align: justify;
  border-radius: 5px;
  border: 1px solid #a5a5a5;
}

.quantity {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.quantity > button {
  border: 0;
  margin: 0;
  outline: none;
  background-color: #e57596;
  font-size: 11pt;
  width: 26px;
}

#addQt {
  border-radius: 7px 7px 0 0;
}

#subtQt {
  border-radius: 0 0 7px 7px;
}

.quantity > span {
  border: 1px solid #e57596;
  width: 24px;
  text-align: center;
  background-color: white;
}

.quantity > button:hover {
  background-color: #ef7c9f;
}

.expanded {
  align-items: start;
  background-color: white;
}

.expanded > div {
  display: flex;
}
`

export default LanchesDiv