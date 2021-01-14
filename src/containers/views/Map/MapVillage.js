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

class MapVillage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: undefined,
      error: undefined,
      user: undefined,
      imageWidth: undefined,
      imageHeight: undefined,
      imageUrl: process.env.PUBLIC_URL + '/img/maps/village.jpg',
      interactiveMap: {
        name: 'map-interactive',
        areas: [
          {
            name: 'Forge',
            shape: 'poly',
            href: '/crafting',
            // eslint-disable-next-line
            coords: [2,2,404,-2,436,42,433,95,516,92,538,71,573,92,590,121,583,148,568,168,575,380,597,419,575,455,546,472,556,525,526,536,492,533,487,509,505,474,509,443,463,445,444,455,455,485,449,545,478,589,473,601,531,616,534,648,517,659,533,689,544,718,543,742,533,760,521,777,499,788,475,793,456,789,439,772,422,764,419,798,438,811,443,849,465,867,495,869,505,889,516,920,516,949,2,952],
            preFillColor: 'rgba(0, 0, 0, 0.2)',
            fillColor: 'rgba(0, 0, 0, 0.4)'
          },
          {
            name: 'Personnage',
            shape: 'poly',
            href: '/character',
            // eslint-disable-next-line
            coords: [1169,458,1316,460,1311,618,1281,626,1169,625],
            preFillColor: 'rgba(0, 0, 0, 0.2)',
            fillColor: 'rgba(0, 0, 0, 0.4)'
          },
          {
            name: 'Guilde',
            shape: 'poly',
            href: '/guild',
            // eslint-disable-next-line
            coords: [1126,803,1140,772,1153,771,1182,740,1199,738,1218,730,1218,713,1201,704,1211,677,1230,660,1252,640,1272,631,1313,621,1343,616,1367,618,1393,621,1418,630,1435,638,1450,648,1462,694,1471,771,1476,847,1476,954,1121,954],
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
              '/img/maps/village-' +
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
export default MapVillage
