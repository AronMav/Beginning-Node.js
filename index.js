const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

const app = new express()
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const validationMiddleWare = require("./middleware/validationMiddleware")
const expressSession = require('express-session')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newPostController = require('./controllers/newPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(fileUpload())
app.use('/posts/store', validationMiddleWare)
app.use(expressSession({secret: 'keyboard cat'}))

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

app.listen(3000, () => {
    console.log("App listening on port 3000")
})

app.get('/auth/register', newUserController)
app.post('/users/register', storeUserController)
app.get('/auth/login', loginController);
app.post('/users/login', loginUserController)
app.get('/posts/new',authMiddleware, newPostController)
app.post('/posts/store', authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)
app.get('/posts/new', newPostController)
app.get('/',homeController)
app.get('/post/:id',getPostController)
app.post('/posts/store', storePostController)
app.use((req, res) => res.render('notfound'));