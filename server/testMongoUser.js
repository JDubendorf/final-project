module.exports = function (mongoose, User) {

	var myUser = new User ({

		firstName: 'Linda',
		lastName: 'Jones',
		username: 'ljones',
		password: 'password1',
		email: 'ljones@none.com',
		mountain: 'Default Mountain',
		role: 'learner',
		evaluations: [ {title: 'LATP', date: '11/02/16', result: 95} ]

	});

	myUser.save((err) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log('saved User to DB');
	});

};