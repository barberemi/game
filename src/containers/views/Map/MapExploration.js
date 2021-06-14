import React, { Component } from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import CardMap from '../../../Components/Map/CardMap'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loader from '../../../Components/Loader/Loader'
import { Redirect } from 'react-router-dom'
import ExperienceNavBar from '../../../Components/NavBar/ExperienceNavBar'

const Container = styled.div`
  background-image: url(${process.env.PUBLIC_URL +
  '/img/backgrounds/maps-min.jpg'});
  background-size: 100% 100%;
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  height: 100%;
  text-align: center;
  color: white;
  min-height: 250px;
  overflow-y: scroll;
`

const RowOverflow = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  flex-wrap: nowrap;
  margin-left: 150px;

  @media (max-width: 768px) {
    margin-left: inherit;
  }
`

const TextDescription = styled.div`
  font-size: 3vw;
  text-shadow: 1px 1px 2px black;
  position: fixed;
  bottom: 0;
`

class MapExploration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      redirect: undefined,
      error: undefined,
      maps: undefined,
      user: undefined
    }
  }

  componentDidMount() {
    const getMe = axios.get(process.env.REACT_APP_API_URL + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-token')}`
      }
    })
    const getMaps = axios.get(process.env.REACT_APP_API_URL + '/maps', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-token')}`
      }
    })

    axios
      .all([getMe, getMaps])
      .then((responses) => {
        this.setState({
          loading: false,
          user: responses[0].data,
          maps: responses[1].data.items
        })
      })
      .catch((errors) => {
        this.setState({
          loading: false,
          error: errors
        })
      })
  }

  render() {
    const { error, loading, redirect, maps, user } = this.state

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <>
        <ExperienceNavBar user={user} />
        <Container className="container-fluid align-middle">
          {loading && <Loader />}
          <div className="container">
            {error && (
              <span className="text-danger">
                <b>Erreur :</b> {error.message}
              </span>
            )}
            {maps && user && (
              <>
                <RowOverflow className="row h-100">
                  {_.map(this.state.maps, (map) => (
                    <CardMap
                      key={map.name}
                      map={map}
                      user={user}
                      redirectTo={(redirect) =>
                        this.setState({ redirect: redirect })
                      }
                    />
                  ))}
                </RowOverflow>
              </>
            )}
          </div>
          <TextDescription className="col-sm-12">
            Sur quelle expédition partez-vous ?
          </TextDescription>
        </Container>
      </>
    )
  }
}
export default MapExploration
