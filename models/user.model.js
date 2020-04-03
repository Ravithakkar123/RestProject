var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	userName: {
		type: String,
	},
	email: {
		type: String,
		
	},
	dateOfBirth: {
		type: Date,
	},
	password: {
		type: String
	},
	address:{
		type: String
	},
	contactNo: {
		type: String
	},
	userRole: {
		type: String,
		default: 'user'
	}

});
module.exports = mongoose.model('user' , UserSchema);