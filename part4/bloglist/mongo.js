const mongoose = require('mongoose')
const Blog = require('./models/blog')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = 
  `mongodb+srv://fullstack:${password}@cluster0.fde5o5t.mongodb.net/testBloglistApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blog = new Blog({
  title: "blog2",
  author: "author2",
  url: "url2",
  likes: 2
})

blog.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})
