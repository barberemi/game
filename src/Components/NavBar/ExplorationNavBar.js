import React, { Component } from 'react'
import styled from '@emotion/styled'
import ProgressBar from '../Character/ProgressBar'
import NavBar from './NavBar'

const Bar = styled.div`
  padding-top: 5px;
  text-align: center;
`

const MoneyBox = styled.div`
  text-align: center;
  padding-top: 5px;
`

const Avatars = styled.div`
  display: flex;
`

const List = styled.div`
  &:not(:last-child) {
    margin-right: -0.75rem;
  }
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  border-radius: 50%;
`

class ExplorationNavBar extends Component {
  render() {
    return (
      <NavBar>
        <Avatars className="col-sm-4 offset-sm-1">
          <List>
            <Avatar
              src="https://miro.medium.com/max/3150/1*TCbE00-xcH2bOEV_OmHt5w.jpeg"
              alt="Avatar"
              className="avatar"
            />
          </List>
          <List>
            <Avatar
              src="https://miro.medium.com/max/3150/1*TCbE00-xcH2bOEV_OmHt5w.jpeg"
              alt="Avatar"
              className="avatar"
            />
          </List>
          <List>
            <Avatar
              src="https://miro.medium.com/max/3150/1*TCbE00-xcH2bOEV_OmHt5w.jpeg"
              alt="Avatar"
              className="avatar"
            />
          </List>
          <List>
            <Avatar
              src="https://miro.medium.com/max/3150/1*TCbE00-xcH2bOEV_OmHt5w.jpeg"
              alt="Avatar"
              className="avatar"
            />
          </List>
        </Avatars>
        <MoneyBox className="col-sm-1">
          <i className="far fa-money-bill-alt" />
          <br />
          1250
        </MoneyBox>
        <Bar className="col-sm-2">
          <div>Confiance</div>
          {/*<ProgressBar actual={300} max={1000} color="#FFC312" transparentColor="#F3DE70" />*/}
          <ProgressBar
            actual={300}
            max={1000}
            color="#182C51"
            transparentColor="#5388A3"
          />
        </Bar>
        <Bar className="col-sm-2">
          <div>PV</div>
          <ProgressBar
            actual={120}
            max={1200}
            color="#DC3545"
            transparentColor="#e09a9a"
          />
        </Bar>
      </NavBar>
    )
  }
}

export default ExplorationNavBar
