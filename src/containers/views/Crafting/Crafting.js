import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import Title from '../../../Components/Title/Title'
import ItemList from '../../../Components/Item/ItemList'
import ItemCrafting from '../../../Components/Item/ItemCrafting'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'

const Container = styled.div`
  background-image: url('https://cdnb.artstation.com/p/assets/images/images/006/070/561/large/nikita-bulatov-base-p-02.jpg');
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

const RightBox = styled.div`
  min-height: 550px;
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

class Crafting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: undefined,
      boss: undefined,
      character: undefined,
      activatedTab: 'bossChoiceTab',
      selectedBoss: undefined,
      selectedItem: undefined
    }
  }

  componentDidMount() {
    const getMe = axios.get(process.env.REACT_APP_API_URL + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-token')}`
      }
    })
    const getMonsters = axios.get(process.env.REACT_APP_API_URL + '/monsters', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-token')}`
      }
    })

    axios
      .all([getMe, getMonsters])
      .then((responses) => {
        this.setState({
          character: responses[0].data,
          boss: responses[1].data.items,
          selectedBoss: this.state.idboss
            ? _.find(responses[1].data.items, { id: this.state.idboss })
            : _.first(responses[1].data.items)
        })
      })
      .catch((errors) => {
        this.setState({
          error: errors
        })
      })
  }

  onClickOnTab = (idTab) => {
    this.setState({
      activatedTab: idTab
    })
  }

  handleForgeItem = (item) => {
    // Remove from character items
    let characterItems = [...this.state.character.items]
    let error = false

    _.map(item.item.itemsToCraft, (craft) => {
      let count = craft.amount
      for (let i = 0; i < count; i++) {
        const index = _.findLastIndex(characterItems, {
          item: { id: craft.itemNeededToCraft.id }
        })

        if (index >= 0) {
          _.pullAt(characterItems, [index])
        } else {
          error = true
        }
      }
    })

    if (!error) {
      item.id = null
      characterItems.push(item)

      let items = []
      for (let i = 0; i < characterItems.length; i++) {
        const id = characterItems[i].id

        items.push({
          ...(id && { id: id }),
          item: {
            id: characterItems[i].item.id
          },
          user: {
            id: this.state.character.id
          }
        })
      }
      axios
        .put(
          process.env.REACT_APP_API_URL + '/users/' + this.state.character.id,
          { items },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('auth-token')}`
            }
          }
        )
        .then((response) => {
          if (response.data) {
            this.setState({
              character: response.data
            })

            toast.success(
              <span style={{ fontSize: '14px' }}>
                Création de l’objet réussie !
              </span>,
              {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              }
            )
          }
        })
        .catch((error) => {
          this.setState({
            error: error.response.data
          })
        })
    }
  }

  render() {
    const {
      error,
      boss,
      character,
      activatedTab,
      selectedBoss,
      selectedItem
    } = this.state

    return (
      <Container className="container-fluid">
        <div className="container">
          <div className="row h-100 mt-5">
            <div className="col-sm-3 my-auto">
              <Card className="card">
                <div className="card-header">
                  <Title>Menu</Title>
                  <div>
                    <div onClick={() => this.onClickOnTab('bossChoiceTab')}>
                      <ListLink
                        className={
                          activatedTab === 'bossChoiceTab' ? ' active' : ''
                        }
                        data-toggle="tab"
                        role="tab"
                        href="#bossChoiceTab"
                      >
                        Choix du boss
                      </ListLink>
                      {activatedTab === 'bossChoiceTab' && (
                        <span className="text-warning">
                          &nbsp;
                          <i className="far fa-arrow-alt-circle-right" />
                        </span>
                      )}
                    </div>
                    <div onClick={() => this.onClickOnTab('itemsCraftingTab')}>
                      <ListLink
                        className={
                          activatedTab === 'itemsCraftingTab' ? ' active' : ''
                        }
                        data-toggle="tab"
                        role="tab"
                        href="#itemsCraftingTab"
                      >
                        Création d’objets
                      </ListLink>
                      {activatedTab === 'itemsCraftingTab' && (
                        <span className="text-warning">
                          &nbsp;
                          <i className="far fa-arrow-alt-circle-right" />
                        </span>
                      )}
                    </div>
                    <div onClick={() => this.onClickOnTab('skillsCraftingTab')}>
                      <ListLink
                        className={
                          activatedTab === 'skillsCraftingTab' ? ' active' : ''
                        }
                        data-toggle="tab"
                        role="tab"
                        href="#skillsCraftingTab"
                      >
                        Création de compétences
                      </ListLink>
                      {activatedTab === 'skillsCraftingTab' && (
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
                src={process.env.PUBLIC_URL + '/img/forgeron.png'}
                alt="forgeron"
              />
            </div>

            <RightBox className="col-sm-9 my-auto">
              {error && (
                <span className="text-danger">
                  <b>Erreur :</b> {error.message}
                </span>
              )}
              {selectedBoss && (
                <div className="tab-content">
                  {/* BossChoice */}
                  <div
                    className={`tab-pane${
                      activatedTab === 'bossChoiceTab' ? ' active' : ''
                    }`}
                    id="bossChoiceTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-body">
                        <div className="col-sm-12">
                          <Title>Choix du boss</Title>
                          <div>
                            Séléctionner le boss pour visualiser les objets et
                            compétences que vous pouvez confectionner grâce à
                            ses composants.
                          </div>
                        </div>

                        <div className="mt-3">
                          <div>
                            {_.map(boss, (aBoss) => (
                              <div
                                key={aBoss.id}
                                className={`carousel-item${
                                  selectedBoss.id === aBoss.id ? 'active' : ''
                                }`}
                              >
                                <Image
                                  src={
                                    process.env.PUBLIC_URL +
                                    '/img/boss/' +
                                    aBoss.image
                                  }
                                  alt="Third slide"
                                />
                                <Title>Tour niveau {aBoss.levelTower}</Title>
                                {aBoss.name}{' '}
                                <span style={{ color: aBoss.academy.color }}>
                                  ({aBoss.academy.name})
                                </span>
                                <LevelBox> - Niv {aBoss.level}</LevelBox>
                              </div>
                            ))}
                          </div>
                          {selectedBoss.id !== _.first(boss).id && (
                            <Link
                              to={
                                '/crafting/' +
                                boss[
                                  _.findIndex(boss, { id: selectedBoss.id }) - 1
                                ].id
                              }
                            >
                              <div className="carousel-control-prev">
                                <i className="fas fa-chevron-left fa-2x" />
                              </div>
                            </Link>
                          )}
                          {selectedBoss.id !== _.last(boss).id && (
                            <Link
                              to={
                                '/crafting/' +
                                boss[
                                  _.findIndex(boss, { id: selectedBoss.id }) + 1
                                ].id
                              }
                            >
                              <div className="carousel-control-next">
                                <i className="fas fa-chevron-right fa-2x" />
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* ItemsCrafting */}
                  <div
                    className={`tab-pane${
                      activatedTab === 'itemsCraftingTab' ? ' active' : ''
                    }`}
                    id="itemsCraftingTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-body">
                        <div className="col-sm-12">
                          <Title>Liste d’objets pouvant être créés</Title>
                          <div>Séléctionner l’objet à confectionner.</div>
                        </div>
                        <ItemList
                          items={_.filter(selectedBoss.items, (item) => {
                            return item.item.itemsToCraft.length > 0
                          })}
                          displayActions={false}
                          onClick={(item) =>
                            this.setState({ selectedItem: item })
                          }
                        />
                        {selectedItem && (
                          <div>
                            <div className="col-sm-12">
                              <Title>Forger l’objet</Title>
                              <ItemCrafting
                                item={selectedItem}
                                characterItems={character.items}
                                onClick={this.handleForgeItem}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>

                  {/* SkillsCrafting */}
                  <div
                    className={`tab-pane${
                      activatedTab === 'skillsCraftingTab' ? ' active' : ''
                    }`}
                    id="skillsCraftingTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-body">
                        <div className="col-sm-12">
                          <Title>Création de compétences</Title>
                        </div>
                        Comming soon...
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </RightBox>
          </div>
        </div>
      </Container>
    )
  }
}

Crafting.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idboss: PropTypes.string
    }).isRequired
  }).isRequired
}

export default Crafting
