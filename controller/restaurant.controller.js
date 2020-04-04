
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const app = express();
const cartService = require('../services/cart');
const orderService = require('../services/order');


const userModel = require('../models/user.model');
const restaurantModel = require('../models/restaurant.model');
const foodModel = require('../models/foodItems.model');

var restaurantController = {};

restaurantController.getAllRestaurants = (req, res)=>{
	restaurantModel.find()
	.exec((err, foundRestaurants) => {
		if(err){
			res.send(err)
		}
		else{
			res.send(foundRestaurants)
		}
	})
}

restaurantController.getRestaurantById = (req, res)=>{
	restaurantModel.findOne({_id : req.params.id})
	.exec((err, foundRestaurants) => {
		if(err){
			res.send(err)
		}
		else{
			res.send(foundRestaurants)
		}
	})
}

restaurantController.RestaurantFoodById = (req, res)=>{
	console.log(req.params);
	foodModel.find({restaurantId: req.params.id})
	.exec((err, foundFoodsItems) => {
		if(err){
			res.send(err);
		}
		else{
			res.send(foundFoodsItems);
		}
	});
}

restaurantController.addFoodItemById = (req, res) => {
	console.log("req body of add food item ====> ", req.body);

	let newFoodItem = new foodModel(req.body)
	newFoodItem.save((err, savedFood)=>{
		if(err){
			res.send(err);
		}
		else{
			res.send(savedFood);
		}
	});
}

restaurantController.addToCart = (req, res) => {
	console.log("req body of add food item in Cart ====> ", req.body);
	cartService.checkForExistingFoodItem(req.body)
	.then(fullfilled=>{
		console.log("FullFilled ==============>", fullfilled);
		if(fullfilled.length == 0){
			cartService.addNewFoodToCart(req.body)
			.then(fullfilled => {
				res.send(fullfilled);
			})
			.catch(err => {
				res.send(err);
			})
		}
		else{
			cartService.addExistingFoodToCart(fullfilled)
			.then(fullfilled => {
				res.send(fullfilled)
			})
			.catch(err => {
				res.send(err)
			});
		}
		// res.send(fullfilled)
	})
	.catch(err => {
		console.log("Eroor ========> ", err)
		res.send(err)
	});

	
}

restaurantController.removeFromCart = (req, res) => {
	console.log("req body of remove item from cart =========> ", req.body);
	cartService.checkForExistingFoodItem(req.body)
	.then(fullFilled => {
		if(fullFilled.length == 0){
			res.json({message: "no items in cart left"})	
		}
		else{
			cartService.removeExistingFoodFromCart(fullFilled)
			.then(fullFilled => {
				res.send(fullFilled);
			})
			.catch(err => {
				res.send(err);
			});
		}
	})
	.catch(err => {
		console.log("error =====> ", err);
		res.send(err);	
	})
}

restaurantController.getCartById = (req, res) => {
	cartService.getCartItemByUserId(req.body)
	.then(fullFilled => {
		if(fullFilled.length == 0){
			res.json({message: "Cart is empty"})
		}
		else{
			res.send(fullFilled);
		}
	})
	.catch(err => {
		res.send(err)
	})
}

// restaurantController.clearCart = (req, res) => {
	
// }

restaurantController.checkPaymentDetails = (req, res) => {
	orderService.getPaymentRecord(req.params.id)
	.then(fullFilled => {
		res.send(fullFilled);
	}, err => {
		res.send(err);
	})
}

restaurantController.addPaymentDetials = (req, res) => {
	orderService.addPaymentRecord(req.body)
	.then(fullFilled => {
		res.send(fullFilled)
	}, err => {
		res.send(err)
	})
};

restaurantController.addOrder = (req, res) => {
	orderService.addOrder(req.body)
	.then(fullFilled => {
		res.send(fullFilled)
	}, err => {
		res.send(err)
	})
};


restaurantController.getOrderById = (req, res) => {
	orderService.getOrderById(req.body)
	.then(fullFilled => {
		res.send(fullFilled)
	}, err => {
		res.send(err)
	});
}


module.exports = restaurantController;