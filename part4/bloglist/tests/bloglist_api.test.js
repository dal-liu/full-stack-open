const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('correct number of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('http post works correctly', async () => {
    const newBlog = {
      title: "title3",
      author: "author3",
      url: "url3",
      likes: 3
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).toContain('title3')
  })

  test('missing likes property defaults to zero', async () => {
    const newBlog = {
      title: "title0",
      author: "author0",
      url: "url0"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: "author4",
      url: "url4",
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: "title4",
      author: "author4",
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deleting a blog', () => {
  test('blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
      title: "title1",
      author: "author1",
      url: "url1",
      likes: 10
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    expect(response.body.likes).toBe(10)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[0].likes).toBe(10)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('tropical', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('see all users at the start', async () => {
    const response = await api.get('/api/users')

    expect(response.body.length).toBe(1)
  })

  test('creation succeeds with a new username', async () => {
    const initialUsers = await helper.usersInDb()

    const newUser = {
      username: 'user1',
      name: 'name1',
      password: 'password1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const finalUsers = await helper.usersInDb()
    expect(finalUsers.length).toBe(initialUsers.length + 1)

    const usernames = finalUsers.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user with no username is not added', async () => {
    const newUser = {
      name: 'name2',
      password: 'password2'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd.length).toBe(1)
  })

  test('user with username too short is not added', async () => {
    const newUser = {
      username: 'u2',
      name: 'name2',
      password: 'password2'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd.length).toBe(1)
  })

  test('user with non unique username is not added', async () => {
    const newUser = {
      username: 'root',
      name: 'name2',
      password: 'password2'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd.length).toBe(1)
  })

  test('user with no password is not added', async () => {
    const newUser = {
      username: 'user2',
      name: 'name2'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd.length).toBe(1)
  })

  test('user with password too short is not added', async () => {
    const newUser = {
      username: 'user2',
      name: 'name2',
      password: 'p2'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd.length).toBe(1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})