var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
var journeyModel = require('../models/journeys')
var UserModel = require('../models/users')


/* HP */
    router.get('/', function(req, res, next) {
      res.render('login', { title: 'Express' });
    });


/* PAGE RECHERCHE */
    router.get('/recherche', function(req, res, next) {
      if (!req.session.user) {
        res.redirect('/')
      } else {
      res.render('recherche')}
    });

/* PAGE RESULTATS */
    router.post('/results', async function(req, res, next) {
      var departure = req.body.depart;
      var arrival = req.body.arrivee;
      var date = req.body.date; 
    
      var journeys = await journeyModel.find(
        { departure : departure,
        arrival: arrival,
        date:date}
       
    )
     console.log(journeys)

        var notFind = true
        if (journeys[0] == null) {notFind === true; console.log("pas trouvé") ; res.redirect("/page-error")} 
        else {notFind === false; console.log("trouvé")}
        console.log(notFind)

          if (!req.session.user) {
            res.redirect('/')
          } else {
      res.render('resultats', {journeys, date, arrival, departure})};
    });


// PAGE MY TICKETS //
    router.get('/mytickets', async function(req, res, next) {
     
    
      if (req.session.user.journey == undefined) {
        req.session.user.journey = []; 
      };

      var journey = await journeyModel.findOne( {_id: req.query.journeyid} )
   

      req.session.user.journey.push(journey) 

     


        if (!req.session.user) {
          res.redirect('/')
        } else {
      res.render('mytickets', {mytickets:req.session.user.journey})}
    });



 // PAGE ERROR //
    router.get('/page-error', function(req, res, next) {
      res.render('page-error');
    });

    // ENREGISTREMENT DES JOURNEYS DANS LA BDD //
    router.get('/confirm', async function(req, res, next) {
      console.log(req.session.user.journey)

     
      await UserModel.updateOne(
        { email: req.session.user.email},
        { $push: {userjourney: req.session.user.journey} })
   

      res.render('recherche');
    });

  // PAGE LAST TRIPS //
  router.get('/lasttrips', async function(req, res, next) {
  var user = await UserModel.findOne({email : req.session.user.email})
   
  await UserModel.findById(user._id).populate('userjourney')
  console.log(user.userjourney)

    var lasttrips = []; 
    for (var i=0 ; i<user.userjourney.length; i++ ){
 var thisjourney = await journeyModel.findById(user.userjourney[i]);
 lasttrips.push(thisjourney)
}
  console.log(lasttrips)
    

    res.render('lastTrips', {lasttrips});
  });





module.exports = router;
