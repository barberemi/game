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
`

const Title = styled.div`
  padding-top: 20px;
  font-size: 2vw;
`

const LeftBox = styled.div`
  background-color: rgba(0,0,0,0.5) !important;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CenterBox = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RightBox = styled.div`
  background-color: rgba(0,0,0,0.5) !important;
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
                <button
                  key={academy.name}
                  onClick={() => this.selectAcademy(academy)}
                >
                  {academy.name}
                </button>
              ))}
            </LeftBox>

            <CenterBox className="col-sm-6 mt-auto mb-auto">
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
                <div>
                  {academySelected.name}
                </div>
              )}
            </RightBox>

          </div>
        </div>
      </Container>
    );
  }
}
export default Creation;
