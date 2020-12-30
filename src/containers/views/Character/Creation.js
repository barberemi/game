import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import ReactTooltip from 'react-tooltip'
import LightDarkButton from '../../../Components/LightDark/LightDarkButton'
import Title from '../../../Components/Title/Title'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import Loader from '../../../Components/Loader/Loader'

const Container = styled.div`
  background-image: url('https://images.alphacoders.com/883/883163.jpg');
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

const TitleBox = styled.div`
  padding-top: 20px;
  font-size: 26px;
`

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Academy = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  background-color: #ffc312;

  &:hover {
    cursor: pointer;
  }
`

const CenterBox = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RightBox = styled.div``

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.7) !important;
`

const Image = styled.img`
  width: 200px;
  margin-top: 100px;
  &:hover {
    cursor: pointer;
    -webkit-filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
    filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
    -ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=1, OffY=1, Color='#444')";
  }
`

const Skill = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid;
  margin-right: 10px;

  &:hover {
    cursor: pointer;
  }
`

const NameInput = styled.input`
  margin-top: 50px;
`

const InputSubmit = styled.input`
  color: black;
  background-color: #ffc312;
  width: 100px;
  margin-top: 10px;

  &:hover {
    color: black;
    background-color: white;
  }
`

class Creation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      created: false,
      error: undefined,
      academies: undefined,
      academySelected: undefined,
      isAnimated: null,
      isDark: true
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const getMe = axios.get(process.env.REACT_APP_API_URL + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-token')}`
      }
    })
    const getAcademies = axios.get(
      process.env.REACT_APP_API_URL + '/academies',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      }
    )

    axios
      .all([getMe, getAcademies])
      .then((responses) => {
        this.setState({
          loading: false,
          user: responses[0].data,
          academies: responses[1].data.items
        })
      })
      .catch((errors) => {
        this.setState({
          loading: false,
          error: errors
        })
      })
  }

  handleSubmit(event) {
    event.preventDefault()

    axios
      .put(
        process.env.REACT_APP_API_URL + '/users/' + this.state.user.id,
        {
          name: event.target.name.value,
          academy: {
            id: this.state.academySelected.id
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('auth-token')}`
          }
        }
      )
      .then(() => {
        this.setState({
          created: true
        })
      })
      .catch((error) => {
        this.setState({
          error: error.response.status
        })
      })
  }

  selectAcademy(academy) {
    this.setState({
      academySelected: academy,
      isAnimated: true
    })
  }

  render() {
    const {
      error,
      loading,
      created,
      user,
      academies,
      academySelected,
      isAnimated,
      isDark
    } = this.state

    if ((user && user.academy) || created) {
      return <Redirect to="/character" />
    }

    return (
      <Container className="container-fluid">
        {loading && <Loader />}
        <div className="container">
          {error && (
            <span className="text-danger">
              <b>Erreur :</b> {error.message}
            </span>
          )}
          {academies && (
            <div className="row">
              <TitleBox className="col-sm-12">
                Veuillez sélectionner une académie.
              </TitleBox>

              <LeftBox className="col-sm-3 h-100 my-auto">
                {_.map(academies, (academy) => (
                  <Fragment key={academy.id}>
                    <Academy
                      src={
                        process.env.PUBLIC_URL +
                        '/img/academies/' +
                        academy.name +
                        '.png'
                      }
                      key={academy.name}
                      onClick={() => this.selectAcademy(academy)}
                    />
                    {academy.label}
                  </Fragment>
                ))}
              </LeftBox>

              <CenterBox className="col-sm-6 my-auto">
                {academySelected && (
                  <>
                    <Image
                      src={
                        process.env.PUBLIC_URL +
                        '/img/academies/' +
                        academySelected.name +
                        '.png'
                      }
                      alt={academySelected.name}
                      onAnimationEnd={() =>
                        this.setState({ isAnimated: false })
                      }
                      className={isAnimated ? 'animated fadeInDown' : null}
                      data-tip={academySelected.label}
                    />
                    <ReactTooltip />
                    <form onSubmit={this.handleSubmit}>
                      <NameInput
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Rem le chocorem"
                        required
                      />
                      <br />
                      <InputSubmit
                        type="submit"
                        value="Valider"
                        className="btn"
                      />
                    </form>
                  </>
                )}
              </CenterBox>

              <RightBox className="col-sm-3 h-100 my-auto">
                {academySelected && (
                  <Card className="card">
                    <LightDarkButton
                      onClick={(type) =>
                        this.setState({
                          isDark: type === 'dark'
                        })
                      }
                    />
                    <div className="card-header">
                      <Title>{academySelected.label}</Title>
                      {_.map(_.split(academySelected.role, ','), (role) => (
                        <div
                          key={role}
                          style={{ color: academySelected.color }}
                        >
                          {role}
                        </div>
                      ))}
                    </div>
                    <div className="card-body">
                      <i>{academySelected.description}</i>
                    </div>
                    <div className="card-footer">
                      <Title>Compétences</Title>
                      <div style={{ color: isDark ? '#7730ec' : '#fcce18' }}>
                        {isDark ? 'Ombre' : 'Lumière'}
                      </div>
                      {_.map(
                        isDark
                          ? _.filter(academySelected.skills, {
                              treeType: 'dark'
                            })
                          : _.filter(academySelected.skills, {
                              treeType: 'light'
                            }),
                        (skill) => (
                          <>
                            <Skill
                              key={skill}
                              src="https://wiki-fr.guildwars2.com/images/8/88/Dagues_enchant%C3%A9es.png"
                              alt={skill.name}
                              data-tip={skill.description}
                              style={{
                                borderColor: isDark ? '#7730ec' : '#fcce18'
                              }}
                            />
                            <ReactTooltip />
                          </>
                        )
                      )}
                    </div>
                  </Card>
                )}
              </RightBox>
            </div>
          )}
        </div>
      </Container>
    )
  }
}
export default Creation
