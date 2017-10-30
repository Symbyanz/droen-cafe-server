var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();

const db = require('../app_modules/mongo_db/user_db.js');

// for user db
// -------------------------------------------------------
var user_email = {	email: 'psfd@bk.sd'	};
var user_name = {	name: 'dsfsd'	};
var user_full = {
	email: 'psfd@bk.sd',
	name: 'dsfsd'	};
	var user_new = { email: 'new@dsk.sd'	};
// -------------------------------------------------------
var new_balance_user = { email: "pankratov.symbyanz@bk.ru", balance: 300};
var new_orders_user = { email: "pankratov.symbyanz@bk.ru",
orders: [{"id": 587071, "title": "new order one", "status": "Cooking"},
{"id": 2294, "title": "Cha Ca Thang Long : Vietnamese Dill Fish with Turmeric", "status": "Arrived"}]	};

var new_status_user = { email: "pankratov.symbyanz@bk.ru", id: 587071, status: "Cooking"};
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

			it.skip('update balance user(email , balance) -> true', (done)=> {
				db.updateUserBalance(new_balance_user.email, new_balance_user.balance).then(function(res) {
					if (res === false){
						done(err);
					}	else {
						console.log(res);
						done();
					}
				});				
			});

			it.skip('update balance user(email , balance) -> error (time)', (done)=> {
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
			it.skip('push new order for user(new_orders_user) -> true', (done)=> {
				db.newUserOrder(new_orders_user.email, new_orders_user.orders[0]).then(function(res) {
					if (res === false){
						done(err);
					}	else {
						console.log(res);
						done();
					}
				});				
			});

			it('update status the dishes from the user(new_status_user) -> true', (done)=> {
				db.newUserOrder(new_orders_user.email, new_orders_user.id, new_orders_user.status).then(function(res) {
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

});