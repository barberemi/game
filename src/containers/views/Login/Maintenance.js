import React, { Component } from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  height: 100%;
  align-content: center;
`

const Card = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  background-color: rgba(0, 0, 0, 0) !important;
  text-shadow: 1px 1px 2px black;
  width: 100%;
`

const NumError = styled.p`
  color: #f26725;
  font-size: 9vw;
`

const TextError = styled.p`
  color: white;
  font-size: 3vw;
`

class Maintenance extends Component {
  render() {
    return (
      <Container className="container">
        <div className="d-flex text-center h-100">
          <Card>
            <NumError>Attaque en cours</NumError>
            <TextError>
              Les monstres auront terminé à 00h15.
              <br />
              En espérant que vous ayez survécu !
            </TextError>
          </Card>
        </div>
      </Container>
    )
  }
}

export default Maintenance
