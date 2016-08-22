
var bcrypt = require('bcrypt');
var controller = require('../controllers/authController.js');
var bluebird = require('bluebird');

var User = {};

User.create = function (userObj, callback) {

  var attrs = Object.assign({}, userObj);
  console.log("attrs in hashPassword: ", attrs);

  hashPassword(attrs.password)

  .then(function(hash) {
    console.log("hash in authPassword :", hash);
    attrs.password = hash;
    //delete userObj;
    console.log("attrs about to come back", attrs)
    callback(null, attrs);

  })
  .catch(function(err) {
    console.error("Error handling promise in hash :", err);
    callback(err);
  })
}





function hashPassword (password) {
  console.log("Just in hashPassword");
  // TODO: Encrypt the password using bcrypt (return a promise)
  var hasherFunc = bluebird.promisify(bcrypt.hash);
  var saltRounds = 10;

  return hasherFunc(password, saltRounds)
};


User.comparePassword = function (passwordHashFromDatabase, attemptedPassword) {

  return new Promise(function (resolve, reject) {

    bcrypt.compare(attemptedPassword, passwordHashFromDatabase, function(err, res) {
      if (err) reject(err)
      else     resolve(res)
    });
  })
};





module.exports = User;