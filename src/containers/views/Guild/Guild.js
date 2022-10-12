import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import _ from 'lodash'
import { Redirect, Link } from 'react-router-dom'
import FriendList from '../../../Components/Friend/FriendList'
import MonsterList from '../../../Components/Monster/MonsterList'
import Title from '../../../Components/Title/Title'
import axios from 'axios'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import PropTypes from 'prop-types'
import moment from 'moment'
import Loader from '../../../Components/Loader/Loader'
import { toast } from 'react-toastify'
import MonsterTypeBadge from '../../../Components/Badge/MonsterTypeBadge'
import ItemList from '../../../Components/Item/ItemList'
import { selectTabFromUrl } from '../../../utils/routingHelper'
import Tutorial from '../../../Components/Tutorial/Tutorial'
import ConstructionList from '../../../Components/Construction/ConstructionList'
import GuildList from '../../../Components/Guild/GuildList'
import MonsterSprite from '../../../Components/Sprites/MonsterSprite'
import SeasonRewards from '../../../Components/Guild/SeasonRewards'
import defenseSvg from '../../../Components/Characteristic/defense.svg'
import ReactTooltip from 'react-tooltip'
import ResultAttack from '../../../Components/Guild/ResultAttack'

const Container = styled.div`
  background-image: url(${process.env.PUBLIC_URL +
  '/img/backgrounds/guild-exploration-min.jpg'});
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

const RightBox = styled.div`
  min-height: 550px;
`

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.8) !important;
`

const ListingMessages = styled.div`
  overflow-y: scroll;
  padding-bottom: 1.5rem;
  text-align: left;
  max-height: 60vh;
  min-height: 60vh;
`

const Chat = styled.div`
  display: flex;
  justify-content: flex-start;
`

const InputMessage = styled.input`
  flex-grow: 1;
  margin-right: -7px;
`

const CustomButton = styled.button`
  border-radius: inherit;

  &:hover {
    transform: inherit;
  }
`

const FormAddUser = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Input = styled.input`
  width: 350px;
`

const Button = styled.button`
  border-radius: inherit;

  &:hover {
    transform: inherit;
  }
`

const CreateGuildText = styled.div`
  padding-top: 10px;
`

const LevelBox = styled.span`
  font-size: 16px;
  color: #fff;
`

const Member = styled.div`
  display: flex;
  float: left;
  width: 100%;
  padding-top: 20px;
`

const Name = styled.div`
  text-align: left;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: #fff;

  ${(props) =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `};
`

const FightButton = styled.button`
  color: white;
  font-size: 14px;
`

const InputSubmit = styled.input`
  margin-top: 10px;
`

const LinkToGuildExploration = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`

const SeasonChest = styled.img`
  width: 50px;
  position: absolute;
  right: 0;
  top: 0;

  &:hover {
    cursor: pointer;
  }
`

class Guild extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: parseInt(this.props.match.params.idGuild),
      user: undefined,
      error: undefined,
      redirect: undefined,
      loading: true,
      estimationLoader: false,
      textMessage: '',
      textAnnouncement: '',
      guild: undefined,
      monsters: undefined,
      selectedGuild: undefined,
      memberToAddOrRemove: '',
      newNameGuild: '',
      stepsEnabled: 'waiting',
      stepName: 'guild#generalTab',
      activatedTab: selectTabFromUrl([
        'generalTab',
        'chatTab',
        'constructionsTab',
        'friendsTab',
        'choiceBossTab',
        'fightBossTab',
        'itemsGuildTab',
        'pantheonGuildTab'
      ])
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddDeleteUser = this.handleAddDeleteUser.bind(this)
    this.handleChoiceGuildBoss = this.handleChoiceGuildBoss.bind(this)
    this.handleCreateGuildBossFight = this.handleCreateGuildBossFight.bind(this)
    this.handleOnPutOrTakeOnGuild = this.handleOnPutOrTakeOnGuild.bind(this)
    this.handlePromoteToOfficer = this.handlePromoteToOfficer.bind(this)
    this.handleDoJob = this.handleDoJob.bind(this)
  }

  componentDidMount() {
    const getMe = axios.get(process.env.REACT_APP_API_URL + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-token')}`
      }
    })
    const getMonsters = axios.get(
      process.env.REACT_APP_API_URL + '/monsters?isGuildBoss=1',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      }
    )

    axios
      .all([getMe, getMonsters])
      .then((responses) => {
        if (responses[0].data) {
          // Redirect to Login if Guild Token dont match with DB Guild
          if (
            (jwtDecode(Cookies.get('auth-token')).guild &&
              !responses[0].data.guild) ||
            (!jwtDecode(Cookies.get('auth-token')).guild &&
              responses[0].data.guild)
          ) {
            Cookies.remove('auth-token', {
              path: '',
              domain: process.env.REACT_APP_DOMAIN
            })
            this.setState({
              redirect: '/login'
            })
          } else {
            if (!responses[0].data.guild) {
              this.setState({
                loading: false,
                user: responses[0].data
              })
            } else {
              this.setState({
                user: responses[0].data,
                monsters: responses[0].data.guild.position
                  ? responses[1].data.items.slice(
                      0,
                      responses[0].data.guild.position
                    )
                  : responses[1].data.items,
                textAnnouncement: responses[0].data.guild.announcement,
                id: responses[0].data.guild.id
              })
              this.loadData()
              setInterval(() => {
                this.loadData()
              }, 5000)
            }
          }
        }
      })
      .catch((errors) => {
        this.setState({
          loading: false,
          error: errors[0].response.data
        })
      })
  }

  loadData() {
    axios
      .get(process.env.REACT_APP_API_URL + '/guilds/' + this.state.id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      })
      .then((response) => {
        if (response.data) {
          this.setState({
            loading: false,
            estimationLoader: false,
            guild: response.data
          })

          if (this.state.user.isNoob && this.state.stepsEnabled === 'waiting') {
            setTimeout(() => {
              this.setState({
                stepsEnabled: true,
                stepName: 'guild#' + this.state.activatedTab
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
      'chatTab',
      'constructionsTab',
      'friendsTab',
      'choiceBossTab',
      'fightBossTab',
      'itemsGuildTab',
      'pantheonGuildTab'
    ])

    if (prevState.activatedTab !== anchor) {
      this.setState({
        activatedTab: anchor
      })

      if (this.state.user && this.state.user.isNoob && this.state.user.guild) {
        this.setState({
          stepsEnabled: true,
          stepName: 'guild#' + anchor
        })
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    if (event.target.message.value) {
      axios
        .post(
          process.env.REACT_APP_API_URL + '/messages',
          {
            message: event.target.message.value,
            topic: 'guildMessage',
            guild: {
              id: this.state.guild.id
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
          this.setState({
            textMessage: '',
            guild: {
              ...this.state.guild,
              messages: [...this.state.guild.messages, response.data]
            }
          })
        })
        .catch((error) => {
          this.setState({
            error: error.response.status
          })
        })
    }
  }

  handleAddDeleteUser(type) {
    if (this.state.memberToAddOrRemove) {
      axios
        .put(
          process.env.REACT_APP_API_URL +
            '/guilds/' +
            this.state.id +
            '/members',
          {
            type: type,
            name: this.state.memberToAddOrRemove
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
                ? 'Ajout du membre ' + this.state.memberToAddOrRemove + '!'
                : 'Suppression du membre ' +
                  this.state.memberToAddOrRemove +
                  '!'}
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
          setInterval(() => {
            this.setState({
              guild: response.data,
              memberToAddOrRemove: ''
            })
          }, 5000)
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

  handleCreateGuild() {
    if (this.state.newNameGuild && this.state.user.money >= 20000) {
      let guildId = null
      // 1 - Create the guild
      axios
        .post(
          process.env.REACT_APP_API_URL + '/guilds',
          {
            name: this.state.newNameGuild
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('auth-token')}`
            }
          }
        )
        .then((response) => {
          // 2 - User lost money and become Guild's Master
          if (response.data) {
            guildId = response.data.id
            let data = { money: Number(this.state.user.money) - 20000 }
            data = {
              money: Number(this.state.user.money) - 20000,
              guildRole: 'master'
            }

            axios
              .put(
                process.env.REACT_APP_API_URL + '/users/' + this.state.user.id,
                data,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('auth-token')}`
                  }
                }
              )
              .then((response) => {
                // 3 - Add user as member of the guild
                if (response) {
                  axios
                    .put(
                      process.env.REACT_APP_API_URL +
                        '/guilds/' +
                        guildId +
                        '/members',
                      {
                        type: 'add',
                        name: this.state.user.name
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${Cookies.get('auth-token')}`
                        }
                      }
                    )
                    .then((response) => {
                      toast.success(
                        <span style={{ fontSize: '14px' }}>
                          Création de la guilde {this.state.newNameGuild}{' '}
                          réalisé avec succès!
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
                      setInterval(() => {
                        this.setState({
                          guild: response.data,
                          redirect: '/guild',
                          newNameGuild: ''
                        })
                      }, 5000)
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
                  error: error.response.data
                })
              })
          }
        })
        .catch((error) => {
          this.setState({
            error: error.response.data
          })
        })
    }
  }

  handleChoiceGuildBoss = (guildMonster) => {
    const { guild } = this.state

    let monster = null
    if (!guild.monster || guild.monster.id !== guildMonster.id) {
      monster = {
        id: guildMonster.id
      }
    }

    axios
      .put(
        process.env.REACT_APP_API_URL + '/guilds/' + this.state.guild.id,
        { monster },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('auth-token')}`
          }
        }
      )
      .then((response) => {
        toast.success(
          <span style={{ fontSize: '14px' }}>
            {monster
              ? `Le monstre ${guildMonster.name} est maintenant le champion de la guilde!`
              : 'Vous avez supprimer le champion de la guilde!'}
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
          guild: response.data
        })
      })
      .catch((error) => {
        this.setState({
          error: error.response.data
        })
      })
  }

  handleCreateGuildBossFight = () => {
    const { user, guild } = this.state

    // 1 - Check if waiting guild boss fight
    if (
      user.lastGuildBossFightOfDay &&
      user.lastGuildBossFightOfDay.type === 'waiting'
    ) {
      this.setState({ redirect: '/fight/' + user.lastGuildBossFightOfDay.id })
    } else {
      // 2 - No waiting fight : create one
      axios
        .post(
          process.env.REACT_APP_API_URL + '/fights',
          {
            user: {
              id: user.id
            },
            monster: {
              id: guild.monster.id
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
              redirect: '/fight/' + response.data.id
            })
          }
        })
        .catch((error) => {
          this.setState({
            error: error.response.data
          })
        })
    }
  }

  handleOnPutOrTakeOnGuild = (ownItem) => {
    // 1 - Add to user
    const items = [...this.state.user.items]

    items.push({
      id: ownItem.id,
      isEquipped: false,
      guild: null,
      user: {
        id: this.state.user.id
      }
    })

    // 2 - Remove from guild
    _.remove(this.state.guild.items, { id: ownItem.id })
    this.setState({
      guild: {
        ...this.state.guild,
        items: this.state.guild.items
      }
    })

    // 3 - Save on user
    axios
      .put(
        process.env.REACT_APP_API_URL + '/users/' + this.state.user.id,
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

          toast.success(
            <span style={{ fontSize: '14px' }}>
              Objet envoyé dans dans votre inventaire avec succès !
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
      .catch(() => {
        toast.error(
          <span style={{ fontSize: '14px' }}>
            Impossible, il vous manque de la place dans votre inventaire !
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

  handlePromoteToOfficer = (user) => {
    axios
      .put(
        process.env.REACT_APP_API_URL + '/users/' + user.id,
        {
          guildRole: user.guildRole === 'officer' ? 'member' : 'officer'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('auth-token')}`
          }
        }
      )
      .then(() => {
        toast.success(
          <span style={{ fontSize: '14px' }}>
            {user.name} est devenu{' '}
            {user.guildRole === 'officer' ? 'Membre' : 'Officier'} !
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
      .catch((error) => {
        this.setState({
          error: error.response.status
        })
      })
  }

  handleChangeGuildAnnouncement = (event) => {
    event.preventDefault()
    const { guild } = this.state

    if (event.target.announcement.value) {
      axios
        .put(
          process.env.REACT_APP_API_URL + '/guilds/' + guild.id,
          {
            announcement: event.target.announcement.value
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('auth-token')}`
            }
          }
        )
        .then(() => {
          toast.success(
            <span style={{ fontSize: '14px' }}>
              Annonce modifiée avec succès!
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
        .catch((error) => {
          this.setState({
            error: error.response.status
          })
        })
    }
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

  handleDoJob = (job) => {
    const { user } = this.state
    const nbOldItems = user.items.length

    if (job === 'minor' && user.remainingBagSpace <= 0) {
      toast.error(
        <span style={{ fontSize: '14px' }}>
          Vous n’avez plus d’emplacements d’objets disponibles.
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
    } else if (user.canAction) {
      axios
        .put(
          process.env.REACT_APP_API_URL + '/users/' + user.id,
          { canAction: false },
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
              estimationLoader: job !== 'minor',
              user: {
                ...this.state.user,
                canAction: false
              }
            })
            let text = 'Scouting effectué avec succès !'

            if (job === 'minor') {
              const nbNewItems = response.data.items.length
              text = 'Récupération de ' + (nbNewItems - nbOldItems) + ' de Bois'
            }

            toast.success(<span style={{ fontSize: '14px' }}>{text}</span>, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })
          }
        })
        .catch((error) => {
          this.setState({
            error: error.response.data
          })
        })
    }
  }

  handleValidAttack = () => {
    const { user } = this.state
    axios
      .put(
        process.env.REACT_APP_API_URL + '/users/' + user.id,
        { hasSurvivedToAttack: null },
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
            redirect: '/guild'
          })
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.data
        })
      })
  }

  render() {
    const {
      error,
      loading,
      redirect,
      guild,
      user,
      monsters,
      season,
      selectedGuild,
      activatedTab,
      stepName,
      estimationLoader
    } = this.state

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <Container className="container-fluid">
        {loading && <Loader />}
        <div className="container">
          <SubContainer className="row h-100 mt-5 mb-5">
            <RightBox className="col-sm-12 my-auto">
              {this.state.stepsEnabled === true && (
                <Tutorial
                  stepsEnabled={this.state.stepsEnabled}
                  stepName={stepName}
                  onExit={() => this.setState({ stepsEnabled: false })}
                />
              )}
              <div className="tab-content">
                {error && (
                  <span className="text-danger">
                    <b>Erreur :</b> {error.error}
                  </span>
                )}

                {/* Night Attack result */}
                {guild &&
                  user &&
                  user.hasSurvivedToAttack !== undefined &&
                  !loading && (
                    <Card className="card">
                      <ResultAttack
                        user={user}
                        guild={guild}
                        onValidAttack={() => this.handleValidAttack()}
                      />
                    </Card>
                  )}

                {/* General */}
                <div
                  className={`tab-pane${
                    activatedTab === 'generalTab' ? ' active' : ''
                  }`}
                  id="generalTab"
                  role="tabpanel"
                >
                  {/* No Guild */}
                  {!guild &&
                    user &&
                    user.hasSurvivedToAttack === undefined &&
                    !loading && (
                      <Card className="card">
                        <div className="card-header">
                          <Title>Créer sa propre guilde</Title>
                        </div>
                        <div className="card-body">
                          <div className="col-sm-12">
                            {user.money >= 20000 && (
                              <div className="offset-sm-3 col-sm-6">
                                <FormAddUser>
                                  <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Nom de la guilde"
                                    value={this.state.newNameGuild}
                                    onChange={(event) =>
                                      this.setState({
                                        newNameGuild: event.target.value
                                      })
                                    }
                                  />
                                  <Button
                                    className="btn btn-success"
                                    type="button"
                                    onClick={() => this.handleCreateGuild()}
                                  >
                                    Créer
                                  </Button>
                                </FormAddUser>
                              </div>
                            )}
                            <CreateGuildText>
                              Coûte 20 000{' '}
                              <img
                                src={process.env.PUBLIC_URL + '/img/money.svg'}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="Thune"
                              />
                              {user.money < 20000 && (
                                <div className="text-danger">
                                  Vous possédez actuellement{' '}
                                  {user.money.toLocaleString()}{' '}
                                  <img
                                    src={
                                      process.env.PUBLIC_URL + '/img/money.svg'
                                    }
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="Thune"
                                  />
                                </div>
                              )}
                            </CreateGuildText>
                          </div>
                        </div>
                      </Card>
                    )}
                  {guild && user && user.hasSurvivedToAttack === undefined && (
                    <Card className="card">
                      <div className="card-header" id="tutorialGuildName">
                        <Title>
                          {guild.name}{' '}
                          <span style={{ fontSize: '18px', color: 'white' }}>
                            ({guild.seasonDay}{' '}
                            {guild.seasonDay > 1 ? 'jours' : 'jour'})
                          </span>
                        </Title>
                        {user.canGuildBossFight && (
                          <>
                            <FightButton
                              onClick={() => this.handleCreateGuildBossFight()}
                              className="btn btn-outline-warning"
                            >
                              Combat de la journée{' '}
                              <img
                                src={process.env.PUBLIC_URL + '/img/versus.svg'}
                                width="30px"
                                height="30px"
                                alt="versus"
                              />
                            </FightButton>{' '}
                          </>
                        )}
                        <LinkToGuildExploration to={'/guild_exploration'}>
                          <FightButton className="btn btn-outline-warning">
                            Exploration de guilde{' '}
                            <img
                              src={process.env.PUBLIC_URL + '/img/map.svg'}
                              width="30px"
                              height="30px"
                              alt="map"
                            />
                          </FightButton>
                        </LinkToGuildExploration>{' '}
                        {user.job && user.canAction && (
                          <>
                            {user.job.name === 'scout' && (
                              <FightButton
                                onClick={() => this.handleDoJob(user.job.name)}
                                className="btn btn-outline-warning"
                              >
                                Compter les ennemis{' '}
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    '/img/jobs/scout.svg'
                                  }
                                  width="30px"
                                  height="30px"
                                  alt="scout"
                                />
                              </FightButton>
                            )}
                            {user.job.name === 'minor' && (
                              <FightButton
                                onClick={() => this.handleDoJob(user.job.name)}
                                className="btn btn-outline-warning"
                              >
                                Chercher des matériaux{' '}
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    '/img/jobs/minor.svg'
                                  }
                                  width="30px"
                                  height="30px"
                                  alt="minor"
                                />
                              </FightButton>
                            )}
                          </>
                        )}
                      </div>
                      <div className="card-body" id="tutorialGuildAnnouncement">
                        <Title>Annonce de la guilde</Title>
                        {(user.role === 'ROLE_ADMIN' ||
                          user.guildRole === 'master' ||
                          user.guildRole === 'officer') && (
                          <form onSubmit={this.handleChangeGuildAnnouncement}>
                            <textarea
                              name="announcement"
                              id="announcement"
                              className="form-control"
                              rows="5"
                              value={this.state.textAnnouncement}
                              onChange={(e) =>
                                this.setState({
                                  textAnnouncement: e.target.value
                                })
                              }
                            />
                            <InputSubmit
                              type="submit"
                              value="Valider"
                              className="btn btn-success"
                            />
                          </form>
                        )}
                        {user.role !== 'ROLE_ADMIN' &&
                          user.guildRole === 'member' && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: guild.announcement.replace(
                                  // eslint-disable-next-line
                                  new RegExp('\r?\n', 'g'),
                                  '<br />'
                                )
                              }}
                            />
                          )}
                      </div>
                      <div className="card-footer" id="tutorialGuildEstimation">
                        <Title>
                          Estimation de l’attaque{' '}
                          <span style={{ fontSize: '10px' }}>
                            (de 00h00 à 00h15)
                          </span>
                        </Title>
                        <table className="table">
                          <thead>
                            <tr>
                              <th style={{ borderTop: 0 }}>
                                Attaque des monstres
                              </th>
                              <th style={{ borderTop: 0 }}>
                                Défense de la guilde
                              </th>
                            </tr>
                            <tr>
                              <td style={{ borderTop: 0 }}>
                                {estimationLoader && (
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      '/img/tail-spinner.svg'
                                    }
                                    width="20"
                                    height="20"
                                    alt="spinner"
                                  />
                                )}
                                {!estimationLoader &&
                                  !guild.minAttack &&
                                  !guild.maxAttack && (
                                    <i className="fas fa-question" />
                                  )}
                                {!estimationLoader &&
                                  (guild.minAttack || guild.maxAttack) && (
                                    <>
                                      Entre{' '}
                                      {guild.minAttack ? (
                                        guild.minAttack
                                      ) : (
                                        <i className="fas fa-question" />
                                      )}{' '}
                                      et{' '}
                                      {guild.maxAttack ? (
                                        guild.maxAttack
                                      ) : (
                                        <i className="fas fa-question" />
                                      )}
                                    </>
                                  )}
                              </td>
                              <td style={{ borderTop: 0 }}>
                                {guild.defense}{' '}
                                <img
                                  src={defenseSvg}
                                  alt="defense"
                                  width="30px"
                                  data-tip="Point de défense"
                                />
                              </td>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <ReactTooltip />
                    </Card>
                  )}
                </div>

                {/* Chat */}
                {guild && user && user.hasSurvivedToAttack === undefined && (
                  <div
                    className={`tab-pane${
                      activatedTab === 'chatTab' ? ' active' : ''
                    }`}
                    id="chatTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-header">
                        <Title>{guild.name}</Title>
                      </div>
                      <div className="card-body" id="tutorialGuildChat">
                        <ListingMessages>
                          {_.map(guild.messages, (message) => (
                            <div key={message.id}>
                              <strong>
                                <i>
                                  (
                                  {moment(message.createdAt).format(
                                    'DD/MM à HH:mm'
                                  )}
                                  ){' '}
                                </i>
                                <Link
                                  to={
                                    message.user.id === user.id
                                      ? '/character'
                                      : '/character/' + message.user.id
                                  }
                                  className="text-warning text-decoration-none"
                                >
                                  {message.user.name}
                                </Link>{' '}
                                :{' '}
                              </strong>
                              <span style={{ fontFamily: 'Ubuntu' }}>
                                {message.message}
                              </span>
                            </div>
                          ))}
                        </ListingMessages>
                        <form onSubmit={this.handleSubmit}>
                          <Chat>
                            <InputMessage
                              id="message"
                              name="message"
                              type="text"
                              value={this.state.textMessage}
                              placeholder="Votre message..."
                              onChange={(event) =>
                                this.setState({
                                  textMessage: event.target.value
                                })
                              }
                            />
                            <CustomButton
                              className="btn btn-success"
                              type="submit"
                            >
                              Envoyer
                            </CustomButton>
                          </Chat>
                        </form>
                      </div>
                    </Card>
                  </div>
                )}

                {/* Constructions */}
                {guild && user && user.hasSurvivedToAttack === undefined && (
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
                          isGuild={true}
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
                )}

                {/* Members */}
                {guild && user && user.hasSurvivedToAttack === undefined && (
                  <div
                    className={`tab-pane${
                      activatedTab === 'friendsTab' ? ' active' : ''
                    }`}
                    id="friendsTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-body" id="tutorialGuildMembers">
                        {(user.role === 'ROLE_ADMIN' ||
                          user.guildRole === 'master' ||
                          user.guildRole === 'officer') && (
                          <>
                            <div className="col-sm-12">
                              <Title>Ajouter des membres</Title>
                            </div>
                            <div className="offset-sm-3 col-sm-6">
                              <FormAddUser>
                                <Input
                                  id="name"
                                  name="name"
                                  type="text"
                                  placeholder="Nom du joueur"
                                  value={this.state.memberToAddOrRemove}
                                  onChange={(event) =>
                                    this.setState({
                                      memberToAddOrRemove: event.target.value
                                    })
                                  }
                                />
                                <Button
                                  className="btn btn-success"
                                  type="button"
                                  onClick={() =>
                                    this.handleAddDeleteUser('add')
                                  }
                                >
                                  Ajouter
                                </Button>
                              </FormAddUser>
                            </div>
                          </>
                        )}
                        <div className="col-sm-12 mt-3">
                          <Title>Membres de la guilde</Title>
                        </div>
                        <FriendList
                          friends={guild.users}
                          canDelete={
                            user.role === 'ROLE_ADMIN' ||
                            user.guildRole === 'master' ||
                            user.guildRole === 'officer'
                          }
                          onDelete={(friend) => {
                            this.setState(
                              {
                                memberToAddOrRemove: friend.name
                              },
                              () => this.handleAddDeleteUser('delete')
                            )
                          }}
                          canPromote={
                            user.role === 'ROLE_ADMIN' ||
                            user.guildRole === 'master' ||
                            user.guildRole === 'officer'
                          }
                          onPromoteToOfficer={(member) =>
                            this.handlePromoteToOfficer(member)
                          }
                        />
                      </div>
                    </Card>
                  </div>
                )}

                {/* ChoiceBoss */}
                {guild &&
                  user &&
                  user.hasSurvivedToAttack === undefined &&
                  monsters &&
                  (user.role === 'ROLE_ADMIN' ||
                    user.guildRole === 'master' ||
                    user.guildRole === 'officer') && (
                    <div
                      className={`tab-pane${
                        activatedTab === 'choiceBossTab' ? ' active' : ''
                      }`}
                      id="tutorialGuildChoiceBoss"
                      role="tabpanel"
                    >
                      <Card className="card">
                        <div className="card-body">
                          <div className="col-sm-12">
                            <Title>
                              Choisir le champion de guilde à combattre{' '}
                              <Link
                                to={'/guild#fightBossTab'}
                                className="btn btn-secondary"
                              >
                                Retour
                              </Link>
                            </Title>
                          </div>
                          <MonsterList
                            monsters={monsters}
                            selectedMonster={guild.monster}
                            onChoice={(monster) =>
                              this.handleChoiceGuildBoss(monster)
                            }
                          />
                        </div>
                      </Card>
                    </div>
                  )}

                {/* BossFight */}
                {guild && user && user.hasSurvivedToAttack === undefined && (
                  <div
                    className={`tab-pane${
                      activatedTab === 'fightBossTab' ? ' active' : ''
                    }`}
                    id="fightBossTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-body" id="tutorialGuildBossChoice">
                        <div className="col-sm-12">
                          <Title>
                            Champion de guilde actuel{' '}
                            {(user.role === 'ROLE_ADMIN' ||
                              user.guildRole === 'master' ||
                              user.guildRole === 'officer') && (
                              <Link
                                to={'/guild#choiceBossTab'}
                                className="btn btn-success"
                              >
                                Choisir
                              </Link>
                            )}
                          </Title>
                        </div>
                        {!guild.monster && 'Aucun pour le moment'}
                        {guild.monster && (
                          <>
                            <MonsterSprite image={guild.monster.image} />
                            <div style={{ marginTop: '30px' }}>
                              {(guild.monster.isBoss ||
                                guild.monster.isGuildBoss) && (
                                <>
                                  <MonsterTypeBadge
                                    isGuildBoss={guild.monster.isGuildBoss}
                                    isBoss={guild.monster.isBoss}
                                  />
                                  <br />
                                </>
                              )}
                              {guild.monster.name}{' '}
                              <span
                                style={{
                                  color: guild.monster.academy.color
                                }}
                              >
                                ({guild.monster.academy.name})
                              </span>
                              <LevelBox> - Niv {guild.monster.level}</LevelBox>
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        className="card-footer"
                        style={{ maxHeight: '50vh', overflowY: 'auto' }}
                        id="tutorialGuildBossAttacks"
                      >
                        {guild.monster && (
                          <>
                            <div className="col-sm-12 mt-3">
                              <Title>Combats de la journée</Title>
                            </div>
                            {_.map(guild.users, (member, index) => (
                              <Member key={index}>
                                <Name className="col-sm-9">
                                  {member.academy && (
                                    <>
                                      <Avatar
                                        src={
                                          process.env.PUBLIC_URL +
                                          '/img/academies/' +
                                          member.academy.name +
                                          '/Alert1H/0.png'
                                        }
                                        backgroundColor={
                                          member.academy.name === 'warrior'
                                            ? '#dc3545'
                                            : member.academy.name === 'hunter'
                                            ? '#28a745'
                                            : '#007bff'
                                        }
                                        alt={member.name}
                                      />
                                      &nbsp;
                                    </>
                                  )}
                                  {member.name} -{' '}
                                  {member.lastGuildBossFightOfDay && (
                                    <span
                                      className={`text-${
                                        member.lastGuildBossFightOfDay.type ===
                                          'waiting' ||
                                        member.lastGuildBossFightOfDay.type ===
                                          'won'
                                          ? 'success'
                                          : 'warning'
                                      }`}
                                    >
                                      {member.lastGuildBossFightOfDay.type ===
                                      'waiting'
                                        ? 'En cours'
                                        : member.lastGuildBossFightOfDay
                                            .type === 'won'
                                        ? 'Victoire'
                                        : member.lastGuildBossFightOfDay
                                            .remainingHp + 'pts de vie restant'}
                                    </span>
                                  )}
                                  {!member.lastGuildBossFightOfDay && (
                                    <span className="text-danger">
                                      Pas encore combattu
                                    </span>
                                  )}
                                </Name>
                              </Member>
                            ))}
                          </>
                        )}
                      </div>
                    </Card>
                  </div>
                )}

                {/* Items guild */}
                {guild && user && user.hasSurvivedToAttack === undefined && (
                  <div
                    className={`tab-pane${
                      activatedTab === 'itemsGuildTab' ? ' active' : ''
                    }`}
                    id="itemsGuildTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-body" id="tutorialGuildItems">
                        <div className="col-sm-12">
                          <Title>Coffre de guilde</Title>
                        </div>
                        <ItemList
                          items={guild.items}
                          displayActions={true}
                          displayPutOrTakeOnGuild={user.remainingBagSpace > 0}
                          onPutOrTakeOnGuild={this.handleOnPutOrTakeOnGuild}
                          isGuildItem={true}
                          userLevel={user.level}
                        />
                      </div>
                    </Card>
                  </div>
                )}

                {/* Pantheon */}
                {user && user.hasSurvivedToAttack === undefined && (
                  <div
                    className={`tab-pane${
                      activatedTab === 'pantheonGuildTab' ? ' active' : ''
                    }`}
                    id="pantheonGuildTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-body" id="tutorialGuildPantheon">
                        <div className="col-sm-12">
                          {!selectedGuild && (
                            <>
                              <Title>
                                Panthéon des guildes
                                <br />
                                {season && (
                                  <span
                                    style={{ color: '#fff', fontSize: '12px' }}
                                    id="tutorialGuildSeason"
                                  >
                                    (fin de saison dans{' '}
                                    <span style={{ color: 'red' }}>
                                      {moment(season.endingAt).diff(
                                        moment(),
                                        'days'
                                      )}{' '}
                                      jours
                                    </span>
                                    )
                                  </span>
                                )}
                                <SeasonChest
                                  src={
                                    process.env.PUBLIC_URL +
                                    '/img/chest-close.svg'
                                  }
                                  onMouseOver={(e) => {
                                    e.currentTarget.src =
                                      process.env.PUBLIC_URL +
                                      '/img/chest-open.svg'
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.src =
                                      process.env.PUBLIC_URL +
                                      '/img/chest-close.svg'
                                  }}
                                  data-tip="Voir les récompenses de saison"
                                  data-toggle="modal"
                                  data-target="#seasonRewardsModal"
                                  id="tutorialGuildSeasonRewards"
                                />
                              </Title>
                              <SeasonRewards
                                getSeason={(season) => {
                                  this.setState({ season: season })
                                }}
                              />
                              <GuildList
                                onSelectedGuild={(guild) => {
                                  this.setState({
                                    selectedGuild: guild
                                  })
                                }}
                              />
                            </>
                          )}
                          {selectedGuild && (
                            <>
                              <Title>
                                {selectedGuild.name}{' '}
                                <Link
                                  to={'/guild#pantheonGuildTab'}
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    this.setState({ selectedGuild: undefined })
                                  }}
                                >
                                  Retour
                                </Link>
                              </Title>
                              <FriendList friends={selectedGuild.users} />
                            </>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </RightBox>
          </SubContainer>
        </div>
      </Container>
    )
  }
}

Guild.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idGuild: PropTypes.string
    }).isRequired
  }).isRequired
}

export default Guild
