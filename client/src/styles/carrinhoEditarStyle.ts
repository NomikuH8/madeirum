import styled from "styled-components";

const CarrinhoEditarDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 10px;
flex: 1 1 auto;

#title {
  text-transform: capitalize;
  font-size: 18pt;
  user-select: none;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#observacao {
  resize: none;
  outline: none;
  font-size: 11pt;
  font-family: arial;
  text-align: justify;
  border-radius: 5px;
  border: 1px solid #a5a5a5;
  width: 80vw;
  max-width: 300px;
}

.quantity {
  display: flex;
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
  border-radius: 0 7px 7px 0;
}

#subtQt {
  border-radius: 7px 0 0 7px;
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

#confirm {
  border: 0;
  outline: none;
  width: 60vw;
  max-width: 180px;
  padding: 4px;
  background-color: #e57596;
  border-radius: 5px
}

#confirm:hover {
  background-color: #ef7c9f;
}
`

export default CarrinhoEditarDiv