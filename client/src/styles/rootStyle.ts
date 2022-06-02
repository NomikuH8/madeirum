import styled from 'styled-components'
import { getFile } from '../utility/utils'

const bg = getFile('root-bg.jpg')

const Div = styled.div`
display: flex;
flex: 1 1 auto;
flex-direction: column;
justify-content: center;
align-items: center;
background-image: url(${bg});
background-size: cover;

#whiteCover {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  gap: 30px
}

img {
  height: 25vh;
}

button, button:focus, button:active {
  outline: none;
  border: 0px solid transparent;
  background-color: #bb3a61;
  height: 5vh;
  min-height: 50px;
  min-width: 150px;
  border-radius: 10px;
  padding: 10px;
  margin: 1px;
  font-size: 18pt;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loginBtn {
  color: rgba(255, 255, 255, 0.9);
}

.cadastroBtn {
  background-color: transparent;
  border: 5px solid #bb3a61;
  color: rgba(0, 0, 0, 0.8)
}
`

export default Div