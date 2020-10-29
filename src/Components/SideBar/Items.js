import React, {Component} from 'react';
import styled from "@emotion/styled";

const Link = styled.i`
  cursor: pointer;
  text-decoration: none;
  color: white;
  display: block;
  line-height: 40px;
  margin-left: -20px;
  margin-top: -20px;
  position: absolute;
  text-align: center;
  
  &:hover {
    color: #eef;
  }
`

const Text = styled.span`
  font-family: 'Lakki Reddy', cursive;
  font-size: 16px;
`

class Items extends Component {
  render() {
    return (
      <>
        <Link className="fa fa-globe-europe fa-2x" style={{
          left: (10 - 35*Math.cos(-0.5 * Math.PI)).toFixed(4) + "%",
          top: (50 + 35*Math.sin(-0.5 * Math.PI)).toFixed(4) + "%"
        }}>
          <Text>&nbsp;Carte du monde</Text>
        </Link>
        <Link className="fa fa-user-circle fa-2x" style={{
          left: (10 - 35*Math.cos(-0.5 * Math.PI - 2*(1/8)*Math.PI)).toFixed(4) + "%",
          top: (55 + 35*Math.sin(-0.5 * Math.PI - 2*(1/8)*Math.PI)).toFixed(4) + "%"
        }}>
          <Text>&nbsp;Personnage</Text>
        </Link>
        <Link className="fa fa-dungeon fa-2x" style={{
          left: (10 - 35*Math.cos(-0.5 * Math.PI - 2*(1/8)*2*Math.PI)).toFixed(4) + "%",
          top: (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/8)*2*Math.PI)).toFixed(4) + "%"
        }}>
          <Text>&nbsp;Tour des boss</Text>
        </Link>
        <Link className="fa fa-user-friends fa-2x" style={{
          left: (10 - 35*Math.cos(-0.5 * Math.PI - 2*(1/8)*3*Math.PI)).toFixed(4) + "%",
          top: (45 + 35*Math.sin(-0.5 * Math.PI - 2*(1/8)*3*Math.PI)).toFixed(4) + "%"
        }}>
          <Text>&nbsp;Amis</Text>
        </Link>
        <Link className="fa fa-sign-out-alt fa-2x" style={{
          left: (10 - 35*Math.cos(-0.5 * Math.PI - 2*(1/8)*4*Math.PI)).toFixed(4) + "%",
          top: (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/8)*4*Math.PI)).toFixed(4) + "%"
        }}>
          <Text>&nbsp;Déconnexion</Text>
        </Link>
      </>
    )
  }
}

export default Items;