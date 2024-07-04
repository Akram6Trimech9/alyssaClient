import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivateRoutingModule } from './activate-routing.module';
import { ActivateComponent } from './activate.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ActivateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ActivateRoutingModule
  ]
})
export class ActivateModule { }
