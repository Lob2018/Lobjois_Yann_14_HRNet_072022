import styled from 'styled-components'

const StyledCopyright = styled.footer`
  display: flex;
  justify-content: center; 
  padding: 2rem 0 1.5rem;
  background-color:#12002b;
  border-top: 2px solid #ccc;
  margin-top:auto; 
  p {
    margin: 0;
    padding: 0;
    color:white;
  }
`

function Footer() {
  return (
    <StyledCopyright>
      <p>Copyright 2022 HRnet</p>
    </StyledCopyright>
  )
}

export default Footer
