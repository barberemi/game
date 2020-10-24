import React from 'react';
import styled from "@emotion/styled";

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.8) !important;
  align-content: center;
  font-family: 'Lakki Reddy', cursive;
  font-size: 2vw;
`

const NavBar = styled.div`
  height: 100px;
`

export default ({ children }) => {
  return (
    <Background>
      <NavBar />
      {children}
    </Background>
  )
}

