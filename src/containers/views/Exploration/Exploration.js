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
import ItemBox from '../../../Components/Item/ItemBox'

const Container = styled.div`
  background-image: url(${process.env.PUBLIC_URL +
  '/img/backgrounds/swamp-min.jpg'});
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

const EventCharacterBox = styled.div`
  bottom: 20%;
  right: 15%;
  cursor: pointer;
`

const CenterItemBox = styled.div`
  padding-left: 30px;
  padding-bottom: 20px;
  color: white;
  text-align: center;
`

const Text = styled.div`
  color: white;
  font-size: 22px;
  padding-left: 50px;
`

const Button = styled.button`
  color: #000;
  background-color: #ffc312;
  margin-top: 10px;

  &:hover {
    color: black;
    background-color: white;
  }
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

const PossibleBuildingText = styled.div`
  background-color: #fff;
  color: #000;
  border-radius: 50%;
  border: 2px solid #000;
  width: 25px;
  height: 25px;
  position: absolute;
  left: 30%;
  padding-top: 2px; // Font is too big
`

class Exploration extends Component {
  constructor(props) {
    super(props)

    this.refScroll = React.createRef()
    this.refMe = React.createRef()
    this.handleScroll = this.handleScroll.bind(this)
    this.isNext = this.isNext.bind(this)
    this.handleOpenTreasure = this.handleOpenTreasure.bind(this)

    this.state = {
      redirect: undefined,
      loading: true,
      explorations: undefined,
      boss: undefined,
      character: undefined,
      nextPossible: undefined,
      scrollIsTop: true,
      chestIcon: 'chest-close',
      treasureItem: undefined,
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
        if (response.data) {
          // 1 - Check if last fight is waiting
          let fightExists = _.filter(response.data.fights, {
            type: 'waiting',
            monster: { isGuildBoss: false }
          })
          if (fightExists.length > 0) {
            this.setState({ redirect: '/fight/' + fightExists[0].id })
          } else if (!response.data.exploration) {
            this.setState({ redirect: '/maps' })
          } else {
            // 2 - Generate exploration
            const results = response.data.exploration
            const character = results[Object.keys(results).pop()]
            character.money = response.data.money
            const boss = results[1]

            delete results[1]
            delete results[Object.keys(results).pop()]

            this.setState({
              loading: false,
              equippedItems: response.data.equippedItems,
              character: character,
              boss: boss,
              explorations: results
            })

            _.map(results, (aRow) => {
              _.map(aRow, (aCol) => {
                if (aCol.id === character.position) {
                  this.setState({
                    nextPossible: aCol.next
                  })
                }
              })
            })
          }
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

  handleOpenTreasure() {
    const { character, treasureItem } = this.state

    if (treasureItem === undefined) {
      axios
        .post(
          process.env.REACT_APP_API_URL +
            '/users/' +
            character.id +
            '/exploration',
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('auth-token')}`
            }
          }
        )
        .then((response) => {
          if (response.data) {
            this.setState({ treasureItem: response.data })
          }
        })
        .catch((error) => {
          this.setState({
            error: error.response.status
          })
        })
    }
  }

  render() {
    const {
      redirect,
      boss,
      character,
      treasureItem,
      error,
      loading,
      nextPossible,
      scrollIsTop
    } = this.state
    let countExplorations = 0
    const buildingTypes = {
      arene: 'Arène',
      'arene-boss': 'Arène du champion',
      treasure: 'Île aux trésors',
      healer: 'Auberge',
      dealer: 'Marché'
    }

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
                {boss.type === 'treasure' &&
                  character.position === 1 &&
                  treasureItem === undefined && (
                    <Text>Nous voici enfin face à notre récompense !</Text>
                  )}
                {character.position !== 1 && <Text>Que faire ?</Text>}
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
                />
                {boss.type === 'treasure' && treasureItem !== undefined && (
                  <Link to={'/maps'}>
                    <Button className="btn">Nouvelle exploration</Button>
                  </Link>
                )}
                {character.position !== 1 && (
                  <>
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
                  </>
                )}
              </AvatarBox>
              {boss.type === 'treasure' && character.position === 1 && (
                <EventCharacterBox className="position-absolute">
                  {this.state.treasureItem && (
                    <CenterItemBox>
                      <ItemBox
                        displayActions={false}
                        displayText={false}
                        item={this.state.treasureItem}
                        oldItem={
                          _.filter(this.state.equippedItems, (item) => {
                            return item.item.type === treasureItem.item.type
                          })[0]
                        }
                      />
                      <ReactTooltip />
                    </CenterItemBox>
                  )}
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      '/img/' +
                      this.state.chestIcon +
                      '.svg'
                    }
                    width="120px"
                    alt="personnage de exploration"
                    className="animated fadeInRight slow"
                    data-tip="Ouvrir le coffre"
                    onClick={() => {
                      this.setState({ chestIcon: 'chest-open' })
                      this.handleOpenTreasure()
                    }}
                  />
                </EventCharacterBox>
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
              {boss && character && (
                <div className="row h-100">
                  <StickyBoss
                    src={
                      process.env.PUBLIC_URL +
                      '/img/' +
                      (boss.type === 'arene-boss'
                        ? 'boss/' + boss.image
                        : 'chest-close.svg')
                    }
                    alt={boss.name}
                    style={{
                      left: scrollIsTop <= 40 ? '47%' : '90%'
                    }}
                    width="60px"
                    height="60px"
                    data-tip={boss.name}
                    data-place="bottom"
                    onClick={() => (this.refScroll.current.scrollTop = 0)}
                  />
                  <div className="mt-3 mb-3 col-sm-12">
                    {this.isNext(boss) && (
                      <>
                        <Link to={`/user_exploration/${boss.type}/${boss.id}`}>
                          <Building
                            src={
                              process.env.PUBLIC_URL +
                              '/img/explorations/' +
                              boss.type +
                              '.png'
                            }
                            alt={boss.type + '.png'}
                            width="200px"
                            data-tip={buildingTypes[boss.type]}
                            id={`building-${boss.id}`}
                          />
                        </Link>
                        <PossibleBuildingText>1</PossibleBuildingText>
                        <ReactTooltip />
                      </>
                    )}
                    {!this.isNext(boss) && (
                      <DisabledBuilding
                        src={
                          process.env.PUBLIC_URL +
                          '/img/explorations/' +
                          boss.type +
                          '.png'
                        }
                        alt={boss.type + '.png'}
                        width="200px"
                        data-tip={buildingTypes[boss.type]}
                        id={`building-${boss.id}`}
                      />
                    )}
                  </div>
                  {_.map(this.state.explorations, (explorationRow, index) => (
                    <Fragment key={index}>
                      {_.map(explorationRow, (col) => (
                        <div
                          key={col.id}
                          className={`mt-5 col-sm-${Math.round(
                            12 / explorationRow.length
                          )}`}
                        >
                          {character.position === col.id && (
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
                          {this.isNext(col) && (
                            <>
                              <Link
                                to={`/user_exploration/${col.type}/${col.id}`}
                              >
                                <Building
                                  src={
                                    process.env.PUBLIC_URL +
                                    '/img/explorations/' +
                                    col.type +
                                    '.png'
                                  }
                                  alt={col.type + '.png'}
                                  width="100px"
                                  data-tip={buildingTypes[col.type]}
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
                              <ReactTooltip />
                            </>
                          )}
                          {character.position !== col.id && !this.isNext(col) && (
                            <>
                              <DisabledBuilding
                                src={
                                  process.env.PUBLIC_URL +
                                  '/img/explorations/' +
                                  col.type +
                                  '.png'
                                }
                                alt={col.type + '.png'}
                                width="100px"
                                data-tip={buildingTypes[col.type]}
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
                          {_.includes(nextPossible, col.id) &&
                            (countExplorations = countExplorations + 1) && (
                              <PossibleBuildingText>
                                {countExplorations}
                              </PossibleBuildingText>
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

export default Exploration
