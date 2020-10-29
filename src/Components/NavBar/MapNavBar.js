import React, {Component} from 'react';
import styled from "@emotion/styled";
import ProgressBar from "../Character/ProgressBar";
import NavBar from "./NavBar";

const Bar = styled.div`
  padding-top: 5px;
  text-align: center;
`

class MapNavBar extends Component {
  render() {
    return (
      <NavBar>
        <Bar className="col-sm-2 offset-sm-8">
          <div>Niv 12</div>
          <ProgressBar actual={120} max={1200} color="#28A745" transparentColor="#A2CCAA" />
        </Bar>
      </NavBar>
    )
  }
}

export default MapNavBar;