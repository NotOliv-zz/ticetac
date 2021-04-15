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
  res.render('recherche');
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
// console.log(journeys)
//   if (journeys.departure == null) {
//     res.render('page-error');
//   } else {
//   res.render('resultats', {journeys, date, arrival, departure});
// }
});

 // PAGE MY RESULTATS //
 router.get('/resultats', function(req, res, next) {
  res.render('resultats');
});

  // PAGE MY TICKETS //
router.get('/mytickets', async function(req, res, next) {
  console.log(req.query)
 

  res.render('mytickets');
});

 // PAGE ERROR //
router.get('/page-error', function(req, res, next) {
  res.render('page-error');
});



// PAGE LAST TRIPS //
router.get('/lasttrips', function(req, res, next) {
  res.render('lastTrips');
});







module.exports = router;
