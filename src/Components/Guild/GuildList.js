import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import _ from 'lodash'
import axios from 'axios'
import Cookies from 'js-cookie'
import ReactTooltip from 'react-tooltip'
import { getColorRank } from '../../utils/seasonHelper'

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
      .get(process.env.REACT_APP_API_URL + '/guilds', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      })
      .then((response) => {
        if (response.data) {
          this.setState({
            guilds: _.orderBy(
              response.data.items,
              (guild) => {
                return parseInt(guild.seasonRecord)
              },
              'desc'
            ),
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
              <Name
                className="col-sm-4"
                style={{
                  color: getColorRank(index)
                }}
              >
                {guild.name}
              </Name>
              <div className="col-sm-3">
                {guild.seasonRecord} {guild.seasonRecord > 1 ? 'jours' : 'jour'}
              </div>
              <div className="col-sm-3">
                {guild.users.length === 0
                  ? 'Aucun'
                  : guild.users.length === 1
                  ? '1 membre'
                  : guild.users.length + ' membres'}
              </div>
              {guild.users.length > 0 && (
                <div className="col-sm-1 m-auto">
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
