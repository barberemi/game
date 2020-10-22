import React from 'react';
import styled from "@emotion/styled";

const Background = styled.div`
  background-image: url("https://cdnb.artstation.com/p/assets/images/images/009/758/823/large/nikita-bulatov-0000.jpg?1520752299");
  background-size: cover;
  background-repeat: no-repeat;
  font-family: 'Lakki Reddy', cursive;
  height: 100vh;
`

export default ({ children }) => {
  return (
    <Background>
      {children}
    </Background>
  )
}

