import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductsComponent } from './products/products.component';
import { AddToBagComponent } from './add-to-bag/add-to-bag.component';

const appRoutes: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'addToBag', component: AddToBagComponent },
    { path: 'home', component: HomeComponent },
    //     canActivate: [AuthGuard] 
    // },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}