import React, { Component } from 'react'
import Cookies from 'js-cookie'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const Bar = styled.div`
  position: fixed;
  height: 100%;
  z-index: 100;

  @media (max-width: 768px) {
    display: none;
    margin-left: -200px;
  }
`

const Nav = styled.nav`
  height: 100%;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  overflow-y: scroll;

  min-width: 200px;
  max-width: 200px;
`

const Header = styled.div`
  padding: 20px;
  border-bottom: solid 1px white;
`

const ComponentList = styled.ul`
  padding: 20px 0;
`

const ComponentSubList = styled.ul`
  padding: 0 0 0 20px;
`

const LinkMenu = styled(Link)`
  color: inherit;
  text-decoration: none;
  text-align: left;
  padding: 10px 30px 10px 10px;
  display: block;

  &:hover {
    text-decoration: none;
    color: #f26725;
    background: #fff;
  }

  ${(props) =>
    _.includes(window.location.href, props.link) &&
    css`
      color: #f26725;
    `};
`

const CollapsedMenu = styled.a`
  color: inherit;
  text-decoration: none;
  text-align: left;
  padding: 10px 30px 10px 10px;
  display: block;

  &:hover {
    text-decoration: none;
    color: #f26725 !important;
    background: #fff;
    cursor: pointer;
  }

  ${(props) =>
    _.includes(window.location.href, props.link) &&
    css`
      color: #f26725;
    `};
`

const Footer = styled.div`
  position: absolute;
  text-align: center;
  bottom: 0;
  width: 100%;
  font-size: 10px;
  padding-bottom: 10px;
`

class SideBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayCharacterSubMenu: false,
      displayGuildSubMenu: false
    }
  }

  render() {
    const { displayCharacterSubMenu, displayGuildSubMenu } = this.state

    return (
      <Bar>
        <Nav>
          <Header className="text-center">
            <Link to={'/home'}>
              <img
                src={process.env.PUBLIC_URL + '/img/logo.png'}
                alt="Logo"
                width="100px"
              />
            </Link>
          </Header>

          <ComponentList>
            {/* Home */}
            <div>
              <LinkMenu to={'/home'} link="home">
                <i className="fa fa-globe-europe" /> Carte du monde
              </LinkMenu>
            </div>

            {/* Character */}
            <div>
              <CollapsedMenu
                onClick={() =>
                  this.setState({
                    displayCharacterSubMenu: !displayCharacterSubMenu
                  })
                }
              >
                <i className="fa fa-user-circle" /> Personnage{' '}
                <div className="float-right">
                  <i className="fas fa-caret-down" />
                </div>
              </CollapsedMenu>
              <ComponentSubList
                style={{
                  display: displayCharacterSubMenu ? 'block' : 'none'
                }}
              >
                <LinkMenu
                  to={'/character#generalTab'}
                  link="character#generalTab"
                >
                  Général
                </LinkMenu>
                <LinkMenu
                  to={'/character#skillsTab'}
                  link="character#skillsTab"
                >
                  Compétences
                </LinkMenu>
                <LinkMenu to={'/character#itemsTab'} link="character#itemsTab">
                  Inventaire
                </LinkMenu>
                <LinkMenu to={'/character#jobsTab'} link="character#jobsTab">
                  Métier
                </LinkMenu>
                <LinkMenu
                  to={'/character#constructionsTab'}
                  link="character#constructionsTab"
                >
                  Constructions
                </LinkMenu>
                <LinkMenu
                  to={'/character#friendsTab'}
                  link="character#friendsTab"
                >
                  Amis
                </LinkMenu>
              </ComponentSubList>
            </div>

            {/* Guild */}
            <div>
              <CollapsedMenu
                onClick={() =>
                  this.setState({
                    displayGuildSubMenu: !displayGuildSubMenu
                  })
                }
              >
                <i className="fa fa-users" /> Guilde
                <div className="float-right">
                  <i className="fas fa-caret-down" />
                </div>
              </CollapsedMenu>
              <ComponentSubList
                style={{
                  display: displayGuildSubMenu ? 'block' : 'none'
                }}
              >
                <LinkMenu to={'/guild#generalTab'} link="guild#generalTab">
                  Général
                </LinkMenu>
                <LinkMenu to={'/guild#chatTab'} link="guild#chatTab">
                  Discussion
                </LinkMenu>
                <LinkMenu
                  to={'/guild#constructionsTab'}
                  link="guild#constructionsTab"
                >
                  Constructions
                </LinkMenu>
                <LinkMenu to={'/guild#membersTab'} link="guild#membersTab">
                  Membres
                </LinkMenu>
                <LinkMenu
                  to={'/guild#itemsGuildTab'}
                  link="guild#itemsGuildTab"
                >
                  Banque
                </LinkMenu>
                <LinkMenu to={'/guild#fightBossTab'} link="guild#fightBossTab">
                  Combat champion
                </LinkMenu>
              </ComponentSubList>
            </div>

            {/* Monsters */}
            <div>
              <LinkMenu to={'/boss'} link="boss">
                <i className="fab fa-optin-monster" /> Monstres
              </LinkMenu>
            </div>

            {/* Crafting */}
            <div>
              <LinkMenu to={'/crafting'} link="crafting">
                <i className="fas fa-hammer" /> Forge
              </LinkMenu>
            </div>

            {/* Logout */}
            <div>
              <LinkMenu
                to={'/login'}
                onClick={() =>
                  Cookies.remove('auth-token', {
                    path: '',
                    domain: 'localhost'
                  })
                }
              >
                <i className="fa fa-sign-out-alt" /> Déconnexion
              </LinkMenu>
            </div>
          </ComponentList>
          <Footer>© 2021 RemCorp</Footer>
        </Nav>
      </Bar>
    )
  }
}

export default SideBar
