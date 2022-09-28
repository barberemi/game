import React from 'react'
import PropTypes from 'prop-types'

class MonsterTypeBadge extends React.Component {
  render() {
    const { isBoss, isGuildBoss } = this.props

    return (
      <span
        className="badge"
        style={{
          backgroundColor: isGuildBoss
            ? '#ff8000'
            : isBoss
            ? '#dc3545'
            : '#808080'
        }}
      >
        <div className="p-1">
          {isGuildBoss
            ? 'Champion de guilde'
            : isBoss
            ? 'Champion d‘exploration'
            : 'Monstre classique'}
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
