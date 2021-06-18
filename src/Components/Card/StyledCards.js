import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import LightDarkButton from '../LightDark/LightDarkButton'
import _ from 'lodash'
import AcademyCard from './AcademyCard'
import axios from 'axios'
import Cookies from 'js-cookie'
import JobCard from './JobCard'

const Champs = styled.div`
  flex-wrap: nowrap;

  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1360px;
  -webkit-filter: drop-shadow(0 0 12px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(0 0 12px rgba(0, 0, 0, 0.3));
`

class StyledCards extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      error: undefined,
      objects: undefined,
      isDark: true
    }
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + '/' + this.props.type, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      })
      .then((response) => {
        this.setState({
          loading: false,
          objects: response.data.items
        })
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error
        })
      })
  }

  render() {
    return (
      <>
        {this.state.objects && (
          <>
            <svg className="clip-svg champ position-absolute">
              <clipPath
                id="champ-clip-path-1"
                clipPathUnits="objectBoundingBox"
                style={{ transform: 'scale(0.00455, 0.00185)' }}
              >
                <polygon points="217.07 1.19 205.89 0 200.75 0 197.75 2.68 193.44 2.5 183.87 1.75 171.49 0 165.68 2.5 164.55 0 124.61 1.56 87.1 0.81 66.28 0 60.28 2.12 62.34 0 25.39 0 26.7 3.62 13.99 0 1.39 1.93 0.45 19.64 1.82 35.4 1.82 48.49 2.31 57.47 4.01 67.4 0.45 70.8 0.45 77.34 5.47 75.16 5.21 79.51 0.45 83.65 0.45 99.65 1.82 117.59 0.45 138.19 3.83 156.85 2.31 176.5 1.58 201.22 0 221.58 3.53 248.74 0.45 253.1 0.45 275.4 2.56 289.71 0.45 297.46 0.45 315.89 7.42 311.04 0 321.46 4.26 326.8 6.14 335.06 0.45 350.8 0.45 365.83 3.29 374.8 0.45 376.01 0 400.5 2.07 405.34 4.99 458.19 0.45 509.38 0.45 526.11 1.95 537.32 17.52 540 34.77 540 37.96 536.01 46.96 537.88 49.02 540 52.4 536.75 59.9 538.44 72.84 540 85.41 540 99.85 537.32 122.17 538.06 132.3 540 140.36 537.69 137.74 540 169.81 539 167.56 536.94 175.43 540 197.38 538.06 217.44 536.57 220 522.47 218.57 510.58 217.63 494.32 220 488.9 217.82 410.95 218.57 387.39 218.76 349.45 214.63 354.49 217.88 346.55 217.07 336.92 219.95 328.29 217.07 306.08 217.44 267.38 214.5 268.71 217.44 264.95 220 238.41 218.03 221.29 214.82 207.94 218.94 203.82 218.76 116.53 220 112.97 220 31.66 217.44 24.55 220 21.38 220 11.93 217.07 1.19" />
              </clipPath>
            </svg>
            <Champs className="champs mt-5">
              {_.map(this.state.objects, (object) => (
                <Fragment key={object.id}>
                  {this.props.type === 'academies' && (
                    <AcademyCard
                      academy={object}
                      onClick={() => this.props.onClick(object)}
                    />
                  )}
                  {this.props.type === 'jobs' && (
                    <JobCard
                      job={object}
                      onClick={() => this.props.onClick(object)}
                      selectedId={this.props.selectedId}
                    />
                  )}
                </Fragment>
              ))}
            </Champs>
          </>
        )}
      </>
    )
  }
}

StyledCards.defaultProps = {
  selectedId: undefined
}

StyledCards.propTypes = {
  type: PropTypes.string,
  isDark: PropTypes.bool,
  onClick: PropTypes.func,
  selectedId: PropTypes.number
}

export default StyledCards
