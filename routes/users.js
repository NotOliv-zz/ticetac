var express = require('express');
var router = express.Router();

var UserModel = require('../models/users')

/* SIGN IN // LOGIN */
router.post('/sign-in', async function(req, res, next) {

  var searchUser = await UserModel.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if(searchUser!= null){
    req.session.user = {
      name: searchUser.name,
      firstname: searchUser.firstname,
      email: searchUser.email,
      password: searchUser.password
    }
    
    res.redirect('/recherche')
  } else {
    
    res.redirect("/")
  }
})

  
/* SIGN UP // INSCRIPTION */
router.post('/sign-up', async function(req, res, next) {

  var searchUser = await UserModel.findOne({
    email: req.body.email
  })

  if(!searchUser) {
     var newUser = new UserModel({
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password,
  })
  
    var newUserSave = await newUser.save();
    req.session.user = newUserSave
    
    res.redirect('/recherche') 
  } else {
      res.redirect('/')
  }
})


module.exports = router;
