import { useState } from 'react'

const Blog = ({ blog, like, canRemove, remove, addComment }) => {
  const [comment, setComment] = useState('')

  const createComment = (event) => {
    event.preventDefault()
    addComment(blog.id, comment)

    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>

      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={like}>like</button>
      </div>
      <div>{blog.user && blog.user.username}</div>
      {canRemove && <button onClick={remove}>remove</button>}

      <h3>comments</h3>
      <form onSubmit={createComment}>
        <input
          id="comment"
          value={comment}
          onChange={() => setComment(event.target.value)}
          placeholder="write comment here"
        />
        <button id="create-comment" type="submit">
          add comment
        </button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
