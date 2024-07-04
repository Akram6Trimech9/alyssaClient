import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent implements OnInit {
  couponForm!: FormGroup;
  cart: any;
  totalPrice: number = 0;
  valid: boolean = false;
  loader: boolean = false;

  ngOnInit() {
    this._cartService.cart.subscribe(res => {
      this.cart = res;
      this.totalPriceCalc(); // Call totalPriceCalc initially
    });

    this.createForm(); // Initialize the form
  }

  constructor(
    private _cartService: AddToCartService,
    private fb: FormBuilder,
    private couponService: CouponService
  ) {}

  createForm(): void {
    this.couponForm = this.fb.group({
      couponCode: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [this.couponExistsValidator.bind(this)],
          updateOn: 'blur'
        }
      ]
    });
  }

  couponExistsValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    const couponCode = control.value;

    return new Promise((resolve) => {
      this.couponService.checkCouponExists(couponCode).pipe(
        switchMap((coupon: any) => {
          if (coupon) {
            this.valid = true;
            this.loader = false;

            return this.applyDiscount(coupon);
          } else {
            this.valid = false;
            this.loader = false;
            return of(null); // Return an observable with null in case of no coupon
          }
        })
      ).subscribe(
        () => resolve(null),
        () => resolve({ couponCheckError: true })
      );
    });
  }

  applyDiscount(coupon: any): Observable<null> {
    this.cart.forEach((item: any) => {
      const productIdString = item.product._id.toString();
      if (coupon.products.includes(productIdString)) {
        item.price = (item.price * coupon.discount) / 100;
      }
    });
    
    this.totalPriceCalc(); // Call totalPriceCalc after applying the discount
    return of(null);
  }

  onInput(event: any): void {
    this.loader = true;
    if (event) {
      this.couponService.checkCouponExists(event.data).subscribe();
    }
  }

  removeProduct(product: Product) {
    this._cartService.removeOneItem(product);
  }

  totalPriceCalc(): number {
    this.totalPrice = 0; // Reset total price
    this.cart.forEach((element: any) => {
      this.totalPrice = this.totalPrice + element.price * element.count;
    });

    return this.totalPrice;
  }
}
