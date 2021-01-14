import React, { Component } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import ExperienceNavBar from '../../../Components/NavBar/ExperienceNavBar'
import ImageMapper from 'react-image-mapper'

const Container = styled(ImageMapper)`
  background-size: 100% 100%;
  text-align: center;
  color: white;
  min-height: 100%;
`

const TextBottomLeft = styled.div`
  color: white;
  font-size: 3vw;
  text-shadow: 1px 1px 2px black;
  position: fixed;
  bottom: 0;
  z-index: 20;
`

class MapHome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: undefined,
      error: undefined,
      user: undefined,
      imageWidth: undefined,
      imageHeight: undefined,
      imageUrl: process.env.PUBLIC_URL + '/img/maps/home.jpg',
      interactiveMap: {
        name: 'map-interactive',
        areas: [
          {
            name: 'Village',
            shape: 'poly',
            href: '/village',
            // eslint-disable-next-line
            coords: [1023,866,897,898,661,889,543,808,543,665,643,623,741,601,848,565,890,603,945,584,1062,611,1087,628,1070,767],
            preFillColor: 'rgba(0, 0, 0, 0.2)',
            fillColor: 'rgba(0, 0, 0, 0.4)'
          },
          // {
          //   name: 'Pont',
          //   shape: 'poly',
          //   href: '/maps',
          //   // eslint-disable-next-line
          //   coords: [314,671,399,642,511,638,524,643,517,866,431,896,326,954,297,952],
          //   preFillColor: 'rgba(0, 0, 0, 0.2)',
          //   fillColor: 'rgba(0, 0, 0, 0.4)'
          // },
          {
            name: 'Tour',
            shape: 'poly',
            href: '/boss',
            // eslint-disable-next-line
            coords: [399,102,468,66,482,100,497,107,499,122,529,122,538,105,597,122,619,139,628,168,612,219,616,270,624,287,606,334,643,596,348,603,363,355,351,307,370,285,375,178,366,151,388,136],
            preFillColor: 'rgba(0, 0, 0, 0.2)',
            fillColor: 'rgba(0, 0, 0, 0.4)'
          },
          {
            name: 'Personnage',
            shape: 'poly',
            href: '/character',
            // eslint-disable-next-line
            coords: [1298,501,1569,484,1582,664,1533,917,1262,917],
            preFillColor: 'rgba(0, 0, 0, 0.2)',
            fillColor: 'rgba(0, 0, 0, 0.4)'
          },
          {
            name: 'Foret',
            shape: 'poly',
            href: '/maps',
            // eslint-disable-next-line
            coords: [1109,586,1055,575,967,584,928,536,921,497,968,460,989,441,1009,438,1040,411,1104,404],
            preFillColor: 'rgba(0, 0, 0, 0.2)',
            fillColor: 'rgba(0, 0, 0, 0.4)'
          }
        ]
      }
    }
    this.refImage = React.createRef()
  }

  componentDidMount() {
    this.setState({
      imageWidth: this.refImage.current.getBoundingClientRect().width,
      imageHeight: this.refImage.current.getBoundingClientRect().height
    })

    axios
      .get(process.env.REACT_APP_API_URL + '/users/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      })
      .then((response) => {
        this.setState({
          redirect: response.data.academy ? undefined : '/creation',
          user: response.data,
          imageUrl: response.data.academy
            ? process.env.PUBLIC_URL +
              '/img/maps/home-' +
              response.data.academy.name +
              '.jpg'
            : this.state.imageUrl
        })
      })
      .catch((errors) => {
        this.setState({
          error: errors
        })
      })
  }

  render() {
    const { error, redirect, user, interactiveMap, imageUrl } = this.state

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <>
        <ExperienceNavBar user={user} />
        <div ref={this.refImage}>
          {error && (
            <span className="text-danger">
              <b>Erreur :</b> {error.message}
            </span>
          )}
          <Container
            src={imageUrl}
            map={interactiveMap}
            imgWidth={1920}
            width={this.state.imageWidth}
            strokeColor={'#ede1b0'}
          />
          <TextBottomLeft className="col-sm-12">
            Selectionner une zone dans laquelle naviguer.
          </TextBottomLeft>
        </div>
      </>
    )
  }
}
export default MapHome
