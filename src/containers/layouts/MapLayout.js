import React from 'react';
import styled from "@emotion/styled";
import MapNavBar from "../../Components/NavBar/MapNavBar";
import SideBar from "../../Components/SideBar/SideBar";

const Background = styled.div`
  height: 100vh;
  background-color: #343a40;
`

export default ({ children }) => {
  return (
    <Background>
      <MapNavBar />
      <SideBar />
      {children}
    </Background>
  )
}

