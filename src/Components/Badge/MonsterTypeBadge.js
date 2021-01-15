import React from 'react'
import PropTypes from 'prop-types'

class MonsterTypeBadge extends React.Component {
  render() {
    const { isBoss, isGuildBoss } = this.props

    if (!isBoss && !isGuildBoss) {
      return ''
    }
    console.log(isGuildBoss)
    return (
      <span
        className={`badge badge-pill badge-${
          isGuildBoss ? 'danger' : 'primary'
        }`}
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
