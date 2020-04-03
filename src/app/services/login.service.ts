import { Injectable , EventEmitter} from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable  , of , pipe, Subject} from 'rxjs';

// import {  } from '@angular/forms'
import { config } from '../congif'
@Injectable({
	providedIn: 'root'
})
export class LoginService {
	// data:any;
	private subjectLogin = new Subject<any>();
	
	formData:any = new FormData();
	isLoggedIn: EventEmitter<any> = new EventEmitter<any>();
	private currentUserSubject: BehaviorSubject<any>;
	public currentUser: Observable<any>;
	constructor(
		public _http: HttpClient 
		)
	{
		this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable(); 
	}
	public get currentUserValue(): any {
		return this.currentUserSubject.value;
	}
	sendFlagToApp() {
		this.subjectLogin.next(false);
	}
	getFlag(): Observable<any> {
		return this.subjectLogin.asObservable();
		
	}

	getCurrency(){
		return this._http.get('https://openexchangerates.org/api/currencies.json');
	}
	getCurrencySymbol(shortForm){
		console.log(shortForm);
		return this._http.get('https://restcountries.eu/rest/v2/currency/'+shortForm);
	}
	loginUser(body){
		return this._http.post(  config.baseApiUrl+"user/login-user" , body)
		.pipe(map(user => {
			console.log("login user=========>", user);
			if (user) {
				localStorage.setItem('currentUser', JSON.stringify(user));
				this.isLoggedIn.emit('loggedIn');
				this.currentUserSubject.next(user);
				this.subjectLogin.next({flag: true, currentUser: user});
				
			}

			return user;
		}));
	}
	loginShop(body){
		return this._http.post(  config.baseApiUrl+"user/login-shop" , body)
		.pipe(map(user => {
			console.log("login user=========>", user);
			if (user) {
				localStorage.setItem('currentUser', JSON.stringify(user));
				this.isLoggedIn.emit('loggedIn');
				this.currentUserSubject.next(user);
				this.subjectLogin.next({flag: true, currentUser: user});
			}
			return user;
		}));	
	}
	registerUser(body){
		return this._http.post(config.baseApiUrl+"user/signup-user", body);	
	}
	registerShop(body){
		return this._http.post(config.baseApiUrl+"user/signup-shop", body);
	}

	//get All Clients
	getAllClient(){
		return this._http.get(config.baseApiUrl+'user/get-all-client');
	}

	//add client
	addUser( addClientForm ){
		// this.formData.append("image" , addClientForm.get('image').value)
		// console.log(addClientForm.get('image').value);
		// console.log(this.formData);

		return this._http.post(config.baseApiUrl+'user/signup' , addClientForm);
	}
	logout(){
		    // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
     	this.currentUserSubject.next(null);
     	this.subjectLogin.next({flag: true, currentUser: null});
     	
	}

	
}
