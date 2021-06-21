import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Champ = styled.div`
  margin: 10px 2px;
  width: 150px;
  height: 175px;
  position: relative;
  cursor: pointer;

  webkit-clip-path: url(#champ-clip-path-1);
  clip-path: url(#champ-clip-path-1);

  -webkit-transform: translateX(0);
  transform: translateX(0);
  -webkit-transition: -webkit-transform 1.5s cubic-bezier(0.65, 0, 0.35, 1);
  transition: -webkit-transform 1.5s cubic-bezier(0.65, 0, 0.35, 1);
  transition: transform 1.5s cubic-bezier(0.65, 0, 0.35, 1);
  transition: transform 1.5s cubic-bezier(0.65, 0, 0.35, 1),
    -webkit-transform 1.5s cubic-bezier(0.65, 0, 0.35, 1);

  &:hover {
    .meta {
      -webkit-transform: translateY(22px) !important;
      transform: translateY(22px) !important;
      -webkit-transition-delay: 0s;
      transition-delay: 0s;
    }

    .svg-inline--fa {
      opacity: 1;
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
`

const ImageAcademy = styled.img`
  width: 100%;
  position: absolute;
  bottom: 10px;
  left: 0;
  -webkit-transition: -webkit-transform 1.5s cubic-bezier(0.65, 0, 0.35, 1);
  transition: -webkit-transform 1.5s cubic-bezier(0.65, 0, 0.35, 1);
  transition: transform 1.5s cubic-bezier(0.65, 0, 0.35, 1);
  transition: transform 1.5s cubic-bezier(0.65, 0, 0.35, 1),
    -webkit-transform 1.5s cubic-bezier(0.65, 0, 0.35, 1);

  &:hover {
    webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }
`

const Meta = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  padding: 0.5rem;
  
  -webkit-transform: translateY(30px);
  transform: translateY(30px);
  -webkit-transition: -webkit-transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  transition: -webkit-transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  -webkit-transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  -webkit-transition-delay: 1s;
  transition-delay: 1s;
  
  &:hover {
    -webkit-transform: translateY(22px)!important;
    transform: translateY(22px)!important;
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
  }
`

const SvgDoubleRight = styled.svg`
  opacity: 0;
  -webkit-transform: translateX(-80px);
  transform: translateX(-80px);
  -webkit-transition: opacity 0.5s,
    -webkit-transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  transition: opacity 0.5s,
    -webkit-transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.5s;
  transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.5s,
    -webkit-transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  font-size: 12px;
  color: #fff;
`

class JobCard extends React.Component {
  render() {
    return (
      <Champ className="champ" onClick={this.props.onClick}>
        <div
          style={{
            backgroundColor:
              this.props.selectedId === this.props.job.id ? '#f26725' : 'grey',
            height: '100%'
          }}
        >
          <ImageAcademy
            src={
              process.env.PUBLIC_URL +
              '/img/jobs/' +
              this.props.job.name +
              '.svg'
            }
            alt={this.props.job.name}
            className="img-fluid"
            style={{
              backgroundColor:
                this.props.selectedId === this.props.job.id ? '#f26725' : 'grey'
            }}
          />
          <Meta className="meta">
            <div className="name">
              {this.props.job.label}
              {this.props.selectedId === this.props.job.id && (
                <span className="text-warning">
                  &nbsp;
                  <i className="far fa-check-circle" />
                </span>
              )}
            </div>
            <SvgDoubleRight
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angle-double-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="svg-inline--fa fa-angle-double-right fa-w-5 fa-fw"
            >
              <path
                fill="currentColor"
                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"
                className=""
              />
            </SvgDoubleRight>
          </Meta>
        </div>
      </Champ>
    )
  }
}

JobCard.propTypes = {
  job: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  }),
  selectedId: PropTypes.number,
  onClick: PropTypes.func
}

export default JobCard
