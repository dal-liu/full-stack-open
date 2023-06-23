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
    if (blog.likes > currentFavorite.likes) {
      return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    } else {
      return currentFavorite
    }
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
