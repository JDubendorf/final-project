var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');
var QuestionConstructor = require('./Question.schema.js');
var Question = mongoose.model('Question', QuestionSchema);

function importQuestion (mongoose, Question) {

	var questionsArr = [

		{
		  	questionType: 'multiple choice',
		  	index: 0,
		  	points: 10,
		  	query: 'How many strands are in a typical haulrope?', 
		  	answers: [ 
		  		{option: '4', status: false, index: 0}, 
		  		{option: '5', status: false, index: 1}, 
		  		{option: '6', status: true, index: 2}
		  	], 
		  	resCorrect: 'Yes, there are 6 strands in a typical haulrope.',
		  	resIncorrect: 'No- there are typically 6 strands in a haulrope.',
		  	mountain: 'global'
		  },

		  {
		  	questionType: 'true false',
		  	index: 1,
		  	points: 10, 
		  	query: 'Attendants should stand next to the control panel at all times.', 
		  	answers: [ 
		  		{option: 'true', status: true, index: 0}, 
		  		{option: 'false', status: false, index: 1}
		  	],
		  	resCorrect: 'Yes, attendants should always stay near the control panel.',
		  	resIncorrect: 'No- attendants should stand near the control panel at all times.',
		   	mountain: 'global'
		  },

		  {
		  	questionType: 'multiple choice',
		  	index: 2,
		  	points: 10, 
		  	query: 'The small wheels holding the haulrope on the towers are called: ', 
		  	answers: [ 
		  		{option: 'sheaves', status: true, index: 0}, 
		  		{option: 'shovels', status: false, index: 1},
		  		{option: 'shimmies', status: false, index: 2}
		  	], 
		  	resCorrect: 'Nice job. Sheaves hold up the haulrope.',
		  	resIncorrect: 'No- the wheels holding up the haulrope are called sheaves.',
		  	mountain: 'global'
		  }
	];

	questionsArr.forEach(function(obj){

	var myQuestion = new Question (obj);

	myQuestion.save((err) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log('saved question to DB');
	});

	})


};

importQuestion(mongoose, Question);