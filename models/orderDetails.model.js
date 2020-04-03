var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
	restaurantId : {
		type: Schema.Types.ObjectId, 
		ref: 'restaurant', 
		required: true
	},
	payValue: {
		type: Number,
		required: true
	},
	timeToCookFood: {
		type: Number,
	},
	userId : {
		type: Schema.Types.ObjectId, 
		ref: 'user', 
		required: true
	},
	foodId: [
	{
		_id: false,
		foodId :  {
			type: Schema.Types.ObjectId, 
			ref: 'food', 
			required: true	
		},
		totalItems: {
			type: Number
		}
	}
	]	
});
module.exports = mongoose.model('order' , orderSchema);