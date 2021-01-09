import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import _ from 'lodash'
import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router-dom'

const Container = styled.div`
  max-height: 65vh;
  min-height: 65vh;
  overflow-y: scroll;
`

const Friend = styled.div`
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

class FriendList extends Component {
  render() {
    const { friends, onDelete, canDelete } = this.props

    return (
      <Container>
        {_.map(friends, (friend, index) => (
          <Friend key={index} className="col-sm-12">
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
                {friend.role === 'ROLE_GUILD_MASTER'
                  ? '(Chef de guilde)'
                  : friend.role === 'ROLE_ADMIN'
                  ? '(Admin)'
                  : ''}
              </span>
            </Name>
            <Actions className="col-sm-3">
              <Link to={'/character/' + friend.id}>
                <IconAction data-tip="Visualiser">
                  <i className="far fa-address-card text-success" />
                </IconAction>
              </Link>
              <IconAction data-tip="Discuter">
                <i className="far fa-comment" />
              </IconAction>
              {canDelete && (
                <IconAction
                  data-tip="Supprimer"
                  onClick={() => onDelete(friend)}
                >
                  <i className="fas fa-times text-danger" />
                </IconAction>
              )}
            </Actions>
            <ReactTooltip />
          </Friend>
        ))}
      </Container>
    )
  }
}

FriendList.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      level: PropTypes.number,
      image: PropTypes.string
    })
  ),
  onDelete: PropTypes.func,
  canDelete: PropTypes.bool
}

export default FriendList
