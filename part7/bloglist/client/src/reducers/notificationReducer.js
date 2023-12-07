import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { type: 'success', message: '' },
  reducers: {
    setMessage(state, action) {
      return {
        type: action.payload.type,
        message: action.payload.message,
      }
    },
    clearMessage(state, action) {
      return { type: 'success', message: '' }
    },
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (type, message, duration) => {
  return (dispatch) => {
    dispatch(setMessage({ type, message }))
    setTimeout(() => {
      dispatch(clearMessage())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
