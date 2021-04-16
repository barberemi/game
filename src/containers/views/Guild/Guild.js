import React, { Component } from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import { Redirect, Link } from 'react-router-dom'
import FriendList from '../../../Components/Friend/FriendList'
import MonsterList from '../../../Components/Monster/MonsterList'
import Title from '../../../Components/Title/Title'
import axios from 'axios'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import moment from 'moment'
import Loader from '../../../Components/Loader/Loader'
import { toast } from 'react-toastify'
import MonsterTypeBadge from '../../../Components/Badge/MonsterTypeBadge'
import ItemList from '../../../Components/Item/ItemList'
import { selectTabFromUrl } from '../../../utils/routingHelper'
import Tutorial from '../../../Components/Tutorial/Tutorial'
import ConstructionList from '../../../Components/Construction/ConstructionList'

const Container = styled.div`
  background-image: url('https://cdna.artstation.com/p/assets/images/images/022/688/120/large/matt-sanz-town-centre-2019.jpg');
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
  padding-top: 50px;
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
`

const FightButton = styled.span`
  color: white;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
`

const InputSubmit = styled.input`
  margin-top: 15px;
  color: black;
  background-color: #ffc312;
  width: 100px;

  &:hover {
    color: black;
    background-color: white;
  }
`

const LinkToGuildExploration = styled(Link)`
  &:hover {
    text-decoration: none;
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
      displayLeaveButtons: false,
      textMessage: '',
      textAnnouncement: '',
      guild: undefined,
      monsters: undefined,
      memberToAddOrRemove: '',
      newNameGuild: '',
      stepsEnabled: false,
      activatedTab: selectTabFromUrl([
        'generalTab',
        'chatTab',
        'constructionsTab',
        'membersTab',
        'choiceBossTab',
        'fightBossTab',
        'itemsGuildTab'
      ])
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddDeleteUser = this.handleAddDeleteUser.bind(this)
    this.handleChoiceGuildBoss = this.handleChoiceGuildBoss.bind(this)
    this.handleCreateGuildBossFight = this.handleCreateGuildBossFight.bind(this)
    this.handleOnPutOrTakeOnGuild = this.handleOnPutOrTakeOnGuild.bind(this)
    this.handlePromoteToOfficer = this.handlePromoteToOfficer.bind(this)
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
          if (!responses[0].data.guild) {
            this.setState({
              loading: false,
              user: responses[0].data
            })
          } else {
            this.setState({
              user: responses[0].data,
              monsters: responses[1].data.items.slice(
                0,
                responses[0].data.guild.position
              ),
              textAnnouncement: responses[0].data.guild.announcement,
              id: responses[0].data.guild.id
            })
            this.loadData()
            setInterval(() => {
              this.loadData()
            }, 5000)
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
            guild: response.data
          })

          if (
            this.state.activatedTab === 'generalTab' &&
            this.state.user.isNoob
          ) {
            setTimeout(() => {
              this.setState({
                stepsEnabled: true
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
            type: type === 'leave' ? 'delete' : type,
            email: this.state.memberToAddOrRemove
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
                : type === 'leave'
                ? 'Vous êtes bien parti de la guilde.'
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
              redirect: type === 'leave' ? '/guild' : undefined,
              memberToAddOrRemove: ''
            })
          }, 5000)
        })
        .catch((error) => {
          this.setState({
            error: error.response.status
          })
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
                        email: this.state.user.email
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

  onClickOnTab = (idTab) => {
    this.setState({
      activatedTab: idTab
    })
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
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.data
        })
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
      .then((response) => {
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

  render() {
    const {
      error,
      loading,
      redirect,
      guild,
      user,
      monsters,
      activatedTab
    } = this.state

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <Container className="container-fluid">
        {loading && <Loader />}
        <div className="container">
          <div className="row h-100 mt-5">
            <Tutorial
              stepsEnabled={this.state.stepsEnabled}
              stepName="guild"
              onExit={() => this.setState({ stepsEnabled: false })}
            />

            <div className="col-sm-3 my-auto">
              <Card className="card" id="tutorialMenu">
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
                    {guild && (
                      <>
                        <div onClick={() => this.onClickOnTab('chatTab')}>
                          <ListLink
                            className={
                              activatedTab === 'chatTab' ? 'active' : ''
                            }
                            data-toggle="tab"
                            role="tab"
                            href="#chatTab"
                          >
                            Discussion
                          </ListLink>
                          {activatedTab === 'chatTab' && (
                            <span className="text-warning">
                              &nbsp;
                              <i className="far fa-arrow-alt-circle-right" />
                            </span>
                          )}
                        </div>
                        <div
                          onClick={() => this.onClickOnTab('constructionsTab')}
                        >
                          <ListLink
                            className={
                              activatedTab === 'constructionsTab'
                                ? ' active'
                                : ''
                            }
                            data-toggle="tab"
                            role="tab"
                            href="#constructionsTab"
                          >
                            Constructions
                          </ListLink>
                          {activatedTab === 'constructionsTab' && (
                            <span className="text-warning">
                              &nbsp;
                              <i className="far fa-arrow-alt-circle-right" />
                            </span>
                          )}
                        </div>
                        <div onClick={() => this.onClickOnTab('membersTab')}>
                          <ListLink
                            className={
                              activatedTab === 'membersTab' ? ' active' : ''
                            }
                            data-toggle="tab"
                            role="tab"
                            href="#membersTab"
                          >
                            Membres
                          </ListLink>
                          {activatedTab === 'membersTab' && (
                            <span className="text-warning">
                              &nbsp;
                              <i className="far fa-arrow-alt-circle-right" />
                            </span>
                          )}
                        </div>
                        {(user.role === 'ROLE_ADMIN' ||
                          user.guildRole === 'master' ||
                          user.guildRole === 'officer') && (
                          <div
                            onClick={() => this.onClickOnTab('choiceBossTab')}
                          >
                            <ListLink
                              className={
                                activatedTab === 'choiceBossTab'
                                  ? ' active'
                                  : ''
                              }
                              data-toggle="tab"
                              role="tab"
                              href="#choiceBossTab"
                            >
                              Choix du champion
                            </ListLink>
                            {activatedTab === 'choiceBossTab' && (
                              <span className="text-warning">
                                &nbsp;
                                <i className="far fa-arrow-alt-circle-right" />
                              </span>
                            )}
                          </div>
                        )}
                        {guild.monster && (
                          <div
                            onClick={() => this.onClickOnTab('fightBossTab')}
                          >
                            <ListLink
                              className={
                                activatedTab === 'fightBossTab' ? ' active' : ''
                              }
                              data-toggle="tab"
                              role="tab"
                              href="#fightBossTab"
                            >
                              Combat vs Champion
                            </ListLink>
                            {activatedTab === 'fightBossTab' && (
                              <span className="text-warning">
                                &nbsp;
                                <i className="far fa-arrow-alt-circle-right" />
                              </span>
                            )}
                          </div>
                        )}
                        <div onClick={() => this.onClickOnTab('itemsGuildTab')}>
                          <ListLink
                            className={
                              activatedTab === 'itemsGuildTab' ? ' active' : ''
                            }
                            data-toggle="tab"
                            role="tab"
                            href="#itemsGuildTab"
                          >
                            Coffre de guilde
                          </ListLink>
                          {activatedTab === 'itemsGuildTab' && (
                            <span className="text-warning">
                              &nbsp;
                              <i className="far fa-arrow-alt-circle-right" />
                            </span>
                          )}
                        </div>
                        <br />
                        <br />
                        <div
                          onClick={() =>
                            this.setState({
                              displayLeaveButtons: true
                            })
                          }
                        >
                          <ListLink className="text-danger" href="#leave">
                            Quitter la guilde
                          </ListLink>
                        </div>
                        <div
                          className={
                            this.state.displayLeaveButtons ? '' : 'd-none'
                          }
                          style={{ fontSize: '12px' }}
                        >
                          <ListLink
                            className="text-success"
                            href="#leave-validate"
                            onClick={() =>
                              this.setState(
                                {
                                  memberToAddOrRemove: user.email
                                },
                                () => this.handleAddDeleteUser('delete')
                              )
                            }
                          >
                            Valider
                          </ListLink>{' '}
                          -{' '}
                          <ListLink
                            href="#leave-cancel"
                            onClick={() =>
                              this.setState({
                                displayLeaveButtons: false
                              })
                            }
                          >
                            Annuler
                          </ListLink>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Card>
              <Image
                src={process.env.PUBLIC_URL + '/img/guild-master.png'}
                alt="guild master"
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
                    {error && (
                      <span className="text-danger">
                        <b>Erreur :</b> {error.error}
                      </span>
                    )}
                    {guild && user && (
                      <>
                        <div className="card-header" id="tutorialGuildName">
                          <Title>{guild.name}</Title>
                          {user.canGuildBossFight && (
                            <FightButton
                              onClick={() => this.handleCreateGuildBossFight()}
                              className="col-sm-6"
                            >
                              Combat de la journée{' '}
                              <img
                                src={process.env.PUBLIC_URL + '/img/versus.svg'}
                                width="30px"
                                height="30px"
                                alt="versus"
                              />
                            </FightButton>
                          )}
                          <LinkToGuildExploration to={'/guild_exploration'}>
                            <FightButton className="col-sm-6">
                              Exploration de guilde{' '}
                              <img
                                src={process.env.PUBLIC_URL + '/img/map.svg'}
                                width="30px"
                                height="30px"
                                alt="map"
                              />
                            </FightButton>
                          </LinkToGuildExploration>
                        </div>
                        <div className="card-body" id="tutorialGuildActions">
                          <Title>
                            Estimation de l’attaque{' '}
                            <span style={{ fontSize: '10px' }}>
                              (de 00h00 à 00h15)
                            </span>
                          </Title>
                          <table className="table">
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
                                <i className="fas fa-question" />
                              </td>
                              <td style={{ borderTop: 0 }}>
                                {guild.defense}{' '}
                                <img
                                  src={
                                    process.env.PUBLIC_URL + '/img/defense.gif'
                                  }
                                  alt="defense"
                                />
                              </td>
                            </tr>
                          </table>
                        </div>
                        <div
                          className="card-footer"
                          id="tutorialGuildAnnouncement"
                        >
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
                                className="btn"
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
                      </>
                    )}
                    {!guild && user && (
                      <>
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
                              Attention: la création d’une guilde coûte 20 000{' '}
                              <img
                                src={process.env.PUBLIC_URL + '/img/money.svg'}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="Thune"
                              />
                              {user.money < 20000 && (
                                <div className="text-danger">
                                  Vous ne possèdez actuellement que {user.money}{' '}
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
                      </>
                    )}
                  </Card>
                </div>

                {/* Chat */}
                {guild && (
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
                                <span className="text-warning">
                                  {message.user.name} :{' '}
                                </span>
                              </strong>
                              {message.message}
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
                {guild && (
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
                {guild && (
                  <div
                    className={`tab-pane${
                      activatedTab === 'membersTab' ? ' active' : ''
                    }`}
                    id="membersTab"
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
                                  id="email"
                                  name="email"
                                  type="text"
                                  placeholder="Email"
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
                                memberToAddOrRemove: friend.email
                              },
                              () => this.handleAddDeleteUser('delete')
                            )
                          }}
                          canPromote={
                            user.role === 'ROLE_ADMIN' ||
                            user.guildRole === 'master'
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
                  monsters &&
                  (user.role === 'ROLE_ADMIN' ||
                    user.guildRole === 'master' ||
                    user.guildRole === 'officer') && (
                    <div
                      className={`tab-pane${
                        activatedTab === 'choiceBossTab' ? ' active' : ''
                      }`}
                      id="choiceBossTab"
                      role="tabpanel"
                    >
                      <Card className="card">
                        <div className="card-body">
                          <div className="col-sm-12">
                            <Title>
                              Choisir le champion de guilde à combattre
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
                {guild && guild.monster && (
                  <div
                    className={`tab-pane${
                      activatedTab === 'fightBossTab' ? ' active' : ''
                    }`}
                    id="fightBossTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div
                        className="card-body"
                        style={{ maxHeight: '90vh', overflowY: 'auto' }}
                      >
                        <div className="col-sm-12">
                          <Title>Champion de guilde actuel</Title>
                        </div>
                        <Image
                          src={
                            process.env.PUBLIC_URL +
                            '/img/boss/' +
                            guild.monster.image
                          }
                          alt="Third slide"
                        />
                        <div>
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
                        <div className="col-sm-12 mt-3">
                          <Title>
                            Combats de la journée{' '}
                            {user && user.canGuildBossFight && (
                              <FightButton
                                onClick={() =>
                                  this.handleCreateGuildBossFight()
                                }
                              >
                                (Me battre{' '}
                                <img
                                  src={
                                    process.env.PUBLIC_URL + '/img/versus.svg'
                                  }
                                  width="30px"
                                  height="30px"
                                  alt="versus"
                                />
                                )
                              </FightButton>
                            )}
                          </Title>
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
                                      '.png'
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
                                    : member.lastGuildBossFightOfDay.type ===
                                      'won'
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
                      </div>
                    </Card>
                  </div>
                )}

                {guild && (
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
                          onPutOrTakeOnGuild={this.handleOnPutOrTakeOnGuild}
                          isGuildItem={true}
                          userLevel={user.level}
                        />
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </RightBox>
          </div>
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
