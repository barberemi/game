import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import _ from 'lodash'
import axios from 'axios'
import Cookies from 'js-cookie'
import { getDaysDateDiffBetweenNowAnd } from '../../utils/dateHelper'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import FriendList from '../Friend/FriendList'

const Container = styled.div`
  max-height: 60vh;
  min-height: 60vh;
  overflow-y: scroll;
`

const SubContainer = styled.div`
  display: flex;
  float: left;
  width: 100%;
  padding-top: 20px;
`

const Name = styled.div`
  text-align: left;
  color: #f26725;
`

const IconAction = styled.span`
  padding-right: 15px;

  &:hover {
    cursor: pointer;
  }
`

class GuildList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      guilds: []
    }
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + '/guilds?order_by=createdAt', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      })
      .then((response) => {
        if (response.data) {
          this.setState({
            guilds: response.data.items,
            isLoaded: true
          })
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.data,
          isLoaded: true
        })
      })
  }

  render() {
    const { isLoaded, guilds } = this.state
    return (
      <Container>
        {!isLoaded && (
          <img
            src={process.env.PUBLIC_URL + '/img/tail-spinner.svg'}
            width="20"
            height="20"
            alt="spinner"
          />
        )}
        {guilds &&
          _.map(guilds, (guild, index) => (
            <SubContainer key={index} className="col-sm-12">
              <div className="col-sm-1">{index + 1}</div>
              <Name className="col-sm-6">{guild.name}</Name>
              <div className="col-sm-2">
                {getDaysDateDiffBetweenNowAnd(guild.createdAt)} jours
              </div>
              <div className="col-sm-2">
                {guild.users.length === 0
                  ? 'Aucun'
                  : guild.users.length === 1
                  ? '1 membre'
                  : guild.users.length + ' membres'}
              </div>
              {guild.users.length > 0 && (
                <div className="col-sm-1">
                  <IconAction
                    onClick={() => this.props.onSelectedGuild(guild)}
                    data-tip="Voir les membres"
                  >
                    <i className="far fa-address-card text-success" />
                  </IconAction>
                  <ReactTooltip />
                </div>
              )}
            </SubContainer>
          ))}
      </Container>
    )
  }
}

GuildList.propTypes = {
  onSelectedGuild: PropTypes.func
}

export default GuildList
