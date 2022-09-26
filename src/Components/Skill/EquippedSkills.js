import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import SkillBox from './SkillBox'
import LightDarkButton from '../LightDark/LightDarkButton'
import axios from 'axios'
import Cookies from 'js-cookie'

class EquippedSkills extends Component {
  constructor(props) {
    super(props)
    const { treeType } = this.props

    this.state = {
      isDark: treeType ? treeType === 'dark' : true,
      error: null,
      isLoaded: false,
      items: []
    }
  }

  componentDidMount() {
    this.loadData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.academyId !== prevProps.academyId) {
      this.setState({
        isLoaded: false
      })
      this.loadData()
    }
  }

  loadData() {
    const { academyId, treeType } = this.props
    const url = treeType
      ? process.env.REACT_APP_API_URL +
        '/skills?order_by=level&academy=' +
        academyId +
        '&treeType=' +
        treeType
      : process.env.REACT_APP_API_URL +
        '/skills?order_by=level&academy=' +
        academyId

    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      })
      .then((response) => {
        if (response.data) {
          this.setState({
            items: response.data.items,
            isLoaded: true
          })
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.data,
          isLoaded: true
        })
      })
  }

  render() {
    const {
      skills,
      treeType,
      displayCheckbox,
      userLevel,
      buttonOnRight
    } = this.props
    const { isDark, items, isLoaded } = this.state

    return (
      <div className="col-sm-12">
        {!isLoaded && (
          <img
            src={process.env.PUBLIC_URL + '/img/tail-spinner.svg'}
            width="20"
            height="20"
            alt="spinner"
          />
        )}
        {isLoaded && (
          <>
            {!treeType && (
              <LightDarkButton
                onRight={buttonOnRight}
                onClick={() => this.setState({ isDark: !isDark })}
              />
            )}
            {!treeType && (
              <div
                style={{ color: isDark ? '#7730ec' : '#fcce18' }}
                className="mb-sm-2"
              >
                {isDark ? 'Ombre' : 'Lumière'}
              </div>
            )}
            {_.map(
              isDark
                ? _.filter(items, { treeType: 'dark' })
                : _.filter(items, { treeType: 'light' }),
              (skill, index) => {
                if (
                  displayCheckbox ||
                  (!displayCheckbox && !!_.find(skills, { id: skill.id }))
                ) {
                  return (
                    <SkillBox
                      key={index}
                      skill={skill}
                      isDark={isDark}
                      zIndex={
                        isDark
                          ? _.filter(items, { treeType: 'dark' }).length - index
                          : _.filter(items, { treeType: 'light' }).length -
                            index
                      }
                      isSelected={!!_.find(skills, { id: skill.id })}
                      displayCheckbox={
                        displayCheckbox ? userLevel >= skill.level : false
                      }
                      {..._.omit(
                        this.props,
                        'displayCheckbox',
                        'buttonOnRight'
                      )}
                    />
                  )
                }
              }
            )}
          </>
        )}
      </div>
    )
  }
}

EquippedSkills.defaultProps = {
  treeType: null,
  displayCheckbox: true,
  buttonOnRight: false
}

EquippedSkills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      level: PropTypes.number,
      description: PropTypes.string
    })
  ),
  remainingSkillPoints: PropTypes.number,
  displayCheckbox: PropTypes.bool,
  onCheckSkill: PropTypes.func,
  academyId: PropTypes.number,
  userLevel: PropTypes.number,
  treeType: PropTypes.string,
  buttonOnRight: PropTypes.bool
}

export default EquippedSkills
