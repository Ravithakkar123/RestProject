import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';

import { RestaurantService } from '../services/restaurant.service';
@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
	userInfo = JSON.parse(localStorage.getItem('currentUser'));	
	userId:any;
	myOrders:any;
	constructor(public _route: ActivatedRoute, public _restaurantService: RestaurantService) { 
		this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
		this._route.params.subscribe((params)=>{
			console.log(params);
			this.userId=  params.id
		});
	}

	ngOnInit() {
		this.getOrder()
	}
	getOrder(){
		let body = {};
		if(this.userInfo.userRole == 'shop'){
			body = {
				restaurantId: this.userId
			}
		}
		else{
			body = {
				userId: this.userId
			}	
		}
		console.log("HELLO", body);
		this._restaurantService.getOrderById(body).subscribe((res) => {
			console.log(" ==>"  , res);
			this.myOrders = res;
		}, (err) => {
			console.log(err);
		})
	}
}
