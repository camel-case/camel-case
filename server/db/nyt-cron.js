/* Checks titles and pushes to DB */
var nyt = require('./nyt-api');

/* All NYT sections to check for top day's stories */
var sections = require('../config/sections');


sections.forEach(function(section){
  nyt(section);
});
