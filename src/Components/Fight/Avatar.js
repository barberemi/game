import React, { Component } from "react";
import PropTypes from "prop-types";

class Avatar extends Component {
  animation() {
    const { faint, isHit } = this.props;

    if (isHit === true) {
      return "animated headShake";
    }
    if (faint === true) {
      return "animated fadeOut slow";
    }
    if (faint === null) {
      return "animated fadeInUp";
    }
    if (faint === undefined) {
      return "hide";
    }
  }

  render() {
    return (
      <div className={this.animation()}>
        <img className={this.props.className} src={process.env.PUBLIC_URL+"/img/"+this.props.logoName+".png"} alt={this.props.logoName} />
      </div>
    );
  }
}

Avatar.propTypes = {
  faint: PropTypes.bool,
  isHit: PropTypes.bool,
  logoName: PropTypes.string,
  className: PropTypes.string,
}

export default Avatar;
