import React from 'react';
import styled from "@emotion/styled";
import SideBar from "../../Components/SideBar/SideBar";
import ExplorationNavBar from "../../Components/NavBar/ExplorationNavBar";

const Background = styled.div`
  height: 100vh;
  background-color: rgba(0,0,0,0.8) !important;
`

export default ({ children }) => {
  return (
    <Background>
      <ExplorationNavBar />
      <SideBar />
      {children}
    </Background>
  )
}

