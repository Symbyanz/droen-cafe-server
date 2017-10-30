//------------------------- Server ----------------------//


const app = require('./app_modules/express.js');
const server = require('http').Server(app); 
const io = require('socket.io')(server); 
const order_db = require('./app_modules/mongo_db/order_db.js');
const menu_db = require('./app_modules/mongo_db/menu_db.js');
const user_db = require('./app_modules/mongo_db/user_db.js');
//-------------------------------------------------------------------------------------

let port				= process.env.PORT || 3000;

//------------------
app.get('/', function(req, res) {
	res.send('connection sucessfully!');
})


io.on('connection', function (socket) {
	console.log('user connection');

	socket.on('updateUserBalance', function(user) {
		user_db.updateUserBalance(user.email, user.balance);
	});

	socket.on('newUserOrder', function(user) {
		user_db.newUserOrder(user.email, user.order);
	});

});

//------------------

server.listen(port);