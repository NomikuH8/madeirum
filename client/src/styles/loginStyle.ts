import styled from 'styled-components'

const LoginDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
flex: 1 1 auto;

button, button:focus, button:active {
  outline: none;
  border: 0px solid transparent;
  width: 50vw;
  height: 6vh;
  min-height: 30px;
  max-height: 40px;
  font-size: 100%;
  color: #ffffff;
  background-color: #bb3a61;
}

button:hover {
  background-color: #70233a;
}

input {
  outline: none;
  border-radius: 9px;
  border: 3px dashed #717171;
  width: 50vw;
  height: 5vh;
  font-size: 12pt;
  height: fit-content;
}

input:focus {
  border: 3px solid #70233a;
}

label, span {
  color: #696969;
  font-size: 10pt;
}

p {
  margin-bottom: 10px;
  font-size: 14pt;
}

a, a:visited {
  color: #a0a0a0;
  margin-top: 10px;
  text-decoration: underline;
}

input, form, button, label, form > span {
  width: 50vw;
  max-width: 300px;
  min-width: 150px;
}

form > span {
  text-align: center;
}

form {
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 0 1 auto;
  height: fit-content;
  background-color: #e3e3e3;
  padding: 5vh 7vw;
  border-radius: 10px; 
  min-width: 200px;
  max-width: 300px;
}
`

export default LoginDiv