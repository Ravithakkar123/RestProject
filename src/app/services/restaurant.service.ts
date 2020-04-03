import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { config } from '../congif'

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(public _http: HttpClient ) { }

  getAllRestaurant(){
  	return this._http.get(config.baseApiUrl+'restaurant/get-restaurants');
  }
  getRestaurantById(id){
  	return this._http.get(config.baseApiUrl+'restaurant/get-restaurant-by-id/'+id);
  }

  getRestaurantFoodById(id){
  	return this._http.get(config.baseApiUrl+'restaurant/get-restaurant-food-by-id/'+id);
  }
  addFoodItem(body){
  	return this._http.post(config.baseApiUrl+'restaurant/add-food-item/', body);	
  }
  getCartById(body){
    return this._http.post(config.baseApiUrl+'restaurant/get-cart-by-id/', body);      
  }
  addFoodToCart(body){
    return this._http.post(config.baseApiUrl+'restaurant/add-food-item-to-cart/', body);      
  }
  removeFoodToCart(body){
    return this._http.post(config.baseApiUrl+'restaurant/remove-food-item-to-cart/', body);      
  }
  getPaymentRecord(id){
    return this._http.get(config.baseApiUrl+'restaurant/get-payment-record/'+id);    
  }
  addPaymentRecord(body){
    return this._http.post(config.baseApiUrl+'restaurant/add-payment-record/', body);    
  }
  addOrder(body){
    return this._http.post(config.baseApiUrl+'restaurant/add-order/', body);    
  }
  getOrderById(body){
    return this._http.post(config.baseApiUrl+'restaurant/get-order-by-id/', body);    
  }
}
