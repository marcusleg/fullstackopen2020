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

afterAll(() => {
  mongoose.connection.close()
})
