import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      )
    },
    eraseBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, eraseBlog } = blogSlice.actions

export const initializeBlogs = (blogs) => {
  return async (dispatch) => {
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    dispatch(appendBlog(blogObject))
  }
}

export const modifyBlog = (blogObject) => {
  return async (dispatch) => {
    dispatch(updateBlog(blogObject))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    dispatch(eraseBlog(id))
  }
}

export default blogSlice.reducer
