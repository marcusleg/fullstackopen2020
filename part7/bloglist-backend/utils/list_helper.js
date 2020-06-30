const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === mostLikes)
}

const mostBlogs = (blogs) => {
  const groupedByAuthor = lodash.groupBy(blogs, blog => blog.author)
  const blogCounts = lodash.map(groupedByAuthor, author => ({
    author: author[0].author,
    blogs: author.length
  }))
  return blogCounts.reduce((max, author) => (max.blogs > author.blogs) ? max : author, {})
}

const mostLikes = (blogs) => {
  const groupedByAuthor = lodash.groupBy(blogs, blog => blog.author)
  const likeCounts = lodash.map(groupedByAuthor, author => ({
    author: author[0].author,
    likes: author.reduce((sum, author) => sum + author.likes, 0)
  }))
  return likeCounts.reduce((max, author) => (max.likes > author.likes) ? max : author, {})
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce((totalLikes, likes) => totalLikes + likes)
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes
}
