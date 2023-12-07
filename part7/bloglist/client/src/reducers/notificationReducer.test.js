import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  const initialState = { type: 'success', message: '' }

  test('returns success notification', () => {
    const state = initialState
    const action = {
      type: 'notification/setMessage',
      payload: {
        type: 'success',
        message: 'test success',
      },
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual({
      type: 'success',
      message: 'test success',
    })
  })

  test('returns error notification', () => {
    const state = initialState
    const action = {
      type: 'notification/setMessage',
      payload: {
        type: 'error',
        message: 'test error',
      },
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual({
      type: 'error',
      message: 'test error',
    })
  })

  test('return empty notification', () => {
    const state = { type: 'error', message: 'test error' }
    const action = {
      type: 'notification/clearMessage',
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual(initialState)
  })
})
