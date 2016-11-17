UserSchema = { 

	firstName: String,
	lastName: String,
	username: String,
	password: String,
	email: String,
	mountain: String,
	role: String,
	evaluations: [ {title: String, date: String, result: Number} ]

};



module.exports = UserSchema;
