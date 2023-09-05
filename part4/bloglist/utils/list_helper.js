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
    ? {
      title: "N/A",
      author: "N/A",
      likes: 0
    }
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
    return value > currentAuthor.blogs
      ? {
        author: key,
        blogs: value
      }
      : currentAuthor
  }
  const initial = _.isEmpty(authors)
    ? {
      author: "N/A",
      blogs: 0
    }
    : {
    author: Object.keys(authors)[0],
    blogs: Object.values(authors)[0]
  }
  return _.reduce(authors, reducer, initial)
}

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')
  const reducer = (currentAuthor, value, key) => {
    const currentSum = _.sumBy(value, 'likes')
    return currentSum > currentAuthor.likes
      ? {
        author: key,
        likes: currentSum
      }
      : currentAuthor
  }
  const initial = _.isEmpty(blogsByAuthor)
    ? {
      author: "N/A",
      likes: 0
    }
    : {
      author: Object.keys(blogsByAuthor)[0],
      likes: _.sumBy(Object.values(blogsByAuthor)[0], 'likes')
    }
  return _.reduce(blogsByAuthor, reducer, initial)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
