import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Link, Redirect } from 'react-router-dom'
import ProgressBar from '../../../Components/Character/ProgressBar'
import Title from '../../../Components/Title/Title'
import ItemList from '../../../Components/Item/ItemList'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loader from '../../../Components/Loader/Loader'
import PropTypes from 'prop-types'

const Container = styled.div`
  background-image: url('https://cdna.artstation.com/p/assets/images/images/022/181/600/large/yarki-studio-artstation-3.jpg');
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

const LevelBox = styled.span`
  font-size: 16px;
  color: #fff;
`

const Box = styled.div`
  min-height: 550px;
`

const SubTitle = styled.span`
  font-size: 16px;
  color: #fff;
`

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.7) !important;
`

const Character = styled.div`
  display: flex;
  float: left;
  width: 100%;
  padding-top: 10px;
`

const Versus = styled.img`
  margin-left: 20px;
  margin-right: 20px;
`

const LevelWin = styled.div`
  background-color: rgba(0, 0, 0, 0.9) !important;
  top: 40%;
  left: 40%;
  width: 230px;
  height: 120px;
  transform: translate(-50%, -50%);
  z-index: 10;
  position: fixed;
  border: 1px solid #ffc312;
  border-radius: 5px;
  transform: scale(1);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
`

const Button = styled.button`
  color: #000;
  background-color: #ffc312;
  margin-top: 10px;

  &:hover {
    color: black;
    background-color: white;
  }
`

class Reward extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: parseInt(this.props.match.params.idFight),
      error: undefined,
      loading: true,
      monster: undefined,
      user: undefined,
      type: undefined,
      round: undefined,
      redirect: undefined,
      levelUp: false
    }
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + '/fights/' + this.state.id + '/0', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      })
      .then((response) => {
        if (response.data) {
          const levelUp =
            response.data.user.experience - response.data.monster.givenXp <
            response.data.user.xpToActualLevel

          this.setState({
            loading: false,
            monster: response.data.monster,
            user: response.data.user,
            type: response.data.type,
            round: response.data.round,
            redirect:
              response.data.type === 'waiting'
                ? response.data.user.exploration
                  ? '/exploration'
                  : '/maps'
                : undefined,
            items: response.data.items,
            levelUp: levelUp
          })
          if (levelUp) {
            setTimeout(() => {
              this.setState({
                levelUp: false
              })
            }, 3000)
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

  render() {
    const {
      loading,
      error,
      redirect,
      levelUp,
      monster,
      user,
      items,
      type,
      round
    } = this.state

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <Container className="container-fluid">
        {loading && <Loader />}
        <div className="container">
          {user && monster && type === 'won' && levelUp && (
            <LevelWin>
              <Title>
                <span style={{ color: 'white' }}>
                  Bravo !<br />
                  Gain de niveau.
                </span>
                <br />
                <span style={{ fontSize: '50px' }}>
                  {user.level - 1} &gt; {user.level}
                </span>
              </Title>
            </LevelWin>
          )}
          {error && (
            <span className="text-danger">
              <b>Erreur :</b> {error.error}
            </span>
          )}
          <div className="row h-100 mt-5">
            <Box className="col-sm-12 my-auto">
              <Card className="card">
                {user && monster && (
                  <>
                    <div className="card-header">
                      <Title>
                        <span
                          className={
                            type === 'lost' ? 'text-danger' : 'text-success'
                          }
                        >
                          {type === 'lost' ? 'Défaite' : 'Victoire'}{' '}
                        </span>
                        <SubTitle>
                          ({round} {round > 1 ? 'tours' : 'tour'})
                        </SubTitle>
                        <br />
                        {monster.name}{' '}
                        <span style={{ color: monster.academy.color }}>
                          ({monster.academy.label})
                        </span>
                        <LevelBox> - Niv {user.level}</LevelBox>
                        <br />
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            '/img/academies/' +
                            user.academy.name +
                            '.png'
                          }
                          height="90px"
                          width="90px"
                          alt="Avatar mon personnage"
                        />
                        <Versus
                          src={process.env.PUBLIC_URL + '/img/versus.svg'}
                          width="30px"
                          height="30px"
                          alt="versus"
                        />
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            '/img/boss/' +
                            monster.image
                          }
                          height="100px"
                          width="100px"
                          alt="Avatar monstre"
                        />
                      </Title>
                    </div>
                    {type === 'won' && (
                      <div className="card-body">
                        <Title>Récompenses de bataille</Title>
                        <div className="col-sm-12">
                          <Character className="col-sm-12">
                            <div className="col-sm-4">
                              <div>
                                Niv {user.level} (+ {monster.givenXp}xp)
                              </div>
                              <ProgressBar
                                actual={user.experience - user.xpToActualLevel}
                                max={user.xpToNextLevel - user.xpToActualLevel}
                                color="#FFC312"
                                transparentColor="#7F8286"
                              />
                            </div>
                            <div className="col-sm-3 mt-3">
                              <img
                                src={process.env.PUBLIC_URL + '/img/money.svg'}
                                width="30"
                                height="30"
                                alt="Thune"
                              />
                              <div>{monster.givenMoney} thunes</div>
                            </div>
                            <div className="col-sm-5">
                              <ItemList
                                items={items}
                                displayActions={false}
                                minusPadding={true}
                              />
                            </div>
                          </Character>
                        </div>
                      </div>
                    )}
                    <div className="card-footer">
                      <Link
                        to={
                          monster.isGuildBoss
                            ? '/guild'
                            : user.exploration
                            ? '/exploration'
                            : '/maps'
                        }
                      >
                        <Button className="btn">
                          {monster.isGuildBoss
                            ? 'Retour à la guilde'
                            : user.exploration
                            ? "Continuer l'exploration"
                            : 'Nouvelle exploration'}
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </Card>
            </Box>
          </div>
        </div>
      </Container>
    )
  }
}

Reward.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idFight: PropTypes.string
    }).isRequired
  }).isRequired
}

export default Reward
