import React from 'react';
import styled from "@emotion/styled";
import SideBar from "../../Components/SideBar/SideBar";
import ExplorationNavBar from "../../Components/NavBar/ExplorationNavBar";

const Background = styled.div`
  height: 100vh;
  background-color: #343a40;
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

