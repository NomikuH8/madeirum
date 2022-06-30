import styled from 'styled-components'

const LanchesDiv = styled.div`
display: flex;
flex-direction: column;

.info {
  display: flex;
  align-items: center;
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
}

.lanches > div {
  border-bottom: 1px solid black;
  flex: 1 1 auto;
}
`

export default LanchesDiv