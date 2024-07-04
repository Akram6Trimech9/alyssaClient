import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutCartComponent } from './checkout-cart.component';

const routes: Routes = [{
  path:"",component:CheckoutCartComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutCartRoutingModule { }
