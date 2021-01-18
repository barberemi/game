import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import _ from 'lodash'
import Monster from './Monster'

const Container = styled.div`
  max-height: 60vh;
  min-height: 60vh;
  overflow-y: scroll;
`

class MonsterList extends Component {
  render() {
    const { monsters, selectedMonster } = this.props

    return (
      <Container>
        {_.map(monsters, (monster) => (
          <Monster
            key={monster.id}
            monster={monster}
            isSelected={selectedMonster && selectedMonster.id === monster.id}
            {...this.props}
          />
        ))}
      </Container>
    )
  }
}

MonsterList.propTypes = {
  monsters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number
    })
  ),
  selectedMonster: PropTypes.shape({})
}

export default MonsterList
