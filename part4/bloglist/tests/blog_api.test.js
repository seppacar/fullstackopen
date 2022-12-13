const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const blog_helper = require('../utils/blog_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = {}
  for (let i = 0; i < blog_helper.listWithManyBlogs.length; i++){
    blogObject = new Blog(blog_helper.listWithManyBlogs[i])
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

  expect(response.body).toHaveLength(blog_helper.listWithManyBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain('Go To Statement Considered Harmful')
})



afterAll(() => {
  mongoose.connection.close()
})