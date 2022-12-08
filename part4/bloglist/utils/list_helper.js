var _ = require('lodash')

const dummy = (blogs) => {
  if (blogs){
    return 1
  }
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const blogsList = blogs.map(({ author, title, likes }) => ({ author, title, likes }))
  blogsList.sort((a, b) => b.likes - a.likes)
  return blogs.length === 0 ? 'empty list' : blogsList[0]
}

const mostBlogs = (blogs) => {

  const groupedByAuthor = _(blogs)
    .groupBy('author')
    .map((authorList, author) => ({ author: author, blogs: authorList.length }))
    .sortBy('blogs')
    .reverse()
    .value()

  return blogs.length === 0
    ? 'empty list'
    : groupedByAuthor[0]
}

const mostLikes = (blogs) => {
  const groupedByAuthor = _(blogs)
    .groupBy('author')
    .map((authorList, author) => ({ author: author, likes:  _.reduce(authorList, (sum, blog) => {return sum + blog.likes}, 0) }))
    .sortBy('likes')
    .reverse()
    .value()
  return blogs.length === 0
    ? 'empty list'
    : groupedByAuthor[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}