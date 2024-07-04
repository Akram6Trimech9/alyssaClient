import { Component, HostListener, OnInit } from '@angular/core';
import { AddToCartService } from 'src/app/services/add-to-cart.service';

@Component({
  selector: 'nav-client',
  templateUrl: './nav-client.component.html',
  styleUrls: ['./nav-client.component.css']
})
export class NavClientComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const header = document.querySelector('.header');

    if (header) {
      if (scrollPosition > 80) { // Adjust this value based on when you want the background to change
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }
 constructor(private addtoCartService : AddToCartService){
 }
 cart : number = 0
  ngOnInit(): void { 
   this.addtoCartService.cart.subscribe(res=>{ 
     this.cart = res.length
   })   
 }
 toggleMenu(): void {
  const menu = document.querySelector('.menu');
  menu?.classList.toggle('active');
  
  const mainNav = document.querySelector('.main_nav');
  mainNav?.classList.toggle('active');  // Toggle the visibility of main_nav
  
  const reservationsPhone = document.querySelector('.reservations_phone');
  reservationsPhone?.classList.toggle('active');  // Toggle the visibility of reservations_phone
  
  document.body.classList.toggle('stop-scrolling');
}


 
}
