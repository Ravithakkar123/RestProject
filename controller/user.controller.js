
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const app = express();




const userModel = require('../models/user.model');
const restaurantModel = require('../models/restaurant.model');
var userController = {};


//add client and also for signup
userController.signUpUser = async (req, res)=>{

	// var file = req.file;
	// // console.log(file.filename);
	console.log("it works ======>" , req.body);
	// res.send()
	userModel.findOne({email : req.body.email} , async (err , foundUser)=>{
		console.log("found USer =======+>" , foundUser)
		if(err){
			res.status(400).send(err);
		}
		else if(foundUser){
			res.status(500).send("Email already exists");
			
		}
		else{
			var newUser = new userModel(req.body);
			newUser.save(async(err , newUser)=>{
				if(err){
					// if(newUser.userRole != 'admin'){
					// 	await userService.deleteUploadedPhoto(file.filename);
					// }
					res.status(400).send(err);
				}
				else{
					console.log("userSaved =========> " , newUser);
					res.json({user: newUser});
				}
			});
		}
	});
}

userController.signUpShop = async (req, res)=>{

	// var file = req.file;
	// // console.log(file.filename);
	console.log("it works ======>" , req.body);
	// res.send()
	restaurantModel.findOne({email : req.body.email} , async (err , foundUser)=>{
		console.log("found USer =======+>" , foundUser)
		if(err){
			res.status(400).send(err);
		}
		else if(foundUser){
			res.status(500).send("Email already exists");
			
		}
		else{
			var newUser = new restaurantModel(req.body);
			newUser.save(async(err , newUser)=>{
				if(err){
					res.status(400).send(err);
				}
				else{
					console.log("userSaved =========> " , newUser);
					res.json({user: newUser});
				}
			});
		}
	});
}

//login 
userController.loginUser = (req , res)=>{
	console.log(req.body)
	userModel.findOne({email : req.body.email , password : req.body.password} , (err , foundUser)=>{
		if(err){
			res.send(err);
		}else if(foundUser == null){

			res.status(404).json({"message" : "user not found"});
		}else{
			res.send(foundUser);
		}
	})
}
userController.loginShop = (req , res)=>{
	console.log(req.body)
	restaurantModel.findOne({email : req.body.email , password : req.body.password} , (err , foundUser)=>{
		if(err){
			res.send(err);
		}else if(foundUser == null){
			res.status(404).json({"message" : "user not found"});
		}else{
			res.send(foundUser);
		}
	})
}

//getAllClient
userController.getAllClient = (req , res)=>{
	userModel.aggregate([
		{ "$match" : {"userRole" : "client", "isDeleted": false}},
		{ "$sort" : { _id : -1} }
	]).exec((err , foundClients)=>{
		if(err){
			res.send(err);
		}else{
			res.send(foundClients);
		}
	});
}

//getClientById
userController.getClientById = (req , res)=>{
	console.log(req.params.id)
	userModel.aggregate([
		{ "$match" : {"_id" : ObjectId(req.params.id)}}
	]).exec((err , foundClient)=>{
		if(err){
			res.send(err);
		}else{
			res.send(foundClient);
		}
	});	
}

//updateClient
userController.updateClientById = async (req, res)=>{
	if(req.file){
		console.log("file" , req.file)
		var file = req.file
		await userService.deleteUploadedPhoto(req.body.oldPRofile);

	}
	if(req.body.userRole == 'client'){
		req.body = await userService.formatNewClientData(req.body , req.file);
	}
	if(req.body.profilePhoto == ''){
		req.body.profilePhoto = req.body.oldPRofile;
	}
	console.log(req.body);
	userModel.findOneAndUpdate({_id: req.body._id} , req.body , {upsert: true, new: true})
	.exec(async(err , updatedClient)=>{
		if(err){
			await userService.deleteUploadedPhoto(file.filename);
			res.send(err);
		}else{
			res.send(updatedClient);
		}
	});		
}

//delete client 
userController.deleteClientById = (req, res)=>{
	console.log("req.body ====> " , req.body)
	userModel.findOneAndDelete({_id : req.params.id})
	.exec(async(err , deletedClient)=>{
		if(err){
			res.send(err);
		}else{
			await userService.deleteUploadedPhoto(deletedClient.profilePhoto);
				
			res.send(deletedClient);
		}	
	});
}
userController.deleteUserWithoutInvoice = (req, res)=>{
	console.log(req.params)
	userModel.findOne({_id: req.params.id})
	.exec((err, foundClient)=>{
		if(err)
			res.send(err)
		else{
			foundClient["isDeleted"] = true;
			// delete foundClient._id;
			userModel.findOneAndUpdate({_id: foundClient._id}, foundClient, {upsert: true, new: true})
			.exec((err, updatedClient)=>{
				if(err)
					res.send(err);
				else
					res.send(updatedClient);
			});
		}
	})
}
module.exports = userController;