import React, { Component } from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import FriendList from '../../../Components/Friend/FriendList'
import Title from '../../../Components/Title/Title'
import axios from 'axios'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'

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
  height: 60vh;
  text-align: left;
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

class Guild extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: parseInt(this.props.match.params.idguild),
      error: undefined,
      guild: undefined,
      activatedTab: 'chatTab'
    }
  }

  componentDidMount() {
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
            guild: response.data
          })
        }
      })
      .catch((error) => {
        this.setState({
          error: error
        })
      })
  }

  onClickOnTab = (idTab) => {
    this.setState({
      activatedTab: idTab
    })
  }

  render() {
    const { error, guild, activatedTab } = this.state

    return (
      <Container className="container-fluid">
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
                {error && (
                  <span className="text-danger">
                    <b>Erreur :</b> {error.message}
                  </span>
                )}
                {guild && (
                  <>
                    {/* General */}
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
                        <div className="card-body">
                          <div className="col-sm-12">
                            <ListingMessages>
                              {_.map(guild.messages, (message) => (
                                <div key={message.id}>
                                  <strong className="text-warning">
                                    {message.user.email} :{' '}
                                  </strong>
                                  {message.message}
                                </div>
                              ))}
                            </ListingMessages>
                            <form>
                              <Chat>
                                <InputMessage
                                  id="message"
                                  name="message"
                                  type="text"
                                  placeholder="Votre message..."
                                />
                                <CustomButton className="btn btn-success">
                                  Envoyer
                                </CustomButton>
                              </Chat>
                            </form>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Friends */}
                    <div
                      className={`tab-pane${
                        activatedTab === 'membersTab' ? ' active' : ''
                      }`}
                      id="membersTab"
                      role="tabpanel"
                    >
                      <Card className="card">
                        <div className="card-body">
                          <div className="col-sm-12">
                            <Title>Membres de la guilde</Title>
                          </div>
                          <FriendList friends={guild.users} />
                        </div>
                      </Card>
                    </div>
                  </>
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
      idguild: PropTypes.string
    }).isRequired
  }).isRequired
}

export default Guild
