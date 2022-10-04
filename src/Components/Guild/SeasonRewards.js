import React, { Component } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import _ from 'lodash'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import ItemList from '../../Components/Item/ItemList'

const Text = styled.div`
  text-align: left;
`

class SeasonRewards extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      season: undefined
    }
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + '/seasons', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      })
      .then((response) => {
        if (response.data) {
          this.setState({
            season: _.find(response.data.items, (season) => {
              return (
                season.startingAt <= moment().format('YYYY-MM-DD') &&
                season.endingAt >= moment().format('YYYY-MM-DD')
              )
            }),
            isLoaded: true
          })
          if (this.state.season) {
            this.props.getSeason(this.state.season)
          }
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
    const { isLoaded, season } = this.state
    return (
      <div
        className="modal fade"
        id="seasonRewardsModal"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div
            className="modal-content"
            style={{
              backgroundColor: '#000',
              borderColor: '#fff'
            }}
          >
            <div className="modal-header">
              <h5
                className="modal-title"
                id="exampleModalLongTitle"
                style={{
                  color: '#f26725'
                }}
              >
                Récompenses de saison
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                style={{
                  color: 'red',
                  opacity: 'inherit',
                  textShadow: 'inherit'
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {isLoaded && !season && (
                <Text style={{ textAlign: 'center' }}>
                  Aucune saison en cours.
                </Text>
              )}
              {isLoaded && season && (
                <>
                  {season.itemsRewarded1.length > 0 && (
                    <>
                      <Text style={{ color: '#ff8000' }}>Top 1</Text>
                      <ItemList
                        items={season.itemsRewarded1}
                        displayActions={false}
                        minusPadding
                      />
                      <br />
                    </>
                  )}
                  {season.itemsRewarded2.length > 0 && (
                    <>
                      <Text style={{ color: '#c600ff' }}>Top 2-9</Text>
                      <ItemList
                        items={season.itemsRewarded2}
                        displayActions={false}
                        minusPadding
                      />
                      <br />
                    </>
                  )}
                  {season.itemsRewarded3.length > 0 && (
                    <>
                      <Text style={{ color: '#00BFFF' }}>Top 10-50</Text>
                      <ItemList
                        items={season.itemsRewarded3}
                        displayActions={false}
                        minusPadding
                      />
                      <br />
                    </>
                  )}
                  {season.itemsRewarded4.length > 0 && (
                    <>
                      <Text>Top 101-*</Text>
                      <ItemList
                        items={season.itemsRewarded4}
                        displayActions={false}
                        minusPadding
                      />
                      <br />
                    </>
                  )}
                  {(season.itemsRewarded1.length > 0 ||
                    season.itemsRewarded2.length > 0 ||
                    season.itemsRewarded3.length > 0 ||
                    season.itemsRewarded4.length > 0) && (
                    <>
                      Les récompenses seront données en fin de saison.
                      <br />
                      Le{' '}
                      <span style={{ color: '#f26725' }}>
                        {moment(season.endingAt).format('DD/MM/YYYY')}
                      </span>
                      .
                    </>
                  )}
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SeasonRewards.propTypes = {
  getSeason: PropTypes.func
}

export default SeasonRewards
