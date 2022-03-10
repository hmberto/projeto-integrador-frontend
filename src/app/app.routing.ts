import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddToBagComponent } from './add-to-bag/add-to-bag.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';

const APP_ROUTES: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'notFound', component: PageNotFoundComponent },
    { path: 'addToBag', component: AddToBagComponent },
    { path: '', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
