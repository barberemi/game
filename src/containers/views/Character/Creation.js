import React, { Component } from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import ReactTooltip from 'react-tooltip'
import Title from '../../../Components/Title/Title'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import Loader from '../../../Components/Loader/Loader'
import StyledCards from '../../../Components/Card/StyledCards'

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

const RightBox = styled.div``

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.7) !important;
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
  margin-top: 20px;
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
      academySelected: undefined,
      displayForm: false,
      isDark: true
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
        this.setState({
          loading: false,
          user: response.data
        })
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error
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
          isDark: this.state.isDark,
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
      displayForm: true
    })
  }

  render() {
    const {
      error,
      loading,
      created,
      user,
      academySelected,
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
          <div className="row">
            <TitleBox className="col-sm-12 mb-5">
              Veuillez sélectionner une académie.
            </TitleBox>

            <LeftBox className="col-sm-9 h-100 mt-5">
              <StyledCards
                isDark={isDark}
                type={'academies'}
                displayLightDarkButton={true}
                onClick={(academy) => this.selectAcademy(academy)}
                onClickLightDarkButton={(type) =>
                  this.setState({
                    isDark: type === 'dark'
                  })
                }
              />
              {this.state.displayForm && (
                <form onSubmit={this.handleSubmit}>
                  <NameInput
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Rem le chocorem"
                    required
                  />
                  <br />
                  <InputSubmit type="submit" value="Valider" className="btn" />
                </form>
              )}
            </LeftBox>

            <RightBox className="col-sm-3 h-100 my-auto">
              {academySelected && (
                <Card className="card">
                  <div className="card-header">
                    <Title>
                      <span style={{ color: isDark ? '#7730ec' : '#fcce18' }}>
                        {isDark
                          ? academySelected.labelDark
                          : academySelected.labelLight}
                      </span>
                    </Title>
                    {_.map(_.split(academySelected.role, ','), (role) => (
                      <div key={role} style={{ color: academySelected.color }}>
                        {role}
                      </div>
                    ))}
                  </div>
                  <div className="card-body">
                    <i>{academySelected.description}</i>
                  </div>
                  <div className="card-footer">
                    <Title>
                      <span style={{ color: isDark ? '#7730ec' : '#fcce18' }}>
                        Compétences
                      </span>
                    </Title>
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
                            src={
                              process.env.PUBLIC_URL +
                              '/img/skills/' +
                              skill.image
                            }
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
        </div>
      </Container>
    )
  }
}
export default Creation
