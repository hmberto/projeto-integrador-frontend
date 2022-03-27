import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddToBagComponent } from './add-to-bag/add-to-bag.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { CadastroComponent } from './register/cadastro.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';

const APP_ROUTES: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'notFound', component: PageNotFoundComponent },
    { path: 'addToBag', component: AddToBagComponent },
    { path: '', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
