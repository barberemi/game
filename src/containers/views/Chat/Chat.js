import React, { Component } from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import { Redirect, Link } from 'react-router-dom'
import Title from '../../../Components/Title/Title'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import Loader from '../../../Components/Loader/Loader'
import Tutorial from '../../../Components/Tutorial/Tutorial'

const time = moment(),
  beforeTime = moment('07:00:00', 'HH:mm:ss'),
  afterTime = moment('19:00:00', 'HH:mm:ss')

const Container = styled.div`
  background-image: url(${process.env.PUBLIC_URL +
  (time.isBetween(beforeTime, afterTime)
    ? '/img/backgrounds/chat-day-min.jpg'
    : '/img/backgrounds/chat-night-min.jpg')});
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

const ChatBox = styled.div`
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

class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: parseInt(this.props.match.params.idGuild),
      user: undefined,
      error: undefined,
      redirect: undefined,
      loading: true,
      textMessage: '',
      messages: undefined,
      stepsEnabled: 'waiting',
      stepName: 'chat'
    }

    this.handleSubmit = this.handleSubmit.bind(this)
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
          this.setState({
            user: response.data
          })
          this.loadData()
          setInterval(() => {
            this.loadData()
          }, 5000)
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
      .get(process.env.REACT_APP_API_URL + '/messages?topic=globalMessage', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      })
      .then((response) => {
        if (response.data) {
          this.setState({
            loading: false,
            messages: response.data.items
          })

          if (this.state.user.isNoob && this.state.stepsEnabled === 'waiting') {
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
            topic: 'globalMessage'
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
            messages: [...this.state.messages, response.data]
          })
        })
        .catch((error) => {
          this.setState({
            error: error.response.status
          })
        })
    }
  }

  render() {
    const { error, loading, redirect, user, messages, stepName } = this.state

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <Container className="container-fluid">
        {loading && <Loader />}
        <div className="container">
          <SubContainer className="row h-100 mt-5 mb-5">
            {this.state.stepsEnabled === true && (
              <Tutorial
                stepsEnabled={this.state.stepsEnabled}
                stepName={stepName}
                onExit={() => this.setState({ stepsEnabled: false })}
              />
            )}

            <RightBox className="col-sm-12 my-auto">
              <div className="tab-content">
                {error && (
                  <span className="text-danger">
                    <b>Erreur :</b> {error.error}
                  </span>
                )}

                {/* Chat */}
                {user && !loading && (
                  <Card className="card">
                    <div className="card-header">
                      <Title>Discussion globale</Title>
                    </div>
                    <div className="card-body" id="tutorialGlobalChat">
                      <ListingMessages>
                        {_.map(messages, (message) => (
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
                        <ChatBox>
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
                        </ChatBox>
                      </form>
                    </div>
                  </Card>
                )}
              </div>
            </RightBox>
          </SubContainer>
        </div>
      </Container>
    )
  }
}
export default Chat
