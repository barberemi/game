import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import ReactTooltip from "react-tooltip";
import _ from "lodash";

const Container = styled.div`
 max-height: 70vh;
 min-height: 70vh;
 overflow-y: scroll;
`

const Friend = styled.div`
  display: flex;
  float: left;
  width: 100%;
  padding-top: 10px;
`

const Name = styled.div`
  text-align: left;
`

const Actions = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: #fff;
`

const IconAction = styled.span`
  padding-right: 10px;
  
  &:hover{
    cursor: pointer;
  }
`

class FriendList extends Component {
  render() {
    const { friends } = this.props;

    return (
      <Container>
        {_.map(friends, (friend, index) => (
          <Friend key={index} className="col-sm-12">
            <Name className="col-sm-9">
              {friend.academy && <><Avatar src={process.env.PUBLIC_URL+"/img/academies/"+friend.academy.name+".png"} alt={friend.name} />&nbsp;</>}
              (Niv {friend.level}) {friend.name}
            </Name>
            <Actions className="col-sm-3">
              <IconAction data-tip="Visualiser"><i className="far fa-address-card" /></IconAction>
              <IconAction data-tip="Grouper"><i className="fas fa-user-friends" /></IconAction>
              <IconAction data-tip="Discuter"><i className="far fa-comment" /></IconAction>
              <IconAction data-tip="Supprimer"><i className="fas fa-times text-danger" /></IconAction>
            </Actions>
            <ReactTooltip />
          </Friend>
        ))}
      </Container>
    );
  }
}

FriendList.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    level: PropTypes.number,
    image: PropTypes.string,
  })),
}

export default FriendList;
