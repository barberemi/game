import React, { Component } from 'react';
import styled from "@emotion/styled";
import _ from "lodash";
import ReactTooltip from "react-tooltip";
import { character } from "../../../utils/character";
import ProgressBar from "../../../Components/Character/ProgressBar";
import CharacteristicItem from "../../../Components/Characteristic/CharacteristicItem";
import EquippedItems from "../../../Components/Item/EquippedItems";
import EquippedSkills from "../../../Components/Skill/EquippedSkills";

const Container = styled.div`
  background-image: url("https://images2.alphacoders.com/717/717870.jpg");
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

const LeftBox = styled.div`
`

const RightBox = styled.div`
  min-height: 550px;
`

const Card = styled.div`
  background-color: rgba(0,0,0,0.7) !important;
`

const Image = styled.img`
  width: 200px;
  margin-top: 10px;
  &:hover {
    cursor: pointer;
    -webkit-filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
    filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
    -ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=1, OffY=1, Color='#444')";
  }
`

class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character,
      activatedTab: "skillsTab",
    };
  }

  onClickOnTab = (idTab) => {
    this.setState({
      activatedTab: idTab,
    });
  }

  onCheckSkill = (e) => {
    const name = _.split(e.target.name, '-');

    this.setState({
      character: {
        ...this.state.character,
        skills: {
          ...this.state.character.skills,
          [name[3]]: [
            ...this.state.character.skills[name[3]],
            {id: parseInt(name[2])},
          ]
        }
      }
    });
  }

  render() {
    const { character, activatedTab } = this.state;

    return (
      <Container className="container-fluid">
        <div className="container">
          <div className="row h-100 mt-5">

            <LeftBox className="col-sm-3 my-auto">
              <Card className="card">
                <div className="card-header">
                  <TitleBox>{character.academy.name}</TitleBox>
                  {_.map(character.academy.roles, role => (
                    <div key={role} className={character.academy.className}>{role}</div>
                  ))}
                  <ul>
                    <li onClick={() => this.onClickOnTab("generalTab")}><a className={activatedTab === "generalTab" ? "active" : ""} data-toggle="tab" role="tab" href="#generalTab">Général</a></li>
                    <li onClick={() => this.onClickOnTab("skillsTab")}><a className={activatedTab === "skillsTab" ? " active" : ""} data-toggle="tab" role="tab" href="#skillsTab">Compétences</a></li>
                  </ul>
                </div>
              </Card>
              <Image
                src={process.env.PUBLIC_URL+"/img/academies/"+character.academy.image}
                alt={character.academy.name}
                data-tip="Ahou Ahou !!"
              />
              <ReactTooltip />
            </LeftBox>

            <RightBox className="col-sm-9 my-auto">
              <div className="tab-content">

                {/* General */}
                <div className={`tab-pane${activatedTab === "generalTab" ? " active" : ""}`} id="generalTab" role="tabpanel">
                  <Card className="card">
                    <div className="card-header">
                      <TitleBox>{character.name} <LevelBox> - Niv {character.level}</LevelBox></TitleBox>
                      <ProgressBar actual={350} max={1200} color="#DC3545" transparentColor="#e09a9a" />
                    </div>
                    <div className="card-body">
                      <TitleBox>Caractéristiques</TitleBox>
                      <div className="col-sm-12">
                        {_.map(character.characteristics, characteristic => (
                          <CharacteristicItem key={characteristic.name} name={characteristic.name} amount={characteristic.amount} />
                        ))}
                      </div>
                    </div>
                    <div className="card-footer">
                      <TitleBox>Équipements</TitleBox>
                      <div className="col-sm-12">
                        <EquippedItems items={character.equippedItems} academyImage={character.academy.image} />
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Skills */}
                <div className={`tab-pane${activatedTab === "skillsTab" ? " active" : ""}`} id="skillsTab" role="tabpanel">
                  <Card className="card">
                    <div className="card-header">
                      <TitleBox>{character.name} <LevelBox> - Niv {character.level}</LevelBox></TitleBox>
                      <ProgressBar actual={350} max={1200} color="#DC3545" transparentColor="#e09a9a" />
                    </div>
                    <div className="card-body">
                      <div className="col-sm-12">
                        <TitleBox>Compétences d'académie</TitleBox>
                      </div>
                      <div className="col-sm-12">
                        <EquippedSkills skills={character.skills} onChekSkill={this.onCheckSkill} />
                      </div>
                    </div>
                  </Card>
                </div>

              </div>
            </RightBox>

          </div>
        </div>
      </Container>
    );
  }
}
export default Character;
