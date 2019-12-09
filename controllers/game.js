const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Game = require('../models/games.js');

router.post('/', async (req, res) =>{
	console.log(req.body)
	try{
		const findUser = await User.findOne({'email': req.session.email})
			.populate({
				path: 'backlogGames',
				match: { _id: req.params.id }
			})
			.exec()
		const createGame = await Game.create(req.body)
		findUser.backlogGames.push(createGame);
		await findUser.save();
		res.json({ user: findUser })
	} catch(err){
		console.log(err);
		res.send(err);
	}
});

module.exports = router;