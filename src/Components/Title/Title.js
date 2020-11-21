import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const TitleBox = styled.div`
  font-size: 22px;
  color: #ffc312;
  -webkit-filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  -ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=1, OffY=1, Color='#444')";
`

const Title = ({ children }) => <TitleBox>{children}</TitleBox>

Title.propTypes = {
  children: PropTypes.node.isRequired
}

export default Title
