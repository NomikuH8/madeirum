import styled from 'styled-components'

const CarrinhoDrawerDiv = styled.div`
background-color: #e57596;
padding: 10px;
display: flex;
justify-content: space-between;
align-items: center;
user-select: none;

:hover {
  background-color: #ef7c9f;
}

svg {
  fill: #70233a;
}

#itens-no-carrinho {
  display: flex;
  align-items: center;
  gap: 10px;
}
`

export default CarrinhoDrawerDiv