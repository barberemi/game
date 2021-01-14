import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ProgressBar from '../Character/ProgressBar'

const NavBarGlobale = styled.nav`
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.4) !important;
  padding-top: 5px;
  padding-bottom: 5px;
  position: fixed;
  right: 0;
  width: 300px;
  z-index: 20;
`

const DisplayFlex = styled.div`
  display: flex;
  flex-direction: row;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #000;
  background-color: #fff;
`

const Bar = styled.div`
  padding-top: 5px;
  text-align: center;
`

const ExperienceNavBar = ({ user }) => (
  <NavBarGlobale role="navigation">
    <DisplayFlex className="col-sm-12 text-white justify-content-end">
      {user && (
        <>
          <Bar className="col-sm-10">
            <div>Niv {user.level}</div>
            <ProgressBar
              actual={user.experience - user.xpToActualLevel}
              max={user.xpToNextLevel - user.xpToActualLevel}
              color="#FFC312"
              transparentColor="#7F8286"
            />
          </Bar>
          <Avatar
            src={
              process.env.PUBLIC_URL +
              '/img/academies/' +
              user.academy.name +
              '.png'
            }
            alt="Avatar"
            className="avatar"
          />
        </>
      )}
    </DisplayFlex>
  </NavBarGlobale>
)

ExperienceNavBar.propTypes = {
  user: PropTypes.shape({})
}

export default ExperienceNavBar
