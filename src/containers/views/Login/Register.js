import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

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
  text-align: center;
  padding-top: 20px;
`

const InputGroup = styled.span`
  width: 50px;
  background-color: #f26725;
  color: black;
  border: 0 !important;
`

const BetaImg = styled.img`
  position: absolute;
  width: 200px;
  -webkit-transform: rotate(-20deg);
  transform: rotate(-20deg);
  margin-left: -55px;
`

class Register extends Component {
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

    if (event.target.password.value !== event.target.repeatPassword.value) {
      this.setState({
        error: 800
      })
    } else {
      axios
        .post(process.env.REACT_APP_API_URL + '/auth/signup', {
          email: event.target.email.value,
          password: event.target.password.value
        })
        .then((response) => {
          if (response.data) {
            toast.success(
              <span style={{ fontSize: '14px' }}>
                Nouveau compte créé avec succès !
              </span>,
              {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              }
            )
            setTimeout(() => {
              this.setState({ redirect: true })
            }, 3000)
          }
        })
        .catch((error) => {
          this.setState({
            error: error.response.status
          })
        })
    }
  }

  render() {
    const { error, redirect } = this.state

    if (redirect) {
      return <Redirect to="/login" />
    }

    return (
      <Container className="container">
        <div className="d-flex justify-content-center h-100">
          <Card className="card">
            <BetaImg src={process.env.PUBLIC_URL + '/img/beta.png'} />
            <div className="card-header">
              <Title>S’enregistrer</Title>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                {error === 400 && (
                  <div className="text-danger text-center mb-sm-2">
                    Un utilisateur avec cette adresse email existe déjà.
                  </div>
                )}
                {error === 404 && (
                  <div className="text-danger text-center mb-sm-2">
                    Une erreur est survenue lors du contact avec le serveur.
                    Veuillez réessayer, ou contacter le support.
                  </div>
                )}
                {error === 800 && (
                  <div className="text-danger text-center mb-sm-2">
                    Les 2 mots de passe ne sont pas semblables.
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
                    className="form-control"
                    placeholder="Email"
                    required
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
                    className="form-control"
                    placeholder="Mot de passe"
                    required
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
                    id="repeatPassword"
                    name="repeatPassword"
                    className="form-control"
                    placeholder="Confirmer le mot de passe"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Enregistrer"
                    className="btn btn-success float-right"
                  />
                </div>
              </form>
            </div>
          </Card>
        </div>
      </Container>
    )
  }
}

export default Register
