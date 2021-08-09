const express = require('express');
const Post = require('../models/post.js');

const router = express.Router();

router.post('', (req,res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then( createdPost => {
        res.status(201).json({
            message: 'Post Added Successfully',
            postId: createdPost._id
        });
    });
    
});

router.get('',(req, res, next) => {

    Post.find().then(documents => {
        return res.status(200).json({
            message: 'Posts Fetched Successfully!!',
            posts: documents
        });
    });
    
});

router.delete('/:id', (req,res,next) => {
   Post.deleteOne({_id:req.params.id}).then( result =>{
    res.status(200).json({message:'Post Deleted'});
   });
   
});

router.put('/:id', (req,res,next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        console.log(result);
        res.status(200).json({message: "Update Success!!!"});
    });

});

router.get('/:id', (req,res,next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(400).json({message: 'Post Not Found'});
        }
    })
});

module.exports = router;