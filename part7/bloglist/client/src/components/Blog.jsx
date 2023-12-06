import { useState } from 'react'

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const hideWhenVisible = { display: showDetails ? 'none' : '' }
  const showWhenVisible = { display: showDetails ? '' : 'none' }
  const showIfCorrectUser = {
    display: user.username === blog.user.username ? '' : 'none',
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(true)} style={hideWhenVisible}>
          view
        </button>
        <button onClick={() => setShowDetails(false)} style={showWhenVisible}>
          hide
        </button>
      </div>
      <div style={showWhenVisible} className="toggleableContent">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={() => updateBlog(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          <button onClick={() => deleteBlog(blog.id)} style={showIfCorrectUser}>
            remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
