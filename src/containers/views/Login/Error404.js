import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Link, Redirect } from 'react-router-dom'

const Container = styled.div`
  height: 100%;
  align-content: center;
`

const Card = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  background-color: rgba(0, 0, 0, 0) !important;
  text-shadow: 1px 1px 2px black;
`

const NumError = styled.p`
  color: #f26725;
  font-size:12vw;
`

const TextError = styled.p`
  color: white;
  font-size: 3vw;
`

const LinkInput = styled(Link)`
  color: #f26725;
  font-size: 2vw;

  &:hover {
    text-decoration: none;
    color: white;
  }
`

class Error404 extends Component {
  render() {
    return (
      <Container className="container">
        <div className="d-flex text-center h-100">
          <Card>
              <NumError>
                404
              </NumError>
              <TextError>
                La page que vous cherchez n'existe pas, nos meilleurs bidouilleurs sont sur le coup !
              </TextError>
              <LinkInput to={'/home'}>
                Retour
              </LinkInput>
          </Card>
        </div>
      </Container>
    )
  }
}

export default Error404
