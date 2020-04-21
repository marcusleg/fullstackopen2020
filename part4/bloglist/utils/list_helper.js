const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce((totalLikes, likes) => totalLikes + likes)
}

module.exports = {
  dummy,
  totalLikes
}
