var Post = require('../models/post')
var _ = require('lodash');
const { body, validationResult } = require('express-validator');
var under_ = require('underscore');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


//Display list of all Posts
exports.post_list = async function (req, res) {
    const blogPosts = await Post.find({});
    res.render('home', {
        homeTxt: homeStartingContent,
        posts: blogPosts,
        under_:under_
    })
};

//Display detail page for a specific Post
exports.post_detail = async function (req, res) {
    var postId = req.params.postId;
    const postData = await Post.find({
        _id: {
            $eq: postId
        }
    })
    if (postData.length != 0) {
        postData[0].content = under_.unescape(postData[0].content)
        res.render('post_detail', {
            postRes: postData[0],
            title: '',
            under_:under_
        })
    } else {
        res.render('post', {
            postRes: {
                title: "Blog post not found",
                content: "Ops, we couldn't find that blog post"
            }
        })
    }
}

//Display Post create form on GET request
exports.post_create_get = function(req, res){
    res.render('post_form', {title:'New Post'})
}

//Handle Post create form on POST request
exports.post_create_post = [
    // Validate and sanitize the title field
    body('postTitle', 'Title required').trim().isLength({min: 1}).escape(),
    body('postBody', 'Content required').trim().isLength({min: 1}).escape(),

    //Process request after validation and sanitation
    (req, res, next)=>{
        //Extract the validation errors from a request
        const errors = validationResult(req);

        //Check there were no validation errors 
        if (!errors.isEmpty()){
            //There are errors. Render the create Post form again with sanitized values/errors messages.
            res.render('post_form',{title:'New Post', post:req.body, errors: errors.array()})
        }else{
            //No validation errors. Create a new Post with escaped and trimmed data.
            var post = new Post({
                title: req.body.postTitle,
                content: req.body.postBody
            })
            post.save(function(err){
                if (err) { return next(err); }
                //Successful - redirect to new Post record (detail page)
                res.redirect(post.url);
            })
        }
    }
]

// function(req, res){
//     var postTitle =  _.lowerCase(_.kebabCase(req.body.postTitle));
//     const newPost = new Post({
//         title: postTitle,
//         content: req.body.postBody
//     })
//     newPost.save((err, result)=>{
//         if (err) return console.error(err);
//         res.redirect('/')
//     })  
// }

//Display Post update form on GET request
exports.post_update_get = async function(req, res){
    const post = await Post.findById(req.params.postId)
    res.render('post_form', {post:post, title:'Update Post', under_:under_})
}

//Handle Post update form on POST request
exports.post_update_post = [
    body('postTitle', 'Title required').trim().isLength({min: 1}).escape(),
    body('postBody', 'Content required').trim().isLength({min: 1}).escape(),
    (req, res, next)=>{
        var post = new Post({
            title: req.body.postTitle,
            content: req.body.postBody,
            _id: req.params.postId
        })
        
        errors = validationResult(req);
        if (!errors.isEmpty()){
            //There are errors. Render the create Post form again with sanitized values/errors messages.
            res.render('post_form',{title:'Update Post', post:req.body, errors: errors.array()});
            return;
        }else{
            //Data from form is valid. Move on to updating Post record
            Post.findByIdAndUpdate(req.params.postId, post, {}, function(err, thepost){
                if (err) return(next(err));
                res.redirect(thepost.url);
            })    

        }
    }
]


//Display Post delete form on GET request
exports.post_delete_get = async function(req, res){
    const post = await Post.findById(req.params.postId);
    res.render('post_delete',{ post:post})
}

//Handle Post delete form on POST request
exports.post_delete_post = function(req, res){
    Post.findByIdAndRemove(req.params.postId, function deletePost(err){
        if (err) { return next(err); }
        // Success - go to home page.
        res.redirect('/');
    })
}