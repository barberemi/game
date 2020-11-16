import React, { Component } from 'react';
import styled from "@emotion/styled";
import _ from "lodash";
import { explorations } from "../../../utils/explorations";
import {Link} from "react-router-dom";

const Container = styled.div`
  background-image: url("https://cdnb.artstation.com/p/assets/images/images/028/312/273/large/yarki-studio-treasure-island-artstation-1.jpg?1594115694");
  background-size: 100% 100%;
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  height: calc(100% - 100px);
  text-align: center;
  color: white;
  min-height: 250px;
  
  overflow-y: auto;
  scroll-behavior: smooth;
`

const Building = styled.img`
  &:hover {
    cursor: pointer;
    -webkit-filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
    filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
    -ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=1, OffY=1, Color='#444')";
  }
`

const DisabledBuilding = styled.img`
  opacity: 0.7;
  &:hover {
    cursor: not-allowed;
  }
`

const StickyBoss = styled.img`
  border: 3px solid #000;
  border-radius: 50%;
  position: fixed;
  margin-top: 20px;
  background-color: white;
  z-index: 1;
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  
  &:hover {
    cursor: pointer;
  }
`

const PossibleBuildingText = styled.div`
  background-color: #fff;
  color: #000;
  border-radius: 50%;
  border: 2px solid #000;
  width: 25px;
  height: 25px;
  position: absolute;
  left: 50%;
  top: 90%;
  padding-top: 2px; // Font is too up
`

class Exploration extends Component {
  constructor(props) {
    super(props);

    this.refScroll = React.createRef();
    this.refMe = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      explorations: explorations.explorations,
      boss: explorations.boss,
      player: explorations.player,
      scrollIsTop: true,
    };
  }

  componentDidMount() {
    // Scroll if didnt see player
    setTimeout(() => {
      if (!(
        this.refMe.current.getBoundingClientRect().top < window.innerHeight &&
        this.refMe.current.getBoundingClientRect().bottom >= 0)
      ) {
        this.refScroll.current.scrollTop = this.refScroll.current.scrollHeight;
      }
    }, 1000);
  }

  handleScroll() {
    this.setState({
      scrollIsTop: this.refScroll.current.scrollTop,
    });
  }

  handleMovement(index) {
    // Call API to change position player in exploration
  }

  displayBuildings(exploration, index){
    const { position, image } = this.state.player;

    if (position === index) {
      return <Building src={process.env.PUBLIC_URL+"/img/"+image} alt="pikachu" width={exploration.width} height="100px" ref={this.refMe} />
    } else if (_.includes(this.state.explorations[position].next, exploration.id)) {
      return <Link to="/choice" onClick={this.handleMovement(index)}>
        <Building src={process.env.PUBLIC_URL+"/img/explorations/"+exploration.image} alt={exploration.image} width={exploration.width} height={exploration.height} />
      </Link>
    } else {
      return <DisabledBuilding src={process.env.PUBLIC_URL+"/img/explorations/"+exploration.image} alt={exploration.image} width={exploration.width} height={exploration.height} />
    }
  }

  render() {
    const { boss, scrollIsTop } = this.state;
    let countExplorations = 0;

    return (
      <Container className="container-fluid" onScroll={this.handleScroll} ref={this.refScroll}>
        <div className="container">
          <div className="row">
            <StickyBoss
              src={process.env.PUBLIC_URL+"/img/"+boss.image}
              alt={boss.name}
              style={{
                left: scrollIsTop <= 40 ? "50%" : "90%",
                transform: scrollIsTop <= 40 ? "translateX(-50%)" : "translateX(-90%)",
              }}
              width={boss.width}
              height={boss.height}
              data-tip={boss.name}
              data-place="bottom"
            />
            {_.map(this.state.explorations, (exploration, index) => (
              <div key={index} className={`mt-3 mb-3 col-sm-${exploration.col}${exploration.offset !== 0 ? " offset-sm-"+exploration.offset : ""}`}>
                {this.displayBuildings(exploration, index)}
                {_.includes(this.state.explorations[this.state.player.position].next, exploration.id) && (countExplorations = countExplorations + 1) && (
                  <PossibleBuildingText>{countExplorations}</PossibleBuildingText>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    );
  }
}
export default Exploration;
