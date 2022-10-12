import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import Title from '../../Components/Title/Title'
import ItemList from '../../Components/Item/ItemList'
import { getColorRank, getRewardsByRank } from '../../utils/seasonHelper'

class ResultAttack extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      guild: undefined,
      user: undefined,
      season: undefined,
      indexGuild: undefined
    }
  }

  componentDidMount() {
    const { guild } = this.props

    const getGuilds = axios.get(process.env.REACT_APP_API_URL + '/guilds', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-token')}`
      }
    })
    const getSeasons = axios.get(process.env.REACT_APP_API_URL + '/seasons', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-token')}`
      }
    })

    axios
      .all([getGuilds, getSeasons])
      .then((responses) => {
        if (responses[0].data && responses[1].data) {
          this.setState({
            indexGuild: _.findIndex(
              _.orderBy(
                responses[0].data.items,
                (guild) => {
                  return parseInt(guild.seasonRecord)
                },
                'desc'
              ),
              { id: guild.id }
            ),
            season: _.find(responses[1].data.items, (season) => {
              return (
                season.startingAt <= moment().format('YYYY-MM-DD') &&
                season.endingAt >= moment().format('YYYY-MM-DD')
              )
            })
          })
        }
      })
      .catch((errors) => {
        this.setState({
          error: errors
        })
      })
  }

  render() {
    const { season, indexGuild } = this.state
    const { user, guild } = this.props

    return (
      <>
        <div className="card-header">
          <Title>
            {user.hasSurvivedToAttack
              ? 'Victoire de guilde'
              : 'Défaite de guilde'}
          </Title>
        </div>
        <div className="card-body">
          <div className="col-sm-12">
            {user.hasSurvivedToAttack && (
              <div>
                <span style={{ color: 'green', fontSize: '26px' }}>
                  Bravo !{' '}
                </span>
                votre guilde a survécu à l'attaque de monstres de la nuit
                dernière.
              </div>
            )}
            {!user.hasSurvivedToAttack && (
              <div>
                <span style={{ color: 'red', fontSize: '26px' }}>
                  Hélas ...{' '}
                </span>
                votre guilde n'a pas survécu à l'attaque de monstres de la nuit
                dernière.
              </div>
            )}
            {indexGuild === undefined && (
              <img
                src={process.env.PUBLIC_URL + '/img/tail-spinner.svg'}
                width="20"
                height="20"
                alt="spinner"
              />
            )}
          </div>
        </div>
        {indexGuild !== undefined && (
          <div className="card-footer">
            <div className="col-sm-12">
              <div style={{ textAlign: 'left' }}>
                <ul>
                  <li>
                    Rang de guilde :{' '}
                    <span
                      style={{
                        color: getColorRank(indexGuild),
                        fontSize: '26px'
                      }}
                    >
                      Top {indexGuild + 1}
                    </span>
                  </li>
                  <li>
                    Progression max atteinte :{' '}
                    <span
                      style={{
                        color: getColorRank(indexGuild)
                      }}
                    >
                      {guild.seasonRecord}{' '}
                      {guild.seasonRecord > 1 ? 'jours' : 'jour'}
                    </span>
                  </li>
                  <li>
                    Progression actuelle de saison : {guild.seasonDay}{' '}
                    {guild.seasonDay > 1 ? 'jours' : 'jour'}{' '}
                    {user.hasSurvivedToAttack && (
                      <span style={{ color: 'green' }}>
                        (incrémentation de 1)
                      </span>
                    )}
                    {!user.hasSurvivedToAttack && (
                      <span style={{ color: 'red' }}>(réinitialisation)</span>
                    )}
                  </li>
                  <li>Récompenses actuelles de saison :</li>
                  <div style={{ textAlign: 'center' }}>
                    <ItemList
                      items={getRewardsByRank(indexGuild, season)}
                      displayActions={false}
                      minusPadding
                    />
                  </div>
                </ul>
              </div>
            </div>
            <div
              className="btn btn-success"
              type="submit"
              onClick={() => this.props.onValidAttack()}
            >
              Continuer
            </div>
          </div>
        )}
      </>
    )
  }
}

ResultAttack.propTypes = {
  user: PropTypes.shape({}),
  guild: PropTypes.shape({}),
  onValidAttack: PropTypes.func
}

export default ResultAttack
