//route modules are js files that contain router functions. These router functions forward http
//requests to the appropiate controller functions

var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController')


//Each route function here defines its route handling function, but they should be defined
//in a separate controller module.

//GET request on home page
router.get('/post', postController.index_home)

// router.post('/', (req, res)=>{
//     res.redirect('/')
// })

// GET request on composing a new Post
router.get('/post/create', postController.post_create_get)

//POST request on composing a new Post 
router.post('/post/create', postController.post_create_post)

//GET request on particular Post
router.get('/post/:postId', postController.post_detail)

router.get('/post/:postId/update', postController.post_update_get)

router.post('/post/:postId/update', postController.post_update_post)

router.get('/post/:postId/delete', postController.post_delete_get)

router.post('/post/:postId/delete', postController.post_delete_post)

module.exports = router;