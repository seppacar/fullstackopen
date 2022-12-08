const listHelper = require('../utils/list_helper')
const blog_helper = require('../utils/blog_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list is empty, equals 0', () => {
    const result = listHelper.totalLikes(blog_helper.listWithZeroBlog)
    expect(result).toBe(0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blog_helper.listWithOneBlog)
    expect(result).toBe(5)
  })
  test('when list has many blogs, equals the sum of the likes of the blogs', () => {
    const result = listHelper.totalLikes(blog_helper.listWithManyBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite list', () => {
  test('when list is empty', () => {
    const result = listHelper.favoriteBlog(blog_helper.listWithZeroBlog)
    expect(result).toEqual('empty list')
  })
  test('when list has only one blog', () => {
    const result = listHelper.favoriteBlog(blog_helper.listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })
  test('when list has many blogs', () => {
    const result = listHelper.favoriteBlog(blog_helper.listWithManyBlogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

describe('most blogs', () => {
  test('when list is empty', () => {
    const result = listHelper.mostBlogs(blog_helper.listWithZeroBlog)
    expect(result).toEqual('empty list')
  })
  test('when list has only one blog', () => {
    const result = listHelper.mostBlogs(blog_helper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })
  test('when list has many blogs', () => {
    const result = listHelper.mostBlogs(blog_helper.listWithManyBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('most likes', () => {
  test('when list is empty', () => {
    const result = listHelper.mostLikes(blog_helper.listWithZeroBlog)
    expect(result).toEqual('empty list')
  })
  test('when list has only one blog', () => {
    const result = listHelper.mostLikes(blog_helper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })
  test('when list has many blogs', () => {
    const result = listHelper.mostLikes(blog_helper.listWithManyBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})