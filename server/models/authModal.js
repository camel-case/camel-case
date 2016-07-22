
var NewUser = require('../userDB/userDb.js');
var user_data = require('../userDB/userDb.js');
var mongoose = require('mongoose');
var Person = require('../userDB/userDb.js')

module.exports = {
  signup : {
    get : function(params, callback) {

      var userObj = {
        username: params.username,
        password: params.hashedPassword
      }
      
      mongoose.model("User").find(params, function (err, blobs) {
        if (err) {
          console.error("Error on GET in modal: ", err);
        } else {
          callback(blobs)
        }
      })
    },

    post : function(params, callback) {

      console.log("POST in authModal params", params)

      var username = params.username;
      var password = params.password;
      var name = params.name

      //call the create fn from db
      mongoose.model('User').create({
        name : name,
        username : username,
        password : password
      }, function(err, blob) {
        if (err) {
          console.error("Error POSTing user to db", err);
        } else {
          // the blob is created!
          console.log("POST creating new blob: " + blob);
          callback(blob)
        }
      })
    },
      
    
    put : function(params, callback) {
      
    },
    delete : function(callback) {
     
    }
  },

  signin : {
    get : function(params, callback) {
      console.log('params in signin get:', params)
       Person.findOne({ username: params.username}, function (err, blob) {
        console.log(blob, "blobs in model")
          if (err) {
            console.error("Error on GET in modal: ", err);
          } else {
            console.log('this is the blob in the model : ', blob);
            callback(blob)
          }
        })
    }
  }
}