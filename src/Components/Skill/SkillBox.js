import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import _ from 'lodash'
import { getBorderColorSkill } from '../../utils/skillHelper'

const Container = styled.div`
  float: left;
  margin-bottom: 15px;
`

const SubContainer = styled.div`
  display: flex;
  float: left;
  width: 100%;

  ${(props) =>
    props.descriptionDisplayed === false &&
    css`
      border: 1px solid #504137;
    `};

  ${(props) =>
    props.descriptionDisplayed === false &&
    props.isSelected === true &&
    css`
      -webkit-box-shadow: inset 0 -8px 0 ${props.hoverColorBorder};
      box-shadow: inset 0 -8px 0 ${props.hoverColorBorder};
      border-color: ${props.hoverColorBorder};
    `};

  &:hover {
    cursor: pointer;
    ${(props) => ({ borderColor: props.hoverColorBorder })},
  }
`

const BorderBox = styled.div`
  ${(props) =>
    props.descriptionDisplayed === true &&
    css`
      border: 1px solid #504137;
    `};

  ${(props) =>
    props.descriptionDisplayed === true &&
    props.isSelected === true &&
    css`
      -webkit-box-shadow: inset 0 -8px 0 ${props.hoverColorBorder};
      box-shadow: inset 0 -8px 0 ${props.hoverColorBorder};
      border-color: ${props.hoverColorBorder};
    `};

  &:hover {
    cursor: pointer;
    ${(props) => ({ borderColor: props.hoverColorBorder })},
  }
`

const Level = styled.div`
  padding: 0 10px;
  margin-top: auto;
  margin-bottom: auto;
`

const Box = styled.div`
  height: 60px;
  width: 40px;
  position: relative;
`

const ImageSkill = styled.img`
  border: 2px solid #000;
  max-width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`

const Text = styled.div`
  padding: 0 30px 0 10px;
  margin-top: auto;
  margin-bottom: auto;
`

const InputCheckBox = styled.input`
  position: absolute;
  top: 23px;
  right: 30px;
`

const TextBox = styled.div`
  font-size: 14px;
  padding: 15px;
`

const DescriptionBox = styled.div`
  text-align: justify;
`

class SkillBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isChecked: this.props.isSelected,
      descriptionDisplayed: false
    }
  }

  toggleChecked = () => {
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked
    }))
  }

  render() {
    const { skill, isDark, remainingSkillPoints, displayCheckbox } = this.props
    const { isChecked, descriptionDisplayed } = this.state

    return (
      <Container className="col-sm-4">
        <BorderBox
          hoverColorBorder={getBorderColorSkill(isDark)}
          isSelected={isChecked}
          descriptionDisplayed={descriptionDisplayed}
          onClick={() => {
            this.setState({ descriptionDisplayed: !descriptionDisplayed })
          }}
        >
          <SubContainer
            hoverColorBorder={getBorderColorSkill(isDark)}
            isSelected={isChecked}
            descriptionDisplayed={descriptionDisplayed}
          >
            <Level>{skill.level}</Level>
            <Box>
              <ImageSkill
                src="https://render-eu.worldofwarcraft.com/icons/56/spell_holy_holyguidance.jpg"
                alt={skill.name}
              />
            </Box>
            <Text>{skill.name}</Text>
            {displayCheckbox && (
              <InputCheckBox
                type="checkbox"
                id={`skill-check-${skill.id}-${isDark ? 'dark' : 'light'}`}
                name={`skill-check-${skill.id}-${isDark ? 'dark' : 'light'}`}
                checked={isChecked}
                disabled={!!(!isChecked && remainingSkillPoints === 0)}
                onClick={(e) => {
                  e.stopPropagation()
                }}
                onChange={(e) => {
                  this.toggleChecked()
                  this.props.onCheckSkill(e)
                }}
              />
            )}
          </SubContainer>
          <TextBox className={descriptionDisplayed ? '' : 'd-none'}>
            <b>Type de compétence :</b> {skill.type}
            <br />
            {skill.duration > 0 && (
              <>
                <b>Durée :</b> {skill.duration} tours
                <br />
              </>
            )}
            {skill.cooldown > 0 && (
              <>
                <b>Temps de récupération :</b> {skill.cooldown} tours
                <br />
              </>
            )}
            <hr className="my-3" />
            <DescriptionBox>
              <br />
              {_.replace(
                skill.description,
                '#MONTANT#',
                skill.amount +
                  ' + ' +
                  '(' +
                  skill.rate +
                  ' * ' +
                  skill.scaleType +
                  ')'
              )}
            </DescriptionBox>
          </TextBox>
        </BorderBox>
      </Container>
    )
  }
}

SkillBox.defaultProps = {
  displayCheckbox: true
}

SkillBox.propTypes = {
  skill: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    level: PropTypes.number,
    description: PropTypes.string,
    duration: PropTypes.number,
    cooldown: PropTypes.number,
    amount: PropTypes.number,
    rate: PropTypes.number,
    type: PropTypes.string,
    scaleType: PropTypes.string
  }),
  isDark: PropTypes.bool,
  isSelected: PropTypes.bool,
  remainingSkillPoints: PropTypes.number,
  onCheckSkill: PropTypes.func,
  displayCheckbox: PropTypes.bool
}

export default SkillBox
