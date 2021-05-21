var Author = require('../models/author')
var _ = require('lodash');
const { body, validationResult } = require('express-validator');
var under_ = require('underscore');

//Display list of all Authors
exports.author_list = async function (req, res) {
    authors =  Author.find({}, (err, data)=>{
        if (err) return(next(err))
        res.render('authors',{title: 'New Author', authors:data})
    })
};

//Display detail page for a specific Author
exports.author_detail = async function (req, res) {
    Author.findById(req.params.authorId, (err, result)=>{
        if (err) return(next(err))
        res.render('author_detail',{author:result})
    })
}

//Display Author create form on GET request
exports.author_create_get = function(req, res){
    res.render('author_form',{title: 'New Author'})
}

//Handle Author create form on POST request
exports.author_create_post = [
    body('authorFirstName').trim().isLength({min:1}).escape(),
    body('authorLastName').trim().isLength({min:1}).escape(),
    body('authorCountry').trim().isLength({min:1}).escape(),
     (req, res, next)=>{
        console.log(req.body)
        const errors = validationResult(req);
        //Check there were no validation errors 
        if (!errors.isEmpty()) {
            //There are errors. Render the create Post form again with sanitized values/errors messages.
            res.render('author_form', {
                title: 'New Author',
                author: req.body,
                errors: errors.array()
            })
        } else {
            var author = new Author({
                firstName: req.body.authorFirstName,
                lastName: req.body.authorLastName,
                country: req.body.authorCountry,
                languages: req.body.authorLanguage,
            })
            author.save(function(err){
                if (err) { return next(err); }
                res.redirect(author.url)
            })
        }
    }
]

//Display Author update form on GET request
exports.author_update_get = async function(req, res){
    res.send('NOT IMPLEMENTED: author_update_get')
}

//Handle Author update form on POST request
exports.author_update_post = function(req,res){
    res.send('NOT IMPLEMENTED: author_update_post')
}

//Display Author delete form on GET request
exports.author_delete_get = async function(req, res){
    res.send('NOT IMPLEMENTED: author_delete_get')
}

//Handle Author delete form on POST request
exports.author_delete_post = function(req, res){
   res.send('NOT IMPLEMENTED: author_delete_post')
}