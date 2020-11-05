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
  border: 1px solid #504137;
  width: 100%;
  ${props => ( props.isSelected === true && css`
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

class SkillBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: this.props.isSelected,
    };
  }

  toggleChecked = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }));
  }

  render() {
    const { skill, isDark } = this.props;
    const { isChecked } = this.state;

    return (
      <Container className="col-sm-4">
        <SubContainer hoverColorBorder={getBorderColorSkill(isDark)} isSelected={isChecked}>
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
            onChange={(e) => {this.toggleChecked();this.props.onChekSkill(e)}}
          />
          <ReactTooltip />
        </SubContainer>
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
  onChekSkill: PropTypes.func,
}

export default SkillBox;
