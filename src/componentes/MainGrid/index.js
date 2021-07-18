import styled from "styled-components"

export const MainGrid = styled.main`
width: 100%;
grid-gap: 10px;
margin-left: auto;
margin-right: auto;
max-width: 500px;
padding: 16px;
.profileArea{
  display:none;
  @media(min-width: 860px){
    display: block;
  }
}
@media(min-width: 860px){
  max-width: 1260px;
  display: grid;
  grid-template-areas: 
  "profileArea welcomeArea profileRealationsArea";
  grid-template-columns: 220px 1fr 384px;
}

`