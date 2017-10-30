//--------------------------- Menu data base ------------------------//

const uri = ("mongodb://menu:menu_17.71.19@drone-cafe-shard-00-00-ocpuv.mongodb.net:27017,drone-cafe-shard-00-01-ocpuv.mongodb.net:27017,drone-cafe-shard-00-02-ocpuv.mongodb.net:27017/test?ssl=true&replicaSet=Drone-cafe-shard-0&authSource=admin");

const mongoose			 = require('mongoose');
mongoose.connect(uri);
//---------------------------------------------------------------


const db 						 = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {console.log('----- Menu is connected! -----') });


//---------------------------------------------------------------


const Schema = mongoose.Schema;


const MenuScheme	= new Schema({
	title: String,
	image: String,
	id: Number,
	rating: Number,
	ingredients: Array,
	price: Number
});



const menu 		 = mongoose.model('menu', MenuScheme);

//---------------------------------------------------------------
// принимает -> ничего
// | ищет блюда если не находит, то возвращает <- false , иначе 
// возвращает <- все блюда
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
						if(err != undefined){
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
	getMenu, getDish, addDishes
};