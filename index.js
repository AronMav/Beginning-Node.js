const express = require('express')
const path = require('path')
const app = new express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload')

const validationMiddleWare = (req,res,next) => {
    if(req.files == null
        ||req.body.body == ''
        ||req.body.title == ''){
        return res.redirect('/posts/new')
    }
    next()
}

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

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    });
})

app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about')
})
app.get('/contact', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'pages/contact.html'))
    res.render('contact')
})
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})
app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
        await BlogPost.create({
            titlebody:req.body, image:'/img/' + image.name
        })
        res.redirect('/')
    })
})