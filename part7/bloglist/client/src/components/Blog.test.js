import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  const user = { username: 'user1' }
  const blog = {
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 1,
    user: user,
  }

  const mockHandler = jest.fn()

  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} updateBlog={mockHandler} user={user} />,
    ).container
  })

  test('renders title and author', async () => {
    await screen.findAllByText('title1 author1')
  })

  test('at start the url and likes are not displayed', () => {
    const div = container.querySelector('.toggleableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking button, url and likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.toggleableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('like button clicked twice', async () => {
    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)

    const like = screen.getByText('like')
    await user.click(like)
    await user.click(like)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('<BlogForm />', () => {
  test('updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('write blog title here')
    const authorInput = screen.getByPlaceholderText('write blog author here')
    const urlInput = screen.getByPlaceholderText('write blog url here')
    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'title1')
    await user.type(authorInput, 'author1')
    await user.type(urlInput, 'url1')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('title1')
    expect(createBlog.mock.calls[0][0].author).toBe('author1')
    expect(createBlog.mock.calls[0][0].url).toBe('url1')
  })
})
