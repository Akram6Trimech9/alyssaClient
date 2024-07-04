import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutCartRoutingModule } from './checkout-cart-routing.module';
import { CheckoutCartComponent } from './checkout-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/angular.material';


@NgModule({
  declarations: [
    CheckoutCartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CheckoutCartRoutingModule
  ]
})
export class CheckoutCartModule { }
