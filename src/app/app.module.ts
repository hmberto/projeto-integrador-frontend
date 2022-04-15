import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { CartComponent } from './cart/cart.component';
import { CadastroComponent } from './register/cadastro.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthService } from './login/auth.service';
import { LogoutService } from './logout/logout.service';
import { CadastroService } from './register/cadastro.service';
import { RecoveryService } from './recovery/recovery.service';
import { ChangePassService } from './change-pass/change-pass.service';
import { NewCartService } from './cart/newcart.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductsComponent } from './products/products.component';
import { AddToBagComponent } from './add-to-bag/add-to-bag.component';
import { HttpClientModule } from '@angular/common/http';
import { UserPComponent } from './user-profile/user.component';
import { UserPService } from './user-profile/user.service';
import { ProductService } from './products/product.service';

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
    UserPComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    CadastroService,
    LogoutService,
    AuthGuard,
    NewCartService,
    ChangePassService,
    RecoveryService,
    UserPService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
