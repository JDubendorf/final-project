// $ npm init
// $ npm install --save express 

var express = require('express'),
	jwt = require('jsonwebtoken'),
	passport = require('passport'),
	passportJWT = require('passport-jwt'),
	LocalStrategy = require("passport-local").Strategy,
	JwtStrategy = require("passport-jwt").Strategy,
	ExtractJwt = require("passport-jwt").ExtractJwt
;
var app = express();

var cors = require('cors');
app.use(cors());

// if we want to handle session (login, etc)
// $ npm install --save express-session

var session = require('express-session');
app.use(session({
	secret: 'Secret Key',
	resave: false,
	saveUninitialized: false
}));


// set up connection to Mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');

var PORT = process.env.port || 8000;

var secret = 'hjsgasdfasfaoijfwlhdhdsgdk';

// if we want to handle post requests
// $ npm install --save body-parser

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());

// USER PASSPORT JWT CONFIG
passport.use('user-jwt', new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	secretOrKey: secret
	},function(jwt_payload, done) {
		User.findOne(
			{ _id: jwt_payload._id },
			(err, user) => {
				if (err) {
					done(err, false);
				} else if (user) {
					done(null, user);
				} else {
					done(null, false);
				}
			}
		);
	})
);

// USER PASSPORT LOCAL CONFIG
passport.use('user-local', new LocalStrategy(
	{usernameField: "username", passwordField: "password"},
	(username, password, done) => {
		User.findOne(
			{ username: username, password: password},
			(err, user) => {
			if (user) {
				user = user.toObject();

				user.jwt = jwt.sign(
					{ _id: user._id }, secret,
					{ expiresIn: 604800 }
				);
				return done(null, user); 
			} else {
				return done(null, false, {message: "Incorrect username or password" });
			}
		});
	}
));


// set up Question
var QuestionConstructor = require('./Question.schema.js'); 
var Question = mongoose.model('Question', QuestionSchema);

// set up User
var UserConstructor = require('./User.schema.js');
var User = mongoose.model('User', UserSchema);

//do this for every request
app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

// if we want to respond to GET requests for '/'
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/api/test', function(req, res) {
  Question.find({}, function(error, data) {
	res.send(data);
  });
});

app.post('/api/eval', passport.authenticate("user-jwt", {session: false}), function(req, res) {

	console.log(req.user);
	console.log(req.body);

// now have access to req.user
// req.body is all the questions

});

// USER REGISTRATION
app.post('/user/register', (req, res) => {
	// check to see if email already exists in database
	User.find({email: req.body.email}, (err, users) => {
		if (users.length === 0) {
			var newUser = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				username: req.body.username,
				password: req.body.password,
				email: req.body.email,
				mountain: 'default',
				role: 'learner',
				evaluations: []
			});

			// if no user exists, save new user to database
			newUser.save((err) => {
				// handle errors on save, just in case
				if (err) {
					console.error(err);
					res.send({status: 'error', message: 'unable to register user: ' + err});
					return;
				}

				newUser = newUser.toObject();

				newUser.jwt = jwt.sign({
					_id: newUser._id
				}, secret, {
					expiresIn: 604800 // 7 days in seconds
				});

				console.info('User ' + req.body.lastName + ' added');
				res.send({status: 'success',
					user: newUser
				});
			});
		} else if (err) {
			res.send({status: 'error', message: 'server error: ' + err});
		} else {
			res.send({status: 'error', message: 'an account with this email is already registered'});
		}
	});
});

// USER LOGIN
app.post('/user/login',	passport.authenticate("user-local", {session: false}), (req, res) => {
	if (req.user) {
		res.send({status: "success", user: req.user});
	} else {
		res.send({status: "error", message: "Incorrect username or password."});
	}
});

// GET USER BY ID
app.get('/user', passport.authenticate("user-jwt", {session: false}), (req, res) => {

	User.findById(req.user._id, (err, user) => {
		if (err) {
			res.send({status: 'error', message: 'err'});
			return;
		}

		user = user.toObject();

		user.jwt = jwt.sign({
			_id: user._id
		}, secret, {
			expiresIn: 604800 // 7 days in seconds
		});

		res.send({status: 'success', user: user});
	});
});

// if we want to serve static files out of ./public
app.use(express.static('public'));

// 404 error catcher
app.use(function(req, res, next) {
	res.status(404);
	res.send('404 Error - File Not Found');
});

// 500 error catcher
app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500);
	res.send('500 Error - Server Error');
});

// actually start the server
app.listen(PORT, function() {
	console.log('Listening on port ' + PORT);
});

