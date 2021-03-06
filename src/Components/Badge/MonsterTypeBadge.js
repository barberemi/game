import React from 'react'
import PropTypes from 'prop-types'

class MonsterTypeBadge extends React.Component {
  render() {
    const { isBoss, isGuildBoss } = this.props

    if (!isBoss && !isGuildBoss) {
      return ''
    }

    return (
      <span
        className="badge badge-pill"
        style={{ backgroundColor: isGuildBoss ? '#ff8000' : '#c600ff' }}
      >
        <div className="pt-1">
          {isGuildBoss ? 'Champion de guilde' : 'Champion'}
        </div>
      </span>
    )
  }
}

MonsterTypeBadge.propTypes = {
  isBoss: PropTypes.bool,
  isGuildBoss: PropTypes.bool
}

export default MonsterTypeBadge
