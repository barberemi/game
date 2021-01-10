import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 325px;
  margin: 0 auto;
  padding-top: 20px;
`

const Card = styled.div`
  background: white;
  margin: auto;
  border-radius: 19px;
  position: relative;
  text-align: center;
  box-shadow: -1px 15px 30px -12px black;
  z-index: 10;
`

const ImageCard = styled.div`
  position: relative;
  height: 230px;
  margin-bottom: 35px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`

const WarriorBg = styled(ImageCard)`
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian-bg.jpg');
  img {
    width: 400px;
    position: absolute;
    top: -65px;
    left: -70px;
  }
`

const HunterBg = styled(ImageCard)`
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/archer-bg.jpg');
  img {
    width: 400px;
    position: absolute;
    top: -34px;
    left: -37px;
  }
`

const ProtectorBg = styled(ImageCard)`
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/giant-bg.jpg');
  img {
    width: 340px;
    position: absolute;
    top: -30px;
    left: -25px;
  }
`

const PriestBg = styled(ImageCard)`
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/goblin-bg.jpg');
  img {
    width: 370px;
    position: absolute;
    top: -21px;
    left: -37px;
  }
`

const MagicianBg = styled(ImageCard)`
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/wizard-bg.jpg');
  img {
    width: 345px;
    position: absolute;
    top: -28px;
    left: -10px;
  }
`

const Level = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 3px;
`

const UnitName = styled.div`
  font-size: 26px;
  color: black;
  font-weight: 900;
  margin-bottom: 5px;
`

const UnitDescription = styled.div`
  padding: 20px;
  margin-bottom: 10px;
  color: #9e9e9e;
`

const UnitStats = styled.div`
  color: white;
  font-weight: 700;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;

  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: ' ';
    clear: both;
    height: 0;
  }

  ${(props) =>
    props.color &&
    css`
      background: ${props.color};
    `};
`

const OneThird = styled.div`
  width: 33%;
  float: left;
  padding: 20px 15px;

  ${(props) =>
    props.color &&
    css`
      border-right: 1px solid ${props.color};
    `};
`

const Stat = styled.div`
  position: relative;
  font-size: 24px;
`

const StatValue = styled.div`
  text-transform: uppercase;
  font-weight: 400;
  font-size: 12px;
`

const NoBorder = styled(OneThird)`
  border-right: none;

  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: ' ';
    clear: both;
    height: 0;
  }
`

//Colors :
// $barbarian: #EC9B3B;
// $archer: #EE5487;
// $giant: #F6901A;
// $goblin: #82BB30;
// $wizard: #4FACFF;

class SkillBox extends Component {
  render() {
    return (
      <Wrapper className="col-sm-12">
        <Card>
          <WarriorBg>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian.png"
              alt="barbarian"
            />
          </WarriorBg>
          <Level style={{ color: '#EC9B3B' }}>Level 4</Level>
          <UnitName>The Barbarian</UnitName>
          <UnitDescription>
            The Barbarian is a kilt-clad Scottish warrior with an angry,
            battle-ready expression, hungry for destruction. He has Killer
            yellow horseshoe mustache.
          </UnitDescription>

          <UnitStats color={'#EC9B3B'}>
            <OneThird color={'#BD7C2F'}>
              <Stat>20</Stat>
              <StatValue>Training</StatValue>
            </OneThird>

            <OneThird color={'#BD7C2F'}>
              <Stat>16</Stat>
              <StatValue>Vitesse</StatValue>
            </OneThird>

            <NoBorder>
              <Stat>150</Stat>
              <StatValue>Coût</StatValue>
            </NoBorder>
          </UnitStats>
        </Card>
      </Wrapper>
    )
  }
}

export default SkillBox
