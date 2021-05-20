var Author = require('../models/post')
var _ = require('lodash');
const { body, validationResult } = require('express-validator');
var under_ = require('underscore');


//Display list of all Authors
exports.author_list = async function (req, res) {
    res.send('NOT IMPLEMENTED: author_list')
};

//Display detail page for a specific Author
exports.author_detail = async function (req, res) {
    res.send('NOT IMPLEMENTED: author_detail')
}

//Display Author create form on GET request
exports.author_create_get = function(req, res){
    res.send('NOT IMPLEMENTED: author_create_get')
}

//Handle Author create form on POST request
exports.author_create_post = function(req, res){
    res.send('NOT IMPLEMENTED: author_create_post')
}

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