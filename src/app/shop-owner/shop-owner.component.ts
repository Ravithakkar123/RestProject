import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


declare var $;
import Swal from 'sweetalert2'
@Component({
	selector: 'app-shop-owner',
	templateUrl: './shop-owner.component.html',
	styleUrls: ['./shop-owner.component.css']
})
export class ShopOwnerComponent implements OnInit {
	userId:any;
	foodItem:FormGroup;
	foodArray:any = {
		"breakfastAndStarters": [],
		"mainCourse": [],
		"dinner": [],
		"desserts": []
	}
	// foodItem = {
	// 	foodCategory: "",
	// 	foodName: "",
	// 	indredients:"",
	// 	price: "",
	// 	timeToCook: ""
	// }
	
	constructor(public _route: ActivatedRoute, public _restaurantService: RestaurantService, public _formBuilder: FormBuilder,) { 
		this._route.params
		.subscribe(params => {
			console.log("params =========>", params); 
			this.userId = params.id
		});
		this.foodItem = new FormGroup({
			foodCategory: new FormControl('', Validators.required),
			foodName: new FormControl('', Validators.required),
			indredients: new FormControl('', Validators.required),
			price: new FormControl('', Validators.required),
			timeToCook: new FormControl([], Validators.required),
			restaurantId: new FormControl('')

		});

	}

	ngOnInit() {
		this.getRestaurantDetails();
		this.getFoodItems();
	}
	openModel(){
		$('#myModal').modal('show');
	}
	getRestaurantDetails(){
		console.log("user id ==", this.userId);

	}
	getFoodItems(){
		this._restaurantService.getRestaurantFoodById(this.userId).subscribe( async (res) => {
			console.log("resposne ===>", res);
			this.foodArray = await this.formatFoodArray(res);
			console.log("return ======>", this.foodArray);
		}, (err) => {
			console.log("error ==>", err);
		});
	}
	addItem(item){
		this.foodItem.patchValue({
			restaurantId: this.userId
		});
		this.foodItem.get('restaurantId').updateValueAndValidity();
		console.log("Food items ======>", item);
		this._restaurantService.addFoodItem(this.foodItem.value).subscribe((res) => {
			console.log("res of newly added food items ======>", res);
			this.getFoodItems();
		}, (err) => {
			console.log("error in newly added food items ====>", err);
		});
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
}
