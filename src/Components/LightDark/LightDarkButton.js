import React, { Component } from 'react';
import styled from "@emotion/styled";
import styles from "./styles.scss"; // dont remove, used to svg animations etc
import moonSunSvg from './moon-sun.svg';
import landSvg from './land.svg';
import PropTypes from "prop-types";

const Container = styled.div`
  position: absolute;
  z-index: 10;
  top: -60px;
  right: -40px;
`

const Circle = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  border-radius:50%;
  border:3px solid #fff;
  box-shadow:0px 5px 30px 5px rgba(119, 48, 236,0.4);
  overflow: hidden;
  transition: all 0.5s;
  cursor:pointer;
`

const OlasBottom = styled.div`
  position: absolute;
  bottom:0;
  width: 100%;
  height:150px;
  z-index: 0;
  border-radius:50% ;
`

const Button2 = styled.img`
  margin-top: 100px;
  transition: all 1.5s;
  position: relative;
  left: -212px;
`

const Sun = styled.div`
  position: absolute;
  top:10px;
  right: 30px;
  width: 23px;
  height: 23px;
  background-color: #fff;
  border-radius:50%;
  box-shadow: 1px 1px  10px  6px  rgba(255,255,255,0.5);
  transform: translate(-190px,20px);
`

const Moon = styled.div`
  position: absolute;
  top:10px;
  right: 30px;
  border-radius:50%;
  overflow: hidden;
`

class LightDarkButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "dark",
    }
  }

  handleClick = () => {
    this.setState({
      type: this.state.type === "dark" ? "light" : "dark",
    });
    this.props.onClick(this.state.type === "dark" ? "light" : "dark");
  }

  render() {
    return (
      <>
        <Container data-tip="Cliquer pour switch entre Dark et Light.">
          <Circle className={`cont_circle ${this.state.type === "dark" ? "cont_circle_noche" : "cont_circle_dia"}`}>
            <Sun className="sun" />
            <Moon className="moon">
              <img src={moonSunSvg} alt="moon sun" />
            </Moon>
            <OlasBottom className="cont_olas_bottom" onClick={() => this.handleClick()}>
              <Button2 src={landSvg} alt="land" />
            </OlasBottom>
          </Circle>
        </Container>
      </>
    );
  }
}

LightDarkButton.propTypes = {
  onClick: PropTypes.func,
}

export default LightDarkButton;
