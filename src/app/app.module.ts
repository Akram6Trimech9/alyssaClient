import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  URL_PROVIDER } from './interceptors/url.interceptor';
   
@NgModule({
  declarations: [
    AppComponent,
     ],
  imports: [
    BrowserModule,
     SharedModule,
     HttpClientModule,
    LayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [URL_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
