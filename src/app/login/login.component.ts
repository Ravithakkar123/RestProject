import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup , Validators } from '@angular/forms'

import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service'
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	shopLoginForm: FormGroup;	
	isDisable: boolean = false;
	isError : boolean = false;
	errorMessage;
	loginOptionValue:any;
	constructor(
		public _loginService: LoginService,
		public router: Router,
		public _router: ActivatedRoute 
	) { 
		this._loginService.sendFlagToApp();
		if (this._loginService.currentUserValue) { 
			this.router.navigate(['/']);
		}
		this.loginForm = new FormGroup({
			email: new FormControl('' , Validators.required),
			password: new FormControl('' , Validators.required)
		});
		this.shopLoginForm = new FormGroup({
			email: new FormControl('' , Validators.required),
			password: new FormControl('' , Validators.required)
		});	


	}

	ngOnInit() {

	}
	get f () { return this.loginForm.controls }
	get s () { return this.shopLoginForm.controls }
	login(loginCredentails){
		console.log("loginCredentails ==>" , loginCredentails);
		this._loginService.loginUser(loginCredentails).subscribe((res)=>{
			this.isDisable = false;
			this.router.navigate(['']);
			this.isError = false;
			console.log("res of login USer" ,  res);
		} , (err)=>{
			this.isError = true;
			if (err.status == 404){
				this.errorMessage = "Enter correct email / password";
			}
			console.log(this.errorMessage)
			console.log("err of login USer" ,  this.isError);
		});
	}
	shopLogin(loginCredentails){
		console.log("loginCredentails ==>" , loginCredentails);
		this._loginService.loginShop(loginCredentails).subscribe((res:any)=>{
			this.router.navigate(['shop-owner', res._id]);	
			this.isDisable = false;
			
			this.isError = false;
			console.log("res of login USer" ,  res);
			// this.router.navigate('shop-owner', res._id );
		} , (err)=>{
			this.isError = true;
			if (err.status == 404){
				this.errorMessage = "Enter correct email / password";
			}
			console.log(this.errorMessage)
			console.log("err of login USer" ,  this.isError);
		});
	}
	checkLogin(value){
		this.isError = false;
		this.loginOptionValue = value;
	}
}
