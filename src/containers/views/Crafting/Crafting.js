import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import _ from 'lodash'
import Title from '../../../Components/Title/Title'
import ItemList from '../../../Components/Item/ItemList'
import ItemCrafting from '../../../Components/Item/ItemCrafting'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loader from '../../../Components/Loader/Loader'
import Tutorial from '../../../Components/Tutorial/Tutorial'

const Container = styled.div`
  background-image: url(${process.env.PUBLIC_URL +
  '/img/backgrounds/crafting-min.jpg'});
  background-size: 100% 100%;
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  height: 100%;
  text-align: center;
  color: white;
  min-height: 250px;
  overflow-y: scroll;
`

const SubContainer = styled.div`
  margin-left: 150px;

  @media (max-width: 768px) {
    margin-left: inherit;
  }
`

const RightBox = styled.div`
  min-height: 550px;
`

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.8) !important;
`

class Crafting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: undefined,
      loading: true,
      character: undefined,
      items: undefined,
      selectedItem: undefined,
      stepsEnabled: false,
      stepName: 'crafting'
    }
  }

  componentDidMount() {
    const getMe = axios.get(process.env.REACT_APP_API_URL + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-token')}`
      }
    })
    const getItems = axios.get(
      process.env.REACT_APP_API_URL + '/items?order_by=level',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      }
    )

    axios
      .all([getMe, getItems])
      .then((responses) => {
        this.setState({
          loading: false,
          character: responses[0].data,
          items: _.filter(responses[1].data.items, (item) => {
            return !_.isEmpty(item.itemsToCraft)
          })
        })
        if (responses[0].data.isNoob) {
          setTimeout(() => {
            this.setState({
              stepsEnabled: true
            })
          }, 500)
        }
      })
      .catch((errors) => {
        this.setState({
          loading: false,
          error: errors
        })
      })
  }

  handleForgeItem = (item) => {
    // Remove from character items
    let characterItems = [...this.state.character.items]
    let error = false

    _.map(item.item.itemsToCraft, (craft) => {
      let count = craft.amount
      for (let i = 0; i < count; i++) {
        const index = _.findLastIndex(characterItems, {
          item: { id: craft.itemNeededToCraft.id }
        })

        if (index >= 0) {
          _.pullAt(characterItems, [index])
        } else {
          error = true
        }
      }
    })

    if (!error) {
      item.id = null
      characterItems.push(item)

      let items = []
      for (let i = 0; i < characterItems.length; i++) {
        const id = characterItems[i].id

        items.push({
          ...(id && { id: id }),
          item: {
            id: characterItems[i].item.id
          },
          user: {
            id: this.state.character.id
          }
        })
      }
      axios
        .put(
          process.env.REACT_APP_API_URL + '/users/' + this.state.character.id,
          { items },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('auth-token')}`
            }
          }
        )
        .then((response) => {
          if (response.data) {
            this.setState({
              character: response.data
            })

            toast.success(
              <span style={{ fontSize: '14px' }}>
                Création de l’objet réussie !
              </span>,
              {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              }
            )
          }
        })
        .catch((error) => {
          this.setState({
            error: error.response.data
          })
        })
    }
  }

  render() {
    const { error, loading, items, character, selectedItem } = this.state

    return (
      <Container className="container-fluid">
        {loading && <Loader />}
        <div className="container">
          {error && (
            <span className="text-danger">
              <b>Erreur :</b> {error.message}
            </span>
          )}
          {character && (
            <SubContainer className="row h-100 mt-5 mb-5">
              <Tutorial
                stepsEnabled={this.state.stepsEnabled}
                stepName={this.state.stepName}
                onExit={() => this.setState({ stepsEnabled: false })}
              />

              <RightBox className="col-sm-12 my-auto">
                <div className="tab-content">
                  <div id="itemsCraftingTab" role="tabpanel">
                    <Card className="card">
                      <div className="card-body">
                        <div className="col-sm-12">
                          <Title>Liste d’objets pouvant être créés</Title>
                          <div>Séléctionner l’objet à confectionner.</div>
                        </div>
                        {items && (
                          <div id="tutorialCraftingListing">
                            <ItemList
                              items={items}
                              displayActions={false}
                              trueItem={true}
                              onClick={(item) =>
                                this.setState({ selectedItem: item })
                              }
                              userLevel={character.level}
                            />
                            {selectedItem && (
                              <div>
                                <div className="col-sm-12">
                                  <Title>Forger l’objet</Title>
                                  <ItemCrafting
                                    item={{ item: selectedItem }}
                                    characterItems={character.items}
                                    onClick={this.handleForgeItem}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              </RightBox>
            </SubContainer>
          )}
        </div>
      </Container>
    )
  }
}

Crafting.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idBoss: PropTypes.string
    }).isRequired
  }).isRequired
}

export default Crafting
