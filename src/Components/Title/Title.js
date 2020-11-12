import React, { Component } from "react";
import styled from "@emotion/styled";

const TitleBox = styled.div`
  font-size: 22px;
  color: #FFC312;
  -webkit-filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  -ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=1, OffY=1, Color='#444')";
`

export class Title extends Component {
  render() {
    return (
      <TitleBox>{this.props.children}</TitleBox>
    );
  }
}

export default Title;
