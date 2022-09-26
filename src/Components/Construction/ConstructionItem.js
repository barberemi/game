import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import ConstructionProgressBar from './ConstructionProgressBar'
import ReactTooltip from 'react-tooltip'
import actionSvg from './../Characteristic/action.svg'
import defenseSvg from './../Characteristic/defense.svg'

const Label = styled.span`
  cursor: pointer;

  ${(props) =>
    props.displayLabel &&
    css`
      color: #f26725;
    `};

  &:hover {
    color: #f26725;
  }
`

const Button = styled.button`
  height: 30px;
`

const TD = styled.td`
  text-align: center;
`

class ConstructionItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      display: false
    }
  }
  getSubMenu = () => (
    <>
      <i className="fas fa-ellipsis-v" />
      <i className="fas fa-ellipsis-h" />{' '}
    </>
  )

  getConstruction = () => {
    const { constructions, building } = this.props

    return _.filter(constructions, {
      building: { id: building.id }
    })[0]
  }

  render() {
    const { user, constructions, building, count } = this.props
    const { display } = this.state

    return (
      <>
        <tr>
          <td>
            <span style={{ paddingLeft: count * 15 + 'px' }}>
              {count > 0 ? this.getSubMenu() : ''}
              <Label
                onClick={() => this.setState({ display: !display })}
                displayLabel={display}
              >
                {building.label}
              </Label>
            </span>
            {display && (
              <>
                <br />
                {building.description}
              </>
            )}
          </td>
          <TD>
            <ConstructionProgressBar
              remaining={
                this.getConstruction().remainingActions +
                this.getConstruction().remainingMaterials
              }
              max={building.neededActions + building.neededMaterials}
            />
          </TD>
          <TD>
            +{building.amount}{' '}
            {building.type === 'defense' && (
              <img
                src={defenseSvg}
                alt="defense"
                width="30px"
                data-tip="Point de défense"
              />
            )}
            {building.type === 'action' && (
              <img
                src={actionSvg}
                alt="point action"
                width="30px"
                data-tip="Point d'action"
              />
            )}
            {building.type === 'user_bag' && (
              <img
                src={process.env.PUBLIC_URL + '/img/bag.gif'}
                alt="sac"
                width="25px"
                data-tip="Inventaire"
              />
            )}
          </TD>
          <TD>
            {this.getConstruction().remainingActions === 0 ? (
              <span className="text-success">
                <i className="far fa-check-circle" />
              </span>
            ) : (
              <>
                {this.getConstruction().remainingActions}{' '}
                <img
                  src={actionSvg}
                  alt="point action"
                  width="30px"
                  data-tip="Point d'action"
                />{' '}
                {(!building.hasParentId ||
                  (building.hasParentId &&
                    _.filter(constructions, {
                      building: { id: building.hasParentId }
                    })[0].status === 'done')) &&
                  this.getConstruction().remainingActions > 0 &&
                  user.remainingActions > 0 && (
                    <Button
                      type="button"
                      className="btn btn-sm btn-outline-success"
                      data-tip="Donner 1 point d’action"
                      onClick={() =>
                        this.props.giveAction(this.getConstruction())
                      }
                    >
                      <i className="fas fa-gavel" />
                    </Button>
                  )}
              </>
            )}
          </TD>
          <TD>
            {this.getConstruction().remainingMaterials === 0 ? (
              <span className="text-success">
                <i className="far fa-check-circle" />
              </span>
            ) : (
              <>
                {this.getConstruction().remainingMaterials}{' '}
                <img
                  src={process.env.PUBLIC_URL + '/img/items/craft/wood.png'}
                  width="30px"
                  alt="wood"
                />{' '}
                {(!building.hasParentId ||
                  (building.hasParentId &&
                    _.filter(constructions, {
                      building: { id: building.hasParentId }
                    })[0].status === 'done')) &&
                  this.getConstruction().remainingMaterials > 0 &&
                  _.filter(user.items, {
                    item: { name: 'Bois' }
                  })[0] && (
                    <Button
                      type="button"
                      className="btn btn-sm btn-outline-success"
                      data-tip="Donner 1 de bois"
                      onClick={() =>
                        this.props.giveMaterial(this.getConstruction())
                      }
                    >
                      <i className="fas fa-gavel" />
                    </Button>
                  )}
              </>
            )}
          </TD>
        </tr>
        {_.map(building.children, (child, index) => {
          return (
            <ConstructionItem
              key={index}
              user={user}
              constructions={constructions}
              building={child}
              count={count + 1}
              giveAction={this.props.giveAction}
              giveMaterial={this.props.giveMaterial}
            />
          )
        })}
        <ReactTooltip />
      </>
    )
  }
}

ConstructionItem.propTypes = {
  user: PropTypes.shape({
    remainingActions: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  constructions: PropTypes.arrayOf(PropTypes.shape({})),
  building: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    amount: PropTypes.number,
    hasParentId: PropTypes.number,
    neededActions: PropTypes.number,
    neededMaterials: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  count: PropTypes.number,
  giveAction: PropTypes.func,
  giveMaterial: PropTypes.func
}

export default ConstructionItem
