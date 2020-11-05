import React, { Component } from 'react';
import styled from "@emotion/styled";

const Container = styled.div`
  height: 100%;
  align-content: center;
`

const Card = styled.div`
  height: 370px;
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
  background-color: rgba(0,0,0,0.8) !important;
`

const Title = styled.h3`
  color: white;
`

const InputGroup = styled.span`
  width: 50px;
  background-color: #FFC312;
  color: black;
  border:0 !important;
`

const InputSubmit = styled.input`
  color: black;
  background-color: #FFC312;
  width: 100px;
  
  &:hover {
    color: black;
    background-color: white;
  }
`

const Link = styled.div`
  color: white;
  
  a {
    color: #FFC312;
  }
`

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      repeatPassword: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.password !== this.state.repeatPassword) {
      event.target.repeatPassword.setCustomValidity('Le mot de passe ne correspond pas.');
    }
    console.log("Call API Register");
  }

  render() {
    return (
      <Container className="container">
        <div className="d-flex justify-content-center h-100">
          <Card className="card">
            <div className="card-header">
              <Title>S'enregistrer</Title>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <InputGroup className="input-group-text"><i className="fas fa-user" /></InputGroup>
                  </div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={this.state.email}
                    className="form-control"
                    placeholder="Email"
                    onChange={event => this.setState({email: event.target.value})}
                    required
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <InputGroup className="input-group-text"><i className="fas fa-key" /></InputGroup>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={this.state.password}
                    className="form-control"
                    placeholder="Mot de passe"
                    onChange={event => this.setState({password: event.target.value})}
                    required
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <InputGroup className="input-group-text"><i className="fas fa-key" /></InputGroup>
                  </div>
                  <input
                    type="password"
                    id="repeatPassword"
                    name="repeatPassword"
                    value={this.state.repeatPassword}
                    className="form-control"
                    placeholder="Confirmer le mot de passe"
                    onChange={event => this.setState({repeatPassword: event.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <InputSubmit type="submit" value="Valider" className="btn float-right" />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <Link className="d-flex justify-content-center">
                <a href="#">Mot de passe oublié?</a>
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    );
  }
}

export default Register;
