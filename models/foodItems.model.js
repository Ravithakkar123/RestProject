var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var foodSchema = new Schema({
	foodName: {
		type: String,
	},
	price: {
		type: Number,
		
	},
	timeToCook: {
		type: String
	},
	indredients: {
		type: String,
	},
	restaurantId : {
		type: Schema.Types.ObjectId, 
		ref: 'restaurant', 
		required: true
	},
	foodCategory: {
		type: String
	}

});
module.exports = mongoose.model('food' , foodSchema);