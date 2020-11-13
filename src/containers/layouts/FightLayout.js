import React from 'react';
import styled from "@emotion/styled";

const FightContainer = styled.div`
  height: 100vh !important;
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
`

export default ({ children }) => {
  return (
    <FightContainer>
      {children}
    </FightContainer>
  )
}

