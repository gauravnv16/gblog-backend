const express = require('express');
const app = express();
const GSTDLIB = require('./services/GSTDLIB');
require('dotenv').config();
const mongoose = require('mongoose');
const crypto = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3000;


mongoose.connect(`mongodb+srv://Gaurav_nv:Amirtha28@cluster0.83xxr.mongodb.net/gblog?retryWrites=true&w=majority`).then(()=>{
    console.log('Connected to database');
});


const blogSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    image: String,
    date: String,
});

const k = new GSTDLIB();
const Blog = mongoose.model('Blog', blogSchema);

app.use(
    cors({
        origin:"*",
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type','Authorization'],
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/api',(req,res)=>{
    res.sendFile(__dirname + '/Template/index.html');
})

app.get('/api/blogs',(req,res)=>{
   const blogs = Blog.find().then((blogs)=>{
        if(blogs){
            res.json(blogs);
        }else{
            res.json({message: 'No blogs'});
        }
    });
});

app.get('/api/blogs/blog/:id',(req,res)=>{
    const id = req.params.id;
    const blog = Blog.findOne({id: id}).then((blog)=>{
        if(blog){
            res.json(blog);
        }else{
            res.json({message: 'Blog not found'});
        }
    });
});

app.post('/api/blogs/blog/new',(req,res)=>{
    const id = crypto.randomBytes(16).toString('hex');
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const date = k.getDate();
    const blog = new Blog({
        id: id,
        title: title,
        description: description,
        image: image,
        date: date,
    });
    blog.save().then(()=>{
        res.json({message: 'Blog created'});
    });
});

app.put('/api/blogs/blog/:id/update',(req,res)=>{
    const id = req.params.id;
    const title = req.body.title;
    const discription = req.body.description;
    const image = req.body.image;
    const date = k.getDate();
    Blog.findOneAndUpdate({id: id},{$set: {title: title, discription: discription, image: image, date: date}}).then(()=>{
        res.json({message: 'Blog updated'});
    });
});

app.delete('/api/blogs/blog/:id/delete',(req,res)=>{
    Blog.findOneAndDelete({id: req.params.id}).then(()=>{
        res.json({message: 'Blog deleted'});
    });
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});



