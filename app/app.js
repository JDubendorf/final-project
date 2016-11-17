var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');

var QuestionSchema = require ('./Question.schema.js');
var Question = mongoose.model('Question', QuestionSchema);