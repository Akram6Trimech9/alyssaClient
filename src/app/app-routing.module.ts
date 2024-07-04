import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { ClientComponent } from './layout/client/client.component';

const routes: Routes = [
  {path : '',component:ClientComponent , children:[
    {path:'',loadChildren:()=>import('./client/components/home-page/home-page.module').then(m=>m.HomePageModule)} ,
    {path:'cart',loadChildren:()=>import('./client/components/checkout-cart/checkout-cart.module').then(m=>m.CheckoutCartModule)}

  ]},
  {path:'signup',loadChildren:()=>import('./auth/signup/signup.module').then(m=>m.SignupModule)},
  {path:'login',loadChildren:()=>import('./auth/login/login.module').then(m=>m.LoginModule)},
  {path:'activate/:token',loadChildren:()=>import('./auth/activate/activate.module').then(m=>m.ActivateModule)}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
