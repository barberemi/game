import React, { Component } from 'react';
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import _ from "lodash";
import ReactTooltip from "react-tooltip";
import {Link} from "react-router-dom";
import { boss1 } from "../../../utils/boss1";
import { boss2 } from "../../../utils/boss2";
import { boss3 } from "../../../utils/boss3";
import CharacteristicItem from "../../../Components/Characteristic/CharacteristicItem";
import EquippedSkills from "../../../Components/Skill/EquippedSkills";
import ItemList from "../../../Components/Item/ItemList";

const Container = styled.div`
  background-image: url("https://cdnb.artstation.com/p/assets/images/images/017/639/075/large/yarki-studio-dragon-sisters-2.jpg");
  background-size: 100% 100%;
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  height: 100%;
  text-align: center;
  color: white;
  min-height: 250px;
  overflow-y: scroll;
`

const ListLink = styled.a`
  color: #fff;
  
  &:hover {
    color: #FFC312;
    text-decoration: none;
  }
`

const TitleBox = styled.div`
  font-size: 22px;
  color: #FFC312;
  -webkit-filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  -ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=1, OffY=1, Color='#444')";
`

const LevelBox = styled.span`
  font-size: 16px;
  color: #fff;
`

const LeftArrayBox = styled.div`
  left: 10px;
  top: 50%;
  z-index: 10;
`

const RightArrayBox = styled.div`
  right: 10px;
  top: 50%;
  z-index: 10;
`

const RightBox = styled.div`
  min-height: 550px;
`

const LinkArrow = styled(Link)`
  color: #fff;
  
  &:hover{
    color: #FFC312;
    ${props => ( ((props.towernumber === 1 && props.arrow === "left") || (props.towernumber === 3 && props.arrow === "right")) && css`
      cursor: not-allowed;
      color: #fff;
    `)};
  }
`

const Card = styled.div`
  background-color: rgba(0,0,0,0.7) !important;
`

const Image = styled.img`
  width: 200px;
  margin-top: 10px;
  -webkit-filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  -ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=1, OffY=1, Color='#444')";
`

class Boss extends Component {
  constructor(props) {
    super(props);
    const towernumber = parseInt(this.props.match.params.towernumber);
    let boss = boss1;

    switch (towernumber) {
      case 2:
        boss = boss2;
        break
      case 3:
        boss = boss3;
        break
      default:
        break;
    }

    this.state = {
      boss: boss,
      activatedTab: "generalTab",
      towernumber,
    };
  }

  onClickOnTab = (idTab) => {
    this.setState({
      activatedTab: idTab,
    });
  }

  onCheckSkill = (e) => {
    const name = _.split(e.target.name, '-');
    const exists = !!_.find(this.state.boss.skills[name[3]], { id: parseInt(name[2]) });

    if (exists) {
      _.remove(this.state.boss.skills[name[3]], { id: parseInt(name[2]) });
    } else {
      this.state.boss.skills[name[3]] = [...this.state.boss.skills[name[3]], {id: parseInt(name[2])} ];
    }

    this.setState({
      boss: {
        ...this.state.boss,
        skills: {
          ...this.state.boss.skills,
          [name[3]]: [
            ...this.state.boss.skills[name[3]],
          ]
        }
      }
    });
  }

  render() {
    const { boss, activatedTab, towernumber } = this.state;

    return (
      <Container className="container-fluid">
        <div className="container">
          <div className="row h-100 mt-5">

            <LeftArrayBox className="position-fixed h-100">
              <LinkArrow
                towernumber={towernumber}
                arrow="left"
                to={towernumber === 1 ? "#" : "/boss/" + (towernumber - 1)}
              >
                <i className="fas fa-arrow-left fa-3x" />
              </LinkArrow>
            </LeftArrayBox>

            <RightArrayBox className="position-fixed h-100">
              <LinkArrow
                towernumber={towernumber}
                arrow="right"
                to={towernumber === 3 ? "#" : "/boss/" + (towernumber + 1)}
              >
                <i className="fas fa-arrow-right fa-3x" />
              </LinkArrow>
            </RightArrayBox>

            <div className="col-sm-3 my-auto">
              <Card className="card">
                <div className="card-header">
                  <TitleBox>Menu</TitleBox>
                  <div>
                    <div onClick={() => this.onClickOnTab("generalTab")}>
                      <ListLink className={activatedTab === "generalTab" ? "active" : ""} data-toggle="tab" role="tab" href="#generalTab">Général</ListLink>
                      {activatedTab === "generalTab" && <span className="text-warning">&nbsp;<i className="far fa-arrow-alt-circle-right" /></span>}
                    </div>
                    <div onClick={() => this.onClickOnTab("skillsTab")}>
                      <ListLink className={activatedTab === "skillsTab" ? " active" : ""} data-toggle="tab" role="tab" href="#skillsTab">Compétences</ListLink>
                      {activatedTab === "skillsTab" && <span className="text-warning">&nbsp;<i className="far fa-arrow-alt-circle-right" /></span>}
                    </div>
                    <div onClick={() => this.onClickOnTab("itemsLootTab")}>
                      <ListLink className={activatedTab === "itemsLootTab" ? " active" : ""} data-toggle="tab" role="tab" href="#itemsLootTab">Objets lachés</ListLink>
                      {activatedTab === "itemsLootTab" && <span className="text-warning">&nbsp;<i className="far fa-arrow-alt-circle-right" /></span>}
                    </div>
                  </div>
                </div>
              </Card>
              <Image
                src={process.env.PUBLIC_URL+"/img/boss/"+boss.image}
                alt={boss.academy.name}
              />
            </div>

            <RightBox className="col-sm-9 my-auto">
              <div className="tab-content">

                {/* General */}
                <div className={`tab-pane${activatedTab === "generalTab" ? " active" : ""}`} id="generalTab" role="tabpanel">
                  <Card className="card">
                    <div className="card-header">
                      <TitleBox>
                        Tour niveau {towernumber}
                      </TitleBox>
                      {boss.name} <span className={boss.academy.className}>({boss.academy.name})</span><LevelBox> - Niv {boss.level}</LevelBox>
                    </div>
                    <div className="card-body">
                      <TitleBox>Caractéristiques</TitleBox>
                      <div className="col-sm-12">
                        {_.map(boss.characteristics, characteristic => (
                          <CharacteristicItem key={characteristic.name} name={characteristic.name} amount={characteristic.amount} />
                        ))}
                        <CharacteristicItem key="experience" name="experience" amount={boss.givenExperience} />
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Skills */}
                <div className={`tab-pane${activatedTab === "skillsTab" ? " active" : ""}`} id="skillsTab" role="tabpanel">
                  <Card className="card">
                    <div className="card-body">
                      <div className="col-sm-12">
                        <TitleBox>
                          Compétences du boss
                        </TitleBox>
                      </div>
                      <EquippedSkills skills={boss.skills} onCheckSkill={this.onCheckSkill} />
                    </div>
                  </Card>
                </div>

                {/* Items */}
                <div className={`tab-pane${activatedTab === "itemsLootTab" ? " active" : ""}`} id="itemsLootTab" role="tabpanel">
                  <Card className="card">
                    <div className="card-body">
                      <div className="col-sm-12">
                        <TitleBox>
                          Liste des objets lachés
                        </TitleBox>
                      </div>
                      <ItemList items={boss.items} displayActions={false} />
                    </div>
                  </Card>
                </div>

              </div>
            </RightBox>

          </div>
        </div>
        <ReactTooltip />
      </Container>
    );
  }
}
export default Boss;
