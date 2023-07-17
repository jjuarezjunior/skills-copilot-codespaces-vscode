// create web server
var express = require('express');
var router = express.Router();
var commentModel = require('../models/comments.js');
var postModel = require('../models/posts.js');
var async = require('async');

//get comments
router.get('/', function(req, res) {

    //get all comments from db
    commentModel.find({}, function(err, comments) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('comments/index', { comments: comments });
        }
    });
});

//new comment
router.get('/new', function(req, res) {
    res.render('comments/new');
});

//create comment
router.post('/', function(req, res) {
    //create new comment
    commentModel.create(req.body.comment, function(err, comment) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            //find post
            postModel.findById(req.body.comment.post, function(err, post) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    //add comment to post
                    post.comments.push(comment);
                    post.save(function(err, post) {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal Server Error');
                        } else {
                            //redirect to comments
                            res.redirect('/comments');
                        }
                    });
                }
            });
        }
    });
});

//show comment
router.get('/:id', function(req, res) {
    //find comment by id
    commentModel.findById(req.params.id).populate('post').exec(function(err, comment) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            //render comment
            res.render('comments/show', { comment: comment });
        }
    });
});

//edit comment
router.get('/:id/edit', function(req, res) {
    //find comment by id
    commentModel.findById(req.params.id, function(err, comment) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            //render edit form
            res.render('comments/edit', { comment: comment });
        }
    });
});

//