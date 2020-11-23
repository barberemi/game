import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import _ from 'lodash'
import { boss } from '../../../utils/boss'
import { character } from '../../../utils/character'
import { Link } from 'react-router-dom'
import Title from '../../../Components/Title/Title'
import ItemList from '../../../Components/Item/ItemList'
import ItemCrafting from '../../../Components/Item/ItemCrafting'
import { toast } from 'react-toastify'

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
    const idBoss = parseInt(this.props.match.params.idboss)

    this.state = {
      boss,
      character,
      activatedTab: 'bossChoiceTab',
      selectedBoss: idBoss ? _.find(boss, { id: idBoss }) : _.first(boss),
      selectedItem: null
    }
  }

  onClickOnTab = (idTab) => {
    this.setState({
      activatedTab: idTab
    })
  }

  onCheckSkill = (e) => {
    const name = _.split(e.target.name, '-')
    const exists = !!_.find(this.state.boss.skills[name[3]], {
      id: parseInt(name[2])
    })

    // todo: rework this part: state should never been mutate
    if (exists) {
      _.remove(this.state.boss.skills[name[3]], { id: parseInt(name[2]) })
    } else {
      // eslint-disable-next-line
      this.state.boss.skills[name[3]] = [
        ...this.state.boss.skills[name[3]],
        { id: parseInt(name[2]) }
      ]
    }

    this.setState({
      boss: {
        ...this.state.boss,
        skills: {
          ...this.state.boss.skills,
          [name[3]]: [...this.state.boss.skills[name[3]]]
        }
      }
    })
  }

  handleForgeItem = (item) => {
    // Remove from character items
    let characterItems = [...this.state.character.items]
    let error = false

    _.map(item.itemsToCraft, (craft) => {
      let count = craft.amount

      for (let i = 0; i < count; i++) {
        const index = _.findLastIndex(characterItems, { id: craft.item.id })

        if (index) {
          _.pullAt(characterItems, [index])
        } else {
          error = true
        }
      }
    })

    if (!error) {
      characterItems.push(item)

      this.setState({
        character: {
          ...this.state.character,
          items: characterItems
        }
      })

      toast.success(
        <span style={{ fontSize: '14px' }}>Création de l’objet réussie !</span>,
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
  }

  render() {
    const {
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
                          compétences que vous pouvez confectionner grâce à ses
                          composants.
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
                              <span className={aBoss.academy.color}>
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
                        items={selectedBoss.items}
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
