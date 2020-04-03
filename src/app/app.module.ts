import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
//imported modules
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from './search.pipe';

import { SplitPipe } from './split.pipe';
import { AddZeroPipe } from './add-zero.pipe';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SelectRestaurantComponent } from './select-restaurant/select-restaurant.component';
import { ShopOwnerComponent } from './shop-owner/shop-owner.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchPipe,
    
    SplitPipe,
    AddZeroPipe,
    RegisterComponent,
    HomePageComponent,
    SelectRestaurantComponent,
    ShopOwnerComponent,
    CartComponent,
    OrderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
