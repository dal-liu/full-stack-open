import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { setMessage, removeNotification } = notificationSlice.actions

export const setNotification = (message, duration) => {
  return dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, duration * 1000)
  }
}
export default notificationSlice.reducer