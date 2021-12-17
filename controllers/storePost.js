const BlogPost = require('../models/BlogPost.js')
const path = require('path');
const { title } = require('process');

module.exports = (req,res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'..','public/img', image.name), async (error) => {
        await BlogPost.create({
            title: req.body.title,
            body: req.body.body, 
            userid: req.session.userId,
            image:'/img/' + image.name,
        })
        res.redirect('/')
    })
}