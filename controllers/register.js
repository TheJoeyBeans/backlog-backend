const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) =>{
	console.log(req.body)
	try{
		const password = req.body.password;
		const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
		const newUser = {};
		newUser.displayName = req.body.displayName;
		newUser.email = req.body.email;
		newUser.password = passwordHash;

		const createdUser = await User.create(newUser);
		console.log('Created user', createdUser)
		req.session.username = createdUser.username;
		req.session.logged = true;

		res.send({message: "User Registered", status: 201})
	} catch(err){
		res.send(err);
	}
});

router.post('/login', async (req, res) =>{
	try {
		const foundUser = await User.findOne({email: req.body.email});
		if(foundUser){
			if(bcrypt.compareSync(req.body.password, foundUser.password)){
				req.session.message = '';
				req.session.username = foundUser.username;
				req.session.logged = true;
				res.send({message: "User LoggedIn", status: 200})
			} else {
				req.session.message = "Username/password incorrect";
				res.redirect('/');
			}
		} else {
			req.session.message = "Username/password incorrect";
			res.redirect('/');
		}
	} catch(err){
		res.send(err);
	}
});

module.exports = router;