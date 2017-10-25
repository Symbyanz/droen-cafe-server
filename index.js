//------------------------- Server ----------------------//


const app = require('./app_modules/express.js');
const server = require('http').Server(app); 
const io = require('socket.io')(server); 
const db = require('./app_modules/mongoose.js');
//-------------------------------------------------------------------------------------

let port				= process.env.PORT || 3000;

//------------------
app.get('/', function(req, res) {
	res.send('connection sucessfully!');
})


io.on('connection', function (socket) {
	console.log('user connection');

	socket.on('updateUserBalance', function(user) {
		db.updateUserBalance(user._id, user.balance);
	});

	socket.on('newUserOrder', function(user) {
		db.newUserOrder(user._id, user.order);
	});

});

//------------------

server.listen(port);