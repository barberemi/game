import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import ReactTooltip from "react-tooltip";
import { getBorderColorSkill } from "../../utils/skillHelper";

const Container = styled.div`
  float: left;
  margin-bottom: 15px;
`

const SubContainer = styled.div`
  display: flex;
  float: left;
  width: 100%;
  
  ${props => ( props.descriptionDisplayed === false && css`
    border: 1px solid #504137;
  `)};
  
  ${props => ( props.descriptionDisplayed === false && props.isSelected === true && css`
    -webkit-box-shadow: inset 0 -8px 0 ${props.hoverColorBorder};
    box-shadow: inset 0 -8px 0 ${props.hoverColorBorder};
    border-color: ${props.hoverColorBorder};
  `)};
  
  &:hover {
    cursor: pointer;
    ${props => ({ borderColor: props.hoverColorBorder })},
  }
`

const BorderBox = styled.div`
  ${props => ( props.descriptionDisplayed === true && css`
    border: 1px solid #504137;
  `)};
  
  ${props => ( props.descriptionDisplayed === true && props.isSelected === true && css`
    -webkit-box-shadow: inset 0 -8px 0 ${props.hoverColorBorder};
    box-shadow: inset 0 -8px 0 ${props.hoverColorBorder};
    border-color: ${props.hoverColorBorder};
  `)};
  
  &:hover {
    cursor: pointer;
    ${props => ({ borderColor: props.hoverColorBorder })},
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

const ImageSkill= styled.img`
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

const DescriptionBox = styled.div`
  font-size: 14px;
  padding: 15px;
  text-align: justify;
`

class SkillBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: this.props.isSelected,
      descriptionDisplayed: false,
    };
  }

  toggleChecked = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }));
  }

  render() {
    const { skill, isDark, remainingSkillPoints } = this.props;
    const { isChecked, descriptionDisplayed } = this.state;

    return (
      <Container className="col-sm-4">
        <BorderBox
          hoverColorBorder={getBorderColorSkill(isDark)}
          isSelected={isChecked}
          descriptionDisplayed={descriptionDisplayed}
          onClick={() => { this.setState({descriptionDisplayed: !descriptionDisplayed})}}
        >
          <SubContainer
            hoverColorBorder={getBorderColorSkill(isDark)}
            isSelected={isChecked}
            descriptionDisplayed={descriptionDisplayed}
          >
            <Level>{skill.level}</Level>
            <Box>
              <ImageSkill src="https://render-eu.worldofwarcraft.com/icons/56/spell_holy_holyguidance.jpg" alt={skill.name} />
            </Box>
            <Text>{skill.name}</Text>
            <InputCheckBox
              type="checkbox"
              id={`skill-check-${skill.id}-${isDark ? "dark" : "light"}`}
              name={`skill-check-${skill.id}-${isDark ? "dark" : "light"}`}
              checked={isChecked}
              disabled={!!(!isChecked && remainingSkillPoints === 0)}
              onClick={(e) => {e.stopPropagation();}}
              onChange={(e) => {this.toggleChecked();this.props.onCheckSkill(e)}}
            />
            <ReactTooltip />
          </SubContainer>
          <DescriptionBox className={descriptionDisplayed ? "" : "d-none"}>
            {skill.description}
          </DescriptionBox>
        </BorderBox>
      </Container>
    );
  }
}

SkillBox.propTypes = {
  skill: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    level: PropTypes.number,
    description: PropTypes.string,
  }),
  isDark: PropTypes.bool,
  isSelected: PropTypes.bool,
  remainingSkillPoints: PropTypes.number,
  onCheckSkill: PropTypes.func,
}

export default SkillBox;
