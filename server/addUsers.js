var mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost');
var UserConstructor = require('./User.schema.js');
var User = mongoose.model('User', UserSchema);

function importUser (mongoose, User) {

	var userArr = [

		{
			firstName: 'James',
			lastName: 'Dubendorf',
			username: 'jdubendorf',
			password: '1password',
			email: 'dubendorf@none.com',
			mountain: 'Default Mountain',
			role: 'administrator',
			evaluations: [ {title: 'LATP', date: '11/12/16', result: 96} ]
		},
		{
			firstName: 'Nate',
			lastName: 'Farnsworth',
			username: 'nfarnsworth',
			password: '1password',
			email: 'farnsworth@none.com',
			mountain: 'CodeCraft Mountain',
			role: 'manager',
			evaluations: [ {title: 'LATP', date: '11/16/16', result: 82} ]
		},
		{
			firstName: 'Katie',
			lastName: 'Smyth',
			username: 'ksmith',
			password: '1password',
			email: 'smyth@none.com',
			mountain: 'CodeCraft Mountain',
			role: 'learner',
			evaluations: [ {title: 'LATP', date: '11/20/16', result: 100} ]
		},
		{
			firstName: 'Scott',
			lastName: 'Loveless',
			username: 'sloveless',
			password: '1password',
			email: 'loveless@none.com',
			mountain: 'CodeCraft Mountain',
			role: 'learner',
			evaluations: [ {title: 'LATP', date: '11/20/16', result: 97} ]
		}

	];

	userArr.forEach(function(obj){

	var myUser = new User (obj);

	myUser.save((err) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log('saved users to DB');
	});

	});

}

importUser(mongoose, User);