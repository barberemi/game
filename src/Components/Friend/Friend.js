import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'

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
    color: #ffc312;
    text-decoration: none;
  }
`

class Friend extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayLeaveButtons: false
    }
  }

  render() {
    const {
      friend,
      onDelete,
      canDelete,
      onPromoteToOfficer,
      canPromote
    } = this.props

    return (
      <Container className="col-sm-12">
        <Name className="col-sm-9">
          {friend.academy && (
            <>
              <Avatar
                src={
                  process.env.PUBLIC_URL +
                  '/img/academies/' +
                  friend.academy.name +
                  '.png'
                }
                alt={friend.name}
              />
              &nbsp;
            </>
          )}
          Niv {friend.level} - {friend.name}{' '}
          <span className="text-warning">
            {friend.guildRole && friend.guildRole === 'master'
              ? '(Chef de guilde)'
              : friend.guildRole === 'officer'
              ? '(Officier)'
              : ''}
          </span>
        </Name>
        {jwtDecode(Cookies.get('auth-token')).email !== friend.email && (
          <>
            <Actions className="col-sm-3">
              <Link to={'/character/' + friend.id}>
                <IconAction data-tip="Visualiser">
                  <i className="far fa-address-card text-success" />
                </IconAction>
              </Link>
              <IconAction data-tip="Discuter">
                <i className="far fa-comment" />
              </IconAction>
              {friend.guildRole !== 'master' && canPromote && (
                <IconAction
                  data-tip={
                    friend.guildRole === 'officer'
                      ? 'Rétrograder'
                      : 'Promouvoir'
                  }
                  onClick={() => onPromoteToOfficer(friend)}
                >
                  <i
                    className={`fas fa-user-graduate ${
                      friend.guildRole === 'officer'
                        ? 'text-danger'
                        : 'text-warning'
                    }`}
                  />
                </IconAction>
              )}
              {canDelete && (
                <>
                  <IconAction
                    data-tip="Supprimer"
                    onClick={() =>
                      this.setState({
                        displayLeaveButtons: !this.state.displayLeaveButtons
                      })
                    }
                  >
                    <i className="fas fa-times text-danger" />
                  </IconAction>
                  <div
                    className={this.state.displayLeaveButtons ? '' : 'd-none'}
                    style={{ fontSize: '12px' }}
                  >
                    <ListLink
                      className="text-success"
                      href="#leave-validate"
                      onClick={() => onDelete(friend)}
                    >
                      Valider
                    </ListLink>{' '}
                    -{' '}
                    <ListLink
                      href="#leave-cancel"
                      onClick={() =>
                        this.setState({
                          displayLeaveButtons: false
                        })
                      }
                    >
                      Annuler
                    </ListLink>
                  </div>
                </>
              )}
            </Actions>
            <ReactTooltip />
          </>
        )}
      </Container>
    )
  }
}

Friend.propTypes = {
  friend: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    level: PropTypes.number,
    image: PropTypes.string,
    guildRole: PropTypes.string,
    academy: PropTypes.shape({
      name: PropTypes.string
    })
  }),
  onDelete: PropTypes.func,
  canDelete: PropTypes.bool,
  onPromoteToOfficer: PropTypes.func,
  canPromote: PropTypes.bool
}

export default Friend
