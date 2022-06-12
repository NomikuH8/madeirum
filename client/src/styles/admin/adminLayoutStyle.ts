import styled from 'styled-components'

const AdminDiv = styled.div`
display: flex;
`

const AdminLayoutContent = styled.div`
margin: 10px
`

const AdminNav = styled.nav`
background-color: #70233a;
background-color: #edede9;
display: flex;
flex-direction: column;

img {
  height: 20vw;
  max-height: 125px;
}

div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #dfdfda;
  border-radius: 10px;
  padding: 5px;
  margin: 5px; 
  font-size: 10pt;
}

ul {
  padding: 0;
  margin: 0;
  margin-right: 10px;

  display: flex;
  flex-direction: column;
  list-style-type: none;
  gap: 10px;
  margin-top: 10px;
}

li {
  padding: 5px;
}

button {
  outline: none;
  border: 0px solid transparent;
  border-radius: 0 25px 25px 0;
  font-size: 1.125rem;
  text-align: left;
  background-color: #e57596;
}

.selected {
  background-color: #70233a;
  color: #ffffff;
}
`

export {
  AdminDiv,
  AdminLayoutContent,
  AdminNav
}