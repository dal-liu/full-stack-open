import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = { username: 'user1' }
  const blog = {
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 1,
    user: user
  }

  const mockHandler = jest.fn()

  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} updateBlog={mockHandler} user={user} />
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