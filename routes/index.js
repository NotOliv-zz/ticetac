var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
var journeyModel = require('../models/journeys')
var UserModel = require('../models/users')

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
 };

// --------------------- BDD -----------------------------------------------------
mongoose.connect('mongodb+srv://dev:test@cluster0.exm89.mongodb.net/journey?retryWrites=true&w=majority',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
   }
);



var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});


// Remplissage de la base de donnée, une fois suffit
router.get('/save', async function(req, res, next) {

  // How many journeys we want
  var count = 300

  // Save  ---------------------------------------------------
    for(var i = 0; i< count; i++){

    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

    if(departureCity != arrivalCity){

      var newUser = new journeyModel ({
        departure: departureCity , 
        arrival: arrivalCity, 
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });
       
       await newUser.save();

    }

  }
  res.render('index', { title: 'Express' });
});


// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function(req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){

    journeyModel.find( 
      { departure: city[i] } , //filtre
  
      function (err, journey) {

          console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )

  }

  res.render('index', { title: 'Express' });
});


router.get('/recherche', function(req, res, next) {

  res.render('recherche');
});

router.post('/search', async function(req, res, next) {
  var departure = req.body.depart;
  var arrival = req.body.arrivee;
  var date = req.body.date; 
 

  var journeys = await journeyModel.find(
    { departure : departure,
    arrival: arrival,
    date:date}
)
console.log(journeys)

  res.render('resultats', {journeys, date, arrival, departure});
});


  // MY TICKETS //
router.get('/mytickets', async function(req, res, next) {
  console.log(req.query)

var user 


  res.render('mytickets');
});

router.get('/page-error', function(req, res, next) {
  res.render('page-error');
});

router.get('/resultats', function(req, res, next) {
  res.render('resultats');
});


router.get('/lasttrips', function(req, res, next) {
  res.render('lastTrips');
});







module.exports = router;
