import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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

  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} />).container
  })

  test('renders title and author', async () => {
    await screen.findAllByText('title1 author1')
  })

  test('at start the url and likes are not displayed', () => {
    const div = container.querySelector('.toggleableContent')
    expect(div).toHaveStyle('display: none')
  })
})