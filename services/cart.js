const foodModel = require('../models/foodItems.model');
const cartModel = require('../models/cart.model');
const ObjectId = require('mongodb').ObjectId;
let cartService = {};


cartService.getCartItemByUserId = (body) => {
	return new Promise((resolve, reject) => {
		console.log("BODY =============+> ", body)
		cartModel.find({userId: body.userId})
		.populate('foodId userId restaurantId')
		.exec((err, foundFoodItem)=> {
			if(err){
				reject(err)
			}
			else{
				resolve(foundFoodItem);
			}
		});
	});
}


cartService.checkForExistingFoodItem = (body) => {
	return new Promise((resolve, reject) => {
		console.log("BODY =============+> ", body)
		cartModel.find({foodId: body.foodId, userId: body.userId})
		.populate('foodId userId restaurantId')
		.exec((err, foundFoodItem)=> {
			if(err){
				reject(err)
			}
			else{
				resolve(foundFoodItem);
			}
		});
	});
}

cartService.addNewFoodToCart = (body) => {
	return new Promise((resolve, reject) => {
		body['totalItems'] = 1
		let newCart = new cartModel(body)
		newCart.save((err, savedFoodItem) => {
			if(err){
				reject(err)
			}
			else{
				cartModel.populate(savedFoodItem, {path: "foodId restaurantId userId"}, function(err, populated){
					if(err){
						reject(err);
					}
					else{
						resolve(populated);
					}

				});
			}
		});
	});
}

cartService.addExistingFoodToCart = (body) => {
	return new Promise((resolve, reject) => {
		console.log(typeof body[0]['totalItems'])
		body[0]['totalItems'] = body[0]['totalItems'] + 1;
		cartModel.findOneAndUpdate({_id: ObjectId(body[0]._id)}, {$set : { totalItems: body[0].totalItems }}, {new: true,  upsert: true })
		.populate('foodId userId restaurantId')
		.exec((err, updatedFoodItem) => {
			if(err){
				console.log("err =========>", err)
				reject(err)
			}
			else{
				resolve(updatedFoodItem);
			}		
		})
	});
}


cartService.removeExistingFoodFromCart = (body) => {
	return new Promise((resolve, reject) => {
		console.log(typeof body[0]['totalItems'])
		body[0]['totalItems'] = body[0]['totalItems'] - 1;
		cartModel.findOneAndUpdate({_id: ObjectId(body[0]._id)}, {$set : { totalItems: body[0].totalItems }}, {new: true,  upsert: true })
		.populate('foodId userId restaurantId')
		.exec((err, updatedFoodItem) => {
			if(err){
				console.log("err =========>", err)
				reject(err)
			}
			else{
				resolve(updatedFoodItem);
			}		
		})
	});	
}
orderService.clearCart = (body) => {
	return new Promise((resolve, reject) => {
		cartModel.deleteMany({usrId: ObjectId(body.id)},{new: true,  upsert: true })
		.exec((err, deletedFoodItems) => {
			if(err){
				console.log("err =========>", err)
				reject(err)
			}
			else{
				resolve(updatedFoodItem);
			}		
		})
	});	
}



module.exports = cartService;