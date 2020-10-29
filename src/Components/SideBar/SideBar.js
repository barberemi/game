import React, {Component} from 'react';
import styled from "@emotion/styled";
import Items from "./Items";

const SideBarGlobale = styled.nav`
  transition: 0.5s;
  z-index: 1;
`

const Image = styled.img`
  position: absolute;
  
  cursor: pointer;
  -webkit-filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  -ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=1, OffY=1, Color='#444')";
`

const Circle = styled.div`
  background-color: #fcce18;
  // background-color: #182C51;
  border-radius: 0 50% 50% 0;
  width: 250px;
  height: 250px;
  opacity: 0;
  border-top: solid;
  border-right: solid;
  border-bottom: solid;
  // border-color: white;
  border-color: black;
`

const Open = styled(Circle)`
  opacity: 1;
`

class SideBar extends Component {
  state = { isActive: undefined };

  handleToggle = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  render() {
    const isActive = this.state.isActive;

    return (
      <SideBarGlobale className="position-fixed h-75 d-flex align-items-center">
        {isActive === undefined
          ? <Circle><Items /></Circle>
          : (isActive
            ? <Open className="animated fadeInLeft"><Items /></Open>
            : <Circle className="animated fadeOutLeft"><Items /></Circle>
          )
        }
        {/*<Image onClick={this.handleToggle} src={require("./moon.svg")} className="menu-button" alt="moon" width="60px" height="60px" />*/}
        <Image onClick={this.handleToggle} src={require("./sun.svg")} alt="sun" width="70px" height="70px" />
      </SideBarGlobale>
    )
  }
}

export default SideBar;