const dummy = (blogs) => {
  return 1
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === mostLikes)
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce((totalLikes, likes) => totalLikes + likes)
}

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes
}
