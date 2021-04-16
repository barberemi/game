import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import axios from 'axios'
import Cookies from 'js-cookie'
import ConstructionItem from './ConstructionItem'
import styled from '@emotion/styled'

const TH = styled.th`
  border-top: 0px !important;
  text-align: center;
`

class ConstructionList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      buildings: []
    }
  }

  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          '/buildings?isUserBuilding=' +
          (this.props.isGuild ? '0' : '1') +
          '&parent=null',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('auth-token')}`
          }
        }
      )
      .then((response) => {
        if (response.data) {
          this.setState({
            buildings: response.data.items
          })
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.data
        })
      })
  }

  render() {
    const { user } = this.props
    const { buildings } = this.state

    return (
      <div className="col-sm-12 text-left">
        <table className="table">
          <tr>
            <TH />
            <TH>Avancement</TH>
            <TH>Défense</TH>
            <TH>Points Actions</TH>
            <TH>Matériaux</TH>
          </tr>
          <tbody>
            {_.map(buildings, (building, index) => {
              return (
                <ConstructionItem
                  key={index}
                  user={user}
                  constructions={
                    this.props.isGuild
                      ? this.props.user.guild.constructions
                      : this.props.user.constructions
                  }
                  building={building}
                  count={0}
                  giveAction={this.props.giveAction}
                  giveMaterial={this.props.giveMaterial}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

ConstructionList.defaultProps = {
  isGuild: false
}

ConstructionList.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    constructions: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  isGuild: PropTypes.bool,
  giveAction: PropTypes.func,
  giveMaterial: PropTypes.func
}

export default ConstructionList
