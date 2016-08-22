
var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
var assert = require('assert');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')

mongoose.connect('mongodb://teamRamRod:cocacola1@ds023495.mlab.com:23495/pulse_legacy')



var UserSchema = new mongoose.Schema({
  name     : { type: String, required: true, trim: true },
  username : { type: String, required: true, trim: true, unique: true },
  password : { type: String, required: true, trim: true }
})

UserSchema.plugin(uniqueValidator);

var Person = mongoose.model('User', UserSchema)
var ObjectId = UserSchema.ObjectId;

module.exports = Person



