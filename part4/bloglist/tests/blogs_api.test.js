const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const noteObjects = helper.initialBlogs.map(note => new Blog(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
})

test('all blogs are returned', async() => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('verify the unique identifier property of blog posts is called id', async () => {
  const response = await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)

  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('making a POST request creates a blog post', async () => {
  const newBlog = {
    title: 'How to make great examples',
    author: 'John Doe',
    url: 'http://example.org',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

  const titles = response.body.map(blog => blog.title)
  expect(titles).toContain(newBlog.title)
})

test('POST without likes property defaults to 0 likes', async () => {
  const newBlog = {
    title: 'How to make great examples',
    author: 'John Doe',
    url: 'http://example.org',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toEqual(0)
})

test('POST without title property is a bad request', async () => {
  const newBlog = {
    author: 'Bob Ross',
    url: 'https://br.example.com',
    likes: 42
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('POST without url property is a bad request', async () => {
  const newBlog = {
    title: 'The Joy of Painting',
    author: 'Bob Ross',
    likes: 42
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
