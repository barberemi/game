import React, { Component } from 'react';
import styled from "@emotion/styled";
import _ from "lodash";
import ReactTooltip from "react-tooltip";
import { character } from "../../../utils/character";
import LightDarkButton from "../../../Components/LightDark/LightDarkButton";
import ProgressBar from "../../../Components/Character/ProgressBar";
import CharacteristicItem from "../../../Components/Characteristic/CharacteristicItem";
import EquippedItems from "../../../Components/Item/EquippedItems";

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

const Skill = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid;
  margin-right: 10px;
  
  &:hover {
    cursor: pointer;
  }
`

class Creation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character,
      isDark: true,
    };
  }

  onClickButtonLightdark = (type) => {
    this.setState({
      isDark: type === "dark",
    })
  }

  render() {
    const { character, isDark } = this.state;

    return (
      <Container className="container-fluid">
        <div className="container">
          <div className="row h-100 mt-5">

            <LeftBox className="col-sm-4 my-auto">
              <Card className="card">
                <div className="card-header">
                  <TitleBox>{character.academy.name}</TitleBox>
                  {_.map(character.academy.roles, role => (
                    <div key={role} className={character.academy.className}>{role}</div>
                  ))}
                </div>
              </Card>
              <Image
                src={process.env.PUBLIC_URL+"/img/academies/"+character.academy.image}
                alt={character.academy.name}
                data-tip="Ahou Ahou !!"
              />
              <ReactTooltip />
            </LeftBox>

            <RightBox className="col-sm-8 my-auto">
              <Card className="card">
                {/*<LightDarkButton onClick={this.onClickButtonLightdark} />*/}
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
                  {/*<div className="col-sm-12">*/}
                  {/*  <TitleBox>Compétences</TitleBox>*/}
                  {/*</div>*/}
                  {/*<div style={{color: isDark ? "#7730ec" : "#fcce18"}}>*/}
                  {/*  {isDark ? "Ombre" : "Lumière"}*/}
                  {/*</div>*/}
                  {/*{_.map(isDark ? character.skills.dark : character.skills.light, skill => (*/}
                  {/*  <>*/}
                  {/*    <Skill*/}
                  {/*      key={skill}*/}
                  {/*      src="https://wiki-fr.guildwars2.com/images/8/88/Dagues_enchant%C3%A9es.png"*/}
                  {/*      alt={skill.name}*/}
                  {/*      data-tip={skill.description}*/}
                  {/*      style={{borderColor: isDark ? "#7730ec" : "#fcce18"}}*/}
                  {/*    />*/}
                  {/*    <ReactTooltip />*/}
                  {/*  </>*/}
                  {/*))}*/}
                </div>
              </Card>
            </RightBox>

          </div>
        </div>
      </Container>
    );
  }
}
export default Creation;
