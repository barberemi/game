import React from 'react';
import styled from "@emotion/styled";
import NavBar from "../../Components/NavBar/NavBar";
import SideBar from "../../Components/SideBar/SideBar";

const Background = styled.div`
  font-family: 'Lakki Reddy', cursive;
  height: 100vh;
  background-color: #343a40;
`

export default ({ children }) => {
  return (
    <Background>
      <NavBar />
      <SideBar />
      {children}
    </Background>
  )
}

