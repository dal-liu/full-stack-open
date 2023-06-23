var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (accum, blog) => {
    return accum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (currentFavorite, blog) => {
    return blog.likes > currentFavorite.likes
      ? {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
      : currentFavorite
  }

  const initial = blogs.length === 0
    ? null
    : {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes
    }
  return blogs.reduce(reducer, initial)
}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, 'author')
  const reducer = (currentAuthor, value, key) => {
    console.log(currentAuthor)
    console.log(`key:${key}, value:${value}`)
    return value > currentAuthor.blogs
      ? {
        author: key,
        blogs: value
      }
      : currentAuthor
  }
  const initial = _.isEmpty(authors)
    ? null
    : {
    author: Object.keys(authors)[0],
    blogs: Object.values(authors)[0]
  }
  return _.reduce(authors, reducer, initial)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
