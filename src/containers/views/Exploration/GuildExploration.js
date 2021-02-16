import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import _ from 'lodash'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import ReactTooltip from 'react-tooltip'
import Loader from '../../../Components/Loader/Loader'
import HpNavBar from '../../../Components/NavBar/HpNavBar'
import ArrowTrait from '../../../Components/ArrowTrait/ArrowTrait'
import {
  getBoxBottomSpacing,
  getBoxRightSpacing
} from '../../../utils/explorationHelper'

const Container = styled.div`
  background-image: url('https://cdna.artstation.com/p/assets/images/images/004/345/358/large/nikita-bulatov-58.jpg?1482749515');
  background-attachment: fixed;
  background-size: 100% 100%;
  height: 100%;
  top: 0;
  left: 0;

  ${(props) =>
    props.isBlur &&
    css`
      -webkit-filter: blur(3px);
      -moz-filter: blur(3px);
      -o-filter: blur(3px);
      -ms-filter: blur(3px);
      filter: blur(3px);
    `};
`

const SubContainer = styled.div`
  text-align: center;
  overflow-y: auto;
  scroll-behavior: smooth;
  max-height: 450px;
`

const ExplorationBox = styled.div`
  background-color: transparent;
  background-image: url(${process.env.PUBLIC_URL + '/img/pancarte-bis.png'});
  background-size: 100% 100%;

  position: relative;
  padding-top: 100px;
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  color: white;
  max-height: 600px;
  max-width: 800px;
`

const AvatarBox = styled.div`
  bottom: 20%;
  left: 15%;
`

const OtherCharacterBox = styled.div`
  transform: rotateY(180deg);
  cursor: pointer;

  ${(props) =>
    props.index >= 0 &&
    css`
      bottom: ${getBoxBottomSpacing(props.index)};
      right: ${getBoxRightSpacing(props.index)};
    `};
`

const Text = styled.div`
  color: white;
  font-size: 22px;
  padding-left: 50px;
`

const Building = styled.img`
  &:hover {
    cursor: pointer;
    -webkit-filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
    filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
    -ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=1, OffY=1, Color='#444')";
  }
`

const DisabledBuilding = styled.img`
  opacity: 0.7;
  &:hover {
    cursor: not-allowed;
  }
`

const StickyBoss = styled.img`
  border: 3px solid #000;
  border-radius: 50%;
  position: absolute;
  margin-top: 20px;
  background-color: white;
  z-index: 1;
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);

  &:hover {
    cursor: pointer;
  }
`

class GuildExploration extends Component {
  constructor(props) {
    super(props)

    this.refScroll = React.createRef()
    this.refMe = React.createRef()
    this.handleScroll = this.handleScroll.bind(this)
    this.isNext = this.isNext.bind(this)

    this.state = {
      redirect: undefined,
      loading: true,
      explorations: undefined,
      character: undefined,
      guild: undefined,
      nextPossible: undefined,
      scrollIsTop: true,
      displayMap: undefined
    }
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + '/users/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      })
      .then((response) => {
        if (!response.data.guild) {
          this.setState({
            loading: false,
            redirect: '/guild'
          })
        } else {
          axios
            .post(
              process.env.REACT_APP_API_URL +
                '/guilds/' +
                response.data.guild.id +
                '/exploration',
              {},
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${Cookies.get('auth-token')}`
                }
              }
            )
            .then((response2) => {
              this.setState({
                loading: false,
                guild: response.data.guild,
                character: response.data,
                explorations: response2.data
              })

              _.map(response2.data, (aRow, index) => {
                _.map(aRow, (aCol) => {
                  if (
                    response.data.guild.position ===
                    response2.data.length - index - 1
                  ) {
                    this.setState({
                      nextPossible: aCol.next
                    })
                  }
                })
              })
            })
            .catch((error) => {
              this.setState({
                error: error.response.data
              })
            })
        }
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.response.data
        })
      })
  }

  handleScroll() {
    this.setState({
      scrollIsTop: this.refScroll.current.scrollTop
    })
  }

  isNext(col) {
    return _.includes(this.state.nextPossible, col.id)
  }

  render() {
    const { redirect, character, guild, error, loading } = this.state

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <>
        <HpNavBar user={character} />
        <Container
          className="position-fixed container-fluid"
          onClick={() =>
            this.state.displayMap ? this.setState({ displayMap: false }) : null
          }
          isBlur={this.state.displayMap}
        >
          {loading && <Loader />}
          {character && (
            <>
              <AvatarBox className="position-absolute">
                <Text>Que faire ?</Text>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    '/img/academies/' +
                    character.academy.name +
                    '.png'
                  }
                  width="200px"
                  alt="Avatar mon personnage"
                  className="animated fadeInLeft slow"
                  data-tip="Moi"
                />
                <img
                  src={process.env.PUBLIC_URL + '/img/map.svg'}
                  width="70px"
                  alt="Compass"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    this.setState({ displayMap: !this.state.displayMap })
                    // Scroll if didnt see character
                    setTimeout(() => {
                      this.refScroll.current.scrollTop =
                        this.refMe.current.getBoundingClientRect().top -
                        (this.refMe.current.getBoundingClientRect().height +
                          100)
                    }, 1000)
                  }}
                  data-tip="Carte de navigation"
                />
              </AvatarBox>
              {_.map(
                _.filter(
                  guild.users,
                  (user) =>
                    user.guildRole === 'master' || user.guildRole === 'officer'
                ),
                (user, index) => (
                  <OtherCharacterBox
                    key={index}
                    index={index}
                    className="position-absolute"
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        '/img/academies/' +
                        user.academy.name +
                        '.png'
                      }
                      width="200px"
                      alt={user.name}
                      className="animated fadeInLeft slow"
                      data-tip={
                        user.guildRole === 'master'
                          ? '(Chef de guilde) ' + user.name
                          : '(Officier) ' + user.name
                      }
                    />
                  </OtherCharacterBox>
                )
              )}
              <ReactTooltip />
            </>
          )}
        </Container>
        <ExplorationBox
          className={`container-fluid animated ${
            this.state.displayMap === undefined
              ? 'd-none'
              : this.state.displayMap
              ? 'fadeInDown'
              : 'fadeOutUp'
          }`}
        >
          {this.state.displayMap !== undefined && (
            <SubContainer
              className="container"
              onScroll={() => this.handleScroll()}
              ref={this.refScroll}
            >
              {error && (
                <span className="text-danger">
                  <b>Erreur :</b> {error.message}
                </span>
              )}
              {character && (
                <div className="row h-100">
                  {_.map(this.state.explorations, (explorationRow, index) => (
                    <Fragment key={index}>
                      {_.map(explorationRow, (col) => (
                        <div
                          key={col.id}
                          className={`mt-5 col-sm-${Math.round(
                            12 / explorationRow.length
                          )}`}
                        >
                          {guild.position ===
                            this.state.explorations.length - index - 1 && (
                            <>
                              <Building
                                src={
                                  process.env.PUBLIC_URL +
                                  '/img/academies/' +
                                  character.academy.name +
                                  '.png'
                                }
                                alt="me"
                                width="100px"
                                ref={this.refMe}
                                data-tip="Moi"
                                id={`building-${col.id}`}
                              />
                              {col.next &&
                                _.map(col.next, (nextPossible, index) => (
                                  <ArrowTrait
                                    key={index}
                                    from={`building-${col.id}`}
                                    to={`building-${nextPossible}`}
                                    isNext={true}
                                  />
                                ))}
                            </>
                          )}
                          {this.isNext(col) &&
                            guild.position !==
                              this.state.explorations.length - index - 1 && (
                              <>
                                <Link
                                  to={`/guild_exploration/${col.type}/${col.id}`}
                                >
                                  <StickyBoss
                                    src={
                                      process.env.PUBLIC_URL +
                                      '/img/boss/' +
                                      col.image
                                    }
                                    alt={col.name}
                                    style={{ left: '47%' }}
                                    width="60px"
                                    height="60px"
                                    data-tip={col.name}
                                    data-place="bottom"
                                  />
                                  <Building
                                    src={
                                      process.env.PUBLIC_URL +
                                      '/img/explorations/' +
                                      col.type +
                                      '.png'
                                    }
                                    alt={col.type + '.png'}
                                    width="200px"
                                    data-tip="Arène du champion"
                                    id={`building-${col.id}`}
                                  />
                                  {col.next &&
                                    _.map(col.next, (nextPossible, index) => (
                                      <ArrowTrait
                                        key={index}
                                        from={`building-${col.id}`}
                                        to={`building-${nextPossible}`}
                                      />
                                    ))}
                                </Link>
                              </>
                            )}
                          {guild.position !==
                            this.state.explorations.length - index - 1 &&
                            !this.isNext(col) && (
                              <>
                                {col.id !== 0 && (
                                  <StickyBoss
                                    src={
                                      process.env.PUBLIC_URL +
                                      '/img/boss/' +
                                      col.image
                                    }
                                    alt={col.name}
                                    style={{ left: '47%' }}
                                    width="60px"
                                    height="60px"
                                    data-tip={col.name}
                                    data-place="bottom"
                                  />
                                )}
                                <DisabledBuilding
                                  src={
                                    process.env.PUBLIC_URL +
                                    '/img/explorations/' +
                                    col.type +
                                    '.png'
                                  }
                                  alt={col.type + '.png'}
                                  width="200px"
                                  data-tip="Arène du champion"
                                  id={`building-${col.id}`}
                                />
                                {col.next &&
                                  _.map(col.next, (nextPossible, index) => (
                                    <ArrowTrait
                                      key={index}
                                      from={`building-${col.id}`}
                                      to={`building-${nextPossible}`}
                                    />
                                  ))}
                              </>
                            )}
                        </div>
                      ))}
                    </Fragment>
                  ))}
                  <ReactTooltip />
                </div>
              )}
            </SubContainer>
          )}
        </ExplorationBox>
      </>
    )
  }
}

export default GuildExploration
