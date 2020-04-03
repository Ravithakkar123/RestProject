import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import Swal from 'sweetalert2'
declare var $;
@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	paymentForm:FormGroup;
	paymentConfromForm:FormGroup;
	userId:any;	
	paymentInfo: any;
	allRestaurants:any = [];
	foodArray:any = {
		"breakfastAndStarters": [],
		"mainCourse": [],
		"dinner": [],
		"desserts": []
	}
	finalOrderObject:any;
	paymentRestaurantId:any;
	currentUser = JSON.parse(localStorage.getItem('currentUser'));
	constructor(public _route: ActivatedRoute,public _restaurantService: RestaurantService, public _router: Router) {
		this._route.params.subscribe((params)=>{
			console.log(params);
			this.userId = params.id
		});
		this.paymentForm = new FormGroup({
			accountCode: new FormControl('', Validators.required),
			accountNumber: new FormControl('', Validators.required),
			userId: new FormControl('')
		});
		this.paymentConfromForm = new FormGroup({
			accountCode: new FormControl('', Validators.required),
			accountNumber: new FormControl('', Validators.required),
			restaurantUniqueId: new FormControl('', Validators.required),
			userId: new FormControl(''),
			restaurantId: new FormControl(''),
			payValue: new FormControl(''),
			timeToCookFood: new FormControl(''),
			foodId :  new FormControl('')
		});
	}

	ngOnInit() {
		this.getCartItems()
	}
	getCartItems(){
		let obj = {
			userId: this.userId
		}
		this._restaurantService.getCartById(obj).subscribe(async (res:any) => {
			console.log("res =========> ", res);
			if(!res.message)
				await this.formatResponse(res);
			console.log(" ALL RESTAURANT ===> ", this.allRestaurants );
		}, (err) => {
			console.log("error ===========> ", err);
		})
	}
	getPaymentInfo(restaurantId){
		this.paymentRestaurantId = restaurantId;
		console.log("resta id =====> ", this.paymentRestaurantId);
		this._restaurantService.getPaymentRecord(this.userId).subscribe(async(res:any) => {
			console.log("paymetn info======> ", res);
			if(res.length == 0){
				this.openPaymentModel();
			}
			else{
				this.paymentInfo = res[0];
				await this.getFormatedData(this.allRestaurants);
				console.log('this.finalOrderObject ===========> ', this.finalOrderObject)
				this.openOrderModel();
			}
		}, (err) => {
			console.log(" payment info err ", err);
		})
	}

	openPaymentModel(){
		$('#myModal').modal('show');
	}
	openOrderModel(){
		$('#orderModel').modal('show');
	}
	addPaymentInfo(value){
		this.paymentForm.patchValue({
			userId: this.userId
		});
		this.paymentForm.get('userId').updateValueAndValidity();
		console.log("value of payment =======>", this.paymentForm.value);
		this._restaurantService.addPaymentRecord(this.paymentForm.value).subscribe((res) => {
			console.log("addded payment", res);
			Swal.fire({
				title: 'Success',
				text: 'Payment Information Succesfully Registered',
				icon: 'success',
				confirmButtonText: 'Cool'
			})
			.then((result) => {
			this.openOrderModel();

			})
			this.paymentInfo = res;
		}, (err) => {
			console.log("err in adding payment ==>", err);
		})
	}
	orderFInal(value){
		console.log("FInal order ============> ", this.finalOrderObject);
		this.paymentConfromForm.patchValue({
			userId: this.finalOrderObject.userId,
			restaurantId: this.finalOrderObject.restaurantId,
			payValue: this.finalOrderObject.payValue,
			timeToCookFood: this.finalOrderObject.timeToCookFood,
			foodId :  this.finalOrderObject.foodId
		});
		this.paymentConfromForm.updateValueAndValidity();
		console.log("this.paymentConfromForm ==========+> ", this.paymentConfromForm);
		this._restaurantService.addOrder(this.paymentConfromForm.value).subscribe((res) => {
			Swal.fire({
				title: 'Success',
				text: 'Your order is Succesfully placed',
				icon: 'success',
				confirmButtonText: 'Cool'
			});
			console.log("res ====>", res);
		}, (err) => {
			console.log("err ===> " ,err);
		})
	}
	formatResponse(data){
		let arr = []
		data.forEach((dataForRestaurant, index) => {
			let currentRestaurantId = dataForRestaurant.restaurantId._id;
			let obj = {
				restaurantId: [],
				foodArray : {
					"breakfastAndStarters": [],
					"mainCourse": [],
					"dinner": [],
					"desserts": []
				},
				totalAmount : 0
			}
				
			data.forEach((singleObject, index) => {
				console.log(singleObject.restaurantId._id == currentRestaurantId &&  !arr.includes(currentRestaurantId));	
				if(singleObject.restaurantId._id == currentRestaurantId &&  !arr.includes(currentRestaurantId)){
					if(singleObject.foodId.foodCategory == "breakfast and starters" && singleObject.totalItems > 0){
						obj['foodArray']['breakfastAndStarters'].push(singleObject)
						
					}
					else if(singleObject.foodId.foodCategory == "main course" && singleObject.totalItems > 0){
						obj['foodArray']['mainCourse'].push(singleObject)
						
					}
					else if(singleObject.foodId.foodCategory == "dinner" && singleObject.totalItems > 0){
						obj['foodArray']['dinner'].push(singleObject)
						
					}
					else if(singleObject.foodId.foodCategory == "desserts" && singleObject.totalItems > 0){
						obj['foodArray']['desserts'].push(singleObject)
						
					}
					// data.splice(index, 	1);
				}
			});
			console.log("obj ============> ", obj);
			obj.restaurantId.push(dataForRestaurant.restaurantId)
			if(!arr.includes(currentRestaurantId)){
				arr.push(currentRestaurantId);
				if(obj['foodArray']['breakfastAndStarters'].length > 0 || obj['foodArray']['mainCourse'].length > 0 || obj['foodArray']['dinner'].length > 0 || obj['foodArray']['desserts'].length > 0)
				this.allRestaurants.push(obj);
			}
		});
	}
	addItem(obj){
		console.log("added obj ======>", obj);
		let body = {
			restaurantId: obj.restaurantId,
			foodId: obj._id,
			userId: JSON.parse(localStorage.getItem('currentUser'))._id,
		}
		console.log("Add ===>", obj, body);
		this._restaurantService.addFoodToCart(body).subscribe((res:any) => {
			console.log("response of add to cart =====>", res);
			this.allRestaurants.forEach((singleRestaurant, index) => {

				if(singleRestaurant.restaurantId[0]._id == res.restaurantId._id){
					console.log("ID MATCHed");
					switch (res.foodId.foodCategory) {
						case "breakfast and starters":
							console.log("breakfast and starters");
							this.breakfastAndStartersCartCount(this.allRestaurants[index].foodArray.breakfastAndStarters, res);
							break;
						case "main course":
							console.log("main course");
							this.mainCourseCartCount(this.allRestaurants[index].foodArray.mainCourse, res);
							break;
						case "dinner":
							console.log("dinner");
							this.dinnerCartCount(this.allRestaurants[index].foodArray.dinner, res);
							break;
						case "desserts":
							console.log("desserts");
							this.dessertsCartCount(this.allRestaurants[index].foodArray.desserts, res);
							break;
						
						default:
							console.log("default");
							break;
					}
				}
			});
		}, (err) => {
			console.error("error in add to cart =====>", err);
		});	
	}
	removeItem(obj){
		let body = {
			restaurantId: obj.restaurantId,
			foodId: obj._id,
			userId: JSON.parse(localStorage.getItem('currentUser'))._id,
		}
		console.log("remove ===>", obj);
		this._restaurantService.removeFoodToCart(body).subscribe((res:any) => {
			console.log("res of remove cart item", res);
			this.allRestaurants.forEach((singleRestaurant, index) => {

				if(singleRestaurant.restaurantId[0]._id == res.restaurantId._id){
					console.log("ID MATCHed");
					switch (res.foodId.foodCategory) {
						case "breakfast and starters":
							console.log("breakfast and starters");
							this.breakfastAndStartersCartCount(this.allRestaurants[index].foodArray.breakfastAndStarters, res);
							break;
						case "main course":
							console.log("main course");
							this.mainCourseCartCount(this.allRestaurants[index].foodArray.mainCourse, res);
							break;
						case "dinner":
							console.log("dinner");
							this.dinnerCartCount(this.allRestaurants[index].foodArray.dinner, res);
							break;
						case "desserts":
							console.log("desserts");
							this.dessertsCartCount(this.allRestaurants[index].foodArray.desserts, res);
							break;
						
						default:
							console.log("default");
							break;
					}
				}
			});
		}, (err) => {
			console.log("err in removing cart item ===> ", err);
		});	
	}
	breakfastAndStartersCartCount(obj, res){
		obj.forEach((singleObject)=>{
			if(singleObject.foodId._id == res.foodId._id){
				singleObject.totalItems = res.totalItems
			}
		});
		console.log("food aray ======>", this.foodArray)
	}
	mainCourseCartCount(obj, res){
		obj.forEach((singleObject)=>{
			if(singleObject.foodId._id == res.foodId._id){
				singleObject.totalItems = res.totalItems
			}
		});
		console.log("main course cart count");
	}
	dinnerCartCount(obj, res){
		obj.forEach((singleObject)=>{
			if(singleObject.foodId._id == res.foodId._id){
				singleObject.totalItems = res.totalItems
			}
		});
		console.log("dinner cart count");
	}
	dessertsCartCount(obj, res){
		obj.forEach((singleObject)=>{
			if(singleObject.foodId._id == res.foodId._id){
				singleObject.totalItems = res.totalItems
			}
		});
		console.log("Desserts cart count");
	}
	getFormatedData(allRestaurants){
		console.log("GET FORMATED DATA");
		allRestaurants.forEach((eachObject) => {
			console.log(eachObject.restaurantId[0]._id == this.paymentRestaurantId, eachObject.restaurantId[0]._id , this.paymentRestaurantId);
			if(eachObject.restaurantId[0]._id == this.paymentRestaurantId){
				let obj = {
					restaurantId : this.paymentRestaurantId,
					userId: this.userId,
					payValue : 0,
					foodId : [],
					timeToCookFood: 0			
				}
				let eachObj:any = eachObject;
					console.log("in each object", eachObj.foodArray.breakfastAndStarters.length);
				if(eachObj.foodArray.breakfastAndStarters.length > 0){
					eachObj.foodArray.breakfastAndStarters.forEach((eachFood)=>{
						let foodObj = {
							foodId: eachFood.foodId._id,
							totalItems: eachFood.totalItems
						}
						obj.foodId.push(foodObj);
						obj['payValue'] = +obj['payValue'] + ( eachFood.foodId.price * eachFood.totalItems )
						obj['timeToCookFood'] = +obj['timeToCookFood'] + ( Number(eachFood.foodId.timeToCook) * eachFood.totalItems )
					console.log("each foood ========> ", eachFood);
					});
					console.log("obj ============>", obj);
				}
				if(eachObj.foodArray.mainCourse.length > 0){
					eachObj.foodArray.mainCourse.forEach((eachFood)=>{
						let foodObj = {
							foodId: eachFood.foodId._id,
							totalItems: eachFood.totalItems
						}
						obj.foodId.push(foodObj);
						obj['payValue'] = obj['payValue'] + ( eachFood.foodId.price * eachFood.totalItems )
						obj['timeToCookFood'] = +obj['timeToCookFood'] + ( Number(eachFood.foodId.timeToCook) * eachFood.totalItems )
						console.log("each foood ========> ", eachFood);
					});
					console.log("obj ============>", obj);
				}
				if(eachObj.foodArray.dinner.length > 0){
					eachObj.foodArray.dinner.forEach((eachFood)=>{
						let foodObj = {
							foodId: eachFood.foodId._id,
							totalItems: eachFood.totalItems
						}
						obj.foodId.push(foodObj);
						obj['payValue'] = obj['payValue'] + ( eachFood.foodId.price * eachFood.totalItems )
						obj['timeToCookFood'] = +obj['timeToCookFood'] + ( Number(eachFood.foodId.timeToCook) * eachFood.totalItems )
						console.log("each foood ========> ", eachFood);
					});
					console.log("obj ============>", obj);
				}
				if(eachObj.foodArray.desserts.length > 0){
					eachObj.foodArray.desserts.forEach((eachFood)=>{
						let foodObj = {
							foodId: eachFood.foodId._id,
							totalItems: eachFood.totalItems
						}
						obj.foodId.push(foodObj);
						obj['payValue'] = obj['payValue'] + ( eachFood.foodId.price * eachFood.totalItems )
						obj['timeToCookFood'] = +obj['timeToCookFood'] + ( Number(eachFood.foodId.timeToCook) * eachFood.totalItems )
						console.log("each foood ========> ", eachFood);
					});
					console.log("obj ============>", obj);
				}
				console.log("final Object ======>", obj);
				this.finalOrderObject = obj;
			}
		});

	}
}
