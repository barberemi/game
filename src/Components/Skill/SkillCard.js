import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import _ from 'lodash'
import { getLabelTypeSkill, getIconSkillType } from '../../utils/skillHelper'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 325px;
  height: 415px;
  margin: auto;
  overflow-y: auto;
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
  height: 150px;
  margin-bottom: 20px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`

const WarriorBg = styled(ImageCard)`
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian-bg.jpg');
  // img {
  //   width: 400px;
  //   position: absolute;
  //   top: -65px;
  //   left: -70px;
  // }
`

// const HunterBg = styled(ImageCard)`
//   background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/archer-bg.jpg');
//   img {
//     width: 400px;
//     position: absolute;
//     top: -34px;
//     left: -37px;
//   }
// `
//
// const ProtectorBg = styled(ImageCard)`
//   background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/giant-bg.jpg');
//   img {
//     width: 340px;
//     position: absolute;
//     top: -30px;
//     left: -25px;
//   }
// `
//
// const PriestBg = styled(ImageCard)`
//   background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/goblin-bg.jpg');
//   img {
//     width: 370px;
//     position: absolute;
//     top: -21px;
//     left: -37px;
//   }
// `
//
// const MagicianBg = styled(ImageCard)`
//   background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/wizard-bg.jpg');
//   img {
//     width: 345px;
//     position: absolute;
//     top: -28px;
//     left: -10px;
//   }
// `

const Level = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 3px;

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `};
`

const UnitName = styled.div`
  font-size: 26px;
  color: black;
  font-weight: 900;
`

const UnitDescription = styled.div`
  padding: 20px;
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
  border-right: 1px solid #fff;
`

const Indice = styled.div`
  position: absolute;
  bottom: 4px;
  font-size: 45%;
  margin-left: 2px;
  right: 0;
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

class SkillCard extends Component {
  render() {
    const { skill } = this.props

    return (
      <Wrapper className={`col-sm-12 animated pulse ${this.props.className}`}>
        <Card>
          <WarriorBg>
            <img
              src={process.env.PUBLIC_URL + '/img/skills/' + skill.image}
              alt="skill"
              width="150px"
            />
          </WarriorBg>
          <Level color={skill.color}>
            {getIconSkillType(skill.effect)} {getLabelTypeSkill(skill.effect)}
          </Level>
          <UnitName>{skill.name}</UnitName>
          <UnitDescription
            dangerouslySetInnerHTML={{
              __html: _.replace(skill.description, '#MONTANT#', skill.amount)
            }}
          />

          <UnitStats color={skill.color}>
            <OneThird>
              <Stat>{skill.amount ? skill.amount : 0}</Stat>
              <StatValue>Montant</StatValue>
            </OneThird>

            <OneThird>
              <Stat>
                {skill.cooldown ? skill.cooldown : 0}{' '}
                <Indice>{skill.cooldown > 0 ? 'tours' : 'tour'}</Indice>
              </Stat>
              <StatValue>Récup</StatValue>
            </OneThird>

            <NoBorder>
              <Stat>
                {skill.duration ? skill.duration : 0}{' '}
                <Indice>{skill.cooldown > 0 ? 'tours' : 'tour'}</Indice>
              </Stat>
              <StatValue>Durée</StatValue>
            </NoBorder>
          </UnitStats>
        </Card>
      </Wrapper>
    )
  }
}

export default SkillCard
