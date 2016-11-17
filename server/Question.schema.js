QuestionSchema = {

	questionType: String,
	index: Number,
	points: Number,
	query: String,
	answers: [ {option: String, status: Boolean, index: Number} ],
	resCorrect: String,
	resIncorrect: String,
	mountain: String

};

module.exports = QuestionSchema;
