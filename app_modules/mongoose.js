//--------------------------- Mongoose ------------------------//

const uri = ("mongodb://Vyacheslav:stiletto_07.47@drone-cafe-shard-00-00-ocpuv.mongodb.net:27017,drone-cafe-shard-00-01-ocpuv.mongodb.net:27017,drone-cafe-shard-00-02-ocpuv.mongodb.net:27017/test?ssl=true&replicaSet=Drone-cafe-shard-0&authSource=admin");

const mongoose			 = require('mongoose');
mongoose.connect(uri);
//---------------------------------------------------------------


const db 						 = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {console.log('----- Data base is connected! -----') });


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

const MenuScheme	= new Schema({
	title: String,
	image: String,
	id: Number,
	rating: Number,
	ingredients: Array,
	price: Number
});


const menu 		 = mongoose.model('menu', MenuScheme);
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

		getUser(data_user).then(res_getUser => {
			if(res_getUser === null){
				addUser(data_user).then(res_addUser => {
					if(res_addUser === false) res (false);
					else {
						getUser(data_user).then(docs => {
							res(docs);
						})
					}
				})
			} else res(res_getUser);
		})

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

// Не экспортируемая функция 
// принимает -> объект с содержанием email
// | ищет пользователя по email
// возвращает <- объект пользователя
function getUser(data_user) {
	return new Promise((res, rej) => {
		if(data_user.email === undefined) res(false);
		else {
			user.findOne({email: data_user.email}, (err,docs) => {
				if(err) res(false);
				else res(docs);
			})
		}
	})
};
// принимает -> id и balance пользователя
// | делает изменения в объекте пользователся
// возвращает <- true, если всё ок, false, если всё плохо
function updateUserBalance(id_user, balance_user) {
	return new Promise((res,rej) => {
		user.findOne({_id: id_user}, (err, docs) => {
			if(err || id_user === undefined) {
				res(false);
			}	else {
				docs.update({balance: balance_user}).exec();

				res(true);
			}
		})
	})
}
// принимает -> id пользователя и данные нового ордера
// | ищет пользователя, если не находит возвращает -> false
// | если находит, обновляет его данные, добавляя в массив его заказов новый
// возвращает <- true
function newUserOrder(id_user, newOrder_user) {
	return new Promise((res, rej) => {
		user.findOne({_id: id_user}, (err, docs) => {
			if(err || id_user === undefined) {
				res(false);
			}	else {
				docs.update({ $push: { orders: newOrder_user } }).exec();
				res(true);
			}
		})
	})
}

//---------------------------------------------------------------
// принимает -> ничего
// | ищет блюда если не находит, то возвращает <- false , иначе 
// возвращает <- true
function getMenu() {
	return new Promise((res, rej) => {
		menu.find({}, (err,docs) => {
			if(err) res(false);
			else res(docs);
		})
	})
}
// принимает -> id блюда
// | делает проверку на id.. Если id = undefined возвращает <- false 
// | иначе ищет блюдо с этим id, если не находит возвращает <- false
// иначе возвращает <- объект с блюдом
function getDish(id) {
	return new Promise((res, rej) => {
		if(id === undefined) res(false);
		else {
			menu.findOne({id: id}, (err,docs) => {
				if(err || docs === null) res(false);
				else res(docs);
			})
		}
	})
}

// функция не экспортируется
// принимает -> объект блюда
// | делает проверки .. если чего-то не указано  возвращает <- false
// | иначе создает в меню новое блюдо, если не удача возвращает <- false
// иначе возвращает <- true

// использовал лишь для заполнения mongodb блюдами
function addDish(data_dish) {
	return new Promise((res, rej) => {
		if(data_dish.title === undefined || 
			data_dish.image === undefined || 
			data_dish.id === undefined || 
			data_dish.rating === undefined || 
			data_dish.ingredients === undefined || 
			data_dish.price === undefined 
			) res(false);
			else{
				menu.create({ 
					title: data_dish.title,
					image: data_dish.image,
					id: data_dish.id,
					rating: data_dish.rating,
					ingredients: data_dish.ingredients,
					price: data_dish.price	}, (err) => {
						if(err){
							res(false);
						} else {
							res(true);
						}
					})
			}
		})
};
// функция не экспортируется
// принимает -> объект большого колличества блюд
// | ищет соответствие каждого из блюд в меню, если находит
// | возвращает <- true и продолжает..
// | иначе вызывает функцию addDish которой передает это блюдо
// возвращает <- ответ функции addDish и продолжает..

// использовал лишь для заполнения mongodb блюдами
function addDishes(data_dishes) {
	return new Promise((res, rej) => {
		if(typeof(data_dishes) === 'object'){
			getDish(data_dishes.id).then(res_getDish =>{
				if(res_getDish){
					res(true);
				} else {
					addDish(data_dishes).then(res_addDish => {
						if(res_addDish === false) res(false);
						else res(true);
					})
				}
			})
		}else{
			res(false);
		}
	})
}





//---------------------------------------------------------------
//для проверки отдельных ф-ий через mocha - экспортировать
module.exports = {
	loginUser, updateUserBalance, newUserOrder,
	getMenu, getDish, addDishes
};