import React, { Component } from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import FriendList from '../../../Components/Friend/FriendList'
import Title from '../../../Components/Title/Title'
import axios from 'axios'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import moment from 'moment'
import Loader from '../../../Components/Loader/Loader'
import { toast } from 'react-toastify'

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
      guild: undefined,
      memberToAddOrRemove: '',
      newNameGuild: '',
      activatedTab: 'chatTab'
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddDeleteUser = this.handleAddDeleteUser.bind(this)
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
          if (!response.data.guild) {
            this.setState({
              loading: false,
              user: response.data
            })
          } else {
            this.setState({
              user: response.data,
              id: response.data.guild.id
            })
            this.loadData()
            setInterval(() => {
              this.loadData()
            }, 5000)
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
          // 2 - User lost money and become ROLE_GUILD_MASTER
          if (response.data) {
            guildId = response.data.id
            let data = { money: Number(this.state.user.money) - 20000 }
            if (this.state.user.role !== 'ROLE_ADMIN') {
              data = {
                money: Number(this.state.user.money) - 20000,
                role: 'ROLE_GUILD_MASTER'
              }
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

  render() {
    const { error, loading, redirect, guild, user, activatedTab } = this.state

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <Container className="container-fluid">
        {loading && <Loader />}
        <div className="container">
          <div className="row h-100 mt-5">
            <div className="col-sm-3 my-auto">
              <Card className="card">
                <div className="card-header">
                  <Title>Menu</Title>
                  <div>
                    <div onClick={() => this.onClickOnTab('chatTab')}>
                      <ListLink
                        className={activatedTab === 'chatTab' ? 'active' : ''}
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
                    {guild && (
                      <>
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
                    activatedTab === 'chatTab' ? ' active' : ''
                  }`}
                  id="chatTab"
                  role="tabpanel"
                >
                  <Card className="card">
                    {error && (
                      <span className="text-danger">
                        <b>Erreur :</b> {error.error}
                      </span>
                    )}
                    {guild && (
                      <>
                        <div className="card-header">
                          <Title>{guild.name}</Title>
                        </div>
                        <div className="card-body">
                          <ListingMessages>
                            {_.map(guild.messages, (message) => (
                              <div key={message.id}>
                                <strong className="text-warning">
                                  <i>
                                    (
                                    {moment(message.createdAt).format(
                                      'DD/MM à HH:mm'
                                    )}
                                    ){' '}
                                  </i>
                                  {message.user.name} :{' '}
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
                                placeholder="Votre message..."
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
                      <div className="card-body">
                        {(user.role === 'ROLE_ADMIN' ||
                          user.role === 'ROLE_GUILD_MASTER') && (
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
                            user.role === 'ROLE_GUILD_MASTER'
                          }
                          onDelete={(friend) => {
                            this.setState(
                              {
                                memberToAddOrRemove: friend.email
                              },
                              () => this.handleAddDeleteUser('delete')
                            )
                          }}
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
