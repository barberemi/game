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

const Container = styled.div`
  background-image: url('https://cdnb.artstation.com/p/assets/images/images/017/639/075/large/yarki-studio-dragon-sisters-2.jpg');
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

const ListLink = styled.a`
  color: #fff;

  &:hover {
    color: #ffc312;
    text-decoration: none;
  }
`

const LevelBox = styled.span`
  font-size: 16px;
  color: #fff;
`

const LeftArrayBox = styled.div`
  left: 10px;
  top: 50%;
  z-index: 10;
`

const RightArrayBox = styled.div`
  right: 10px;
  top: 50%;
  z-index: 10;
`

const RightBox = styled.div`
  min-height: 550px;
`

const LinkArrow = styled(Link)`
  color: #fff;

  &:hover {
    color: #ffc312;
  }
`

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.7) !important;
`

const Image = styled.img`
  width: 200px;
  margin-top: 10px;
  -webkit-filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  -ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=1, OffY=1, Color='#444')";
`

class Boss extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      id: parseInt(this.props.match.params.idBoss),
      boss: undefined,
      activatedTab: 'generalTab',
      selectedBoss: undefined
    }
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + '/monsters', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      })
      .then((response) => {
        if (response.data) {
          this.setState({
            loading: false,
            boss: response.data.items,
            selectedBoss: this.state.id
              ? _.find(response.data.items, { id: this.state.id })
              : _.first(response.data.items)
          })
        }
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.response.data.error
        })
      })
  }

  onClickOnTab = (idTab) => {
    this.setState({
      activatedTab: idTab
    })
  }

  render() {
    const { error, loading, boss, activatedTab, selectedBoss } = this.state

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
            <div className="row h-100 mt-5">
              {selectedBoss.id !== _.first(boss).id && (
                <LeftArrayBox className="position-fixed h-100">
                  <LinkArrow
                    arrow="left"
                    to={
                      '/boss/' +
                      boss[_.findIndex(boss, { id: selectedBoss.id }) - 1].id
                    }
                  >
                    <i className="fas fa-chevron-left fa-3x" />
                  </LinkArrow>
                </LeftArrayBox>
              )}

              {selectedBoss.id !== _.last(boss).id && (
                <RightArrayBox className="position-fixed h-100">
                  <LinkArrow
                    arrow="right"
                    to={
                      '/boss/' +
                      boss[_.findIndex(boss, { id: selectedBoss.id }) + 1].id
                    }
                  >
                    <i className="fas fa-chevron-right fa-3x" />
                  </LinkArrow>
                </RightArrayBox>
              )}

              <div className="col-sm-3 my-auto">
                <Card className="card">
                  <div className="card-header">
                    <Title>Menu</Title>
                    <div>
                      <div onClick={() => this.onClickOnTab('generalTab')}>
                        <ListLink
                          className={
                            activatedTab === 'generalTab' ? 'active' : ''
                          }
                          data-toggle="tab"
                          role="tab"
                          href="#generalTab"
                        >
                          Général
                        </ListLink>
                        {activatedTab === 'generalTab' && (
                          <span className="text-warning">
                            &nbsp;
                            <i className="far fa-arrow-alt-circle-right" />
                          </span>
                        )}
                      </div>
                      <div onClick={() => this.onClickOnTab('skillsTab')}>
                        <ListLink
                          className={
                            activatedTab === 'skillsTab' ? ' active' : ''
                          }
                          data-toggle="tab"
                          role="tab"
                          href="#skillsTab"
                        >
                          Compétences
                        </ListLink>
                        {activatedTab === 'skillsTab' && (
                          <span className="text-warning">
                            &nbsp;
                            <i className="far fa-arrow-alt-circle-right" />
                          </span>
                        )}
                      </div>
                      <div onClick={() => this.onClickOnTab('itemsLootTab')}>
                        <ListLink
                          className={
                            activatedTab === 'itemsLootTab' ? ' active' : ''
                          }
                          data-toggle="tab"
                          role="tab"
                          href="#itemsLootTab"
                        >
                          Objets lachés
                        </ListLink>
                        {activatedTab === 'itemsLootTab' && (
                          <span className="text-warning">
                            &nbsp;
                            <i className="far fa-arrow-alt-circle-right" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
                <Image
                  src={
                    process.env.PUBLIC_URL + '/img/boss/' + selectedBoss.image
                  }
                  alt={selectedBoss.academy.name}
                />
              </div>

              <RightBox className="col-sm-9 my-auto">
                <div className="tab-content">
                  {/* General */}
                  <div
                    className={`tab-pane${
                      activatedTab === 'generalTab' ? ' active' : ''
                    }`}
                    id="generalTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-header">
                        {(selectedBoss.isBoss || selectedBoss.isGuildBoss) && (
                          <>
                            <MonsterTypeBadge
                              isGuildBoss={selectedBoss.isGuildBoss}
                              isBoss={selectedBoss.isBoss}
                            />
                            <br />
                          </>
                        )}
                        {selectedBoss.name}{' '}
                        <span style={{ color: selectedBoss.academy.color }}>
                          ({selectedBoss.academy.label})
                        </span>
                        <LevelBox> - Niv {selectedBoss.level}</LevelBox>
                      </div>
                      <div className="card-body">
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
                    </Card>
                  </div>

                  {/* Skills */}
                  <div
                    className={`tab-pane${
                      activatedTab === 'skillsTab' ? ' active' : ''
                    }`}
                    id="skillsTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-body">
                        <div className="col-sm-12">
                          <Title>Compétences du boss</Title>
                        </div>
                        <EquippedSkills
                          skills={selectedBoss.skills}
                          academyId={selectedBoss.academy.id}
                          displayCheckbox={false}
                        />
                      </div>
                    </Card>
                  </div>

                  {/* Items */}
                  <div
                    className={`tab-pane${
                      activatedTab === 'itemsLootTab' ? ' active' : ''
                    }`}
                    id="itemsLootTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-body">
                        <div className="col-sm-12">
                          <Title>Liste des objets lachés</Title>
                        </div>
                        <ItemList
                          items={selectedBoss.items}
                          displayActions={false}
                        />
                      </div>
                    </Card>
                  </div>
                </div>
              </RightBox>
            </div>
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
