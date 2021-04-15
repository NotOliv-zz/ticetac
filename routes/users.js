var express = require('express');
var router = express.Router();

var UserModel = require('../models/users')

/* SIGN IN // LOGIN */

router.get('/sign-in', function(req, res, next) {


  
  res.render('recherche');
});


/* SIGN UP // INSCRIPTION */

router.post('/sign-up', async function(req, res, next) {

    var newUser = new UserModel({
      name: req.body.name,
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password,
    })
  
    var newUserSave = await newUser.save();

    req.session.user = newUserSave
    console.log(req.session.user)
  
    res.render('recherche')
  
})

/* SIGN UP // INSCRIPTION */

router.get('/logout', function(req,res,next){

  req.session.user = null;

  res.redirect('/')
})


module.exports = router;
