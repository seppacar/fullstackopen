const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initial_notes = require('../utils/blog_helper').listWithManyBlogs

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = {}
  
  for (let i = 0; i < initial_notes.length; i++) {
    blogObject = new Blog(initial_notes[i])
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initial_notes.length)
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('new blog post created successfully in db', async () => {
  const newBlog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'testurl',
    likes: 5,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
  const response = await api.get('/api/blogs')
  const titles = response.body.map((r) => r.title)

  expect(response.body).toHaveLength(initial_notes.length + 1)
  expect(titles).toContain('Test Title')
})

test('if likes value not passed check if it is set to 0 by default', async () => {
  const newBlog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'testurl',
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  expect(response.body.likes).toEqual(0)
})

test('check if server responds with "400 Bad Request" if "title" or "url" properties are missing', async () => {
  const blogWithNoTitle = {
    author: 'Test Author',
    url: 'testurl',
    likes: 5,
  }
  const blogWithNoUrl = {
    title: 'Test Title',
    author: 'Test Author',
    likes: 5,
  }
  await api
    .post('/api/blogs')
    .send(blogWithNoTitle)
    .expect(400)
  await api
    .post('/api/blogs')
    .send(blogWithNoUrl)
    .expect(400)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map((r) => r.title)

  expect(contents).toContain('Go To Statement Considered Harmful')
})

afterAll(() => {
  mongoose.connection.close()
})
