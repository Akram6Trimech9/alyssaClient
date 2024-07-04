import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavClientComponent } from './components/client/nav-client/nav-client.component';
 import { FooterClientComponent } from './components/client/footer-client/footer-client.component';
 import { RouterModule } from '@angular/router';
import { MaterialModule } from './angular.material';



@NgModule({
  declarations: [
    NavClientComponent,
    FooterClientComponent,
    // AdminNavComponent,
    // AdminFooterComponent,
    // AdminSidebarComponent,
    // BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports:[
    NavClientComponent,
    FooterClientComponent,
     RouterModule, 
  ]
})
export class SharedModule { }
