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
import AcademySprite from '../../../Components/Sprites/AcademySprite'
import EquippedSkills from '../../../Components/Skill/EquippedSkills'

const Container = styled.div`
  background-image: url(${process.env.PUBLIC_URL +
  '/img/backgrounds/home-bg.jpg'});
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
  padding-top: 10px;
  font-size: 3vw;
  text-shadow: 1px 1px 2px black;
`

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RightBox = styled.div``

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.8) !important;
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
  width: 200px;
`

const InputSubmit = styled.input`
  margin-top: 10px;
  margin-bottom: 10px;
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
      isDark: false
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

    // if ((user && user.academy) || created) {
    //   return <Redirect to="/home" />
    // }

    return (
      <Container className="container-fluid">
        {loading && <Loader />}
        <div>
          {error && (
            <span className="text-danger">
              <b>Erreur :</b> {error.message}
            </span>
          )}
          <div className="row">
            <TitleBox className="col-sm-12 mb-5">
              Veuillez sélectionner une académie.
            </TitleBox>

            <LeftBox className="col-sm-7 h-100 mt-5">
              <StyledCards
                isDark={isDark}
                type={'academies'}
                onClick={(academy) => this.selectAcademy(academy)}
              />
            </LeftBox>

            <RightBox className="col-sm-5 h-100 my-auto">
              {academySelected && (
                <Card className="card">
                  <div className="card-header">
                    <Title>
                      <span
                        style={{
                          color: academySelected.color
                        }}
                      >
                        {academySelected.label}
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
                      <span style={{ color: '#f26725' }}>Compétences</span>
                    </Title>
                    <EquippedSkills
                      academyId={academySelected.id}
                      treeType={'light'}
                      displayCheckbox={true}
                    />
                  </div>
                  {this.state.displayForm && (
                    <form onSubmit={this.handleSubmit}>
                      <NameInput
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nom de mon personnage"
                        required
                      />
                      <br />
                      <InputSubmit
                        type="submit"
                        value="Création"
                        className="btn btn-success"
                      />
                    </form>
                  )}
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
