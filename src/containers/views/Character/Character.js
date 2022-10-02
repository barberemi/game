import React, { Component } from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import ProgressBar from '../../../Components/Character/ProgressBar'
import CharacteristicItem from '../../../Components/Characteristic/CharacteristicItem'
import EquippedItems from '../../../Components/Item/EquippedItems'
import EquippedSkills from '../../../Components/Skill/EquippedSkills'
import FriendList from '../../../Components/Friend/FriendList'
import ItemList from '../../../Components/Item/ItemList'
import ConstructionList from '../../../Components/Construction/ConstructionList'
import Title from '../../../Components/Title/Title'
import Tutorial from '../../../Components/Tutorial/Tutorial'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import PropTypes from 'prop-types'
import Loader from '../../../Components/Loader/Loader'
import { selectTabFromUrl } from '../../../utils/routingHelper'
import StyledCards from '../../../Components/Card/StyledCards'
import { getDaysDateDiffBetweenNowAnd } from '../../../utils/dateHelper'
import moment from 'moment'
import AcademySprite from '../../../Components/Sprites/AcademySprite'

const Container = styled.div`
  background-image: url('${process.env.PUBLIC_URL +
  '/img/backgrounds/character-min.jpg'}');
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

const RightBox = styled.div`
  min-height: 550px;
`

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.8) !important;
`

const SubTitle = styled.span`
  font-size: 18px;
`

const FormAddUser = styled.div`
  display: flex;
  justify-content: flex-start;
`

const InputEmail = styled.input`
  width: 350px;
`

const AddUserButton = styled.button`
  border-radius: inherit;

  &:hover {
    transform: inherit;
  }
`

const TextBox = styled.div`
  padding: 0 10px;
  display: table-cell;
  margin-top: auto;
  text-align: left;
`

class Character extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: parseInt(this.props.match.params.idCharacter),
      error: undefined,
      loading: true,
      user: undefined,
      isMe: false,
      displayForm: false,
      friendToAddOrRemove: '',
      jobSelected: undefined,
      stepsEnabled: false,
      stepName: 'character#generalTab',
      activatedTab: selectTabFromUrl([
        'generalTab',
        'skillsTab',
        'itemsTab',
        'jobsTab',
        'constructionsTab',
        'friendsTab'
      ])
    }

    this.handleAddDeleteUser = this.handleAddDeleteUser.bind(this)
    this.handleChoiceJob = this.handleChoiceJob.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const url = this.state.id
      ? process.env.REACT_APP_API_URL + '/users/' + this.state.id
      : process.env.REACT_APP_API_URL + '/users/me'

    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      })
      .then((response) => {
        if (response.data) {
          this.setState({
            loading: false,
            id: response.data.id,
            isMe:
              jwtDecode(Cookies.get('auth-token')).email ===
              response.data.email,
            user: response.data,
            jobSelected: response.data.job ?? undefined
          })
          if (this.state.isMe && response.data.isNoob) {
            setTimeout(() => {
              this.setState({
                stepsEnabled: true,
                stepName: 'character#' + this.state.activatedTab
              })
            }, 500)
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    const anchor = selectTabFromUrl([
      'generalTab',
      'skillsTab',
      'itemsTab',
      'jobsTab',
      'constructionsTab',
      'friendsTab'
    ])

    if (prevState.activatedTab !== anchor) {
      this.setState({
        activatedTab: anchor
      })

      if (
        jwtDecode(Cookies.get('auth-token')).email !== this.state.user.email
      ) {
        this.setState({
          id: null,
          loading: true
        })
        this.loadData()
      } else {
        if (this.state.user.isNoob) {
          this.setState({
            stepsEnabled: true,
            stepName: 'character#' + anchor
          })
        }
      }
    }
  }

  handleAddDeleteUser(type) {
    if (this.state.friendToAddOrRemove) {
      axios
        .put(
          process.env.REACT_APP_API_URL +
            '/users/' +
            this.state.id +
            '/friends',
          {
            type: type,
            name: this.state.friendToAddOrRemove
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('auth-token')}`
            }
          }
        )
        .then((response) => {
          toast[type === 'add' ? 'success' : 'error'](
            <span style={{ fontSize: '14px' }}>
              {type === 'add'
                ? 'Ajout du lien d’amitié avec '
                : 'Suppression du lien d’amité avec '}
              {this.state.friendToAddOrRemove} !
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
          this.setState({
            user: response.data,
            friendToAddOrRemove: ''
          })
        })
        .catch((error) => {
          toast['error'](
            <span style={{ fontSize: '14px' }}>
              Impossible de trouver cet utilisateur.
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
        })
    }
  }

  onCheckSkill = (skill) => {
    const exists = !!_.find(this.state.user.skills, {
      id: skill.id
    })

    // todo: rework this part: state should never been mutate
    if (exists) {
      _.remove(this.state.user.skills, {
        id: skill.id
      })
    } else {
      // eslint-disable-next-line
      this.state.user.skills = [...this.state.user.skills, skill]
    }

    this.setState({
      user: {
        ...this.state.user,
        skills: this.state.user.skills
      }
    })

    // Save datas
    let skills = []
    for (let i = 0; i < this.state.user.skills.length; i++) {
      const id = this.state.user.skills[i].id

      skills.push({
        ...(id && { id: id }),
        skill: {
          id: this.state.user.skills[i].id
        },
        user: {
          id: this.state.id
        }
      })
    }
    axios
      .put(
        process.env.REACT_APP_API_URL + '/users/' + this.state.id,
        { skills },
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
            user: response.data
          })
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.data
        })
      })
  }

  onDeleteItem = (item) => {
    _.remove(this.state.user.items, { id: item.id })

    this.setState({
      user: {
        ...this.state.user,
        items: this.state.user.items
      }
    })

    this.saveItems()

    toast.error(
      <span style={{ fontSize: '14px' }}>
        Suppression de l’objet réussie !
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

  onChangeEquippedItem = (newEquippedItem) => {
    const items = [...this.state.user.items]
    // Remove all isEquipped items with the same item.type
    if (!newEquippedItem.isEquipped) {
      _.map(
        _.filter(items, {
          isEquipped: true,
          item: { type: newEquippedItem.item.type }
        }),
        (item) => {
          item.isEquipped = false
        }
      )
    }

    // Equipped/Unequipped item now
    newEquippedItem.isEquipped = !newEquippedItem.isEquipped
    const indexItem = _.findIndex(items, { id: newEquippedItem.id })
    items[indexItem] = newEquippedItem

    this.setState({
      user: {
        ...this.state.user,
        items
      }
    })

    this.saveItems()
  }

  saveItems = () => {
    let items = []
    for (let i = 0; i < this.state.user.items.length; i++) {
      const id = this.state.user.items[i].id
      const isEquipped = this.state.user.items[i].isEquipped

      items.push({
        ...(id && { id: id }),
        isEquipped: isEquipped,
        item: {
          id: this.state.user.items[i].item.id
        },
        user: {
          id: this.state.id
        }
      })
    }
    axios
      .put(
        process.env.REACT_APP_API_URL + '/users/' + this.state.id,
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
            user: response.data
          })
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.data
        })
      })
  }

  handleOnPutOrTakeOnGuild = (ownItem) => {
    if (this.state.user.guild) {
      // 1 - Add to guild
      const items = [...this.state.user.guild.items]

      items.push({
        id: ownItem.id,
        isEquipped: false,
        guild: {
          id: this.state.user.guild.id
        },
        user: null
      })

      // 2 - Remove from user
      _.remove(this.state.user.items, { id: ownItem.id })
      this.setState({
        user: {
          ...this.state.user,
          items: this.state.user.items
        }
      })

      // 3 - Save on guild
      axios
        .put(
          process.env.REACT_APP_API_URL + '/guilds/' + this.state.user.guild.id,
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
              user: {
                ...this.state.user,
                remainingBagSpace: this.state.user.remainingBagSpace + 1
              }
            })

            toast.success(
              <span style={{ fontSize: '14px' }}>
                Objet envoyé dans le coffre de la guilde avec succès !
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

  handleChangeNoob = () => {
    const isNoob = !this.state.user.isNoob
    this.setState({
      user: {
        ...this.state.user,
        isNoob
      }
    })

    axios
      .put(
        process.env.REACT_APP_API_URL + '/users/' + this.state.user.id,
        { isNoob: isNoob },
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
            user: response.data
          })
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.data
        })
      })
  }

  handleChoiceJob(event) {
    event.preventDefault()
    // console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
    var date = moment().format('YYYY-MM-DD HH:mm:ss')
    // Add 2 hours to UTC Paris
    // var date = new Date()
    // date.setHours(date.getHours() + 2)
    //
    axios
      .put(
        process.env.REACT_APP_API_URL + '/users/' + this.state.user.id,
        {
          jobUpdatedAt: date,
          job: {
            id: this.state.jobSelected.id
          }
        },
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
            user: response.data
          })
          toast.success(
            <span style={{ fontSize: '14px' }}>
              Changement de métier effectué !
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

  giveActionOrMaterial = (type, construction) => {
    axios
      .put(
        process.env.REACT_APP_API_URL +
          '/constructions/giveData/' +
          construction.id,
        { type: type },
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
            user: response.data
          })
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.data
        })
      })
  }

  selectJob(job) {
    this.setState({
      jobSelected: job,
      displayForm: true
    })
  }

  render() {
    const {
      error,
      loading,
      user,
      activatedTab,
      jobSelected,
      displayForm
    } = this.state

    const orderTab = ['health', 'strength', 'intelligence']

    return (
      <Container className="container-fluid">
        {loading && <Loader />}
        <div className="container">
          {error && (
            <span className="text-danger">
              <b>Erreur :</b> {error.message}
            </span>
          )}
          {!loading && user && (
            <SubContainer className="row h-100 mt-3 mb-3">
              {this.state.isMe && (
                <Tutorial
                  stepsEnabled={this.state.stepsEnabled}
                  stepName={this.state.stepName}
                  onExit={() => this.setState({ stepsEnabled: false })}
                />
              )}

              <RightBox className="col-sm-12 my-auto">
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
                      <div className="card-header" id="tutorialExperience">
                        <Title>
                          {user.name}{' '}
                          <span style={{ color: user.academy.color }}>
                            ({user.academy.label})
                          </span>
                          <br />
                          <ProgressBar
                            actual={user.experience - user.xpToActualLevel}
                            max={user.xpToNextLevel - user.xpToActualLevel}
                            color="#F27625"
                            transparentColor="#7F8286"
                          />
                          <LevelBox>Niveau {user.level}</LevelBox>
                          <br />
                          <AcademySprite name={user.academy.name} />
                        </Title>
                        {user.guild && (
                          <span data-tip="Guilde de l'utilisateur">
                            {user.guild.name}
                          </span>
                        )}
                        {this.state.isMe && (
                          <>
                            <br />
                            <span data-tip="Permet d'activer/désactiver le tutoriel sur chaque page.">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="isNoob"
                                name="isNoob"
                                checked={user.isNoob}
                                onChange={this.handleChangeNoob}
                              />
                              <label
                                className="form-check-label mt-1"
                                htmlFor="isNoob"
                              >
                                Je suis un noob (débutant)
                              </label>
                            </span>
                          </>
                        )}
                      </div>
                      <div
                        className="card-body"
                        id="tutorialCharacteristicsGenerales"
                      >
                        <Title>Ressources générales</Title>
                        <div className="col-sm-12" style={{ height: '100px' }}>
                          <CharacteristicItem
                            name="defense"
                            amount={user.defense}
                            displayJob={user.job.name === 'defender'}
                            description="Points de défense, permettant de mieux résister aux attaques ennemis et donner de la défense à sa guilde."
                          />
                          <CharacteristicItem
                            name="remainingActions"
                            amount={user.remainingActions}
                            displayJob={user.job.name === 'engineer'}
                            description="Points d’actions permettants d’effectuer des activités de guilde (constructions, explorations, minage etc...)"
                          />
                        </div>
                        <div className="col-sm-12" style={{ height: '100px' }}>
                          <div
                            className="col-md-4 col-sm-5"
                            style={{ display: 'flex', float: 'left' }}
                          >
                            <img
                              src={process.env.PUBLIC_URL + '/img/money.svg'}
                              width="50px"
                              height="50px"
                              alt="thune"
                              data-tip={
                                'Thune permettant d’acheter des choses.'
                              }
                            />
                            <TextBox>
                              <div>{user.money.toLocaleString()}</div>
                              <span>Thune</span>
                            </TextBox>
                          </div>
                          <div
                            className="col-md-4 col-sm-5"
                            style={{ display: 'flex', float: 'left' }}
                          >
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                '/img/items/craft/wood.png'
                              }
                              width="50px"
                              height="50px"
                              alt="wood"
                              data-tip={
                                'Ressource de bois permettant de réaliser des constructions.'
                              }
                            />
                            <TextBox>
                              <div>
                                {
                                  _.filter(user.items, {
                                    item: { name: 'Bois' }
                                  }).length
                                }
                              </div>
                              <span>Bois</span>
                            </TextBox>
                          </div>
                        </div>
                      </div>
                      <div className="card-body" id="tutorialCharacteristics">
                        <Title>Caractéristiques personnage</Title>
                        <div className="col-sm-12">
                          {_.map(
                            _.sortBy(user.characteristics, function (item) {
                              return orderTab.indexOf(
                                item.characteristic.name
                              ) !== -1
                                ? orderTab.indexOf(item.characteristic.name)
                                : user.characteristics.length
                            }),
                            (characteristic) => (
                              <CharacteristicItem
                                key={characteristic.characteristic.name}
                                name={characteristic.characteristic.name}
                                amount={characteristic.amount}
                                description={
                                  characteristic.characteristic.description
                                }
                                equippedItems={_.filter(user.items, {
                                  isEquipped: true
                                })}
                              />
                            )
                          )}
                        </div>
                      </div>
                      <div className="card-footer" id="tutorialEquipments">
                        <Title>Équipements</Title>
                        <EquippedItems
                          items={_.filter(user.items, {
                            isEquipped: true
                          })}
                          displayActions={this.state.isMe}
                          onDeleteItem={this.onDeleteItem}
                          onChangeEquippedItem={this.onChangeEquippedItem}
                          userLevel={user.level}
                        />
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
                      <div
                        className="card-header"
                        id="tutorialSkillsPointsRemaining"
                      >
                        <div className="col-sm-12">
                          <Title>
                            Compétences d’académie
                            <br />
                            <SubTitle
                              className={
                                user.skillPoints - user.skills.length > 0
                                  ? 'text-success'
                                  : 'text-danger'
                              }
                            >
                              (
                              {user.skillPoints - user.skills.length === 0
                                ? 'Aucun point restant'
                                : user.skillPoints - user.skills.length === 1
                                ? '1pt restant'
                                : user.skillPoints -
                                  user.skills.length +
                                  'pts restants'}
                              )
                            </SubTitle>
                          </Title>
                        </div>
                      </div>
                      <div className="card-body" id="tutorialSkills">
                        <EquippedSkills
                          skills={user.skills}
                          academyId={user.academy.id}
                          onCheckSkill={this.onCheckSkill}
                          displayCheckbox={this.state.isMe}
                          remainingSkillPoints={
                            user.skillPoints - user.skills.length
                          }
                          treeType={'light'}
                          userLevel={user.level === 0 ? 1 : user.level}
                        />
                      </div>
                    </Card>
                  </div>

                  {/* Items */}
                  <div
                    className={`tab-pane${
                      activatedTab === 'itemsTab' ? ' active' : ''
                    }`}
                    id="itemsTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-body">
                        <div className="col-sm-12">
                          <Title>
                            Inventaire
                            <br />
                            <SubTitle
                              id="tutorialNbRemainingItems"
                              className={
                                user.remainingBagSpace > 0
                                  ? 'text-success'
                                  : 'text-danger'
                              }
                            >
                              (
                              {user.remainingBagSpace === 0
                                ? 'Aucune place restante'
                                : user.remainingBagSpace === 1
                                ? '1 place disponible'
                                : user.remainingBagSpace +
                                  ' places disponibles'}
                              )
                            </SubTitle>
                          </Title>
                        </div>
                        <ItemList
                          id="tutorialItems"
                          items={user.items}
                          displayActions={this.state.isMe}
                          onDeleteItem={this.onDeleteItem}
                          onChangeEquippedItem={this.onChangeEquippedItem}
                          onPutOrTakeOnGuild={this.handleOnPutOrTakeOnGuild}
                          hasGuild={!!user.guild}
                          addEmptyZones={user.remainingBagSpace}
                          userLevel={user.level}
                        />
                      </div>
                    </Card>
                  </div>

                  {/* Jobs */}
                  <div
                    className={`tab-pane${
                      activatedTab === 'jobsTab' ? ' active' : ''
                    }`}
                    id="jobsTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-body" id="tutorialJobs">
                        <div className="col-sm-12">
                          <Title>Métier</Title>
                        </div>
                        Un métier vous permet d’effectuer des actions en plus
                        tous les jours afin de progresser plus rapidement.
                        <br />
                        {getDaysDateDiffBetweenNowAnd(user.jobUpdatedAt) >=
                          30 && (
                          <span style={{ color: '#f26725' }}>
                            Changement de métier possible
                          </span>
                        )}
                        {getDaysDateDiffBetweenNowAnd(user.jobUpdatedAt) <
                          30 && (
                          <>
                            Possibilité de changement de métier dans{' '}
                            <span style={{ color: '#fcce18' }}>
                              {30 -
                                getDaysDateDiffBetweenNowAnd(
                                  user.jobUpdatedAt
                                )}{' '}
                              jour
                              {30 -
                                getDaysDateDiffBetweenNowAnd(
                                  user.jobUpdatedAt
                                ) >
                                1 && 's'}
                            </span>
                            .
                          </>
                        )}
                        <br />
                        <StyledCards
                          isDark={user.isDark}
                          type={'jobs'}
                          onClick={(job) => this.selectJob(job)}
                          selectedId={jobSelected ? jobSelected.id : undefined}
                        />
                        {jobSelected && displayForm && (
                          <>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: jobSelected.description
                              }}
                            />
                            {getDaysDateDiffBetweenNowAnd(user.jobUpdatedAt) >=
                              30 && (
                              <form onSubmit={this.handleChoiceJob}>
                                <input
                                  type="submit"
                                  value="Choisir"
                                  className="btn btn-success"
                                />
                              </form>
                            )}
                          </>
                        )}
                      </div>
                    </Card>
                  </div>

                  {/* Constructions */}
                  <div
                    className={`tab-pane${
                      activatedTab === 'constructionsTab' ? ' active' : ''
                    }`}
                    id="constructionsTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-body" id="tutorialConstructions">
                        <div className="col-sm-12">
                          <Title>Constructions</Title>
                        </div>
                        <ConstructionList
                          user={user}
                          giveAction={(construction) =>
                            this.giveActionOrMaterial('action', construction)
                          }
                          giveMaterial={(construction) =>
                            this.giveActionOrMaterial('material', construction)
                          }
                        />
                      </div>
                    </Card>
                  </div>

                  {/* Friends */}
                  <div
                    className={`tab-pane${
                      activatedTab === 'friendsTab' ? ' active' : ''
                    }`}
                    id="friendsTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      {(user.email ===
                        jwtDecode(Cookies.get('auth-token')).email ||
                        jwtDecode(Cookies.get('auth-token')).roles[0] ===
                          'ROLE_ADMIN') && (
                        <div className="card-header" id="tutorialAddFriends">
                          <div className="col-sm-12">
                            <Title>Ajouter des amis</Title>
                          </div>
                          <div className="offset-sm-3 col-sm-6">
                            <FormAddUser>
                              <InputEmail
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Nom du joueur"
                                value={this.state.friendToAddOrRemove}
                                onChange={(event) =>
                                  this.setState({
                                    friendToAddOrRemove: event.target.value
                                  })
                                }
                              />
                              <AddUserButton
                                className="btn btn-success"
                                type="button"
                                onClick={() => this.handleAddDeleteUser('add')}
                              >
                                Ajouter
                              </AddUserButton>
                            </FormAddUser>
                          </div>
                        </div>
                      )}
                      <div className="card-body" id="tutorialFriendsList">
                        <div className="col-sm-12 mt-3">
                          <Title>Liste d’amis</Title>
                        </div>
                        <FriendList
                          friends={user.friends}
                          canDelete={
                            jwtDecode(Cookies.get('auth-token')).roles[0] ===
                              'ROLE_ADMIN' ||
                            user.email ===
                              jwtDecode(Cookies.get('auth-token')).email
                          }
                          onDelete={(friend) => {
                            this.setState(
                              {
                                friendToAddOrRemove: friend.name
                              },
                              () => this.handleAddDeleteUser('delete')
                            )
                          }}
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

Character.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idCharacter: PropTypes.string
    }).isRequired
  }).isRequired
}

export default Character
