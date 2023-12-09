const Blog = ({ blog, like, canRemove, remove }) => {
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
    </div>
  )
}

export default Blog
