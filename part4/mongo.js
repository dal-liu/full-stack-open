const mongoose = require('mongoose')
const Blog = require('./models/blog')
const User = require('./models/user')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = 
  `mongodb+srv://fullstack:${password}@cluster0.fde5o5t.mongodb.net/bloglistApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const user = new User({
  username: "user123",
  name: "John Doe",
  password: "SecurePassword123"
})

user.save().then(result => {
  console.log('user saved!')
  mongoose.connection.close()
})
