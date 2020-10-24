import React, { Component } from 'react';
import styled from "@emotion/styled";
import _ from "lodash";
import CardMap from "../../../Components/Map/CardMap";

const Container = styled.div`
  background-image: url("https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1568080216644-6QDT21SZICO3TCYGO2GE/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/PiratesOutlaws-Gallery54.jpg?format=2500w");
  background-size: 100% 100%;
`

const RowOverflow = styled.div`
  overflow-x: auto; 
  white-space: nowrap;
  flex-wrap: nowrap;
`

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [
        {
          name: "L'ile ô trésoR",
          level_min: 1,
          img_url: "https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1561633356762-4SM41FGVPRSU22E0YDD3/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/1920x1080_6.jpg",
        },
        {
          name: "La forêt épineuZ",
          level_min: 5,
          img_url: "https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1563177869793-AAMHWHMYW2UPHBIH9ACV/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/PiratesOutlaws-Arena6.jpg",
        },
        {
          name: "Le marché désertiK",
          level_min: 15,
          img_url: "https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1563177865220-L8GF4C6MLBSI8EGN153Z/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/PiratesOutlaws-Arena5.jpg",
        },
        {
          name: "Le bateau naufragÉ",
          level_min: 25,
          img_url: "https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1563177872545-5TL9NIU2NZ2P2DKB91YN/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/PiratesOutlaws-Arena7.jpg",
        },
        {
          name: "Las tentaculeS",
          level_min: 35,
          img_url: "https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1586838637024-ZX7JWSH8KJYZAJA4P960/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/Pirates-Outlaws1.jpg?format=2500w",
        },
      ],
      user: {
        level: 10,
      }
    }
  }

  render() {
    return (
      <Container className="container-fluid">
        <div className="container">
          <RowOverflow className="row">
            {_.map(this.state.cards, card => (
              <CardMap key={card.name} card={card} user={this.state.user} />
            ))}
          </RowOverflow>
        </div>
      </Container>
    );
  }
}
export default Map;
