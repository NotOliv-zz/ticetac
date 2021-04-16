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

          if (journeys==[""]) {
            res.redirect('/page-error')
          } 

          if (!req.session.user) {
            res.redirect('/')
          } else {
      res.render('resultats', {journeys, date, arrival, departure})};
    });


// PAGE MY TICKETS //
    router.get('/mytickets', async function(req, res, next) {
      console.log(req.query)
    
      if (req.session.user.journey == undefined) {
        req.session.user.journey = []; 
      };

      var journey = await journeyModel.findOne( {_id: req.query.journeyid} )
      console.log(journey)

      req.session.user.journey.push(journey) 

      console.log(req.session.user) 

        if (!req.session.user) {
          res.redirect('/')
        } else {
      res.render('mytickets', {mytickets:req.session.user.journey})}
    });


// PAGE LAST TRIPS //
    router.get('/lasttrips', function(req, res, next) {
      res.render('lastTrips');
    });

 // PAGE ERROR //
    router.get('/page-error', function(req, res, next) {
      res.render('page-error');
    });





module.exports = router;
