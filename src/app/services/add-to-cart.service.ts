import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../interfaces/cart';
import { Product } from '../interfaces/product';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  private shoppingCart = new BehaviorSubject<Cart[]>(this.getInitialCart());
  public cart = this.shoppingCart.asObservable();

  constructor(private _snackBar: MatSnackBar, private localStorageService: LocalStorageService) {}

  addToCart(product: Product) {
    this.resetCart();

    const currentCart: Cart[] = this.shoppingCart.value || [];
    if (!currentCart.length) {
      const newCartItem: Cart = {
        product: product,
        count: 1,
        price: product.prix,
      };
      this.shoppingCart.next([newCartItem]);
    } else {
      const existingProductIndex = currentCart.findIndex((item) => item.product?._id === product._id);

      if (existingProductIndex !== -1) {
        const existingProduct = currentCart[existingProductIndex];

        if (existingProduct) {
          existingProduct.count = (existingProduct.count || 0) + 1;
        }
      } else {
        const newCartItem: Cart = {
          product: product,
          count: 1,
          price: product.prix,
        };

        currentCart.push(newCartItem);
      }
      this._snackBar.open('Product already added', '', { duration: 1000 });

      this.shoppingCart.next([...currentCart]);
      this.localStorageService.setItem('Ge-cart', currentCart);
      this.updateOnLocalStorage();
    }
  }

  updateOnLocalStorage() {
    const geCartJson = this.localStorageService.getItem('Ge-cart');
    console.log(geCartJson);
  }

  resetCart() {
    this.localStorageService.removeItem('Ge-cart');
  }

  private getInitialCart(): Cart[] {
    return this.localStorageService.getItem('Ge-cart') || [];
  }

  removeOneItem(product : Product){ 
    let currentCart: Cart[] = this.shoppingCart.value || [];
      if(currentCart.length >= 0){
        currentCart = currentCart.filter(item=> item.product?._id !== product._id)
        this.resetCart();
      }
      this.shoppingCart.next([...currentCart]);
      this.localStorageService.setItem('Ge-cart', currentCart);
  }
}
