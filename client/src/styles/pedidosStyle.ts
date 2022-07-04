import styled from "styled-components";

const PedidosDiv = styled.div`
display: flex;
flex-direction: column;
flex: 1 1 auto;

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 50px;
  border-bottom: 1px solid gray;
}

.title > span {
  font-size: 18pt;
}

.pedidos {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.pedido {
  background-color: #e9e9ed;
  padding: 10px;
  margin: 10px;
  margin-bottom: 0;
  border-radius: 5px;
  height: 30px;
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.pedido:hover {
  background-color: #cfcfd3;
}
`

export default PedidosDiv