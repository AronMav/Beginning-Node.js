module.exports = (req,res,next)=>{
    if(req.files == null
        ||req.body.body == ''
        ||req.body.title == ''){
        return res.redirect('/posts/new')
    }
    next()
}