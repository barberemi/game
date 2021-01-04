import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import ReactTooltip from 'react-tooltip'
import Loader from '../../../Components/Loader/Loader'
import ExplorationNavBar from '../../../Components/NavBar/ExplorationNavBar'

const Container = styled.div`
  background-image: url('https://cdnb.artstation.com/p/assets/images/images/028/312/273/large/yarki-studio-treasure-island-artstation-1.jpg?1594115694');
  background-size: 100% 100%;
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  height: calc(100% - 100px);
  text-align: center;
  color: white;
  min-height: 250px;

  overflow-y: auto;
  scroll-behavior: smooth;
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
  position: fixed;
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
  left: 50%;
  top: 90%;
  padding-top: 2px; // Font is too up
`

class Exploration extends Component {
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
      boss: undefined,
      character: undefined,
      nextPossible: undefined,
      scrollIsTop: true
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
          if (
            response.data.fights &&
            response.data.fights[0].type === 'waiting'
          ) {
            this.setState({ redirect: '/fight' })
          } else {
            // 2 - Generate exploration
            const results = response.data.exploration
            const character = results[Object.keys(results).pop()]
            const boss = results[1]

            delete results[1]
            delete results[Object.keys(results).pop()]

            this.setState({
              loading: false,
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

            // Scroll if didnt see character
            setTimeout(() => {
              if (
                this.refMe.current &&
                !(
                  this.refMe.current.getBoundingClientRect().top <
                    window.innerHeight &&
                  this.refMe.current.getBoundingClientRect().bottom >= 0
                )
              ) {
                this.refScroll.current.scrollTop = this.refScroll.current.scrollHeight
              }
            }, 1000)
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

  render() {
    const {
      redirect,
      boss,
      character,
      error,
      loading,
      nextPossible,
      scrollIsTop
    } = this.state
    let countExplorations = 0
    const buildingTypes = {
      arene: 'Arène',
      'arene-boss': 'Arène du champion',
      healer: 'Auberge',
      dealer: 'Marché'
    }

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <>
        <ExplorationNavBar user={character} />
        <Container
          className="container-fluid"
          onScroll={this.handleScroll}
          ref={this.refScroll}
        >
          {loading && <Loader />}
          <div className="container">
            {error && (
              <span className="text-danger">
                <b>Erreur :</b> {error.message}
              </span>
            )}
            {boss && character && (
              <div className="row h-100">
                <StickyBoss
                  src={process.env.PUBLIC_URL + '/img/boss/' + boss.image}
                  alt={boss.name}
                  style={{
                    left: scrollIsTop <= 40 ? '50%' : '90%',
                    transform:
                      scrollIsTop <= 40
                        ? 'translateX(-50%)'
                        : 'translateX(-90%)'
                  }}
                  width="60px"
                  height="60px"
                  data-tip={boss.name}
                  data-place="bottom"
                />
                <div className="mt-3 mb-3 col-sm-12">
                  {this.isNext(boss) && (
                    <>
                      <Link to={`/choice/${boss.type}/${boss.id}`}>
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
                        />
                      </Link>
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
                    />
                  )}
                </div>
                {_.map(this.state.explorations, (explorationRow, index) => (
                  <Fragment key={index}>
                    {_.map(explorationRow, (col) => (
                      <div
                        key={col.id}
                        className={`mt-3 mb-3 col-sm-${Math.round(
                          12 / explorationRow.length
                        )}`}
                      >
                        {character.position === col.id && (
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
                          />
                        )}
                        {this.isNext(col) && (
                          <>
                            <Link to={`/choice/${col.type}/${col.id}`}>
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
                              />
                            </Link>
                            <ReactTooltip />
                          </>
                        )}
                        {character.position !== col.id && !this.isNext(col) && (
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
                          />
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
          </div>
        </Container>
      </>
    )
  }
}

export default Exploration
