module.exports = function (mongoose, User) {

	var myUser = new User ({

		firstName: 'James',
		lastName: 'Dubendorf',
		username: 'jdubendorf',
		password: 'password1',
		email: 'jdubendorf@none.com',
		mountain: 'Default Mountain',
		role: 'administrator',
		evaluations: []

	});

	myUser.save((err) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log('saved User to DB');
	});

};