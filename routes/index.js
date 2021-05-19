var express = require('express');
var router = express.Router();

// Get request for home page
router.get('/', function(req,res){
    res.redirect('/post')
})

// GET request for about page
router.get('/about', (req, res)=>{
    res.render('about', {aboutTxt: 'about info'})
})

// GET request for contact page
router.get('/contact', (req, res)=>{
    res.render('contact', {contactTxt: 'contact info'})
})

//Expport router object
module.exports = router;