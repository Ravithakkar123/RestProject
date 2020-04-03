import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup , Validators } from '@angular/forms'

import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service'

import Swal from 'sweetalert2'

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	shopRegisterForm: FormGroup;	
	isDisable: boolean = false;
	isError : boolean = false;
	errorMessage;
	registerOptionValue:any
	constructor(
		public _loginService: LoginService,
		public router: Router 
	) {
		this._loginService.sendFlagToApp();
		this.registerForm = new FormGroup({
			userName: new FormControl('' , Validators.required),
			password: new FormControl('' , Validators.required),
			email: new FormControl('' , Validators.required),
		//	dateOfBirth: new FormControl('' , Validators.required),
			address: new FormControl('' , Validators.required),
			contactNo: new FormControl('' , Validators.required)
		});
		this.shopRegisterForm = new FormGroup({
			restaurantName: new FormControl('' , Validators.required),
			password: new FormControl('' , Validators.required),
			email: new FormControl('' , Validators.required),
			address: new FormControl('' , Validators.required),
			contactNo: new FormControl('' , Validators.required)
		});
	}

	ngOnInit() {
	}
	get f () { return this.registerForm.controls; }
	get s () { return this.shopRegisterForm.controls ;}

	register(registerForm){
		console.log("register value ==+>", registerForm);
		this._loginService.registerUser(registerForm).subscribe((res)=>{
			console.log("response of user register", res);
			Swal.fire({
				title: 'Success',
				text: 'Registered Succesfully',
				icon: 'success',
				confirmButtonText: 'Cool'
			});
			this.router.navigate(['login']);
		}, (err)=>{
			this.isError = true;
			this.errorMessage = err.error;
			console.log("error in user register", err)
		})
		
	}
	shopRegister(shopRegister){
		this._loginService.registerShop(shopRegister).subscribe((res)=>{
			console.log("response of shop register", res);
			Swal.fire({
				title: 'Success',
				text: 'Registered Succesfully',
				icon: 'success',
				confirmButtonText: 'Cool'
			});
			this.router.navigate(['login']);
		}, (err)=>{
			this.isError = true;
			this.errorMessage = err.error;
			console.log("error in shop register", err)
		})
		console.log(shopRegister);

	}
	registerOption(value){
		this.registerOptionValue = value;
	}
}
