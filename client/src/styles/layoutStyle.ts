import styled from 'styled-components'

const LayoutNav = styled.nav`
display: flex;
width: 100%;
height: fit-content;
margin: 0;
background-color: #70233a;

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  align-items: center;
}

ul > button {
  text-decoration: none;
  color: #70233a;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1vh 1vw;
}

button, button:focus, button:active {
  outline: none;
  border: 0px solid transparent;
}

button > li {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.selected {
  padding: 0.8vh 0;
  border-radius: 0 0 10px 10px;
  background-color: #e57596;
}
`

const LayoutContent = styled.div`
display: flex;
flex-direction: column;
flex: 1 1 auto;
overflow-y: auto;
scrollbar-width: none; /* hide scrollbar in firefox */
-ms-overflow-style: none; /* IE and Edge, thank god idc for IE */
`

export {
  LayoutNav,
  LayoutContent
}