import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    async function getBlogs() {
      const blogsList = await blogService.getAll()
      setBlogs(blogsList)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification('success', 'successfully logged in', 5))
    } catch (exception) {
      dispatch(setNotification('error', 'wrong username or password', 5))
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      returnedBlog.user = user
      setBlogs(blogs.concat(returnedBlog))
      dispatch(
        setNotification(
          'success',
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          5,
        ),
      )
    } catch (exception) {
      dispatch(setNotification('error', exception.message, 5))
    }
  }

  const addLike = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      returnedBlog.user = blog.user
      setBlogs(blogs.map((b) => (b.id !== id ? b : returnedBlog)))
    } catch (exception) {
      dispatch(
        setNotification(
          'error',
          `unable to like blog ${blog.title} by ${blog.author}`,
          5,
        ),
      )
    }
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        dispatch(
          setNotification(
            'success',
            `blog ${blog.title} by ${blog.author} removed`,
            5,
          ),
        )
      }
    } catch (exception) {
      dispatch(
        setNotification(
          'error',
          `unable to remove blog ${blog.title} by ${blog.author}`,
          5,
        ),
      )
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Toggleable buttonLabel="create blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Toggleable>
  )

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
        </div>
      )}

      {blogForm()}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={addLike}
            user={user}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  )
}

export default App
