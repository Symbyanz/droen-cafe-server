//------------------------- Server ----------------------//


const app = require('./app_modules/express.js');
const server = require('http').Server(app); 
const io = require('socket.io')(server); 
const order_db = require('./app_modules/mongo_db/order_db.js');
const menu_db = require('./app_modules/mongo_db/menu_db.js');
const user_db = require('./app_modules/mongo_db/user_db.js');
const drone = require('./app_modules/fake_drone/netology-fake-drone-api.js');

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

// -----------------------------------------------------------------------------------------------
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
		io.emit('addKitchenOrder', order);
	});

// -----------------------------------------------------------------------------------------------
	socket.on('cookingKitchenOrder', function(order_data) {
		order_db.updateOrderStatus(order_data._id, order_data.status);
		user_db.updateUserStatus(order_data.client_email, order_data._id, order_data.status);
		io.emit('updateUserStatus', order_data);
	});

// -----------------------------------------------------------------------------------------------
	socket.on('readyKitchenOrder', function(order_data) {
		order_db.deleteOrder(order_data._id);
		user_db.updateUserStatus(order_data.client_email, order_data._id, order_data.status);
		io.emit('updateUserStatus', order_data);
		//  перекинуть в отдельный модуль droen.. в котором выполнить всё что ниже
		let user_data = user_db.getUser(order_data.client_email);
		let dish_data = menu_db.getDish(order_data.dish_id);

		drone
			.deliver(user_data, dish_data)
			.then(() => {
				order_data.status = 'Arrived';
				user_db.updateUserStatus(order_data.client_email, order_data._id, order_data.status);
				io.emit('updateUserStatus', order_data);

				setTimeout(()=>{
					user_db.deleteUserOrder(order_data.client_email, order_data._id);
					io.emit('deleteUserOrder', order_data.client_email, order_data._id, 0);
				}, 120000);
			})
			.catch(() => {
				order_data.status = 'Problems';
				user_db.updateUserStatus(order_data.client_email, order_data._id, order_data.status);
				io.emit('updateUserStatus', order_data);

				setTimeout(()=>{
					user_db.deleteUserOrder(order_data.client_email, order_data._id);
					io.emit('deleteUserOrder', order_data.client_email, order_data._id, dish_data.price);
					user_db.updateUserBalance(user_data.email, dish_data.price);
				}, 120000);
		});
	});

});

//------------------

server.listen(port);