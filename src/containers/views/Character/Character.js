import React, { Component } from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import ProgressBar from '../../../Components/Character/ProgressBar'
import CharacteristicItem from '../../../Components/Characteristic/CharacteristicItem'
import EquippedItems from '../../../Components/Item/EquippedItems'
import EquippedSkills from '../../../Components/Skill/EquippedSkills'
import FriendList from '../../../Components/Friend/FriendList'
import ItemList from '../../../Components/Item/ItemList'
import Title from '../../../Components/Title/Title'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import PropTypes from 'prop-types'
import Loader from '../../../Components/Loader/Loader'

const Container = styled.div`
  background-image: url('https://images2.alphacoders.com/717/717870.jpg');
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

const ListLink = styled.a`
  color: #fff;

  &:hover {
    color: #ffc312;
    text-decoration: none;
  }
`

const LevelBox = styled.span`
  font-size: 16px;
  color: #fff;
`

const RightBox = styled.div`
  min-height: 550px;
`

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.7) !important;
`

const Image = styled.img`
  width: 200px;
  margin-top: 10px;
  -webkit-filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(1px 9px 1px rgba(0, 0, 0, 0.3));
  -ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=1, OffY=1, Color='#444')";
`

const SubTitle = styled.span`
  font-size: 18px;
`

const FormAddUser = styled.div`
  display: flex;
  justify-content: flex-start;
`

const InputEmail = styled.input`
  width: 350px;
`

const AddUserButton = styled.button`
  border-radius: inherit;

  &:hover {
    transform: inherit;
  }
`

class Character extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: parseInt(this.props.match.params.idCharacter),
      error: undefined,
      loading: true,
      character: undefined,
      isMe: false,
      friendToAddOrRemove: '',
      activatedTab: 'generalTab'
    }

    this.handleAddDeleteUser = this.handleAddDeleteUser.bind(this)
  }

  componentDidMount() {
    const url = this.state.id
      ? process.env.REACT_APP_API_URL + '/users/' + this.state.id
      : process.env.REACT_APP_API_URL + '/users/me'

    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      })
      .then((response) => {
        if (response.data) {
          this.setState({
            loading: false,
            id: response.data.id,
            isMe:
              jwtDecode(Cookies.get('auth-token')).email ===
              response.data.email,
            character: response.data
          })
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.data
        })
      })
  }

  handleAddDeleteUser(type) {
    if (this.state.friendToAddOrRemove) {
      axios
        .put(
          process.env.REACT_APP_API_URL +
            '/users/' +
            this.state.id +
            '/friends',
          {
            type: type,
            email: this.state.friendToAddOrRemove
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('auth-token')}`
            }
          }
        )
        .then((response) => {
          toast[type === 'add' ? 'success' : 'error'](
            <span style={{ fontSize: '14px' }}>
              {type === 'add'
                ? 'Ajout du lien d’amitié avec '
                : 'Suppression du lien d’amité avec '}
              {this.state.friendToAddOrRemove} !
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
          this.setState({
            character: response.data,
            friendToAddOrRemove: ''
          })
        })
        .catch((error) => {
          this.setState({
            error: error.response.status
          })
        })
    }
  }

  onClickOnTab = (idTab) => {
    this.setState({
      activatedTab: idTab
    })
  }

  onCheckSkill = (skill) => {
    const exists = !!_.find(this.state.character.skills, {
      id: skill.id
    })

    // todo: rework this part: state should never been mutate
    if (exists) {
      _.remove(this.state.character.skills, {
        id: skill.id
      })
    } else {
      // eslint-disable-next-line
      this.state.character.skills = [...this.state.character.skills, skill]
    }

    this.setState({
      character: {
        ...this.state.character,
        skills: this.state.character.skills
      }
    })

    // Save datas
    let skills = []
    for (let i = 0; i < this.state.character.skills.length; i++) {
      const id = this.state.character.skills[i].id

      skills.push({
        ...(id && { id: id }),
        skill: {
          id: this.state.character.skills[i].id
        },
        user: {
          id: this.state.id
        }
      })
    }
    axios
      .put(
        process.env.REACT_APP_API_URL + '/users/' + this.state.id,
        { skills },
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
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.data
        })
      })
  }

  onDeleteItem = (item) => {
    _.remove(this.state.character.items, { id: item.id })

    this.setState({
      character: {
        ...this.state.character,
        items: this.state.character.items
      }
    })

    this.saveItems()

    toast.error(
      <span style={{ fontSize: '14px' }}>
        Suppression de l’objet réussie !
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

  onChangeEquippedItem = (newEquippedItem) => {
    const items = [...this.state.character.items]
    // Remove all isEquipped items with the same item.type
    if (!newEquippedItem.isEquipped) {
      _.map(
        _.filter(items, {
          isEquipped: true,
          item: { type: newEquippedItem.item.type }
        }),
        (item) => {
          item.isEquipped = false
        }
      )
    }

    // Equipped/Unequipped item now
    newEquippedItem.isEquipped = !newEquippedItem.isEquipped
    const indexItem = _.findIndex(items, { id: newEquippedItem.id })
    items[indexItem] = newEquippedItem

    this.setState({
      character: {
        ...this.state.character,
        items
      }
    })

    this.saveItems()
  }

  saveItems = () => {
    let items = []
    for (let i = 0; i < this.state.character.items.length; i++) {
      const id = this.state.character.items[i].id
      const isEquipped = this.state.character.items[i].isEquipped

      items.push({
        ...(id && { id: id }),
        isEquipped: isEquipped,
        item: {
          id: this.state.character.items[i].item.id
        },
        user: {
          id: this.state.id
        }
      })
    }
    axios
      .put(
        process.env.REACT_APP_API_URL + '/users/' + this.state.id,
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
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.data
        })
      })
  }

  render() {
    const { error, loading, character, activatedTab } = this.state

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
            <div className="row h-100 mt-5">
              <div className="col-sm-3 my-auto">
                <Card className="card">
                  <div className="card-header">
                    <Title>Menu</Title>
                    <div>
                      <div onClick={() => this.onClickOnTab('generalTab')}>
                        <ListLink
                          className={
                            activatedTab === 'generalTab' ? 'active' : ''
                          }
                          data-toggle="tab"
                          role="tab"
                          href="#generalTab"
                        >
                          Général
                        </ListLink>
                        {activatedTab === 'generalTab' && (
                          <span className="text-warning">
                            &nbsp;
                            <i className="far fa-arrow-alt-circle-right" />
                          </span>
                        )}
                      </div>
                      <div onClick={() => this.onClickOnTab('skillsTab')}>
                        <ListLink
                          className={
                            activatedTab === 'skillsTab' ? ' active' : ''
                          }
                          data-toggle="tab"
                          role="tab"
                          href="#skillsTab"
                        >
                          Compétences
                        </ListLink>
                        {activatedTab === 'skillsTab' && (
                          <span className="text-warning">
                            &nbsp;
                            <i className="far fa-arrow-alt-circle-right" />
                          </span>
                        )}
                      </div>
                      <div onClick={() => this.onClickOnTab('itemsTab')}>
                        <ListLink
                          className={
                            activatedTab === 'itemsTab' ? ' active' : ''
                          }
                          data-toggle="tab"
                          role="tab"
                          href="#itemsTab"
                        >
                          Inventaire
                        </ListLink>
                        {activatedTab === 'itemsTab' && (
                          <span className="text-warning">
                            &nbsp;
                            <i className="far fa-arrow-alt-circle-right" />
                          </span>
                        )}
                      </div>
                      {this.state.isMe && (
                        <div onClick={() => this.onClickOnTab('friendsTab')}>
                          <ListLink
                            className={
                              activatedTab === 'friendsTab' ? ' active' : ''
                            }
                            data-toggle="tab"
                            role="tab"
                            href="#friendsTab"
                          >
                            Amis
                          </ListLink>
                          {activatedTab === 'friendsTab' && (
                            <span className="text-warning">
                              &nbsp;
                              <i className="far fa-arrow-alt-circle-right" />
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
                <Image
                  src={
                    process.env.PUBLIC_URL +
                    '/img/academies/' +
                    character.academy.name +
                    '.png'
                  }
                  alt={character.academy.name}
                />
              </div>

              <RightBox className="col-sm-9 my-auto">
                <div className="tab-content">
                  {/* General */}
                  <div
                    className={`tab-pane${
                      activatedTab === 'generalTab' ? ' active' : ''
                    }`}
                    id="generalTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-header">
                        <Title>
                          {character.name}{' '}
                          <span style={{ color: character.academy.color }}>
                            ({character.academy.label})
                          </span>
                          <LevelBox> - Niv {character.level}</LevelBox>
                        </Title>
                        {character.guild && <div>{character.guild.name}</div>}
                        <ProgressBar
                          actual={
                            character.experience - character.xpToActualLevel
                          }
                          max={
                            character.xpToNextLevel - character.xpToActualLevel
                          }
                          color="#FFC312"
                          transparentColor="#7F8286"
                        />
                      </div>
                      <div className="card-body">
                        <Title>Caractéristiques</Title>
                        <div className="col-sm-12">
                          {_.map(
                            character.characteristics,
                            (characteristic) => (
                              <CharacteristicItem
                                key={characteristic.characteristic.name}
                                name={characteristic.characteristic.name}
                                amount={characteristic.amount}
                                equippedItems={_.filter(character.items, {
                                  isEquipped: true
                                })}
                              />
                            )
                          )}
                        </div>
                      </div>
                      <div className="card-footer">
                        <Title>Équipements</Title>
                        <EquippedItems
                          items={_.filter(character.items, {
                            isEquipped: true
                          })}
                          displayActions={this.state.isMe}
                          onDeleteItem={this.onDeleteItem}
                          onChangeEquippedItem={this.onChangeEquippedItem}
                        />
                      </div>
                    </Card>
                  </div>

                  {/* Skills */}
                  <div
                    className={`tab-pane${
                      activatedTab === 'skillsTab' ? ' active' : ''
                    }`}
                    id="skillsTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-body">
                        <div className="col-sm-12">
                          <Title>
                            Compétences d’académie
                            <br />
                            <SubTitle>
                              (
                              {character.skillPoints -
                                character.skills.length ===
                              0
                                ? 'Aucun point restant'
                                : character.skillPoints -
                                    character.skills.length ===
                                  1
                                ? '1pt restant'
                                : character.skillPoints -
                                  character.skills.length +
                                  'pts restants'}
                              )
                            </SubTitle>
                          </Title>
                        </div>
                        <EquippedSkills
                          skills={character.skills}
                          academyId={character.academy.id}
                          onCheckSkill={this.onCheckSkill}
                          displayCheckbox={this.state.isMe}
                          remainingSkillPoints={
                            character.skillPoints - character.skills.length
                          }
                        />
                      </div>
                    </Card>
                  </div>

                  {/* Friends */}
                  <div
                    className={`tab-pane${
                      activatedTab === 'friendsTab' ? ' active' : ''
                    }`}
                    id="friendsTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-body">
                        <div className="col-sm-12">
                          <Title>Ajouter des amis</Title>
                        </div>
                        <div className="offset-sm-3 col-sm-6">
                          <FormAddUser>
                            <InputEmail
                              id="email"
                              name="email"
                              type="text"
                              placeholder="Email"
                              value={this.state.friendToAddOrRemove}
                              onChange={(event) =>
                                this.setState({
                                  friendToAddOrRemove: event.target.value
                                })
                              }
                            />
                            <AddUserButton
                              className="btn btn-success"
                              type="button"
                              onClick={() => this.handleAddDeleteUser('add')}
                            >
                              Ajouter
                            </AddUserButton>
                          </FormAddUser>
                        </div>
                        <div className="col-sm-12 mt-3">
                          <Title>Liste d’amis</Title>
                        </div>
                        <FriendList
                          friends={character.friends}
                          canDelete={
                            character.role === 'ROLE_ADMIN' ||
                            character.role === 'ROLE_GUILD_MASTER'
                          }
                          onDelete={(friend) => {
                            this.setState(
                              {
                                friendToAddOrRemove: friend.email
                              },
                              () => this.handleAddDeleteUser('delete')
                            )
                          }}
                        />
                      </div>
                    </Card>
                  </div>

                  {/* Items */}
                  <div
                    className={`tab-pane${
                      activatedTab === 'itemsTab' ? ' active' : ''
                    }`}
                    id="itemsTab"
                    role="tabpanel"
                  >
                    <Card className="card">
                      <div className="card-body">
                        <div className="col-sm-12">
                          <Title>
                            Listes des objets
                            <br />
                            <SubTitle>
                              (
                              {character.itemSpaceNb -
                                character.items.length ===
                              0
                                ? 'Aucune place restante'
                                : character.itemSpaceNb -
                                    character.items.length ===
                                  1
                                ? '1 place restante'
                                : character.itemSpaceNb -
                                  character.items.length +
                                  ' places restantes'}
                              )
                            </SubTitle>
                          </Title>
                        </div>
                        <ItemList
                          items={character.items}
                          displayActions={this.state.isMe}
                          onDeleteItem={this.onDeleteItem}
                          onChangeEquippedItem={this.onChangeEquippedItem}
                        />
                      </div>
                    </Card>
                  </div>
                </div>
              </RightBox>
            </div>
          )}
        </div>
      </Container>
    )
  }
}

Character.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idCharacter: PropTypes.string
    }).isRequired
  }).isRequired
}

export default Character
