import React, { Component } from 'react';
import styled from "@emotion/styled";
import _ from "lodash";
import ReactTooltip from "react-tooltip";
import { character } from "../../../utils/character";
import ProgressBar from "../../../Components/Character/ProgressBar";
import CharacteristicItem from "../../../Components/Characteristic/CharacteristicItem";
import EquippedItems from "../../../Components/Item/EquippedItems";
import EquippedSkills from "../../../Components/Skill/EquippedSkills";
import FriendList from "../../../Components/Friend/FriendList";
import ItemList from "../../../Components/Item/ItemList";

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

const RightBox = styled.div`
  min-height: 550px;
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

const SubTitle = styled.span`
  font-size: 18px;
`

class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character,
      activatedTab: "generalTab",
    };
  }

  onClickOnTab = (idTab) => {
    this.setState({
      activatedTab: idTab,
    });
  }

  onCheckSkill = (e) => {
    const name = _.split(e.target.name, '-');
    const exists = !!_.find(this.state.character.skills[name[3]], { id: parseInt(name[2]) });

    if (exists) {
      _.remove(this.state.character.skills[name[3]], { id: parseInt(name[2]) });
    } else {
      this.state.character.skills[name[3]] = [...this.state.character.skills[name[3]], {id: parseInt(name[2])} ];
    }

    this.setState({
      character: {
        ...this.state.character,
        skills: {
          ...this.state.character.skills,
          [name[3]]: [
            ...this.state.character.skills[name[3]],
          ]
        }
      }
    });
  }

  onDeleteItem = (item) => {
    _.remove(this.state.character.items, { id: item.id });

    this.setState({
      character: {
        ...this.state.character,
        items: this.state.character.items,
      }
    });
  }

  onChangeEquippedItem = (newEquippedItem) => {
    const items = [...this.state.character.items];
    // Remove all equipped items with the same item.type
    if (!newEquippedItem.equipped) {
      _.map(_.filter(items, { equipped: true, type: newEquippedItem.type }), item => {
        item.equipped = false;
      });
    }

    // Equipped/Unequipped item now
    newEquippedItem.equipped = !newEquippedItem.equipped;
    const indexItem = _.findIndex(items, { id: newEquippedItem.id});
    items[indexItem] = newEquippedItem;

    this.setState({
      character: {
        ...this.state.character,
        items,
      }
    });
  }

  render() {
    const { character, activatedTab } = this.state;
    const remainingSkillPoints = character.skillPoints - (character.skills.dark.length + character.skills.light.length);
    const remainingItemSpaceNb = character.itemSpaceNb - character.items.length;

    return (
      <Container className="container-fluid">
        <div className="container">
          <div className="row h-100 mt-5">

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
                    <div onClick={() => this.onClickOnTab("itemsTab")}>
                      <ListLink className={activatedTab === "itemsTab" ? " active" : ""} data-toggle="tab" role="tab" href="#itemsTab">Objets</ListLink>
                      {activatedTab === "itemsTab" && <span className="text-warning">&nbsp;<i className="far fa-arrow-alt-circle-right" /></span>}
                    </div>
                    <div onClick={() => this.onClickOnTab("friendsTab")}>
                      <ListLink className={activatedTab === "friendsTab" ? " active" : ""} data-toggle="tab" role="tab" href="#friendsTab">Liste d'amis</ListLink>
                      {activatedTab === "friendsTab" && <span className="text-warning">&nbsp;<i className="far fa-arrow-alt-circle-right" /></span>}
                    </div>
                  </div>
                </div>
              </Card>
              <Image
                src={process.env.PUBLIC_URL+"/img/academies/"+character.academy.image}
                alt={character.academy.name}
              />
            </div>

            <RightBox className="col-sm-9 my-auto">
              <div className="tab-content">

                {/* General */}
                <div className={`tab-pane${activatedTab === "generalTab" ? " active" : ""}`} id="generalTab" role="tabpanel">
                  <Card className="card">
                    <div className="card-header">
                      <TitleBox>{character.name} <span className={character.academy.className}>({character.academy.name})</span><LevelBox> - Niv {character.level}</LevelBox></TitleBox>
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
                      <EquippedItems items={_.filter(character.items, { equipped: true })} displayActions={true} academyImage={character.academy.image} onDeleteItem={this.onDeleteItem} onChangeEquippedItem={this.onChangeEquippedItem} />
                    </div>
                  </Card>
                </div>

                {/* Skills */}
                <div className={`tab-pane${activatedTab === "skillsTab" ? " active" : ""}`} id="skillsTab" role="tabpanel">
                  <Card className="card">
                    <div className="card-body">
                      <div className="col-sm-12">
                        <TitleBox>
                          Compétences d'académie<br />
                          <SubTitle>({remainingSkillPoints === 0 ? "Aucun point restant" : (remainingSkillPoints === 1 ? "1pt restant" : remainingSkillPoints + "pts restants")})</SubTitle>
                        </TitleBox>
                      </div>
                      <EquippedSkills skills={character.skills} onCheckSkill={this.onCheckSkill} remainingSkillPoints={remainingSkillPoints} />
                    </div>
                  </Card>
                </div>

                {/* Friends */}
                <div className={`tab-pane${activatedTab === "friendsTab" ? " active" : ""}`} id="friendsTab" role="tabpanel">
                  <Card className="card">
                    <div className="card-body">
                      <div className="col-sm-12">
                        <TitleBox>
                          Liste d'amis
                        </TitleBox>
                      </div>
                      <FriendList friends={character.friends} />
                    </div>
                  </Card>
                </div>

                {/* Items */}
                <div className={`tab-pane${activatedTab === "itemsTab" ? " active" : ""}`} id="itemsTab" role="tabpanel">
                  <Card className="card">
                    <div className="card-body">
                      <div className="col-sm-12">
                        <TitleBox>
                          Listes des objets<br />
                          <SubTitle>({remainingItemSpaceNb === 0 ? "Aucune place restante" : (remainingItemSpaceNb === 1 ? "1 place restante" : remainingItemSpaceNb + " places restantes")})</SubTitle>
                        </TitleBox>
                      </div>
                      <ItemList items={character.items} displayActions={true} onDeleteItem={this.onDeleteItem} onChangeEquippedItem={this.onChangeEquippedItem} />
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
export default Character;
