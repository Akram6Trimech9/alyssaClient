import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletePaimentRoutingModule } from './complete-paiment-routing.module';
import { CompletePaimentComponent } from './complete-paiment.component';


@NgModule({
  declarations: [
    CompletePaimentComponent
  ],
  imports: [
    CommonModule,
    CompletePaimentRoutingModule
  ]
})
export class CompletePaimentModule { }
