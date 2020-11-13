import React, { Component } from 'react';
import styled from "@emotion/styled";
import _ from "lodash";
import { character } from "../../../utils/character";
import { boss } from "../../../utils/boss";
import ProgressBar from "../../../Components/Character/ProgressBar";
import Title from "../../../Components/Title/Title";
import ItemList from "../../../Components/Item/ItemList";

const Container = styled.div`
  background-image: url("https://cdna.artstation.com/p/assets/images/images/022/181/600/large/yarki-studio-artstation-3.jpg");
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

const LevelBox = styled.span`
  font-size: 16px;
  color: #fff;
`

const Box = styled.div`
  min-height: 550px;
`

const SubTitle = styled.span`
  font-size: 16px;
  color: #fff;
`

const Card = styled.div`
  background-color: rgba(0,0,0,0.7) !important;
`

const Character = styled.div`
  display: flex;
  float: left;
  width: 100%;
  padding-top: 10px;
`

const Name = styled.div`
  text-align: left;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: #fff;
`

class Reward extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character,
      boss: boss[0],
    };
  }

  render() {
    const { character, boss } = this.state;

    return (
      <Container className="container-fluid">
        <div className="container">
          <div className="row h-100 mt-5">

            <Box className="col-sm-12 my-auto">
              <Card className="card">
                <div className="card-header">
                  <Title>
                    Victoire <SubTitle>(22 tours)</SubTitle><br />
                    <span className="text-danger">BouBou le petit Bhou</span><LevelBox> - Niv {character.level}</LevelBox>
                  </Title>
                </div>
                <div className="card-body">
                  <div className="col-sm-12">
                    {_.map(character.friends, (friend, index) => (
                      <Character key={index} className="col-sm-12">
                        <Name className="col-sm-4 mt-2">
                          {friend.academy && <><Avatar src={process.env.PUBLIC_URL+"/img/academies/"+friend.academy.name+".png"} alt={friend.name} />&nbsp;</>}
                          (Niv {friend.level}) {friend.name}
                        </Name>
                        <div className="col-sm-2 mt-3">
                          Expérience
                          <ProgressBar actual={350} max={1200} color="#DC3545" transparentColor="#e09a9a" />
                        </div>
                        <div className="col-sm-1 mt-3">
                          <i className="far fa-money-bill-alt" /><br/>
                          1250
                        </div>
                        <div className="col-sm-5">
                          <ItemList items={boss.items} displayActions={false} minusPadding={true} />
                        </div>
                      </Character>
                    ))}
                  </div>
                </div>
              </Card>
            </Box>

          </div>
        </div>
      </Container>
    );
  }
}
export default Reward;
