//--------------------------- Order data base ------------------------//

const uri = ("mongodb://order:order_16.61.11@drone-cafe-shard-00-00-ocpuv.mongodb.net:27017,drone-cafe-shard-00-01-ocpuv.mongodb.net:27017,drone-cafe-shard-00-02-ocpuv.mongodb.net:27017/test?ssl=true&replicaSet=Drone-cafe-shard-0&authSource=admin");

const mongoose			 = require('mongoose');
mongoose.connect(uri);
//---------------------------------------------------------------


const db 						 = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {console.log('----- Orders is connected! -----') });


//---------------------------------------------------------------


const Schema = mongoose.Schema;

const OrderScheme = new Schema({
	_id: String,
	title: String,
	status: String,
	dish_id: Number,
	client_email: String
});


const order     = mongoose.model('order', OrderScheme);

//---------------------------------------------------------------

// Не экспортируемая функция 
// принимает -> объект с содержанием _id заказа
// | ищет заказа по его _id 
// возвращает <- объект заказа или false
function getOrder(_id) {
	return new Promise((res, rej) => {
		if(_id === undefined) res(false);
		else {
			order.findOne({_id: _id}, (err,docs) => {
				if(err) res(false);
				else res(docs);
			})
		}
	})
};


// принимает -> ничего
// | ищет заказы если не находит, то возвращает <- false , иначе 
// возвращает <- все заказы
function getOrders() {
	return new Promise((res, rej) => {
		order.find({}, (err,docs) => {
			if(err) res(false);
			else res(docs);
		})
	})
}

// принимает -> объект, который !обязательно содержит все данные схемы, иначе вернет <- false
// | создает заказ
//  возвращает <- объект true или false
function addOrder(data_order) {
	return new Promise((res, rej) => {
		if(data_order._id === undefined || 
			data_order.title === undefined || 
			data_order.status === undefined || 
			data_order.dish_id === undefined || 
			data_order.client_email === undefined	) res(false);
			else{
				order.create({ _id: data_order._id,
					title: data_order.title,
					status: data_order.status,
					dish_id: data_order.dish_id,
					client_email: data_order.client_email }, (err) => {
						if(err != undefined){
							res(false);
						} else {
							res(true);
						}
					})
			}
		})
};


// принимает -> email (пользователя) , _id (id заказа) , status (блюда) (! _id и id_dish - разное)
// | ищет пользователя, если не находит возвращает -> false
// | если находит, внутри result ищет по _id, обновляя статус 
// возвращает <- true ..
function updateOrderStatus(id_order, newStatus_order) {
	return new Promise((res,rej) => {
		getOrder(id_order).then(result => {
			if(result === false) {
				res(result);
			}	else {
				result.update({ status : newStatus_order }, false).exec();
				res(true);
			}
		})
	})
}

// принимает ->  _id (id заказа)
// | проверяет наличие такого заказа
// | удаляет заказ с этим id после 
// возвращает <- true ..
function deleteOrder(id_order) {
	return new Promise((res,rej) => {
		getOrder(id_order).then(result => {
			if(result === false) {
				res(result);
			}	else {
				result.remove();
				res(true);
			}
		})
	})
}


//---------------------------------------------------------------
//для проверки отдельных ф-ий через mocha - экспортировать
module.exports = { getOrders, addOrder, updateOrderStatus, deleteOrder };