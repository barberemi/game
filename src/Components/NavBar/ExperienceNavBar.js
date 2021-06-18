import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ProgressBar from '../Character/ProgressBar'
import AcademyAvatar from '../Character/AcademyAvatar'

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
              color="#F27625"
              transparentColor="#7F8286"
            />
          </Bar>
          <AcademyAvatar name={user.academy.name} flip={true} />
        </>
      )}
    </DisplayFlex>
  </NavBarGlobale>
)

ExperienceNavBar.propTypes = {
  user: PropTypes.shape({})
}

export default ExperienceNavBar
