const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "blog1",
    author: "author1",
    url: "url1",
    likes: 1
  },
  {
    title: "blog2",
    author: "author2",
    url: "url2",
    likes: 2
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('correct number of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

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

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
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

  const response = await api.get('/api/blogs')
  
  expect(response.body[initialBlogs.length].likes).toBe(0)
})

afterAll(async () => {
  await mongoose.connection.close()
})