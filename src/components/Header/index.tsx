import styled from 'styled-components'
import { StyledLink } from '../../utils/style/GlobalStyle'

const LogoStyled = styled.div`
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  font-weight: bold;
`

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  background-color: #12002b;
  a {
    font-weight: bold;
    color: #fff;
  }
`
const StyledNavDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

function Header() {
  return (
    <NavContainer>
      <StyledLink to="/">
        <LogoStyled>HRnet</LogoStyled>
      </StyledLink>
      <StyledNavDiv>
        <StyledLink to="/">
          <i className="fa fa-user-circle"></i>Home
        </StyledLink>
        <StyledLink to="/employees">
          <i className="fa fa-user-circle"></i>Employees
        </StyledLink>
      </StyledNavDiv>
    </NavContainer>
  )
}

export default Header
