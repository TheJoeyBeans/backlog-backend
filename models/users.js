const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	displayName: {type: String, required: true},
	email: {type: String, required: true, unique: true}, 
	password: {type: String, required: true},
	backlogGames: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Game'
	}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;




// //Users: 
// -E-mail/Password
// -backLogGames: []
// -completedGames: []
// -Recommended Games:[]
// -STRETCH GOAL:
// 	-Following: []
// 	-Followers: []