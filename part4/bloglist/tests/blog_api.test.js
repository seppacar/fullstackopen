const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initials_blogs = require('../utils/blog_helper').listWithManyBlogs

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = {}

  for (let i = 0; i < initials_blogs.length; i++) {
    blogObject = new Blog(initials_blogs[i])
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

  expect(response.body).toHaveLength(initials_blogs.length)
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

  expect(response.body).toHaveLength(initials_blogs.length + 1)
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
  await api.post('/api/blogs').send(blogWithNoTitle).expect(400)
  await api.post('/api/blogs').send(blogWithNoUrl).expect(400)
})

test('check if a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map((r) => r.title)

  expect(contents).toContain('Go To Statement Considered Harmful')
})

test('check if a specific blog with id is deleted', async () => {
  const blogToDelete = initials_blogs[0]
  await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204)

  const response = await api.get('/api/blogs')
  const blogsAtEnd = response.body
  expect(blogsAtEnd).toHaveLength(initials_blogs.length - 1)

  const contents = blogsAtEnd.map((r) => r.id)

  expect(contents).not.toContain(blogToDelete._id)
})

test('check if specific blog post updated succesfully', async () => {
  const blogToUpdate = initials_blogs[0]
  const updateValue = {
    title: 'New Title',
    author: 'New Author',
    url: 'newurl',
    likes: 0,
    id: blogToUpdate._id,
  }
  await api
    .put(`/api/blogs/${blogToUpdate._id}`)
    .send(updateValue)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogsAtEnd = response.body

  expect(blogsAtEnd).toContainEqual(updateValue)
})

afterAll(() => {
  mongoose.connection.close()
})
