//--------------------------- user data base ------------------------//

const uri = ("mongodb://user:user_32.21.17@drone-cafe-shard-00-00-ocpuv.mongodb.net:27017,drone-cafe-shard-00-01-ocpuv.mongodb.net:27017,drone-cafe-shard-00-02-ocpuv.mongodb.net:27017/test?ssl=true&replicaSet=Drone-cafe-shard-0&authSource=admin");

const mongoose			 = require('mongoose');
mongoose.connect(uri);
//---------------------------------------------------------------

const db 						 = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {console.log('----- Users is connected! -----') });

//---------------------------------------------------------------


const Schema = mongoose.Schema;

const UserScheme    = new Schema({
	name: {
		type: String,
		default: 'NoName'
	},
	email: {
		type: String
	},
	balance: {
		type: Number,
		default: 100
	},
	orders: {
		type: Array,
		default: []
	}
});

const user     = mongoose.model('user', UserScheme);
//---------------------------------------------------------------





// --- work with users --- 

// принимает -> data_user = {email: "xxx", name: "xxx или ничего"}
// | перенаправляет данные в функцию getUser, которая возвращает либо объект пользователя,
//         и сама тогда  возвращает <- данные о пользователе 
// | либо ошибку, тогда вызывает функцию addUser и передает ей данные, получает объект
//         и сама  возвращает <- данные о новом пользователе  
function loginUser(data_user) {
	return new Promise ((res, rej) => {

		getUser(data_user.email).then(res_getUser => {
			if(res_getUser === null){
				addUser(data_user).then(res_addUser => {
					if(res_addUser === false) res (false);
					else {
						getUser(data_user.email).then(docs => {
							res(docs);
						})
					}
				})
			} else res(res_getUser);
		})

	})
};


// принимает -> объект с содержанием email
// | ищет пользователя по email
// возвращает <- объект пользователя
function getUser(email) {
	return new Promise((res, rej) => {
		if(email === undefined) res(false);
		else {
			user.findOne({email: email}, (err,docs) => {
				if(err) res(false);
				else res(docs);
			})
		}
	})
};

// не экспортируема функция 
// принимает -> объект, который !обязательно содержит email, иначе вернет <- false
// | создает пользователя 
//  возвращает <- объект с новым пользователем
function addUser(data_user) {
	return new Promise((res, rej) => {
		if(data_user.email === undefined) res(false);
		else{
			user.create({ name: data_user.name || undefined,
				email: data_user.email}, (err) => {
					if(err){
						res(false);
					} else {
						res(true);
					}
				})
		}
	})
};

// принимает -> email и balance пользователя
// | делает изменения в объекте пользователся
// возвращает <- true, если всё ок, false, если всё плохо
function updateUserBalance(email_user, balance_user) {
	return new Promise((res,rej) => {
		getUser(email_user).then(result => {
			if(result === false) {
				res(result);
			}	else {
				result.update({balance: balance_user}).exec();
				res(true);
			}
		})
	})
}
// принимает -> email пользователя и данные нового ордера
// | ищет пользователя, если не находит возвращает -> false
// | если находит, обновляет его данные, добавляя в массив его заказов новый
// возвращает <- true
function newUserOrder(email_user, newOrder_user) {
	return new Promise((res, rej) => {
		getUser(email_user).then(result => {
			if(result === false) {
				res(result);
			}	else {
				result.update({ $push: { orders: newOrder_user } }).exec();
				res(true);
			}
		})
	})
}


// принимает -> email (пользователя) , _id (id заказа) , status (блюда) (! _id и id_dish - разное)
// | ищет пользователя и обновляет статус 
// возвращает <- true ..
function updateUserStatus(email_user, _id, newStatus_dish) {
	return new Promise((res,rej) => {
		user.findOneAndUpdate(
			{ 'email': email_user, 'orders._id': _id }, { $set:{ 'orders.$.status': newStatus_dish } },
			function(err,result){
				if (err) res(false);
				else res(true);
			});
	})
}


// принимает -> email (пользователя) , _id (id заказа) (! _id и id_dish - разное)
// | ищет пользователя и обновляет удаляет этот заказ 
// возвращает <- true ..
function deleteUserOrder(email_user, _id) {
	return new Promise((res,rej) => {
		user.update({email: email_user}, {$pull: {orders: {_id:  _id} }}).exec();
		res(true);
	})
}
//---------------------------------------------------------------
//для проверки отдельных ф-ий через mocha - экспортировать
module.exports = {
	loginUser, updateUserBalance, newUserOrder,
	deleteUserOrder, updateUserStatus, getUser
};