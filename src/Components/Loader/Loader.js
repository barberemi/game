import React, { Component } from 'react'
import styled from '@emotion/styled'
import './styles.scss' // dont remove, used to svg animations etc

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  height: 100%;
`

const Main = styled.div`
  position: relative;
`

const ShadowWrapper = styled.div`
  position: absolute;
  top: 110px;
  width: 100%;
`

const Shadow = styled.div`
  margin: 0 auto;
  width: 110px;
  height: 30px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  z-index: 0;
  animation: zoomIn 0.5s cubic-bezier(0.47, 0, 0.75, 0.72) infinite alternate;
`

const Dragon = styled.div`
  width: 200px;
  height: 140px;
  transform-origin: 50% 80%;
  animation: zoomIn 0.5s cubic-bezier(0.47, 0, 0.75, 0.72) infinite alternate;
`

const Body = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 180px;
  height: 128px;
  background: url(${process.env.PUBLIC_URL + '/img/dragon/body.png'}) no-repeat
    center center;
  background-size: contain;
  z-index: 10;
`

const HornLeft = styled.div`
  position: absolute;
  top: -17px;
  left: 32px;
  width: 31px;
  height: 31px;
  background: url(${process.env.PUBLIC_URL + '/img/dragon/horn-left.png'})
    no-repeat;
  background-size: contain;
  z-index: 9;
  transform-origin: 150% 200%;
  transform: rotate(-5deg);
  animation: swingRight 0.5s cubic-bezier(0.47, 0, 0.75, 0.72) infinite
    alternate;
`

const HornRight = styled.div`
  position: absolute;
  top: -16px;
  left: 110px;
  width: 34px;
  height: 31px;
  background: url(${process.env.PUBLIC_URL + '/img/dragon/horn-right.png'})
    no-repeat;
  background-size: contain;
  z-index: 9;
  transform-origin: -50% 200%;
  transform: rotate(5deg);
  animation: swingLeft 0.5s cubic-bezier(0.47, 0, 0.75, 0.72) infinite alternate;
`

const Eye = styled.div`
  position: absolute;
  top: 39px;
  width: 11px;
  height: 11px;
  background: url(${process.env.PUBLIC_URL + '/img/dragon/eye.png'}) no-repeat;
  background-size: contain;
  z-index: 12;
`

const EyeLeft = styled(Eye)`
  left: 49px;
`

const EyeRight = styled(Eye)`
  left: 118px;
  transform-origin: 50% 50%;
  transform: rotate(180deg);
`

const Blush = styled.div`
  position: absolute;
  top: 46px;
  width: 15px;
  height: 9px;
  background: url(${process.env.PUBLIC_URL + '/img/dragon/blush.png'}) no-repeat;
  background-size: 100% 100%;
  z-index: 11;
  animation: blush 0.5s ease infinite alternate;
`

const BlushLeft = styled(Blush)`
  left: 43px;
`

const BlushRight = styled(Blush)`
  left: 120px;
`

const Mouth = styled.div`
  position: absolute;
  top: 52px;
  left: 49px;
  width: 78px;
  height: 56px;
  background: url(${process.env.PUBLIC_URL + '/img/dragon/mouth.png'}) no-repeat;
  background-size: 100%;
  z-index: 11;
  animation: openMouth 1s ease infinite;
`

const Tail = styled.div`
  position: absolute;
  top: 67px;
  left: 139px;
  width: 40px;
  height: 38px;
  background: url(${process.env.PUBLIC_URL + '/img/dragon/tail-sting.png'})
    no-repeat;
  background-size: contain;
  z-index: 9;
  transform-origin: 0 100%;
  animation: tailUp 0.5s cubic-bezier(0.47, 0, 0.75, 0.72) infinite alternate;
`

const FireWrapper = styled.div`
  position: absolute;
  width: 40px;
  top: 60px;
  left: 88px;
  transform: translate(-50%, -50%);
  transform-origin: 50% 100%;
  animation: fireUp 1s ease-in infinite;
`

const Fire = styled.div`
  padding-bottom: 135%;
  width: 100%;
  height: 100%;
  background: url(${process.env.PUBLIC_URL + '/img/dragon/fire.png'}) no-repeat;
  background-size: contain;
  animation: fire 1s ease-out infinite;
`

const Progress = styled.div`
  margin-top: 30px;
  width: 100%;
`

const Outer = styled.div`
  width: 100%;
  height: 14px;
  border-radius: 7px;
  background: rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const Inner = styled.div`
  width: 0;
  height: 100%;
  background: #ffcd33;
  animation: loading 2s linear infinite;
`

const Text = styled.div`
  padding-top: 5px;
`

class Loader extends Component {
  render() {
    return (
      <Container className="col-sm-12">
        <Main>
          <ShadowWrapper>
            <Shadow />
          </ShadowWrapper>
          <Dragon>
            <Body />
            <HornLeft />
            <HornRight />
            <EyeLeft />
            <EyeRight />
            <BlushLeft />
            <BlushRight />
            <Mouth />
            <Tail />
          </Dragon>
          <FireWrapper>
            <Fire />
          </FireWrapper>
          <Progress>
            <Outer>
              <Inner />
            </Outer>
            <Text>Chargement...</Text>
          </Progress>
        </Main>
      </Container>
    )
  }
}

export default Loader
