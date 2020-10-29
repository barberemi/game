import React, {Component} from 'react';
import styled from "@emotion/styled";
import Items from "./Items";

const SideBarGlobale = styled.nav`
  top: 30%;
  height: 250px;
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

const Menu = styled.div`
  background-color: #fcce18;
  // background-color: #182C51;
  border-radius: 0 50% 50% 0;
  width: 250px;
  height: 250px;
  border-top: solid;
  border-right: solid;
  border-bottom: solid;
  // border-color: white;
  border-color: black;
  display: none;
`

const InitialMenu = styled(Menu)`
  display: none;
`

const OpenMenu = styled(Menu)`
  display: block;
`

class SideBar extends Component {
  state = { isActive: undefined };

  handleToggle = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  render() {
    const isActive = this.state.isActive;

    return (
      <SideBarGlobale className="position-fixed d-flex align-items-center">
        {isActive === undefined
          ? <InitialMenu><Items /></InitialMenu>
          : (isActive
            ? <OpenMenu className="animated fadeInLeft"><Items /></OpenMenu>
            : <Menu><Items /></Menu>
          )
        }
        {/*<Image onClick={this.handleToggle} src={require("./moon.svg")} className="menu-button" alt="moon" width="60px" height="60px" />*/}
        <Image onClick={this.handleToggle} src={require("./sun.svg")} alt="sun" width="70px" height="70px" />
      </SideBarGlobale>
    )
  }
}

export default SideBar;