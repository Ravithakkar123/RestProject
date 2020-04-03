var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var paymentSchema = new Schema({
	accountCode: {
		type: Number,
		required: true
		
	},
	accountNumber: {
		type: String,
		required: true
	},
	userId : {
		type: Schema.Types.ObjectId, 
		ref: 'user', 
		required: true
	},
});
module.exports = mongoose.model('payment' , paymentSchema);