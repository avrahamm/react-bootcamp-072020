import * as actions from './actions'

// @link: https://redux.js.org/recipes/writing-tests

describe('actions', () => {
  it("should create an action to 'RECEIVED_ROOMS' ", () => {
    // { type: 'RECEIVED_ROOMS', payload: newListOfRooms }
    const newListOfRooms = ['Room 119', 'Room 129', 'Room 139'];
    const expectedAction = {
      type: 'RECEIVED_ROOMS',
      payload: newListOfRooms
    }
    expect(actions.receivedRooms(newListOfRooms)).toEqual(expectedAction)
  })

  it("should create an action to 'SET_ACTIVE_ROOM' ", () => {
    // { type: 'SET_ACTIVE_ROOM', payload: roomId }
    const roomId = '119'
    const expectedAction = {
      type: 'SET_ACTIVE_ROOM',
      payload: roomId
    }
    expect(actions.setActiveRoom(roomId)).toEqual(expectedAction)
  })

  it("should create an action to 'CREATE_ROOM' ", () => {
    // { type: 'CREATE_ROOM', payload: roomName }
    const roomName = 'room 119'
    const expectedAction = {
      type: 'CREATE_ROOM',
      payload: roomName
    }
    expect(actions.createRoom(roomName)).toEqual(expectedAction)
  })

  it("should create an action to 'RECEIVED_MESSAGE' ", () => {
    // { type: 'RECEIVED_MESSAGE', payload: message }
    const message = 'Hi Romy'
    const expectedAction = {
      type: 'RECEIVED_MESSAGE',
      payload: message
    }
    expect(actions.receivedMessage(message)).toEqual(expectedAction)
  })

  it("should create an action to 'RECEIVED_MESSAGE' ", () => {
    // { type: 'SET_USERNAME', payload: newUsername }
    const newUsername = 'Romy'
    const expectedAction = {
      type: 'SET_USERNAME',
      payload: newUsername
    }
    expect(actions.setUsername(newUsername)).toEqual(expectedAction)
  })
})