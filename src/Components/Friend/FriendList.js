import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import _ from 'lodash'
import Friend from './Friend'

const Container = styled.div`
  max-height: 60vh;
  min-height: 60vh;
  overflow-y: scroll;
`

class FriendList extends Component {
  render() {
    const { friends } = this.props

    return (
      <Container>
        {_.map(friends, (friend) => (
          <Friend key={friend.id} friend={friend} {...this.props} />
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
  canDelete: PropTypes.bool,
  canPromote: PropTypes.bool,
  onPromoteToOfficer: PropTypes.func
}

export default FriendList
