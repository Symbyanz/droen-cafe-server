
const db = require('../app_modules/mongo_db/order_db.js');

// -------------------------------------------------------
const order = {
_id: "dc8f4liw24f3",
dish_id: 517616,
title: "Cheese Popovers",
status: "Cooking",
client_email: "pankratov.symbyanz@bk.ru" };

const f_order = {
_id: "dc8f4liw24f3",
dish_id: 517616,
title: "Cheese Popovers",
status: "Cooking"
};
// -------------------------------------------------------
describe('All tests', () => {

	describe.skip('Add new order', () => {
	

			it('addOrder(order) -> true', (done)=> {
				db.addOrder(order).then(function(res) {
					if (res === false){
						done(err);
					} else {
						console.log(res);
						done();
					}
				});				
			}).timeout(5000);

			it('addOrder(f_order) -> false', (done)=> {
				db.addOrder(f_order).then(function(res) {
					if (res === false){
						done(err);
					} else {
						console.log(res);
						done();
					}
				});				
			}).timeout(5000);

	});

		describe.skip('get all orders', () => {

			it('getOrders() -> all orders', (done)=> {
				db.getOrders().then(function(res) {
					if (res === false){
						done(err);
					} else {
						console.log(res);
						done();
					}
				});				
			}).timeout(5000);

	});

		describe.skip('update status order', () => {

			it('updateOrderStatus(id заказа, status заказа) -> true', (done)=> {
				db.updateOrderStatus(order._id , order.status).then(function(res) {
					if (res === false){
						done(err);
					} else {
						console.log(res);
						done();
					}
				});				
			}).timeout(5000);

	});

		describe.skip('delete order', () => {

			it('deleteOrder(id заказа) -> true', (done)=> {
				db.deleteOrder(order._id).then(function(res) {
					if (res === false){
						done(err);
					} else {
						console.log(res);
						done();
					}
				});				
			}).timeout(5000);

			it('deleteOrder(ничего или не существующий id) -> false', (done)=> {
				db.deleteOrder().then(function(res) {
					if (res === false){
						done(err);
					} else {
						console.log(res);
						done();
					}
				});				
			}).timeout(5000);
	});
});