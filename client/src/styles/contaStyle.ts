import styled from 'styled-components'

const ContaDiv = styled.div`
display: flex;
flex-direction: column;
margin: 10px;

#pfp {
  height: 20vh;
  min-height: 48px;
  max-height: 124px;
  width: auto;
}

div > div {
  display: flex;
  align-items: center;
}

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 20px;
  font-size: 18pt;
}

.options > button {
  border: 0px solid transparent;
  border-top: 1px solid gray;
  outline: none;

  background-color: transparent;

  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
}
`

export default ContaDiv