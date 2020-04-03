import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';


@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
	userId:any;
	foodArray:any = {
		"breakfastAndStarters": [],
		"mainCourse": [],
		"dinner": [],
		"desserts": []
	}
	restaurantInfo:any;
	userInfo = JSON.parse(localStorage.getItem('currentUser'));
	constructor(public _route: ActivatedRoute,public _restaurantService: RestaurantService, public _router: Router) {
		this._route.params.subscribe((params)=>{
			console.log(params);
			this.userId = params.id
		});
	}

	ngOnInit() {
		this.getFoodItems();
		this.getRestaurantDetails();
	}
	getRestaurantDetails(){
		console.log("user id ==", this.userId);
		this._restaurantService.getRestaurantById(this.userId).subscribe((res)=>{
			console.log("res ===>0", res);
			this.restaurantInfo = res;
		}, (err) => {
			console.log("err in etting restaurant details ", err);
		});
	}
	getFoodItems(){
		this._restaurantService.getRestaurantFoodById(this.userId).subscribe(async(res) => {
			this.foodArray = await this.formatFoodArray(res);
			console.log("Food items in home page", this.foodArray)
		}, (err) => {
			console.error(err);
		});
	}
	showCart(){
		this._router.navigate(['cart', JSON.parse(localStorage.getItem('currentUser'))._id])
	}
	formatFoodArray(data){
		this.foodArray = {
			"breakfastAndStarters": [],
			"mainCourse": [],
			"dinner": [],
			"desserts": []
		}
		data.forEach((singleObject) => {
			if(singleObject.foodCategory == "breakfast and starters"){
				this.foodArray['breakfastAndStarters'].push(singleObject)
			}
			else if(singleObject.foodCategory == "main course"){
				this.foodArray['mainCourse'].push(singleObject)
			}
			else if(singleObject.foodCategory == "dinner"){
				this.foodArray['dinner'].push(singleObject)
			}
			else if(singleObject.foodCategory == "desserts"){
				this.foodArray['desserts'].push(singleObject)
			}
		});
		return this.foodArray;
	}
	addItem(obj){
		console.log("added obj ======>", obj);
		let body = {
			restaurantId: obj.restaurantId,
			foodId: obj._id,
			userId: JSON.parse(localStorage.getItem('currentUser'))._id,
		}
		this._restaurantService.addFoodToCart(body).subscribe((res:any) => {
			console.log("response of add to cart =====>", res);
			switch (res.foodId.foodCategory) {
				case "breakfast and starters":
					this.breakfastAndStartersCartCount(res);
					break;
				case "main course":
					this.mainCourseCartCount(res);
					break;
				case "dinner":
					this.dinnerCartCount(res);
					break;
				case "desserts":
					this.dessertsCartCount(res);
					break;
				
				default:
					console.log("default");
					break;
			}
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
		this._restaurantService.removeFoodToCart(body).subscribe((res:any) => {
			console.log("res of remove cart item", res);
			switch (res.foodId.foodCategory) {
				case "breakfast and starters":
					this.breakfastAndStartersCartCount(res);
					break;
				case "main course":
					this.mainCourseCartCount(res);
					break;
				case "dinner":
					this.dinnerCartCount(res);
					break;
				case "desserts":
					this.dessertsCartCount(res);
					break;
				
				default:
					console.log("default");
					break;
			}
		}, (err) => {
			console.log("err in removing cart item ===> ", err);
		})	
	}
	breakfastAndStartersCartCount(obj){
		this.foodArray['breakfastAndStarters'].forEach((singleObject) => {
			if(singleObject._id == obj.foodId._id){
				singleObject['cartCount'] = obj.totalItems
			}
		});
		console.log("food aray ======>", this.foodArray)
	}
	mainCourseCartCount(obj){
		this.foodArray['mainCourse'].forEach((singleObject) => {
			if(singleObject._id == obj.foodId._id){
				singleObject['cartCount'] = obj.totalItems
			}
		});
		console.log("main course cart count");
	}
	dinnerCartCount(obj){
		this.foodArray['dinner'].forEach((singleObject) => {
			if(singleObject._id == obj.foodId._id){
				singleObject['cartCount'] = obj.totalItems
			}
		});
		console.log("dinner cart count");
	}
	dessertsCartCount(obj){
		this.foodArray['desserts'].forEach((singleObject) => {
			if(singleObject._id == obj.foodId._id){
				singleObject['cartCount'] = obj.totalItems
			}
		});
		console.log("Desserts cart count");
	}

}
