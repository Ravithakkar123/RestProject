const foodModel = require('../models/foodItems.model');
const cartModel = require('../models/cart.model');
const paymentModel = require('../models/payment.model');
const orderModel = require('../models/orderDetails.model');

const ObjectId = require('mongodb').ObjectId;
let orderService = {};


orderService.getPaymentRecord = (id) => {
	return new Promise((resolve, reject) => {
		paymentModel.find({userId : id})
		.exec((err, foundObject) => {
			if(err){
				reject(err);
			}
			else{
				resolve(foundObject);
			}
		});
	});
}


orderService.addPaymentRecord = (body) => {
	return new Promise((resolve, reject) => {
		let pay = new paymentModel(body);
		pay.save((err, savedDetail) => {
			if(err){
				reject(err);
			}
			else{
				resolve(savedDetail);
			}
		});
	});	
}

orderService.addOrder = (body) => {
	return new Promise((resolve, reject) => {
		let order = new orderModel(body);
		order.save((err, savedOrder) => {
			if(err){
				reject(err);
			}
			else{
				cartModel.populate(savedOrder, {path: "foodId.foodId restaurantId userId"}, function(err, populated){
					if(err){
						reject(err);
					}
					else{
				// resolve(savedOrder);
						resolve(populated);
					}

				});
			}
		});
	});
}

orderService.getOrderById = (body) => {
	return new Promise((resolve, reject) => {
		if(body.restaurantId){
			orderModel.find({restaurantId: body.restaurantId})
			.populate('foodId.foodId restaurantId userId')
			.exec((err, foundOrders) => {
				if(err){
					reject(err);
				}
				else{
					resolve(foundOrders);
				}
			});

		}
		else if(body.userId){
			orderModel.find({userId: body.userId})
			.populate('foodId.foodId restaurantId userId')
			.exec((err, foundOrders) => {
				if(err){
					reject(err);
				}
				else{
					resolve(foundOrders);
				}
			});
		}
	})
}


module.exports = orderService