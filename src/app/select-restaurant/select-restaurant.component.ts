import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Router, ActivatedRoute }  from '@angular/router';
@Component({
	selector: 'app-select-restaurant',
	templateUrl: './select-restaurant.component.html',
	styleUrls: ['./select-restaurant.component.css']
})
export class SelectRestaurantComponent implements OnInit {
	allRestaurant:any;
	constructor(public _restaurantService: RestaurantService, public _router: Router) { 
		if(JSON.parse(localStorage.getItem('currentUser')) != null && JSON.parse(localStorage.getItem('currentUser')).userRole == "shop"  ){
			this._router.navigate(['shop-owner', JSON.parse(localStorage.getItem('currentUser'))._id])
		}
	}

	ngOnInit() {
		this._restaurantService.getAllRestaurant().subscribe((res)=>{
			console.log("restaurant response ==>", res);
			this.allRestaurant = res;
		}, (err) => {
			console.log("error in restaurant ===>", err);
		})
	}

}
