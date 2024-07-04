import { Component, OnInit } from '@angular/core';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { productService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(private productService : productService ,private addcartService :AddToCartService ){}
allProducts : any[] =[]
  ngOnInit(): void {
     this.productService.getAllProducts().subscribe(res => { 
       this.allProducts = res
     })
}
  addToCart(product : any) {
    this.addcartService.addToCart(product)
 
  }
}
