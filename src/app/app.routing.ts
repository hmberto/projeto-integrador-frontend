import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddToBagComponent } from './add-to-bag/add-to-bag.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { CartComponent } from './cart/cart.component';
import { CadastroComponent } from './register/cadastro.component';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { UserPComponent } from './user-profile/user.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { RegisterDeliverymanComponent } from './register-deliveryman/register-deliveryman.component';
import { LoginDeliverymanComponent } from './login-deliveryman/login-deliveryman.component';
import { PartnersComponent } from './partners/partners.component';
import { DeliverymanComponent } from './deliveryman/deliveryman.component';

const APP_ROUTES: Routes = [
    { path: 'produtos', component: ProductsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'carrinho', component: CartComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'notFound', component: PageNotFoundComponent },
    { path: 'adicionar', component: AddToBagComponent },
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
    { path: '', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
