import React, {Component} from 'react';
import styled from "@emotion/styled";
import {Link} from "react-router-dom";

const LinkText = styled(Link)`
  color: white;
  display: block;
  line-height: 40px;
  margin-left: -20px;
  margin-top: -20px;
  position: absolute;
  text-align: center;
  
  &:hover {
    text-decoration: none;
    color: #eef;
  }
`

const Text = styled.span`
  font-size: 16px;
`

class Items extends Component {
  render() {
    return (
      <>
        <LinkText to={"/maps"} className="fa fa-globe-europe fa-2x" style={{
          left: (10 - 35*Math.cos(-0.5 * Math.PI)).toFixed(4) + "%",
          top: (50 + 35*Math.sin(-0.5 * Math.PI)).toFixed(4) + "%"
        }}>
          <Text>&nbsp;Carte du monde</Text>
        </LinkText>
        <LinkText to={"/character"} className="fa fa-user-circle fa-2x" style={{
          left: (10 - 35*Math.cos(-0.5 * Math.PI - 2*(1/8)*Math.PI)).toFixed(4) + "%",
          top: (55 + 35*Math.sin(-0.5 * Math.PI - 2*(1/8)*Math.PI)).toFixed(4) + "%"
        }}>
          <Text>&nbsp;Personnage</Text>
        </LinkText>
        <LinkText className="fa fa-dungeon fa-2x" style={{
          left: (10 - 35*Math.cos(-0.5 * Math.PI - 2*(1/8)*2*Math.PI)).toFixed(4) + "%",
          top: (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/8)*2*Math.PI)).toFixed(4) + "%"
        }}>
          <Text>&nbsp;Tour des boss</Text>
        </LinkText>
        <LinkText className="fa fa-user-friends fa-2x" style={{
          left: (10 - 35*Math.cos(-0.5 * Math.PI - 2*(1/8)*3*Math.PI)).toFixed(4) + "%",
          top: (45 + 35*Math.sin(-0.5 * Math.PI - 2*(1/8)*3*Math.PI)).toFixed(4) + "%"
        }}>
          <Text>&nbsp;Amis</Text>
        </LinkText>
        <LinkText to={"/login"} className="fa fa-sign-out-alt fa-2x" style={{
          left: (10 - 35*Math.cos(-0.5 * Math.PI - 2*(1/8)*4*Math.PI)).toFixed(4) + "%",
          top: (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/8)*4*Math.PI)).toFixed(4) + "%"
        }}>
          <Text>&nbsp;Déconnexion</Text>
        </LinkText>
      </>
    )
  }
}

export default Items;