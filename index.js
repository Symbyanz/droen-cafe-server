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

	socket.on('updateUserBalance', function(user) {
		user_db.updateUserBalance(user.email, user.balance);
	});

	socket.on('newUserOrder', function(user) {
		// сохранение в базу данных
		let order = {
			_id: user.order._id, 
			title: user.order.title, 
			status: user.order.status,
			dish_id: user.order.dish_id, 
			client_email: user.email
		}
		user_db.newUserOrder(user.email, user.order);
		order_db.addOrder(order);

		io.emit('addOrder', order);
	});

	socket.on('cookingOrder', function(order_data) {
		order_db.updateOrderStatus(order_data._id, order_data.status);
		user_db.updateUserStatus(order_data.client_email, order_data._id, order_data.status);

		io.emit('updateStatus', order_data);
	});


	socket.on('readyOrder', function(order_data) {
		order_db.deleteOrder(order_data._id);
		user_db.updateUserStatus(order_data.client_email, order_data._id, order_data.status);

		io.emit('updateStatus', order_data);
	});

});

//------------------

server.listen(port);