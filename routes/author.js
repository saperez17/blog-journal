//route modules are js files that contain router functions. These router functions forward http
//requests to the appropiate controller functions

var express = require('express');
var router = express.Router();
var authorController = require('../controllers/authorController')


//Each route function here defines its route handling function, but they should be defined
//in a separate controller module.

//GET request on home page
// router.get('/post', postController.post_list)

// router.post('/', (req, res)=>{
//     res.redirect('/')
// })

//GET requests on displaying list of authors
router.get('/author', authorController.author_list)

// GET request on creating a new Author
router.get('/author/create', authorController.author_create_get)

//POST request on creating a new Author
router.post('/author/create', authorController.author_create_post)

//GET request on particular Author
router.get('/author/:authorId', authorController.author_detail)

router.get('/author/:authorId/update', authorController.author_update_get)

router.post('/author/:authorId/update', authorController.author_update_get)

router.get('/author/:authorId/delete', authorController.author_delete_get)

router.post('/author/:authorId/delete', authorController.author_delete_post)

module.exports = router;