import React, { Component } from 'react';
import styled from "@emotion/styled";
import _ from "lodash";
import CardChoice from "../../../Components/Exploration/CardChoice";

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
  overflow-y: scroll;
`

const SubContainer = styled.div`
  background-color: rgba(0,0,0,0.5) !important;
  margin-top: 50px;
`

const TextDescription = styled.div`
  font-size: 24px;
  text-shadow: 1px 1px 2px black;
`

class Choice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [
        {
          img_url: "https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1561633356762-4SM41FGVPRSU22E0YDD3/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/1920x1080_6.jpg",
          text_btn: "La déterrer",
        },
        {
          img_url: "https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1563177869793-AAMHWHMYW2UPHBIH9ACV/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/PiratesOutlaws-Arena6.jpg",
          text_btn: "Partir",
        },
      ],
    }
  }

  render() {
    return (
      <Container className="container-fluid align-middle">
        <SubContainer className="container">
          <div className="row align-items-center">
            <TextDescription className="col-sm-12 mt-5">
              Vous trouvez une épée plantée dans le sol, mais celle ci n'a pas l'air commode. Que faites-vous?
            </TextDescription>
          </div>
          <div className="row align-items-center">
            <div className="col-sm-3 offset-sm-1 mt-5 mb-5">
              <img src={process.env.PUBLIC_URL+"/img/rubillax.png"} alt="rubillax" height="250px" />
            </div>
            {_.map(this.state.cards, (card, index) => (
              <CardChoice key={index} card={card} className={index === 0 ? "offset-sm-2" : ""} />
              ))}
          </div>
        </SubContainer>
      </Container>
    );
  }
}
export default Choice;
