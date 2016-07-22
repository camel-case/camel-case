var firebase = require('firebase');
var moment = require('moment');

var config = require('../config/config');
var sentiment = require('./sentiment');

firebase.initializeApp({
  serviceAccount: config.firebase,
  databaseURL: 'https://camel-case-e34bc.firebaseio.com'
});


/* Use moment to ping NYT API for today's most popular articles */
function getDateNow() {
  var dateNow = moment().format('MM-DD-YY')
  return dateNow; 
}
/* Instantiate a ref to the DB */
var db = firebase.database().ref(dateNow);

/* Gets invoked for new section */
module.exports = function(data) {

  /* only check DB if API call for section returns data */
  if (data.length) {
    checkDB(data)
  }

  /* Get a single snapshot DB contents for today */
  function checkDB(rawData) {
    db.once('value').then(function(snapshot){
      /* Iterate over contents of what's already in DB */
      snapshot.forEach(function(childSnapshot) {
        /* Each entry object */
        var entry = childSnapshot.val();
        /* Diff against incoming raw data from NYT API */
        for(var i = 0; i < rawData.length; i++) {
          if (entry.title == rawData[i].title){
            /* If title already in DB, splice out */
            rawData.splice(i, 1);
            break;
          } 
        }
      })
      /* Only map and push data if something new exists */
      if (rawData.length) {
        pushToDB(rawData)
      }
    })
  }

  function pushToDB(rawData){
    /* map rawData to schema before pushing into firebase */
    var mappedData = rawData.map(function(article){
      var obj = {
        title: article.title,
        abstract: article.abstract,
        url: article.url,
        published_date: article.published_date,
        section: article.section,
        reactions: sentiment(article.title, article.abstract)
      };
      return obj;
    })

    mappedData.forEach(function(article){
      /* use push to generate unique ID for each article */
      db.push(article)
    });
  }

}
