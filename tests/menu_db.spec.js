var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();

const db = require('../app_modules/mongo_db/menu_db.js');

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