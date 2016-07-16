var sentiment = require('sentiment');

module.exports = function(title, abstract){

  var reactions = {};
  reactions.angry = 0;
  reactions.scared = 0;

  var algo = sentiment(title + ' ' + abstract);
  console.log('algo: ', algo)

  if (algo.score > 0) {
    reactions.happy = algo.score;
    reactions.sad = 0;
  }

  if (algo.score < 0) {
    reactions.happy = 0;
    reactions.sad = Math.abs(algo.score);
  }

  if (algo.score === 0) {
    reactions.happy = 0;
    reactions.sad = 0;
  }

  console.log(reactions)
  return reactions;

}
