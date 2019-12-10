const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
	gameId: String,
	title: {type: String, required: true},
	image: String, 
	studio: String, 
	playing: Boolean,
	completed: Boolean, 
	recommended: Boolean
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;

// Games: 
// -Title
// -Cover Art
// -Studio
// -Year
// -Platform
// -playing: boolean
// -final impression
// -recommended: boolean