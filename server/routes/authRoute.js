var express = require('express');
var app = express();
var router = express.Router();
var controllers = require('../controllers/authController.js')


for (var route in controllers) {
  router.route("/" + route)
    .get(controllers[route].get)
    .post(controllers[route].post)
    .put(controllers[route].put)
    .delete(controllers[route].delete);
}

module.exports = router;

