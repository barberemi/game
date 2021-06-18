import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  float: left;
  width: 100%;
  padding-top: 20px;
`

const Name = styled.div`
  text-align: left;
`

const Actions = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: #fff;
`

const IconAction = styled.span`
  padding-right: 15px;

  &:hover {
    cursor: pointer;
  }
`

const ListLink = styled.a`
  color: #fff;

  &:hover {
    color: #f26725;
    text-decoration: none;
  }
`

class Monster extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayChoiceButtons: false
    }
  }

  render() {
    const { monster, onChoice, isSelected } = this.props

    return (
      <Container className="col-sm-12">
        <Name className="col-sm-9">
          {monster.academy && (
            <>
              <Avatar
                src={process.env.PUBLIC_URL + '/img/boss/' + monster.image}
                alt={monster.name}
              />
              &nbsp;
            </>
          )}
          Niv {monster.level} - {monster.name}{' '}
        </Name>
        <Actions className="col-sm-3">
          <Link to={'/boss/' + monster.id}>
            <IconAction data-tip="Visualiser">
              <i className="far fa-address-card text-success" />
            </IconAction>
          </Link>
          <IconAction
            data-tip={isSelected ? 'Enlever' : 'Choisir'}
            onClick={() =>
              this.setState({
                displayChoiceButtons: !this.state.displayChoiceButtons
              })
            }
          >
            <i
              className={`${
                isSelected ? 'fas fa-times' : 'far fa-check-circle'
              } text-${isSelected ? 'danger' : 'warning'}`}
            />
          </IconAction>
          <div
            className={this.state.displayChoiceButtons ? '' : 'd-none'}
            style={{ fontSize: '12px' }}
          >
            <ListLink
              className="text-success"
              href="#validate-monster"
              onClick={() =>
                this.setState(
                  {
                    displayChoiceButtons: !this.state.displayChoiceButtons
                  },
                  () => onChoice(monster)
                )
              }
            >
              Valider
            </ListLink>{' '}
            -{' '}
            <ListLink
              href="#cancel-monster"
              onClick={() =>
                this.setState({
                  displayChoiceButtons: false
                })
              }
            >
              Annuler
            </ListLink>
          </div>
        </Actions>
        <ReactTooltip />
      </Container>
    )
  }
}

Monster.propTypes = {
  monster: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    level: PropTypes.number,
    image: PropTypes.string,
    academy: PropTypes.shape({
      name: PropTypes.string
    })
  }),
  isSelected: PropTypes.bool,
  onChoice: PropTypes.func
}

export default Monster
