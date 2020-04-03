import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './services/login.service';

import Swal from 'sweetalert2';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	// userInfo : any;
	noLogin: boolean = true;
	userInfo = JSON.parse(localStorage.getItem('currentUser'));
	constructor(private route: ActivatedRoute,
		private router: Router, private loginService: LoginService) {
		this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
		this.loginService.isLoggedIn.subscribe((data) => {
			console.log("userInfo ===>00", this.userInfo, data);

			if (data === 'loggedIn') {
				this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
			}
		});
		this.loginService.getFlag().subscribe((data: any) => {
			console.log("data ============>0", data)
			this.userInfo = data.currentUser
			this.noLogin = data.flag
			if (data != false) {
				this.router.navigate(['']);

			}

		});

	}

	ngOnInit() {
		// console.log("called");
		// if(!this.userInfo){
		// }else{
		// 	console.log("called 2nd time");
		// 	console.log(this.userInfo);
		// 	this.userInfo = JSON.parse(localStorage.getItem("currentUser"));

		// }



	}
	getNotification(evt) {
		console.log(evt);
	}
	viewProfile() {
		this.router.navigate(['profile'], { queryParams: { userId: this.userInfo._id } });
	}
	myOrder(){
		if(this.userInfo.userRole == 'shop'){
					var body = {
						restaurantId: this.userInfo._id
					}
				}
		this.router.navigate(['order',  this.userInfo._id]);	
	}
	logout() {

		this.loginService.logout();
		this.router.navigate(['']);

	}
}

