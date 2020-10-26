import React, {Component} from 'react';
import styled from "@emotion/styled";

const NavBarGlobale = styled.nav`
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  text-shadow: 1px 1px 2px black;
`

const NavBarRight = styled.div`
  display: flex;
  flex-direction: row;
`

const MessageBox = styled.div`
  padding: 30px 15px 0px 0px;
`

const ProgressLevel = styled.div`
  padding-top: 15px;
  padding-right: 10px;
  text-align: center;
`

const Avatar = styled.img`
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

class NavBar extends Component {
  render() {
    return (
      <NavBarGlobale className="navbar navbar-dark bg-dark" role="navigation">
        <a className="navbar-brand" href="#">
          <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30"
               className="d-inline-block align-top" alt="" />
          &nbsp;My Game
        </a>
        <NavBarRight className="text-white">
          <MessageBox>
            <i className="far fa-envelope"/>
          </MessageBox>
          <ProgressLevel>
            <div>Niveau 12</div>
            <div className="progress" style={{ height: "5px", width: "100px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </ProgressLevel>
          <Avatar src="https://miro.medium.com/max/3150/1*TCbE00-xcH2bOEV_OmHt5w.jpeg" alt="Avatar" className="avatar" />
        </NavBarRight>
      </NavBarGlobale>
    )
  }
}

export default NavBar;