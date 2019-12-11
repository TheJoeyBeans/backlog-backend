const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Game = require('../models/games.js');

//Adds a new game item to a user's backlog list. 
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

//Changes game status of playing, completed, or recommended.
router.put('/:id', async(req, res) =>{
	try{
		const updatedGame = await Game.findByIdAndUpdate(req.params.id, {$set: req.body} , {new: true});
		updatedGame.save();
		res.send({message: 'successfully updated', status: 200});
	} catch(err){
		res.send(err);
	}
})

router.put('/:id/comment', async(req, res) =>{
	try{
		console.log('Comment put body', req.body)
		const updatedGame = await Game.findById(req.params.id);
		updatedGame.comments.push(req.body.comment)
		updatedGame.save();
		console.log(updatedGame);
		res.send({updatedGame: updatedGame, message: 'successfully updated', status: 200});
	} catch(err){
		res.send(err);
	}
})
//Finds all of the backlogged games for a user.
router.get('/', async(req, res) =>{
	try{
		const foundUser = await User.findOne({'email': req.session.email})
			.populate({
				path: 'backlogGames',
				match: { _id: req.params.id }
			})
			.exec()
		res.send(foundUser);
	} catch(err){
		console.log(err);
		res.send(err);
	}
});

//Removes a game from a user's backlog and from the game's database.
router.delete('/:id', async(req, res) =>{
	try{
		const currentUser = await User.findOne({'backlogGames': req.params.id});
		await currentUser.backlogGames.remove(req.params.id);
		await currentUser.save();
		await Game.findByIdAndRemove(req.params.id);
		res.send({message: 'successfully deleted', status: 200})
	} catch(err){
		console.log(err);
		res.send(err);
	}
}) 

module.exports = router;









