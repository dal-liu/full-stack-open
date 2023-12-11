import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'

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
    <Card className="blog">
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Subtitle>{blog.author}</Card.Subtitle>
        <Card.Text>
          <Card.Link href={blog.url}>{blog.url}</Card.Link>
        </Card.Text>
        <Card.Text>
          {blog.likes} likes{' '}
          <Button variant="primary" onClick={like}>
            like
          </Button>
        </Card.Text>
        <Card.Text>{blog.user && blog.user.username}</Card.Text>
        {canRemove && (
          <Button variant="danger" onClick={remove}>
            remove
          </Button>
        )}
      </Card.Body>

      <Card.Body>
        <Card.Title>comments</Card.Title>
        <Form onSubmit={createComment}>
          <Form.Control
            id="comment"
            value={comment}
            onChange={() => setComment(event.target.value)}
            placeholder="write comment here"
          />
          <Button variant="primary" id="create-comment" type="submit">
            add comment
          </Button>
        </Form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  )
}

export default Blog
