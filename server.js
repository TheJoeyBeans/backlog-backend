require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

require('./db/db');

app.use(session({
	key: 'session.sid',
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({mongooseConnection: mongoose.connection})
}))

app.use(express.static('public'))
app.use(bodyParser.json({ extended: true }));
app.use(methodOverride('_method'));
const clientDevPort = 3000;
app.use(cors({ 
	credentials: true,
    origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}` 
}));

// var whitelist = ['http://localhost:3000', 'https://backlog-capstone-backend.herokuapp.com', 'https://backlog-capstone.herokuapp.com']
// var corsOptions = {
// 	credentials: true,
// 	origin: function (origin, callback) {
// 		if (whitelist.indexOf(origin) !== -1){
// 			callback(null, true)
// 		} else {
// 			callback(new Error('Not allowed by CORS'))
// 		}
// 	}
// }

// app.use(cors(corsOptions));

const registrationController = require('./controllers/register.js');
app.use('/register', registrationController);

// const gamesController = require('./controllers/game.js');
// app.use('/game', gamesController);

app.get('/', (req, res) => {
	res.send(200)
})

app.listen(process.env.PORT, () => {
	console.log('listening');
});