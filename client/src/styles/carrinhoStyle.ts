import styled from "styled-components"

const CarrinhoDiv = styled.div`
.title {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 18pt;
  padding: 10px;
  border-bottom: 1px solid gray;
}

.lanches {
  display: flex;
  flex-direction: column;
}

.lanches > div {
  display: flex;
  margin: 0 4px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  height: 55px;

}

.btn-button {
  display: flex;
  padding: 0 5px;
  gap: 5px;
}

.btn-button > button {
  border: 0;
  background-color: #e57596;
  border-radius: 5px;
  padding: 3px;
}

.btn-button > button:hover {
  background-color: #ef7c9f;
}

#btn-excluir:hover {
  background-color: #fc3f3f;
}

.btn-info {
  display: flex;
  flex-direction: column;
  padding: 0 5px;
}

#nome-produto {
  font-size: 13pt;
}

#tem-obs {
  color: gray;
  font-size: 11pt;
}

/* ------------lanche-------------- */
.lanches-controls {
  display: flex;
  justify-content: flex-end;
}

.lanches-controls > button {
  font-size: 13pt;
  margin: 5px;
  background-color: #e57596;
  border: 0;
  border-radius: 5px;
  padding: 3px 5px;
}

.lanches-controls > button:hover {
  background-color: #fc3f3f;
}

/* --------------end--------------- */
.end-pedido {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px;
  font-size: 16pt;
  gap: 10px;
}

.end-pedido > button {
  border: 0;
  border-radius: 5px;
  background-color: #e57596;
  font-size: 14pt;
}

.end-pedido > button:hover {
  background-color: #7efc7e;
}
`

export default CarrinhoDiv