import React, { Component } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import ExperienceNavBar from '../../../Components/NavBar/ExperienceNavBar'
import Tutorial from '../../../Components/Tutorial/Tutorial'
import ImageMapper from 'react-image-mapper'
import jwtDecode from 'jwt-decode'

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
  text-align: center;
`

class MapHome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: undefined,
      error: undefined,
      user: undefined,
      stepsEnabled: false,
      stepName: 'homeGuild',
      imageWidth: undefined,
      imageHeight: undefined,
      imageUrl: jwtDecode(Cookies.get('auth-token')).academy
        ? process.env.PUBLIC_URL +
          '/img/backgrounds/home-' +
          jwtDecode(Cookies.get('auth-token')).academy.name +
          '.jpg'
        : process.env.PUBLIC_URL + '/img/backgrounds/home-map.jpg',
      interactiveMap: {
        name: 'map-interactive',
        areas: [
          {
            name: 'homeGuild',
            shape: 'poly',
            href: '/guild',
            // eslint-disable-next-line
            coords: [583, 633, 802, 552, 1060, 776, 879, 908, 583, 912],
            preFillColor: 'rgba(0, 0, 0, 0)',
            fillColor: 'rgba(0, 0, 0, 0)',
            strokeColor: 'rgba(0, 0, 0, 0)'
          },
          {
            name: 'homeBoss',
            shape: 'poly',
            href: '/boss',
            // eslint-disable-next-line
            coords: [
              399,
              102,
              468,
              66,
              482,
              100,
              497,
              107,
              499,
              122,
              529,
              122,
              538,
              105,
              597,
              122,
              619,
              139,
              628,
              168,
              612,
              219,
              616,
              270,
              624,
              287,
              606,
              334,
              643,
              596,
              348,
              603,
              363,
              355,
              351,
              307,
              370,
              285,
              375,
              178,
              366,
              151,
              388,
              136
            ],
            preFillColor: 'rgba(0, 0, 0, 0)',
            fillColor: 'rgba(0, 0, 0, 0)',
            strokeColor: 'rgba(0, 0, 0, 0)'
          },
          {
            name: 'homeCharacter',
            shape: 'poly',
            href: '/character',
            // eslint-disable-next-line
            coords: [1298, 520, 1575, 520, 1575, 870, 1298, 870],
            preFillColor: 'rgba(0, 0, 0, 0)',
            fillColor: 'rgba(0, 0, 0, 0)',
            strokeColor: 'rgba(0, 0, 0, 0)'
          },
          {
            name: 'homeMap',
            shape: 'poly',
            href: '/maps',
            // eslint-disable-next-line
            coords: [258, 663, 252, 924, 555, 885, 561, 629],
            preFillColor: 'rgba(0, 0, 0, 0)',
            fillColor: 'rgba(0, 0, 0, 0)',
            strokeColor: 'rgba(0, 0, 0, 0)'
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
              '/img/backgrounds/home-' +
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

  redirectToPage = () => {
    const { stepName } = this.state

    let url = '/character'
    switch (stepName) {
      case 'homeGuild':
        url = '/guild'
        break
      case 'homeBoss':
        url = '/boss'
        break
      case 'homeMap':
        url = '/maps'
        break
      default:
        url = '/character'
        break
    }

    this.setState({ redirect: url })
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
            strokeColor={'#ffffff'}
            onClick={(area) => {
              this.setState({ stepsEnabled: true, stepName: area.name })
            }}
          />
          <Tutorial
            stepsEnabled={this.state.stepsEnabled}
            stepName={this.state.stepName}
            showBullets={false}
            doneLabel={'Accéder'}
            customTooltipClass={'disabledCrossButton'}
            onExit={() => this.setState({ stepsEnabled: false })}
            onComplete={() => this.redirectToPage()}
          />
          <TextBottomLeft className="col-sm-12">
            Sélectionner une zone dans laquelle naviguer.
          </TextBottomLeft>
        </div>
      </>
    )
  }
}
export default MapHome
