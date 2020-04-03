import { Component, OnInit } from '@angular/core';
import { FormGroup , Validators , FormControl , FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'

import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
declare var $;
@Component({
	selector: 'app-add-client',
	templateUrl: './add-client.component.html',
	styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
	previewURL:any;	
	addClientForm: FormGroup;
	currency = [];
	typeFlag:boolean = false;
	file: File = null;
	previewUrl:any = null;
	isDisable:any = false;
	adminInfo;
	constructor(
		public _formBuilder: FormBuilder,
		public _loginService: LoginService,
		public _router: Router
	) { 
		this.adminInfo = JSON.parse(localStorage.getItem('currentUser'));
		if(!this.adminInfo){
			this._router.navigate['login'];
		}
		this.addClientForm = this._formBuilder.group({
			name: new FormControl('', Validators.required) ,
			email: new FormControl(''),
			companyName: new FormControl(''),
			street1: new FormControl(''),
			street2: new FormControl(''),
			city: new FormControl(''),
			country: new FormControl('', Validators.required),
			pincode: new FormControl('',),
			contactNo: new FormControl(''),
			userRole: new FormControl('client'),
			profilePhoto: new FormControl(''),
			currency: new FormControl('',  Validators.required),
			userType: new FormControl('', Validators.required)
		});
	}

	ngOnInit() {
		this.getCurrency();
		
	}
	get f () { return this.addClientForm.controls }
	getCurrency(){
		this._loginService.getCurrency().subscribe((res)=>{
			console.log('res of currency' , res);
			for(let [key, value] of Object.entries(res)){
				this.currency.push(key + ' | ' + value); 	
			}
			

		}, (err)=>{
			console.log(err);
		})
	}
	getType(event){
		console.log(event.target.value);
		this.typeFlag = (event.target.value == 'Company') ? true : false
		this.addClientForm.patchValue({
			userType : event.target.value
		});
		this.addClientForm.get('userType').updateValueAndValidity();
		console.log(this.addClientForm.value);
	}
	uploadFile(event){
		 this.file =  event.target.files[0];
		this.addClientForm.patchValue({
			profilePhoto : this.file
		});
		this.addClientForm.get('profilePhoto').updateValueAndValidity();
		console.log(this.addClientForm.value);
		this.preview();
	}
	preview() {
		// Show preview 
		var mimeType = this.file.type;
		if (mimeType.match(/image\/*/) == null) {
			return;
		}

		var reader = new FileReader();      
		reader.readAsDataURL(this.file); 
		reader.onload = (_event) => { 
			this.previewUrl = reader.result; 
		}
	}
	selectCurrency(event){
		// event = event.split(" ")[0];
		console.log(event);
		this.addClientForm.patchValue({
			currency : event
		});
		this.addClientForm.get('currency').updateValueAndValidity();
		console.log(this.addClientForm.value);
	}
	addClient(value){
		console.log("value in add client ==>", value);
		/*(async ()=>{*/
			this._loginService.getCurrencySymbol(this.addClientForm.get('currency').value.split(" ")[0]).subscribe(async (res)=>{
					console.log("res", res);	
					console.log(value);
					var val = value;
					var currencySymbol = await this.setCurrencySymbol(this.addClientForm.get('currency').value, res);
					var formData = new FormData();
					formData.append('name' , this.addClientForm.get('name').value);
					formData.append('email' , this.addClientForm.get('email').value);
					formData.append('companyName' , this.addClientForm.get('companyName').value);
					formData.append('street1' , this.addClientForm.get('street1').value);
					formData.append('street2' , this.addClientForm.get('street2').value);
					formData.append('city' , this.addClientForm.get('city').value);
					formData.append('country' , this.addClientForm.get('country').value);
					formData.append('pincode' , this.addClientForm.get('pincode').value);
					formData.append('contactNo' , this.addClientForm.get('contactNo').value);
					formData.append('userRole' , this.addClientForm.get('userRole').value);
					formData.append('profilePhoto' , this.addClientForm.get('profilePhoto').value);
					formData.append('currency' , this.addClientForm.get('currency').value);
					formData.append('userType' , this.addClientForm.get('userType').value);
					formData.append('currencySymbol', currencySymbol);
					console.log("FORMDATA ++++++++++>" , formData);
					// this._loginService.addClient(formData).subscribe((res)=>{
					// 	console.log("res of add client" , res);
					// 	Swal.fire({
					// 		title: 'User added successfully',
					// 		text: "Do you want to add another client or navigate to all client page ?",
					// 		icon: 'success',
					// 		showCancelButton: true,
					// 		confirmButtonColor: '#3085d6',
					// 		cancelButtonColor: '#d33',
					// 		confirmButtonText: 'Go to All client',
					// 		cancelButtonText: 'Add another client'
					// 	}).then((result) => {
					// 		if(result.value){
					// 			this._router.navigate(['clients']);
					// 			this.addClientForm.reset();
					// 		}else{
					// 			this.addClientForm.reset();
					// 			this.previewUrl = null;
					// 			this.addClientForm.patchValue({
					// 				currency : '',
					// 			});
					// 		}	
					// 	})
					// } , (err)=>{
					// 	console.log("err of add client" , err);
					// });
			}, (err)=>{
				console.log(err);
			});
		/*})();*/
	}
	checkValidation(event, flag){
		console.log(event.target.value, flag);
		event = event.target.value;

		console.log(event.match(/\d+/) , "event.match(/\d+/)");
		if(event){
			switch (flag) {
				case "contact":
					if(event.match(/\d+/) == null){
						this.isDisable = true;	
						console.log(this.isDisable);			
						$('#contact').addClass("background-red") 
					}else{
						this.isDisable = false;
						console.log(this.isDisable);
						$('#contact').removeClass("background-red")
					}
				break;
				case "email":
					if(event.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/) == null){
						this.isDisable = true;	
						console.log(this.isDisable);			
						$('#email').addClass("background-red")
					}else{
						this.isDisable = false;
						console.log(this.isDisable);
						$('#email').removeClass("background-red")	
					}
				break;	
				case "city":
					if(event.match(/[a-zA-Z]/g) == null){
						this.isDisable = true;	
						console.log(this.isDisable);			
						$('#city').addClass("background-red")	
					}else{
						this.isDisable = false;
						console.log(this.isDisable);
						$('#city').removeClass("background-red")		
					}
				break;	
				case "country":
					if(event.match(/[a-zA-Z]/) == null){
						this.isDisable = true;	
						console.log(this.isDisable);			
						$('#country').addClass("background-red")	
					}else{
						this.isDisable = false;
						console.log(this.isDisable);
						$('#country').removeClass("background-red")		
					}
				break;
				case "pincode":
					if(event.match(/\d+/) == null){
						this.isDisable = true;	
						console.log(this.isDisable);			
						$('#pincode').addClass("background-red") 
					}else{
						this.isDisable = false;
						console.log(this.isDisable);
						$('#pincode').removeClass("background-red")
					}	
				break;
				default:
				// code...
			}
		}
	}
	setCurrencySymbol(clientCurrency, symbolRes){
		console.log("symbolRes======>", symbolRes);
		console.log("symbolRes======>", clientCurrency);
		var currencySymbol = null;
		symbolRes.forEach((symbol)=>{
			symbol.currencies.forEach((obj)=>{
				// console.log(clientCurrency.split(" ")[2]);
				// console.log(obj.code.toLowerCase() , clientCurrency.split(" ")[0]," =========== " ,obj.name.toLowerCase() , clientCurrency.split(" ")[2]);
				// console.log(currencySymbol , obj.code.toLowerCase() , clientCurrency.split(" ")[0].toLowerCase());
				// console.log("obj.code.toLowerCase() == clientCurrency.split(" ")[0].toLowerCase() ==++>");
				console.log(obj.code/*.toLowerCase() , clientCurrency.split(" ")[0].toLowerCase()*/);
				if(obj.code){
					if(obj.code.toLowerCase() == clientCurrency.split(" ")[0].toLowerCase()){
						if(currencySymbol == null){
							currencySymbol = obj.symbol;
							// console.log("inside Loop" , currencySymbol, obj.symbol);
						}
					}

				}
			});
		});
		console.log("Symbol ===>", currencySymbol);
		return currencySymbol;
	}

	enterAddress(event, name){
		console.log("event AND name =====>", event.target.value, name);
		event = event.target.value;
		if(event != '' ){
			$('#street2').removeAttr("disabled");
			$('#pincode').removeAttr("disabled");
			$('.street-1-error').addClass('d-none');
			// $('#street2').attr("disabled", false);
		}else{
			$('#street2').attr("disabled", true);
			$('#street2').val(""); 
			$('#pincode').attr("disabled", true);
			$('#pincode').val(""); 
			this.addClientForm.patchValue({
				street2 : '',
				pincode: ''
			});
			this.addClientForm.get('street2').updateValueAndValidity();
			this.addClientForm.get('pincode').updateValueAndValidity();
			console.log(this.addClientForm.value);
			$('.street-1-error').removeClass('d-none');

		}
		console.log("VALUE CHECK ===>", event != '' ? event : "BLANK");
	}

}
