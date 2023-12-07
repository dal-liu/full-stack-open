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

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject, user) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    newBlog.user = user
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (id, blogObject, user) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.update(id, blogObject)
    returnedBlog.user = user
    dispatch(updateBlog(returnedBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(eraseBlog(id))
  }
}

export default blogSlice.reducer
