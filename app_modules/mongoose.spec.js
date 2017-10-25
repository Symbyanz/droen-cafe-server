var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();

const db = require('./mongoose.js');

// for user db
// -------------------------------------------------------
var user_email = {	email: 'psfd@bk.sd'	};
var user_name = {	name: 'dsfsd'	};
var user_full = {
	email: 'psfd@bk.sd',
	name: 'dsfsd'	};
	var user_new = { email: 'new@dsk.sd'	};


// -------------------------------------------------------
	var new_balance_user = { _id: "59ef5be5237a32086479c079", balance: 300};
	var new_orders_user = { _id: "59ef5be5237a32086479c079",
	orders: [{"id": 587071, "title": "new order one", "status": "cooking"},
	{"id": 2294, "title": "Cha Ca Thang Long : Vietnamese Dill Fish with Turmeric", "status": "Arrived"}]	};
// for menu db
// -------------------------------------------------------

var dish = {
	"title": "Mini Dark Chocolate Candy Cane Kiss Cheesecakes",
	"image": "https://spoonacular.com/recipeImages/Mini-Dark-Chocolate-Candy-Cane-Kiss-Cheesecakes-587071.png",
	"id": 587071,
	"rating": 25804,
	"ingredients": [
	"butter",
	"candy cane",
	"cream cheese",
	"granulated sugar",
	"oreo cookies",
	"semi sweet chocolate",
	"whole eggs"
	],
	"price": 83
};
var dish_no_full ={
	"title": "Mini Dark Chocolate Candy Cane Kiss Cheesecakes",
	"image": "https://spoonacular.com/recipeImages/Mini-Dark-Chocolate-Candy-Cane-Kiss-Cheesecakes-587071.png",
	"rating": 25804
};
// -------------------------------------------------------
describe('All tests', () => {

	describe('User data base', () => {

		// функция addUser не экспортирована
		// describe('Test for the functions add user..', () => {

		// 	it.skip('addUser(user_email) -> true', (done)=> {
		// 		db.addUser(user_email).then(function(res) {
		// 			if (!res) done(err);
		// 			else done();
		// 		});				
		// 	});
		// 	it.skip('addUser(user_name) -> error', (done)=> {
		// 		db.addUser(user_name).then(function(res) {
		// 			if (!res) done(err);
		// 			else done();
		// 		});				
		// 	});
		// 	it.skip('addUser(user_full) -> true', (done)=> {
		// 		db.addUser(user_full).then(function(res) {
		// 			if (!res) done(err);
		// 			else done();
		// 		});				
		// 	});

		// });

		// функция getUser не экспортирована
		// describe('Test for the functions get user..',() =>{

		// 	it.skip('getUser(user_email) -> true', (done)=> {
		// 		db.getUser(user_email).then(function(res) {
		// 			if (res === false) done(err);
		// 			else {
		// 				console.log(res);
		// 				done();
		// 			}
		// 		});				
		// 	});
		// 	it.skip('getUser(user_name) -> Error', (done)=> {
		// 		db.getUser(user_name).then(function(res) {
		// 			if (res === false) done(err);
		// 			else {
		// 				console.log(res);
		// 				done();
		// 			}
		// 		});				
		// 	});
		// 	it.skip('getUser(user_full) -> true', (done)=> {
		// 		db.getUser(user_full).then(function(res) {
		// 			if (res === false) done(err);
		// 			else {
		// 				console.log(res);
		// 				done();
		// 			}
		// 		});				
		// 	});

		// });

		describe.skip('Test for the functions login user..',() =>{

			it('loginUser(user_email) -> true', (done)=> {
				db.loginUser(user_email).then(function(res) {
					if (res === false) done(err);
					else {
						console.log(res);
						done();
					}
				});				
			});
			it('loginUser(user_name) -> Error', (done)=> {
				db.loginUser(user_name).then(function(res) {
					if (res === false) done(err);
					else {
						console.log(res);
						done();
					}
				});				
			});
			it('loginUser(user_full) -> true', (done)=> {
				db.loginUser(user_full).then(function(res) {
					if (res === false) done(err);
					else {
						console.log(res);
						done();
					}
				});				
			});
			it('loginUser(user_new) -> true', (done)=> {
				db.loginUser(user_new).then(function(res) {
					if (res === false) done(err);
					else {
						console.log(res);
						done();
					}
				});				
			});

		});

		describe('Test for the functions update data user..',() =>{

			it.skip('update balance user(id , balance) -> true', (done)=> {
				db.updateUserBalance(new_balance_user._id, new_balance_user.balance).then(function(res) {
					if (res === false){
						done(err);
					}	else {
						console.log(res);
						done();
					}
				});				
			});

			it.skip('update balance user(id , balance) -> error (time)', (done)=> {
				db.updateUserBalance(new_balance_user.balance).then(function(res) {
					if (res === false){
						done(err);
					}	else {
						console.log(res);
						done();
					}
				});				
			});
			// add one order
			it('push new order for user(new_orders_user) -> true', (done)=> {
				db.pushNewOrders(new_orders_user._id, new_orders_user.orders[0]).then(function(res) {
					if (res === false){
						done(err);
					}	else {
						console.log(res);
						done();
					}
				});				
			});

		});
	});

	describe('Menu data base', () => {

		// функция не экспортирована
		// describe.skip('Test for the functions add menu/dish..',() =>{

		// 	it.skip('addDish(dish) -> true', (done)=> {
		// 		db.addDish(dish).then(function(res) {
		// 			if (res === false) done(err);
		// 			else {
		// 				console.log(res);
		// 				done();
		// 			}
		// 		});				
		// 	});
		// 	it('addDish(dish_no_full) -> false', (done)=> {
		// 		db.addDish(dish_no_full).then(function(res) {
		// 			if (res === false) done(err);
		// 			else {
		// 				console.log(res);
		// 				done();
		// 			}
		// 		});				
		// 	});

		// });


		describe.skip('Test for the functions get menu/dish..',() =>{
			it('getMenu() -> [] or [{data}, {data}, ...]', (done)=> {
				db.getMenu().then(function(res) {
					if (res === false) done(err);
					else {
						console.log(res);
						done();
					}
				});				
			});
			it.skip('getDish(58707132) -> Error', (done)=> {
				db.getDish(58707132).then(function(res) {
					if (res === false) done(err);
					else {
						console.log(res);
						done();
					}
				});				
			});	
			it.skip('getDish(587071) -> {data...}', (done)=> {
				db.getDish(587071).then(function(res) {
					if (res === false) done(err);
					else {
						console.log(res);
						done();
					}
				});				
			});	
		});

		describe.skip('Test for the functions add Many dishes..',() =>{


			it.skip('addDishes(Namber) -> false', (done)=> {
				db.addDishes(5).then(function(res) {
					if (res === false) done(err);
					else {
						console.log(res);
						done();
					}
				});				
			});
			it.skip('addDishes(String) -> false', (done)=> {
				db.addDishes('sdflms').then(function(res) {
					if (res === false) done(err);
					else {
						console.log(res);
						done();
					}
				});				
			});
			it('addDishes(array) -> false', (done)=> {
				db.addDishes([dish]).then(function(res) {
					if (res === false){
						done(err);
					} else {
						console.log(res);
						done();
					}
				});				
			});
			it('addDishes(dish) -> true', (done)=> {
				db.addDishes(dish).then(function(res) {
					if (res === false){
						done(err);
					} else {
						console.log(res);
						done();
					}
				});				
			});
			it('addDishes(dish_no_full) -> false', (done)=> {
				db.addDishes(dish_no_full).then(function(res) {
					if (res === false){
						done(err);
					} else {
						console.log(res);
						done();
					}
				});				
			});

		});

	});
});