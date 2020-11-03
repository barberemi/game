import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from "@emotion/styled";

import focusSvg from "./focus.svg";
import hasteSvg from "./haste.svg";
import healthSvg from "./health.svg";
import intelligenceSvg from "./intelligence.svg";
import strengthSvg from "./strength.svg";

const Characteristic = styled.div`
  display: flex;
  float: left;
`

const Image = styled.img`
  width: 60px;
  height: 60px;
`

const TextBox = styled.div`
  padding: 0 10px;
  display: table-cell;
  margin-top: auto;
  text-align: left;
`

class CharacteristicItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: null,
      color: null,
      svg: null,
    }
  }

  componentDidMount() {
    switch (this.props.name) {
      case "focus":
        this.setState({label: "Confiance", color: "#9256ff", svg: focusSvg});
        break;
      case "haste":
        this.setState({label: "Hâte", color: "#ff8b2d", svg: hasteSvg});
        break;
      case "intelligence":
        this.setState({label: "Intelligence", color: "#1c8aff", svg: intelligenceSvg});
        break;
      case "strength":
        this.setState({label: "Force", color: "#f33232", svg: strengthSvg});
        break;
      default:
        this.setState({label: "Vie", color: "#27cc4e", svg: healthSvg});
        break;
    }
  }

  render() {
    const { amount } = this.props;
    const { label, color, svg } = this.state;

    return (
      <Characteristic className="col-md-4 col-sm-5">
        <Image src={svg} alt="img" />
        <TextBox>
          <div style={{color}}>{amount}</div>
          <span>{label}</span>
        </TextBox>
      </Characteristic>
    );
  }
}

CharacteristicItem.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.number,
}

export default CharacteristicItem;
