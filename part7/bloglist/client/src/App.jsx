import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  setBlogs,
  appendBlog,
  updateBlog,
  eraseBlog,
} from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import UserList from './components/UserList'
import userService from './services/users'
import User from './components/User'
import NavigationMenu from './components/NavigationMenu'
import { Table, Form, Button } from 'react-bootstrap'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogFormRef = useRef()

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    }
    getBlogs()
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    async function getUsers() {
      const userList = await userService.getAll()
      setUsers(userList)
    }
    getUsers()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      })
      dispatch(loginUser(loggedInUser))
      setUsername('')
      setPassword('')
      dispatch(setNotification('success', 'successfully logged in', 5))
    } catch (exception) {
      dispatch(setNotification('danger', 'wrong username or password', 5))
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = (event) => {
    event.preventDefault()

    dispatch(logoutUser())
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      newBlog.user = user
      dispatch(appendBlog(newBlog, user))
      dispatch(
        setNotification(
          'success',
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          5,
        ),
      )
    } catch (exception) {
      dispatch(setNotification('danger', 'unable to add new blog', 5))
    }
  }

  const addLike = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      returnedBlog.user = blog.user
      dispatch(updateBlog(returnedBlog))
    } catch (exception) {
      dispatch(
        setNotification(
          'danger',
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
        dispatch(eraseBlog(id))
        dispatch(
          setNotification(
            'success',
            `blog ${blog.title} by ${blog.author} removed`,
            5,
          ),
        )
        navigate('/')
      }
    } catch (exception) {
      dispatch(
        setNotification(
          'danger',
          `unable to remove blog ${blog.title} by ${blog.author}`,
          5,
        ),
      )
    }
  }

  const addComment = async (id, comment) => {
    const blog = blogs.find((b) => b.id === id)
    try {
      const returnedBlog = await blogService.comment(id, { comment: comment })
      returnedBlog.user = blog.user
      dispatch(updateBlog(returnedBlog))
      dispatch(setNotification('success', `comment ${comment} added`, 5))
    } catch (exception) {
      dispatch(setNotification('danger', 'unable to add comment', 5))
    }
  }

  const canRemoveBlog = (blog) => {
    return blog && user.username === blog.user.username
  }

  const userMatch = useMatch('/users/:id')
  const selectedUser = userMatch
    ? users.find((u) => u.id === String(userMatch.params.id))
    : null
  const blogMatch = useMatch('/blogs/:id')
  const selectedBlog = blogMatch
    ? blogs.find((b) => b.id === String(blogMatch.params.id))
    : null

  const loginForm = () => (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>password:</Form.Label>
        <Form.Control
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button id="login-button" variant="primary" type="submit">
        login
      </Button>
    </Form>
  )

  const blogForm = () => (
    <Toggleable buttonLabel="create blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Toggleable>
  )

  if (!user) {
    return (
      <div className="container">
        <h2>log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <div className="container">
      {user && <NavigationMenu name={user.name} logout={handleLogout} />}

      <h2>blog app</h2>
      <Notification />

      <Routes>
        <Route
          path="/"
          element={
            <div>
              {blogForm()}
              <Table striped>
                <tbody>
                  {[...blogs]
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                      <tr key={blog.id}>
                        <td>
                          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          }
        />
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/users/:id" element={<User user={selectedUser} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={selectedBlog}
              like={() => addLike(selectedBlog.id)}
              canRemove={canRemoveBlog(selectedBlog)}
              remove={() => deleteBlog(selectedBlog.id)}
              addComment={addComment}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
