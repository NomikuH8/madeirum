import styled from 'styled-components'

const AppDiv = styled.div`
display: flex;
flex-direction: column;
flex: 1 1 auto;
overflow-y: auto;
scrollbar-width: none; /* hide scrollbar in firefox */
-ms-overflow-style: none; /* IE and Edge, thank god idc for IE */
`

export default AppDiv