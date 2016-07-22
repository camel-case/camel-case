var insertNewUser = require('../userDB/userDb.js');
var authModal = require('../models/authModal');
var User = require('../auth/hashPassword.js');
var bluebird = require('bluebird');
var jwt = require('jsonwebtoken');




module.exports = {
  signup : {
    get : function(req, res) {
      authModal.signup.get(req.body, function(data, msg) {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send(msg);
        }
      })
    },
    post : function(req, res) {
      console.log("POST contoller req.body : ", req.body)
      User.create(req.body, function(err, hashResult) {
        if (err) {
          console.error("Error getting hash :", err);
        } else {
          console.log("This is the hashedUser : ", hashResult);
          authModal.signup.post(hashResult, function (data, msg) {
            if (data) {
              console.log("data in contoller", data);
              var userToken = jwt.sign(data.name, "DirtyMikeAndTheBoyz")
              console.log("data after token", data)
              res.status(201).json({userToken});
            } else {
              res.status(404).send(msg); 
            }
          });
        }
      })  
    },
    put : function(req, res) {
    },
    delete : function(req, res) {
      
    }
  },
  signin : {
    get: function (req, res) {

    },
    post : function(req, res) {
      
      authModal.signin.get(req.body, function(data, msg) {
        if (data) {
          User.comparePassword(data.password, req.body.password)
            .then(function(verifiedUser) {
              console.log("verifiedUser", verifiedUser)
              if (verifiedUser) {
                var userToken = jwt.sign(data.name, "DirtyMikeAndTheBoyz")
                console.log("data after token", verifiedUser)
                return res.status(201).json({userToken})     
              }
              else {
                console.error("Password's do not match!")
              }
            })      
        } else {
          res.status(404).send(msg);
        }
      })
    },
    // post : function(req, res) {
    //   console.log('in contoller.post: ', req.body)
    //   models.games.post(req.body, function(data, msg) {
    //     if (data) {
    //       res.status(201).json({success: true});
    //     } else {
    //       res.status(404).send(msg); 
    //     }
    //   });
    // },
    put : function(req, res) {
      
    },
    delete : function(req, res) {
      
    }
  }
}
