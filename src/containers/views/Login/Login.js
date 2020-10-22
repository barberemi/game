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

const Social = styled.div`
  position: absolute;
  right: 20px;
  top: -45px;
`

const SocialIcon = styled.span`
  font-size: 60px;
  margin-left: 10px;
  color: #FFC312;
  
  &:hover {
    color: white;
    cursor: pointer;
  }
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

class Login extends Component {
  render() {
    return (
      <Container className="container">
        <div className="d-flex justify-content-center h-100">
          <Card className="card">
            <div className="card-header">
              <Title>Se connecter</Title>
              <Social className="d-flex justify-content-end">
                <SocialIcon><i className="fab fa-facebook-square" /></SocialIcon>
                <SocialIcon><i className="fab fa-google-plus-square" /></SocialIcon>
                <SocialIcon><i className="fab fa-twitter-square" /></SocialIcon>
              </Social>
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <InputGroup className="input-group-text"><i className="fas fa-user" /></InputGroup>
                  </div>
                  <input type="text" className="form-control" placeholder="email" />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <InputGroup className="input-group-text"><i className="fas fa-key" /></InputGroup>
                  </div>
                  <input type="password" className="form-control" placeholder="mot de passe" />
                </div>
                <div className="form-group">
                  <InputSubmit type="submit" value="Login" className="btn float-right" />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <Link className="d-flex justify-content-center">
                Pas de compte?&nbsp;<a href="#">S'enregistrer</a>
              </Link>
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

export default Login;
