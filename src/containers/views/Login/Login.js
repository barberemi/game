import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

const Container = styled.div`
  height: 100%;
  align-content: center;
`

const Card = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.8) !important;
`

const Title = styled.h3`
  color: white;
`

const Social = styled.div`
  position: absolute;
  right: 20px;
  top: -45px;
`

const SocialIcon = styled.a`
  font-size: 60px;
  margin-left: 10px;
  color: #f26725;

  &:hover {
    color: white;
    cursor: pointer;
  }
`

const InputGroup = styled.span`
  width: 50px;
  background-color: #f26725;
  color: black;
  border: 0 !important;
`

const LinkInput = styled(Link)`
  color: #f26725;

  &:hover {
    color: #f26725;
  }
`

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: undefined,
      redirect: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    axios
      .post(process.env.REACT_APP_API_URL + '/auth/login_check', {
        email: event.target.email.value,
        password: event.target.password.value
      })
      .then((response) => {
        if (response.data) {
          let decodeToken = jwtDecode(response.data.token)

          Cookies.set('auth-token', response.data.token, {
            domain: process.env.REACT_APP_DOMAIN,
            expires: decodeToken.exp || 10 * 24 * 60 * 60
          })

          this.setState({ redirect: true })
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.data
        })
      })
  }

  render() {
    const { error, redirect } = this.state

    if (redirect) {
      return <Redirect to="/home" />
    }

    return (
      <Container className="container">
        <div className="d-flex justify-content-center h-100">
          <Card className="card">
            <div className="card-header">
              <Title>Se connecter</Title>
              <Social className="d-flex justify-content-end">
                <SocialIcon
                  href="https://www.facebook.com/remi.barbe1/"
                  target="_blank"
                >
                  <i className="fab fa-facebook-square" />
                </SocialIcon>
                <SocialIcon
                  href="https://twitter.com/Rem_Barbe"
                  target="_blank"
                >
                  <i className="fab fa-twitter-square" />
                </SocialIcon>
              </Social>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                {error && error.code === 401 && (
                  <div className="text-danger text-center mb-sm-2">
                    Impossible de se connecter avec ce <br />
                    compte / mot de passe.
                  </div>
                )}
                {error && error.code === 404 && (
                  <div className="text-danger text-center mb-sm-2">
                    Une erreur est survenue lors du contact avec le serveur.
                    Veuillez réessayer, ou contacter le support.
                  </div>
                )}
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <InputGroup className="input-group-text">
                      <i className="fas fa-user" />
                    </InputGroup>
                  </div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <InputGroup className="input-group-text">
                      <i className="fas fa-key" />
                    </InputGroup>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="form-control"
                    placeholder="Mot de passe"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Connexion"
                    className="btn btn-success float-right"
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center text-white">
                Pas de compte?&nbsp;
                <LinkInput to={'/register'}>S’enregistrer</LinkInput>
              </div>
              <LinkInput to={'#'} className="d-flex justify-content-center">
                Mot de passe oublié?
              </LinkInput>
            </div>
          </Card>
        </div>
      </Container>
    )
  }
}

export default Login
