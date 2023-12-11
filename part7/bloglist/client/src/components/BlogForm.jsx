import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="write blog title here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="write blog author here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="write blog url here"
          />
        </Form.Group>
        <Button variant="primary" id="create-button" type="submit">
          create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
