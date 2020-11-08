import React, { Component } from "react";
import PropTypes from 'prop-types';
import _ from "lodash";
import SkillBox from "./SkillBox";
import LightDarkButton from "../LightDark/LightDarkButton";
import { academy } from "../../utils/warrior";

class EquippedSkills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      academy,
      isDark: true,
    };
  }

  render() {
    const { skills } = this.props;
    const { academy, isDark } = this.state;

    return (
      <div className="col-sm-12">
        <LightDarkButton onClick={() => this.setState({isDark: !this.state.isDark})} />
        <div style={{color: isDark ? "#7730ec" : "#fcce18"}} className="mb-sm-2">
          {isDark ? "Ombre" : "Lumière"}
        </div>
        {_.map(isDark ? academy.skills.dark : academy.skills.light, skill => (
          <SkillBox
            key={skill.id}
            skill={skill}
            isDark={isDark}
            isSelected={!!_.find(isDark ? skills.dark : skills.light, { 'id': skill.id })}
            {...this.props}
          />
        ))}
      </div>
    );
  }
}

EquippedSkills.propTypes = {
  skills: PropTypes.shape({
    dark: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      level: PropTypes.number,
      description: PropTypes.string,
    })),
    light: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      level: PropTypes.number,
      description: PropTypes.string,
    })),
  }),
  remainingSkillPoints: PropTypes.number,
  onCheckSkill: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onChangeEquippedItem: PropTypes.func,
}

export default EquippedSkills;
