import React from 'react';
import styled from "@emotion/styled";

const Background = styled.div`
  font-family: 'Lakki Reddy', cursive;
  height: 100vh;
  background-color: #343a40;
`

export default ({ children }) => {
  return (
    <Background>
      {children}
    </Background>
  )
}

