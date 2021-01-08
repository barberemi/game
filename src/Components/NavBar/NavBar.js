import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const NavBarGlobale = styled.nav`
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  text-shadow: 1px 1px 2px black;
  display: flex;
  flex-direction: row;
  padding-top: 5px;
  padding-bottom: 5px;
`

const Row = styled.div`
  width: 100%;
`

const DisplayFlex = styled.div`
  display: flex;
  flex-direction: row;
`

const Brand = styled.a`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: -20px;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #000;
  background-color: #fff;
`

const NavBar = ({ user, children }) => (
  <NavBarGlobale
    className="navbar-dark bg-dark container-fluid"
    role="navigation"
  >
    <Row>
      <DisplayFlex className="col-sm-12 text-white">
        <Brand className="navbar-brand col-sm-1" href="/maps">
          <img
            src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Index jeu"
          />
        </Brand>
        {children}
        {user && (
          <div className="col-sm-1">
            <Avatar
              src={
                process.env.PUBLIC_URL +
                '/img/academies/' +
                user.academy.name +
                '.png'
              }
              alt="Avatar"
              className="avatar"
            />
          </div>
        )}
      </DisplayFlex>
    </Row>
  </NavBarGlobale>
)

NavBar.propTypes = {
  user: PropTypes.shape({}),
  children: PropTypes.node.isRequired
}

export default NavBar
