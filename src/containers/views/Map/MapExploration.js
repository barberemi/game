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
  background-image: url('https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1568080216644-6QDT21SZICO3TCYGO2GE/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/PiratesOutlaws-Gallery54.jpg?format=2500w');
  background-size: cover;
  background-attachment: fixed;
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  text-align: center;
  color: white;
  min-height: 100%;
  height: 100%;
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
