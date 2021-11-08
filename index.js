const express = require('express')
const app = new express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')

const validationMiddleWare = require("./middleware/validationMiddleware")

const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newPostController = require('./controllers/newPost')

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(fileUpload())
app.use('/posts/store', validationMiddleWare)

app.listen(3000, () => {
    console.log("App listening on port 3000")
})

app.get('/posts/new', newPostController)
app.get('/',homeController)
app.get('/post/:id',getPostController)
app.post('/posts/store', storePostController)