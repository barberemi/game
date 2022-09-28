import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import CharacteristicItem from '../../../Components/Characteristic/CharacteristicItem'
import EquippedSkills from '../../../Components/Skill/EquippedSkills'
import ItemList from '../../../Components/Item/ItemList'
import Title from '../../../Components/Title/Title'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loader from '../../../Components/Loader/Loader'
import MonsterTypeBadge from '../../../Components/Badge/MonsterTypeBadge'
import Tutorial from '../../../Components/Tutorial/Tutorial'
import MonsterSprite from '../../../Components/Sprites/MonsterSprite'

const Container = styled.div`
  background-image: url(${process.env.PUBLIC_URL +
  '/img/backgrounds/boss-min.jpg'});
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

const SubContainer = styled.div`
  margin-left: 150px;

  @media (max-width: 768px) {
    margin-left: inherit;
  }
`

const LevelBox = styled.span`
  font-size: 16px;
  color: #fff;
`

const LeftArrayBox = styled.div`
  left: 10px;
  top: 200px;
  z-index: 10;
`

const RightArrayBox = styled.div`
  right: 10px;
  top: 200px;
  z-index: 10;
`

const RightBox = styled.div`
  min-height: 550px;
`

const LinkArrow = styled(Link)`
  color: #fff;

  &:hover {
    color: #f26725;
  }
`

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.8) !important;
`

class Boss extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      id: parseInt(this.props.match.params.idBoss),
      boss: undefined,
      user: undefined,
      stepsEnabled: false,
      selectedBoss: undefined
    }
  }

  componentDidMount() {
    const getMonsters = axios.get(
      process.env.REACT_APP_API_URL + '/monsters?order_by=level',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      }
    )
    const getMe = axios.get(process.env.REACT_APP_API_URL + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-token')}`
      }
    })

    axios
      .all([getMonsters, getMe])
      .then((responses) => {
        if (responses[0].data && responses[1].data) {
          this.setState({
            loading: false,
            boss: responses[0].data.items,
            user: responses[1].data,
            selectedBoss: this.state.id
              ? _.find(responses[0].data.items, { id: this.state.id })
              : _.first(responses[0].data.items)
          })

          if (responses[1].data.isNoob) {
            setTimeout(() => {
              this.setState({
                stepsEnabled: true
              })
            }, 500)
          }
        }
      })
      .catch((errors) => {
        this.setState({
          loading: false,
          error: errors[0].response.data.error
        })
      })
  }

  render() {
    const { error, loading, boss, user, selectedBoss } = this.state

    return (
      <Container className="container-fluid">
        {loading && <Loader />}
        <div className="container">
          {error && (
            <span className="text-danger">
              <b>Erreur :</b> {error}
            </span>
          )}
          {boss && (
            <SubContainer className="row h-100 mt-3 mb-3">
              <Tutorial
                stepsEnabled={this.state.stepsEnabled}
                stepName="monsters"
                onExit={() => this.setState({ stepsEnabled: false })}
              />

              <RightBox className="col-sm-12 my-auto">
                <div className="tab-content">
                  {/* General */}
                  <div id="generalTab" role="tabpanel">
                    <Card className="card">
                      <div
                        className="card-header"
                        id="tutorialDescriptionMonster"
                      >
                        {selectedBoss.id !== _.first(boss).id && (
                          <LeftArrayBox className="position-absolute">
                            <LinkArrow
                              arrow="left"
                              to={
                                '/boss/' +
                                boss[
                                  _.findIndex(boss, { id: selectedBoss.id }) - 1
                                ].id
                              }
                            >
                              <i className="fas fa-chevron-left fa-3x" />
                            </LinkArrow>
                          </LeftArrayBox>
                        )}
                        <MonsterSprite image={selectedBoss.image} />
                        {selectedBoss.id !== _.last(boss).id && (
                          <RightArrayBox
                            className="position-absolute"
                            id="tutorialNextMonster"
                          >
                            <LinkArrow
                              arrow="right"
                              to={
                                '/boss/' +
                                boss[
                                  _.findIndex(boss, { id: selectedBoss.id }) + 1
                                ].id
                              }
                            >
                              <i className="fas fa-chevron-right fa-3x" />
                            </LinkArrow>
                          </RightArrayBox>
                        )}
                        <br />
                        <MonsterTypeBadge
                          isGuildBoss={selectedBoss.isGuildBoss}
                          isBoss={selectedBoss.isBoss}
                        />
                        <br />
                        {selectedBoss.name}{' '}
                        <span style={{ color: selectedBoss.academy.color }}>
                          ({selectedBoss.academy.label})
                        </span>
                        <LevelBox> - Niv {selectedBoss.level}</LevelBox>
                      </div>
                      <div
                        className="card-body"
                        id="tutorialCharacteristicsMonster"
                      >
                        <Title>Caractéristiques</Title>
                        <div className="col-sm-12">
                          {_.map(
                            selectedBoss.characteristics,
                            (characteristic) => (
                              <CharacteristicItem
                                key={characteristic.characteristic.name}
                                name={characteristic.characteristic.name}
                                amount={characteristic.amount}
                              />
                            )
                          )}
                          <CharacteristicItem
                            key="experience"
                            name="experience"
                            amount={selectedBoss.givenXp}
                          />
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="card-body" id="tutorialSkills">
                        <div className="col-sm-12">
                          <Title>Compétences du boss</Title>
                        </div>
                        <EquippedSkills
                          skills={selectedBoss.skills}
                          academyId={selectedBoss.academy.id}
                          displayCheckbox={false}
                          buttonOnRight={true}
                          treeType={'light'}
                        />
                      </div>

                      {/* Items */}
                      <div className="card-body" id="tutorialItems">
                        <div className="col-sm-12">
                          <Title>Liste des objets lachés</Title>
                        </div>
                        <ItemList
                          items={selectedBoss.items}
                          displayActions={false}
                          userLevel={user.level}
                        />
                      </div>
                    </Card>
                  </div>
                </div>
              </RightBox>
            </SubContainer>
          )}
        </div>
      </Container>
    )
  }
}

Boss.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idBoss: PropTypes.string
    }).isRequired
  }).isRequired
}

export default Boss
