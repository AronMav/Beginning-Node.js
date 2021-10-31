const express = require('express')
const path = require('path')
const app = new express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost.js')

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))

app.listen(3000,()=>{
    console.log("App listening on port 3000")
})

app.get('/',async(req,res)=>{
    const blogposts = await BlogPost.find({})
    res.render('index',{
        blogposts
    });
})

app.get('/about',(req,res)=>{
    //res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about')
})
app.get('/contact',(req,res)=>{
    //res.sendFile(path.resolve(__dirname,'pages/contact.html'))
    res.render('contact')
})
app.get('/post/:id',async(req,res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post',{
        blogpost
    })
})
app.get('/posts/new',(req,res)=>{
    res.render('create')
})

app.post('/posts/store',async(req,res)=>{
    // model create a new doc with browser date
    await BlogPost.create(req.body)
    res.redirect('/')
})