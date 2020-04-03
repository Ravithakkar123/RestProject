var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cartSchema = new Schema({
	restaurantId : {
		type: Schema.Types.ObjectId, 
		ref: 'restaurant', 
		required: true
	},
	foodId: {
		type: Schema.Types.ObjectId, 
		ref: 'food', 
		required: true	
	},
	userId : {
		type: Schema.Types.ObjectId, 
		ref: 'user', 
		required: true
	},
	totalItems: {
		type: Number,
		required: true
	}

});
module.exports = mongoose.model('cart' , cartSchema);