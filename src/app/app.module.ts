import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ApiService } from '../core/services/api.service';

import { MatExpansionModule } from '@angular/material/expansion';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CadastroComponent } from './components/register/cadastro.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { AddToBagComponent } from './components/add-to-bag/add-to-bag.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { ChangePassService } from './components/change-pass/change-pass.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutService } from './components/checkout/checkout.service';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DeliverymanComponent } from './components/deliveryman-deliveries/deliveryman-deliveries.component';
import { DeliverymanService } from './components/deliveryman-deliveries/deliveryman-deliveries.service';
import { DeliverymanNewsComponent } from './components/deliveryman-news/deliveryman.component';
import { DeliverymanNewsService } from './components/deliveryman-news/deliveryman.service';
import { AuthGuard } from './components/guards/auth.guard';
import { HomeService } from './components/home/home.service';
import { LoginDeliverymanComponent } from './components/login-deliveryman/login-deliveryman.component';
import { LoginDeliverymanService } from './components/login-deliveryman/login-deliveryman.service';
import { AuthService } from './components/login/auth.service';
import { LogoutService } from './components/logout/logout.service';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { MyOrderService } from './components/my-order/service/my-order.service';
import { PartnersComponent } from './components/partners/partners.component';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { PharmacyService } from './components/pharmacy/pharmacy.service';
import { ProductService } from './components/products/product.service';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { RecoveryService } from './components/recovery/recovery.service';
import { RegisterDeliverymanComponent } from './components/register-deliveryman/register-deliveryman.component';
import { RegisterDeliverymanService } from './components/register-deliveryman/register-deliveryman.service';
import { CadastroService } from './components/register/cadastro.service';
import { SearchComponent } from './components/search/search.component';
import { SearchService } from './components/search/search.service';
import { TrackOrderComponent } from './components/track-order/track-order.component';
import { TrackOrderService } from './components/track-order/track-order.service';
import { UserPComponent } from './components/user-profile/user.component';
import { UserPService } from './components/user-profile/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    CadastroComponent,
    PageNotFoundComponent,
    ProductsComponent,
    CartComponent,
    AddToBagComponent,
    ChangePassComponent,
    RecoveryComponent,
    UserPComponent,
    ContactUsComponent,
    SearchComponent,
    CheckoutComponent,
    TrackOrderComponent,
    MyOrderComponent,
    PharmacyComponent,
    RegisterDeliverymanComponent,
    LoginDeliverymanComponent,
    PartnersComponent,
    DeliverymanComponent,
    DeliverymanNewsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatExpansionModule
  ],
  providers: [
    AuthService,
    CadastroService,
    LogoutService,
    AuthGuard,
    ChangePassService,
    RecoveryService,
    UserPService,
    ProductService,
    HomeService,
    SearchService,
    CheckoutService,
    TrackOrderService,
    MyOrderService,
    ApiService,
    PharmacyService,
    RegisterDeliverymanService,
    LoginDeliverymanService,
    DeliverymanService,
    DeliverymanNewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
