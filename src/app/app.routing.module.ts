import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddToBagComponent } from './components/add-to-bag/add-to-bag.component';
import { CartComponent } from './components/cart/cart.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DeliverymanComponent } from './components/deliveryman/deliveryman.component';
import { HomeComponent } from './components/home/home.component';
import { LoginDeliverymanComponent } from './components/login-deliveryman/login-deliveryman.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PartnersComponent } from './components/partners/partners.component';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { ProductsComponent } from './components/products/products.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { RegisterDeliverymanComponent } from './components/register-deliveryman/register-deliveryman.component';
import { CadastroComponent } from './components/register/cadastro.component';
import { SearchComponent } from './components/search/search.component';
import { TrackOrderComponent } from './components/track-order/track-order.component';
import { UserPComponent } from './components/user-profile/user.component';



const appRoutes: Routes = [
    { path: 'produtos', component: ProductsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'adicionar', component: AddToBagComponent },
    { path: 'carrinho', component: CartComponent },
    { path: 'redefinir', component: ChangePassComponent },
    { path: 'recuperacao', component: RecoveryComponent },
    { path: 'usuario', component: UserPComponent },
    { path: 'faleConosco', component: ContactUsComponent },
    { path: 'pesquisar', component: SearchComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'pedido', component: TrackOrderComponent },
    { path: 'pedidos', component: MyOrderComponent },
    { path: 'farmacia', component: PharmacyComponent },
    { path: 'parceiros', component: PartnersComponent },
    { path: 'parceiros/entregador/cadastro', component: RegisterDeliverymanComponent },
    { path: 'parceiros/entregador/login', component: LoginDeliverymanComponent },
    { path: 'parceiros/entregador/entregar', component: DeliverymanComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}