import React, { Component } from 'react';
import styled from "@emotion/styled";
import _ from "lodash";
import ReactTooltip from "react-tooltip";
import { academies } from "../../../utils/academies";

const Container = styled.div`
  background-image: url("https://images.alphacoders.com/883/883163.jpg");
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

const Title = styled.div`
  padding-top: 20px;
  font-size: 26px;
`

const TitleBox = styled.div`
  font-size: 22px;
  color: #FFC312;
  -webkit-filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  -ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=1, OffY=1, Color='#444')";
`

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Academy = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  background-color: #FFC312;
  
  &:hover {
    cursor: pointer;
  }
`

const CenterBox = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RightBox = styled.div`
`

const Card = styled.div`
  background-color: rgba(0,0,0,0.7) !important;
`

const Image = styled.img`
  width: 200px;
  margin-top: 100px;
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
  border: 2px solid #fff;
  margin-right: 10px;
  
  &:hover {
    cursor: pointer;
  }
`

const NameInput = styled.input`
  margin-top: 50px;
`

class Creation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      academies,
      academySelected: null,
      isAnimated: null,
    };
  }

  selectAcademy(academy) {
    this.setState({
      academySelected: academy,
      isAnimated: true,
    })
  }

  render() {
    const { academySelected, isAnimated } = this.state;

    return (
      <Container className="container-fluid">
        <div className="container">
          <div className="row">

            <Title className="col-sm-12">
              Veuillez sélectionner une académie.
            </Title>

            <LeftBox className="col-sm-3 h-100 my-auto">
              {_.map(academies, academy => (
                <>
                  <Academy
                    src={process.env.PUBLIC_URL+"/img/academies/"+academy.image}
                    key={academy.name}
                    onClick={() => this.selectAcademy(academy)}
                  />
                  {academy.name}
                </>
              ))}
            </LeftBox>

            <CenterBox className="col-sm-6 my-auto">
              {academySelected && (
                <>
                  <Image
                    src={process.env.PUBLIC_URL+"/img/academies/"+academySelected.image}
                    alt={academySelected.name}
                    onAnimationEnd={() => this.setState({isAnimated: false})}
                    className={isAnimated ? "animated fadeInDown" : null}
                    data-tip="Raoult Raoult !!"
                  />
                  <ReactTooltip />
                  <NameInput type="text" placeholder="Didier Raoult" />
                </>
              )}
            </CenterBox>

            <RightBox className="col-sm-3 h-100 my-auto">
              {academySelected && (
                <Card className="card">
                  <div className="card-header">
                    <TitleBox>{academySelected.name}</TitleBox>
                    {_.map(academySelected.roles, role => (
                      <div className={academySelected.className}>{role}</div>
                    ))}
                  </div>
                  <div className="card-body">
                    <i>{academySelected.description}</i>
                  </div>
                  <div className="card-footer">
                    <TitleBox>Compétences</TitleBox>
                    <div>Ombre / Lumière</div>
                    {_.map(academySelected.skills, skill => (
                      <>
                        <Skill
                          src="https://wiki-fr.guildwars2.com/images/8/88/Dagues_enchant%C3%A9es.png"
                          alt={skill.name}
                          data-tip={skill.description}
                        />
                        <ReactTooltip />
                      </>
                    ))}
                  </div>
                </Card>
              )}
            </RightBox>

          </div>
        </div>
      </Container>
    );
  }
}
export default Creation;
